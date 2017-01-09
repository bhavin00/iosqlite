// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
var db = null;
var app=angular.module('starter', ['ionic','ngCordova']);

app.run(function($ionicPlatform,$cordovaSQLite) {
  $ionicPlatform.ready(function() {
    if(window.cordova && window.cordova.plugins.Keyboard) {
      // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
      // for form inputs)
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);

      // Don't remove this line unless you know what you are doing. It stops the viewport
      // from snapping when text inputs are focused. Ionic handles this internally for
      // a much nicer keyboard experience.
      cordova.plugins.Keyboard.disableScroll(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
    db=window.openDatabase("sqlite","1.00","sqlitedemo",2000);
    $cordovaSQLite.execute(db,"create table example(id integer primary key,firstname text,lastname text)");
  });
})
app.controller('infoCtrl', ['$scope', '$cordovaSQLite', function($scope, $cordovaSQLite) {
  
  var refresh =function(){
    $scope.allData=[];
    $cordovaSQLite.execute(db,"select * from example").then(function(res){
      if(res.rows.length){
        for(var i=0;i<res.rows.length;i++){
           $scope.allData.push(res.rows.item(i));
      }
    }else{
            console.log("No Data Found");
    }
    },function(err){
          console.log("Error Found"+err);
    });
  }


  $scope.addInfo=function(){
    
    var query = "insert into example (firstname,lastname) VALUES (?,?)";
    $cordovaSQLite.execute(db,query,[$scope.firstname,$scope.lastname]);
    refresh();
  }
 
  


}]);
   