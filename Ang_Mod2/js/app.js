(function(){
    'use strict';
    angular.module('ShoppingListCheckOff',[])
    .controller('ToBuyController',ToBuyController)
    .controller('AlreadyBoughtController',AlreadyBoughtController)
    .service('ShoppingListCheckOffService',ShoppingListCheckOffService);

    ToBuyController.$inject = ['ShoppingListCheckOffService'];
    function ToBuyController(ShoppingListCheckOffService){
        var things=this;
        things.items=ShoppingListCheckOffService.getItems()[0];
        things.checkoff=function(itemIndex){
            ShoppingListCheckOffService.buyItem(itemIndex);
        };
    };
   
    AlreadyBoughtController.$inject=['ShoppingListCheckOffService'];
    function AlreadyBoughtController(ShoppingListCheckOffService){
        var things=this;
        things.items=ShoppingListCheckOffService.getItems()[1];
        things.checkoff=function(itemIndex){
            ShoppingListCheckOffService.cancelItem(itemIndex);
        };              
    };

    function ShoppingListCheckOffService(){
        var service=this;
        var initItems=[
            {name: 'cookies', quantity: 10 },
            {name: 'cakes', quantity: 5 },
            {name: 'chocolate', quantity: 8 },
            {name: 'bread', quantity: 6 },
            {name: 'chicken', quantity: 2 },
            {name: 'mushroom', quantity: 20 },
            {name: 'tomato', quantity: 7 },
            ];
        var tobuyitems=[];
        tobuyitems=initItems;
        var boughtitems=[];
        var items=[tobuyitems,boughtitems];
        service.getItems=function(){
            return items;
        };
        var item={};
        service.buyItem=function(itemIndex){
            item=tobuyitems[itemIndex];
            boughtitems.push(item);
            tobuyitems.splice(itemIndex,1);
        };
        service.cancelItem=function(itemIndex){
            item=boughtitems[itemIndex];
            tobuyitems.push(item);
            boughtitems.splice(itemIndex,1);
        }
    };
})();