(function(){
    'use strict';
    angular.module('LunchCheck',[])
    .controller('LunchCheckController',LunchCheckController);
    LunchCheckController.$inject = ['$scope'];
    function LunchCheckController($scope){
        $scope.lunch="";
        $scope.checkedMessage="";
        $scope.checkedColor="";
        $scope.checkItems=function(){
            var cR=countItems($scope.lunch)
            $scope.checkedMessage=cR[0];
            $scope.checkedColor=cR[1];
        };
    };
    function countItems(myLunch){
        var msg=[];
        if (myLunch == ""){
            msg[0]="Please enter data first!";
            msg[1]="checked_red";
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
                msg[0]="Please enter data first!";
                msg[1]="checked_red";
            }else if(itemsCount<4){
                msg[0]="Enjoy!";
                msg[1]="checked_green";
            }else{
                msg[0]="Too much!";
                msg[1]="checked_green";
            }
        };
        // console.log(msg);
        return msg;
    };
})();