<?php
namespace OmekaTheme\Helper;

use Laminas\View\Helper\AbstractHelper;

class ListLastItems extends AbstractHelper{
    function getLastItemsInserted () {
        $application = \Laminas\Mvc\Application::init(require 'application/config/application.config.php');

        $api = $application->getServiceManager()->get('Omeka\ApiManager');

        $queryResources = [
        'sort_by' => 'created',
        'sort_order' => 'desc',
        'site_id' => 23,
        'item_set_id' => [8171,7298,7299], // Serach only to specific item sets
        'limit' => '5'
        ];
        $response = $api->search("items", $queryResources);
        //var_dump($response);
        $params['resourceType'] = "item";
        $params['resources'] = $response->getContent();
        //var_dump($params['resources'][0]->itemSets());
        $params['query'] = [
        'sort_by' => 'created',
        'sort_order' => 'desc'
        ];
        $params['heading'] = '';
        $params['link-text'] = 'Browse All';
        $params['components'][0] = 'resource-heading';
         
        return $params;
        
    }
}

?>