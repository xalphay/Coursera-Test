(function () {
    "use strict";
    
    angular.module('public')
    .service('UserService', UserService);
    
    UserService.$inject=['ApiPath'];
    function UserService(){
      var user={
        signed:false,
        firstname:"",
        lastname:"",
        email:"",
        tel:0,
        favorite:{short_name:""}
      };
      return user;
    }
})();
    