(function() {
    'use strict';

    var app = angular.module("app", []);

    app.factory('dealers', ['$http', function($http) {
        return $http.get('data/dealers.json')
            .success(function(data) {
                return data;
            })
            .error(function(err) {
                return err;
            });
    }]);

    app.controller('MainController', [
        '$scope', 'dealers',
        function($scope, dealers) {
            dealers.success(function(data) {
                $scope.data = data;
                // console.log($scope.data);
                $scope.filter = {
                   service: false,
                   installation: false,
                   residential: false,
                   commercial: false
                };

                // replace "-" in phone number into "."
                for(var i=0; i < $scope.data.dealers.length; i++) {
                    var s;
                    s = $scope.data.dealers[i].data.phone1.replace(/-/g, ".");
                    $scope.data.dealers[i].data.phone1 = s;
                }

                // set flags for available certifications
                for(var x=0; x < $scope.data.dealers.length; x++) {
                    $scope.data.dealers[x].data.hasCertifications = {};
                    for(var y=0; y < $scope.data.dealers[x].data.certifications.length; y++) {
                        switch ($scope.data.dealers[x].data.certifications[y]) {
                            case "Installation Pro":
                                $scope.data.dealers[x].data.hasCertifications.installation = true;
                                break;
                            case "Residential Pro":
                                $scope.data.dealers[x].data.hasCertifications.residential = true;
                                break;
                            case "Service Pro":
                                $scope.data.dealers[x].data.hasCertifications.service = true;
                                break;
                            case "Commercial Pro":
                                $scope.data.dealers[x].data.hasCertifications.commercial = true;
                                break;
                        }
                    }
                }
                // console.log($scope.data);
            });
        }
    ]);

}());