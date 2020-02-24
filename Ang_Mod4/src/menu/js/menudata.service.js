(function(){
    'use strict';
    angular.module('data')
    .service('MenuDataService',MenuDataService)
    .constant('categoriesURL',"https://davids-restaurant.herokuapp.com/categories.json")
    .constant('itemsURL',"https://davids-restaurant.herokuapp.com/menu_items.json");

    MenuDataService.$inject = ['$http','categoriesURL','itemsURL'];
    function MenuDataService($http,categoriesURL,itemsURL){
        var service=this;
        var items=[];
        service.getAllCategories=function(){
            var response = $http({
                method:"GET",
                url:categoriesURL,
                timeout:800
                }).then(
                function(response){
                    // console.log(response);
                    items=response.data;
                    // console.log(items);
                    return items;
                },
                function(error){
                    console.log("Something went wrong while access JSON *getAllCategories*");
                }
                );
            return response;
        };
        service.getItemsForCategory=function(categoryShortName){
            // console.log('here' + categoryShortName);
            var response = $http({
                method:"GET",
                url:itemsURL,
                params:{
                    category:categoryShortName
                    },
                timeout:800
                }).then(
                function(response){
                    items=response.data;
                    return items;
                },
                function(error){
                    console.log("Something went wrong while access JSON *getItemsForCategory*");
                }
                );
            return response;
        };
    };
})();