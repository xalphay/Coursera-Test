(function(){
    'use strict';
    angular.module('LunchCheck',[])
    .controller('LunchCheckController',LunchCheckController);
    LunchCheckController.$inject = ['$scope'];
    function LunchCheckController($scope){
        $scope.lunch="Chicken,Sushi,Steak";
        $scope.checkedMessage="We DO NOT consider and empty item, i.e., , , as an item towards to the count.";
        $scope.checkItems=function(){
            $scope.checkedMessage=countItems($scope.lunch);
        };
    };
    function countItems(myLunch){
        var msg="";
        if (myLunch == ""){
            msg="Please enter data first!, Remember that we DO NOT consider and empty item, i.e., , , as an item towards to the count."
        }else{
            var items=myLunch.split(",");
            // console.log(items);
            var itemsCount=0;
            itemsCount=items.length;
            var newItems=[];
            var i;
            for (i=0; i<itemsCount;i++){
                if(items[i]!=""){
                    newItems.push(items[i]);
                }
            };
            // console.log(newItems.length);
            itemsCount=newItems.length;
            if (itemsCount==0){
                msg="Please enter data first!, Remember that we DO NOT consider and empty item, i.e., , , as an item towards to the count.";
            }else if(itemsCount<4){
                msg="Enjoy!";
            }else{
                msg="Too much!";
            }
        };
        return msg;
    };
})();