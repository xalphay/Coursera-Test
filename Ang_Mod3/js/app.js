(function(){
    'use strict';
    angular.module('NarrowItDownApp',[])
    .controller('NarrowItDownController',NarrowItDownController)
    .service('MenuSearchService',MenuSearchService)
    .constant('ApiBasePath',"https://davids-restaurant.herokuapp.com/menu_items.json")
    .directive('foundItems',foundItemsDirective);

    function foundItemsDirective(){
        var ddo={
            templateUrl:'loader/foundItems.html',
            scope:{
                items:'<',
                onRemove:'&'
            },
            controller:foundItemsDirectiveController,
            controllerAs:'list',
            bindToController:true,
            link:foundItemsDirectiveLink,
            transclude:true
        };
        return ddo;
    };

    function foundItemsDirectiveController(){
        var list=this;
        list.existed=function(){
            try{
                if (list.items.length >0){
                return true;
                };
                return false;
            }
            catch(err){
                return false;
            }

        }
    };

    function foundItemsDirectiveLink(scope,element,attrs,controller){
        // console.log('Link scope is: ', scope);
        // console.log('Controller instance is: ', controller);
        // console.log('Element is: ', element);
        scope.$watch('list.existed()',function(newValue,oldValue){
            // console.log('newValue',newValue);
            // console.log('oldValue',oldValue);
            if(newValue===true){
                // console.log('Something Triggered #newValue true');
                removeNothingFound();
            }
            else{
                displayNothingFound();
            }
        });
        function displayNothingFound(){
            var warningElem=element.find("div.error");
            warningElem.slideDown(900);
        };
        function removeNothingFound(){
            var warningElem=element.find("div.error");
            warningElem.slideUp(900);
        };
    };

    NarrowItDownController.$inject=['MenuSearchService'];
    function NarrowItDownController(MenuSearchService){
        var ctrl=this;
        ctrl.NarrowItDown=function(){
            var MSS=MenuSearchService;
            var detailItems=[];
            if (ctrl.keyWord===''){
                ctrl.items=[];
                // console.log('Value blank');
            }
            else{
            var promise=MSS.getMatchedMenuItems(ctrl.keyWord);
            promise.then(
                function(response){
                    detailItems=response;
                    ctrl.items=[];
                    var i;
                    for (i in detailItems){
                        var item={
                            name:"",
                            short_name:"",
                            desc:""
                        };
                        item.name=detailItems[i].name;
                        item.short_name=detailItems[i].short_name;
                        item.desc=detailItems[i].description;
                        ctrl.items.push(item);
                    };
                },
                function(error){

                }
            );
            };
        ctrl.removeItem=function(itemIndex){
            ctrl.items.splice(itemIndex,1);
        };
            
        }
    };

    MenuSearchService.$inject=['$http','ApiBasePath'];
    function MenuSearchService($http,ApiBasePath){
        var service=this;
        service.getMatchedMenuItems=function(searchTerm){
            var response = $http({
                method:"GET",
                url:ApiBasePath,
                }).then(
                function(response){
                    var menu_items;
                    menu_items=response.data.menu_items;
                    var foundItems=[];
                    var i;
                    for(i in menu_items){
                        var desc="";
                        desc=menu_items[i].description;
                        desc=desc.toLowerCase();
                        try{
                            searchTerm=searchTerm.toLowerCase();
                        }
                        catch(err){
                            //console.log('no value', err)
                            return [];
                        }
                        var j=0;
                        j=desc.indexOf(searchTerm);
                        // console.log(j);
                        if (j!==-1){
                            foundItems.push(menu_items[i]);
                        };
                    };
                    return foundItems;
                },
                function(error){
                    console.log("Something went wrong while access JSON");
                }
                );
            return response;
        };
    };
    
})();