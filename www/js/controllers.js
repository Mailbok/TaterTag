angular.module('starter.controllers', [])

.controller('AppCtrl', function($scope, $ionicModal, $timeout, $firebaseAuth) {

  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  // Form data for the login modal
  $scope.loginData = {};

  // Create the login modal that we will use later
  $ionicModal.fromTemplateUrl('templates/login.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal = modal;
  });

  // Triggered in the login modal to close it
  $scope.closeLogin = function() {
    $scope.modal.hide();
  };

  // Open the login modal
  $scope.login = function() {
    $scope.modal.show();
  };

  // Perform the login action when the user submits the login form
  $scope.doLogin = function() {
    console.log('Doing login', $scope.loginData);

    //FIREBASE LOGIN STUFF
      var ref = new Firebase("https://tater-tag.firebaseio.com/users");
      ref.authWithPassword({
        email    : $scope.loginData.username,
        password : $scope.loginData.password
      }, function(error, authData) {
        if (error) {
          console.log("Login Failed!", error);
        } else {
          console.log("Authenticated successfully with payload:", authData);
      }
  });

    $timeout(function() {
      $scope.closeLogin();
    }, 500);
  };

})

.controller('SpudShotCtrl', function($scope, $firebaseArray) {

  var shopLaunchersRef = new Firebase("https://tater-tag.firebaseio.com/").child('launchers');
  var launchersData = $firebaseArray(shopLaunchersRef);
  $scope.launchers = launchersData;

  var shopPotatosRef = new Firebase("https://tater-tag.firebaseio.com/").child('potatos');
  var potatosData = $firebaseArray(shopPotatosRef);
  $scope.potatos = potatosData;

})

.controller('AccountCtrl', function($scope, $firebaseArray, $firebaseAuth) {

  var ref = new Firebase("https://tater-tag.firebaseio.com/");
  var authData = ref.getAuth();

  var accountStatsRef = new Firebase("https://tater-tag.firebaseio.com/").child('users').child(authData.uid).child('stats');
  var accountStatsData = $firebaseArray(accountStatsRef);

});
