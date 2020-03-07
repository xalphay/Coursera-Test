(function(){
    'use strict';
    angular.module('public')
    .controller('SignUpController',SignUpController);
    SignUpController.$inject=['UserService','MenuService'];
    function SignUpController(UserService,MenuService){
        var ctrl=this;
        var service=UserService;
        ctrl.signed=service.signed;
        ctrl.firstname=service.firstname;
        ctrl.lastname=service.lastname;
        ctrl.email=service.email;
        ctrl.tel=service.tel;
        ctrl.favorite=service.favorite.short_name;
        ctrl.go=function(){
            MenuService.validFav(ctrl.favorite)
            .then(function success(response){
                service.firstname=ctrl.firstname;
                service.lastname=ctrl.lastname;
                service.email=ctrl.email;
                service.tel=ctrl.tel;
                // ctrl.validFav=response.data;
                // service.favorite=ctrl.validFav;
                service.favorite=response.data;
                ctrl.signed=true;
                service.signed=ctrl.signed;
                // console.log("Save myinfo to service:",service);
            },
            function error(response){
                ctrl.validFav="No such menu number exists!";
                ctrl.signed=false;
                service.signed=ctrl.signed;
            })
        };
        ctrl.modify=function(){
            ctrl.signed=false;
            service.signed=ctrl.signed;
        };
    }
})();