(function(){
    'use strict';
    angular.module('public')
    .controller('myinfoController',myinfoController);
    myinfoController.$inject=['UserService','ApiPath'];
    function myinfoController(UserService,ApiPath){
        var ctrl=this;
        ctrl.signed=UserService.signed;
        ctrl.firstname=UserService.firstname;
        ctrl.lastname=UserService.lastname;
        ctrl.email=UserService.email;
        ctrl.tel=UserService.tel;
        ctrl.favorite=UserService.favorite;
        ctrl.basePath=ApiPath;
    }

})();