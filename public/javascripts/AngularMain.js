/**
 * Created by Shlomie on 10/01/2016.
 */
//mongod --dbpath C:\Users\Shlomie\Documents\UKLFI\data
//db.usercollection.find().pretty()

//angular.module('autofields', ['autofields']);
//angular.module('ngMaterial', ['ngMaterial']);
//angular.module('md.data.table', ['md.data.table']);
//angular.module('ngMessages', ['ngMessages']);

var app = angular.module('uklfi', ['ngResource', 'ngRoute', 'autofields', 'ngMaterial', 'ngRoute' , 'ui.bootstrap']);//named declared in layout.jade + dependencies

app.config(['$routeProvider', function ($routeProvider) { //This code will be run as soon as Angular detects ng-app and tries to start up
    'use strict';

    $routeProvider
        .when('/', {
            templateUrl: 'partials/home.html',
            controller: 'HomeCtrl'
        })
        .when('/td', {
            templateUrl: 'partials/testNewTable.html',
            controller: 'E6'
        })
        .when('/add-entity', {
            templateUrl: 'partials/newEntries.html',
            controller: 'demoCtrl'
        })
        .when('/entity/:id', {
            templateUrl: 'partials/editEntries.html',
            controller: 'EditCtrl'
        })
        .when('/entity/delete/:id', {
            templateUrl: 'partials/deleteEntries.html',
            controller: 'DeleteCtrl'
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
        ListofEntries.query(function (entries) {
            $scope.entries = entries;
        });
    }]);

app.controller('EditCtrl', ['$scope', '$resource', '$location', '$routeParams',
    function ($scope, $resource, $location, $routeParams) {
        var Entities = $resource('/api/entities/:id', {id: '@_id'}, { //‘@_id’ tells Angular to look for property _id in the object included in request body
            update: {method: 'PUT'}//required in Angular to use PUT
        });

        Entities.get({id: $routeParams.id}, function (user) {//presumably overrides above {id: '@_id'} to supply its own
            $scope.user = user;//puts it in scope so page can reference it using ng-model="entries.username"
        });

        $scope.save = function () {//called when save is clicked
            Entities.update($scope.user, function () {//this uses above functionality to assign property_id to $resource
                $location.path('/');
            });
        }
    }]);

app.controller('DeleteCtrl', ['$scope', '$resource', '$location', '$routeParams',
    function ($scope, $resource, $location, $routeParams) {
        var Entities = $resource('/api/entities/:id');

        Entities.get({id: $routeParams.id}, function (entries) {
            $scope.entries = entries;
        });

        $scope.delete = function () {
            Entities.delete({id: $routeParams.id}, function (entries) {//where is delete coming from??
                $location.path('/');
            });
        }
    }]);

app.controller('demoCtrl', ['$scope', '$log', '$resource', '$location', '$routeParams',
        function ($scope, $log, $resource, $location, $routeParams) {
            $scope.user = {
                title: '',
                firstname: '',
                surname: '',
                suffix: '',
                email: 'test@test.com',
                facebook: '',
                introducer: '',
                genderCheck: null,
                notes: '',
                category: '',
                website: '',
                number: 1,
                birthdate: new Date(),
                password: '',
                confirmPassword: '',
                rememberMe: false,
                memberOfAssociation: '',
                memberOfCompany: '',
                membershipCeased: '',
                statusWhenLastSubPaid: '',
                organisation: '',
                positionOrDepartment: '',
                occupation: '',
                legalQualificationOrVocation: '',
                jurisdictions: '',
                relevantAreasOfLaw: '',
                legalResearchInterests: '',
                nonLegalTasks: '',
                otherProfessionalSpecialisms: '',
                volunteeringIntent: '',
                volunteeringCompleted: '',
                telephone: '',
                address: '',
                city: '',
                county: '',
                state: '',
                province: '',
                postcodeORzipCode: '',
                country: ''
            };

            $scope.schema = [
                //{ property: 'username', type: 'text', attr: { ngMinlength: 4, required: true }, msgs: {minlength: 'Needs to have at least 4 characters'} },
                /* { property: 'number', label:'Number between 1-10', type: 'number', attr: {min:1, max: 10}, msgs: {min: 'You need a number no less than 1', max: 'You need a number no greater than 10'}, validate:false },
                 { property: 'birthdate', type: 'date', attr: { required: true } },
                 { property: 'gender', type: 'select', list: 'key as value for (key,value) in genders', attr: {required: true}},
                 { property: 'genderCheck', label:'Are you really?', type: 'select', list: 'key as value for (key,value) in genderCheck', attr: {required: true, ngShow:'$data.gender != null'}},

                 { type:'multiple', fields: [
                 { property: 'password', type: 'password', attr: { required: true, ngMinlength:6 } },
                 { property: 'confirmPassword', label: 'Confirm Password', type: 'password', attr: { confirmPassword: 'user.password', required: true, ngMinlength:6 }, msgs: {match: 'Your passwords need to match'} }
                 ], columns: 6},
                 */
                {property: 'title', type: 'text', attr: {ngMinlength: 4, required: true}},
                {property: 'firstname', type: 'text', attr: {ngMinlength: 4, required: true}},
                {property: 'surname', type: 'text', attr: {ngMinlength: 4, required: true}},
                {property: 'suffix', type: 'text', attr: {ngMinlength: 4, required: true}},
                {
                    property: 'email',
                    type: 'email',
                    help: 'Don\'t worry we won\'t spam your inbox',
                    attr: {required: true, ngMinlength: 4},
                    msgs: {
                        required: 'You need an email address',
                        email: 'Email address needs to be valid',
                        valid: 'Nice email address!'
                    }
                },
                {property: 'facebook', type: 'checkbox'},
                {property: 'bio', type: 'textarea', rows: 5, attr: {required: true}},
                {property: 'category', type: 'text', attr: {ngMinlength: 4, required: true}},
                {property: 'introducer', type: 'text', attr: {ngMinlength: 4, required: true}},
                {
                    property: 'memberOfAssociation',
                    type: 'text',
                    attr: {ngMinlength: 4, required: true},
                    msgs: {minlength: 'Needs to have at least 4 characters'}
                },
                {property: 'memberOfCompany', type: 'text', attr: {ngMinlength: 4, required: true}},
                {property: 'membershipCeased', type: 'text', attr: {ngMinlength: 4, required: true}},
                {property: 'statusWhenLastSubPaid', type: 'text', attr: {ngMinlength: 4, required: true}},
                {property: 'organisation', type: 'text', attr: {ngMinlength: 4, required: true}},
                {property: 'positionOrDepartment', type: 'text', attr: {ngMinlength: 4, required: true}},
                {property: 'occupation', type: 'text', attr: {ngMinlength: 4, required: true}},
                {property: 'legalQualificationOrVocation', type: 'text', attr: {ngMinlength: 4, required: true}},
                {property: 'jurisdictions', type: 'text', attr: {ngMinlength: 4, required: true}},
                {property: 'relevantAreasOfLaw', type: 'text', attr: {ngMinlength: 4, required: true}},
                {property: 'legalResearchInterests', type: 'text', attr: {ngMinlength: 4, required: true}},
                {property: 'nonLegalTasks', type: 'text', attr: {ngMinlength: 4, required: true}},
                {property: 'otherProfessionalSpecialisms', type: 'text', attr: {ngMinlength: 4, required: true}},
                {property: 'volunteeringIntent', type: 'text', attr: {ngMinlength: 4, required: true}},
                {property: 'volunteeringCompleted', type: 'text', attr: {ngMinlength: 4, required: true}},
                {property: 'telephone', type: 'text', attr: {ngMinlength: 4, required: true}},
                {property: 'address', type: 'text', attr: {ngMinlength: 4, required: true}},
                {property: 'city', type: 'text', attr: {ngMinlength: 4, required: true}},
                {property: 'county', type: 'text', attr: {ngMinlength: 4, required: true}},
                {property: 'state', type: 'text', attr: {ngMinlength: 4, required: true}},
                {property: 'province', type: 'text', attr: {ngMinlength: 4, required: true}},
                {property: 'postcodeORzipCode', type: 'text', attr: {ngMinlength: 4, required: true}},
                {property: 'country', type: 'text', attr: {ngMinlength: 4, required: true}}

            ];

            $scope.options = {
                validation: {
                    enabled: true,
                    showMessages: true
                },
                layout: {
                    type: 'basic',
                    labelSize: 3,
                    inputSize: 9
                }
            };

            $scope.genders = {
                0: 'Male',
                1: 'Female'
            };

            $scope.genderCheck = {
                0: 'No',
                1: 'Yes'
            };

            $scope.toggleValidation = function () {
                $scope.options.validation.enabled = !$scope.options.validation.enabled;
            };

            $scope.togglePopovers = function () {
                $scope.options.validation.showMessages = !$scope.options.validation.showMessages;
            };

            $scope.toggleHorizontal = function () {
                $scope.options.layout.type = $scope.options.layout.type == 'horizontal' ? 'basic' : 'horizontal';
            };

            $scope.addField = function () {
                console.log("hello add field")
                $scope.schema.push({property: 'new' + (new Date().getTime()), label: 'New Field'});
            };

            $scope.join = function () {
                if (!$scope.joinForm.$valid) return;
                var Entities = $resource('/api/entities');
                Entities.save($scope.user, function () {//save function is native??.
                    //$location.path('/');
                });
                $log.info($scope.user);
                alert('You\'ve joined!\n\nSee console for additional info.');
            };
            $scope.delete = function () {
                Entities.delete({id: $routeParams.id}, function (user) {//where is delete coming from??
                    $location.path('/');
                });
            }
        }])

    .directive('confirmPassword', [function () {
        return {
            restrict: 'A',
            require: 'ngModel',
            link: function (scope, element, attrs, ngModel) {
                var validate = function (viewValue) {
                    var password = scope.$eval(attrs.confirmPassword);
                    ngModel.$setValidity('match', ngModel.$isEmpty(viewValue) || viewValue == password);
                    return viewValue;
                };
                ngModel.$parsers.push(validate);
                scope.$watch(attrs.confirmPassword, function (value) {
                    validate(ngModel.$viewValue);
                })
            }
        }
    }]);

app.controller('E6', function ($scope) {
    console.log("hello world")
});