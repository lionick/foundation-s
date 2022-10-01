<?php
namespace OmekaTheme\Helper;

use Laminas\View\Helper\AbstractHelper;
use Omeka\Service\EntityManagerFactory;
use Laminas\ServiceManager\ServiceLocatorInterface;
use Laminas\ServiceManager\ServiceManager;

class ListCategory extends AbstractHelper{

    

    /**
     * Get the IDs of all resources that satisfy the query.
     *
     * @param string $resourceType
     * @param array $categoryQuery
     * @return array
     */
    function getCategoryResourceIds($resourceType, array $categoryQuery)
    {
        $application = \Laminas\Mvc\Application::init(require 'application/config/application.config.php');

        $api = $application->getServiceManager()->get('Omeka\ApiManager');
        return $api->search($resourceType, $categoryQuery, ['returnScalar' => 'id'])->getContent();
    }

    /**
     * Get all available values and their counts of a property.
     *
     * @param string $resourceType
     * @param int $propertyId
     * @param string $queryType
     * @param array $categoryQuery
     * @return array
     */
    function getValueValues($resourceType, $propertyId, $queryType, array $categoryQuery)
    {
        $application = \Laminas\Mvc\Application::init(require 'application/config/application.config.php');        
        $em = $application->getServiceManager()->get('Omeka\EntityManager');
        $qb = $em->createQueryBuilder();
        // Cannot use an empty array to calculate IN(). It results in a Doctrine
        // QueryException. Instead, use an array containing one nonexistent ID.
        $itemIds = $this->getCategoryResourceIds($resourceType, $categoryQuery) ?: [0];
        $qb->from('Omeka\Entity\Value', 'v')
            ->andWhere($qb->expr()->in('v.resource', $itemIds))
            ->groupBy('label')
            ->orderBy('has_count', 'DESC')
            ->addOrderBy('label', 'ASC');
        switch ($queryType) {
            case 'res':
            case 'nres':
                $qb->select("0 id, CONCAT(vr.id, ' ', vr.title) label", 'COUNT(v) has_count')
                    ->join('v.valueResource', 'vr');
                break;
            case 'ex':
            case 'nex':
                $qb->select("0 id, CONCAT(p.id, ' ', vo.label, ': ', p.label) label", 'COUNT(v) has_count')
                    ->join('v.property', 'p')
                    ->join('p.vocabulary', 'vo');
                break;
            case 'eq':
            case 'neq':
            case 'in':
            case 'nin':
            default:
                $qb->select('0 id, v.value label', 'COUNT(v.value) has_count');
        }
        if ($propertyId) {
            $qb->andWhere('v.property = :propertyId')
                ->setParameter('propertyId', $propertyId);
        }
        return $qb->getQuery()->getResult();
    }

}
?>