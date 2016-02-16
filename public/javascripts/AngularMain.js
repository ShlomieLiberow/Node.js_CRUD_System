/**
 * Created by Shlomie on 10/01/2016.
 */
//mongod --dbpath C:\Users\Shlomie\Documents\UKLFI\data
//db.usercollection.find().pretty()
var app = angular.module('uklfi', ['ngResource', 'ngRoute']);//named declared in layout.jade + dependencies

app.config(['$routeProvider', function ($routeProvider) { //This code will be run as soon as Angular detects ng-app and tries to start up
    $routeProvider
        .when('/', {
            templateUrl: 'particles/home.html',
            controller: 'HomeCtrl'
        })
        .when('/add-entity', {
            templateUrl: 'particles/submitNewEntries.html',
            controller:'SaveCtrl'
        })
        .when('/entity/:id', {
            templateUrl: 'particles/submitNewEntries.html',
            controller: 'EditCtrl'
        })
        .otherwise({//if the app receives a URL that is not defined.
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
            Entities.save($scope.entries, function () {//save function is native??.
                $location.path('/');
            });
        };
    }]);

app.controller('EditCtrl', ['$scope', '$resource', '$location', '$routeParams',
    function ($scope, $resource, $location, $routeParams) {
        var Entities = $resource('/api/entities/:id', {id: '@_id'}, { //‘@_id’ tells Angular to look for property _id in the object included in request body
            update: {method: 'PUT'}//required in Angular to use PUT
        });

        Entities.get({id: $routeParams.id}, function (entries) {//presumably overrides above {id: '@_id'} to supply its own
            $scope.entries = entries;//puts it in scope so page can reference it using ng-model="entries.username"
        });

        $scope.save = function () {//called when save is clicked
            Entities.update($scope.entries, function () {//this uses above functionality to assign property_id to $resource
                $location.path('/');
            });
        }
    }]);