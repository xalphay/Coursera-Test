(function(){
    'use strict';
    angular.module('MenuApp')
    .config(RoutesConfig);

    RoutesConfig.$inject=['$stateProvider','$urlRouterProvider'];
    function RoutesConfig($stateProvider,$urlRouterProvider){
        // Redirect to home page if no other URL matches;
        $urlRouterProvider.otherwise('/');
        // Set up UI States;
        $stateProvider
        .state('home',{
            url:'/',
            templateUrl:'src/menu/templates/home.template.html'
        })
        .state('categories',{
            url:'/categories',
            templateUrl:'src/menu/templates/main-categories.template.html',
            controller:'categoriesController as categoryCtrl',
            resolve:{
                items:['MenuDataService',function(MenuDataService){
                    return MenuDataService.getAllCategories();
                }]
            }
        })
        .state('items',{
            url:'/categories/{shortName}',
            templateUrl:'src/menu/templates/main-items.template.html',
            controller:'ItemDetailController as itemDetail',
            resolve:{
                item:['$stateParams','MenuDataService',
                    function($stateParams,MenuDataService){
                    return MenuDataService.getItemsForCategory($stateParams.shortName);
                }]
            }
        });

    }

})();