/**
 * Created by Shlomie on 10/01/2016.
 */
//mongod --dbpath C:\Users\Shlomie\Documents\UKLFI\data
//db.usercollection.find().pretty()
var app = angular.module('uklfi', ['ngResource', 'ngRoute']);

app.config(['$routeProvider', function ($routeProvider) {
    $routeProvider
        .when('/', {
            templateUrl: 'particles/home.html',
            controller: 'HomeCtrl'
        })
        .when('/add-entity', {
            templateUrl: 'particles/form.html',
            controller:'SaveCtrl'
        })
        .otherwise({
            redirectTo: '/'
        });
}]);
// $scope as the glue between the controller and the view, $resource for working with our RESTful API,
// and $location for changing the URL in the browser address bar. All of these are built-in Angular services.
app.controller('HomeCtrl', ['$scope', '$resource',
    function ($scope, $resource) {
        var ListofEntries = $resource('/api/entities');
        ListofEntries.query(function(entries){
            $scope.entries = entries;
        });
    }]);

app.controller('SaveCtrl', ['$scope', '$resource', '$location',
    function($scope, $resource, $location){
        //This method will be called when the user clicks the Save button.
        $scope.save = function(){
            var Entities = $resource('/api/entities');
            Entities.save($scope.entries, function(){
                $location.path('/');
            });
        };
    }]);