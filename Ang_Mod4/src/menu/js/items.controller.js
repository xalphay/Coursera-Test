(function(){
    'use strict';
    angular.module('MenuApp')
    .controller('ItemDetailController',ItemDetailController);
    ItemDetailController.$inject=['MenuDataService','item'];
    function ItemDetailController(MenuDataService,item){
        var itemDetail=this;
        itemDetail.items=item.menu_items;
        itemDetail.name=item.category.name;
    }

})();