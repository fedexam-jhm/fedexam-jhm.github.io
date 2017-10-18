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
                $scope.certifiedDealers = {
                    service: [],
                    installation: [],
                    residential: [],
                    commercial: []
                };
                $scope.filterNum = $scope.data.dealers.length;

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
                                $scope.certifiedDealers.installation.push($scope.data.dealers[x].data.companyID);
                                break;
                            case "Residential Pro":
                                $scope.data.dealers[x].data.hasCertifications.residential = true;
                                $scope.certifiedDealers.residential.push($scope.data.dealers[x].data.companyID);
                                break;
                            case "Service Pro":
                                $scope.data.dealers[x].data.hasCertifications.service = true;
                                $scope.certifiedDealers.service.push($scope.data.dealers[x].data.companyID);
                                break;
                            case "Commercial Pro":
                                $scope.data.dealers[x].data.hasCertifications.commercial = true;
                                $scope.certifiedDealers.commercial.push($scope.data.dealers[x].data.companyID);
                                break;
                        }
                    }
                }
                // console.log($scope.data);
                // console.log($scope.certifiedDealers);

                $scope.filterCounter = function() {
                    var filtered, i;
                    if($scope.filter.service && !$scope.filter.installation && !$scope.filter.residential && $scope.filter.commercial) {
                        filtered = [];
                        filtered = filtered.concat($scope.certifiedDealers.service);
                        for(i=0;i < $scope.certifiedDealers.commercial.length;i++) {
                            if(filtered.indexOf($scope.certifiedDealers.commercial[i]) === -1) {
                                filtered.push($scope.certifiedDealers.commercial[i]);
                            }
                        }
                        $scope.filterNum = filtered.length;
                    }
                    else if($scope.filter.service && !$scope.filter.installation && $scope.filter.residential && $scope.filter.commercial) {
                        filtered = [];
                        filtered = filtered.concat($scope.certifiedDealers.service);
                        for(i=0;i < $scope.certifiedDealers.commercial.length;i++) {
                            if(filtered.indexOf($scope.certifiedDealers.commercial[i]) === -1) {
                                filtered.push($scope.certifiedDealers.commercial[i]);
                            }
                        }
                        for(i=0;i < $scope.certifiedDealers.residential.length;i++) {
                            if(filtered.indexOf($scope.certifiedDealers.residential[i]) === -1) {
                                filtered.push($scope.certifiedDealers.residential[i]);
                            }
                        }
                        $scope.filterNum = filtered.length;
                    }
                    else if($scope.filter.service && $scope.filter.installation && $scope.filter.residential && $scope.filter.commercial) {
                        filtered = [];
                        filtered = filtered.concat($scope.certifiedDealers.service);
                        for(i=0;i < $scope.certifiedDealers.commercial.length;i++) {
                            if(filtered.indexOf($scope.certifiedDealers.commercial[i]) === -1) {
                                filtered.push($scope.certifiedDealers.commercial[i]);
                            }
                        }
                        for(i=0;i < $scope.certifiedDealers.residential.length;i++) {
                            if(filtered.indexOf($scope.certifiedDealers.residential[i]) === -1) {
                                filtered.push($scope.certifiedDealers.residential[i]);
                            }
                        }
                        for(i=0;i < $scope.certifiedDealers.installation.length;i++) {
                            if(filtered.indexOf($scope.certifiedDealers.installation[i]) === -1) {
                                filtered.push($scope.certifiedDealers.installation[i]);
                            }
                        }
                        $scope.filterNum = filtered.length;
                    }
                    else if($scope.filter.service && $scope.filter.installation && $scope.filter.residential && !$scope.filter.commercial) {
                        filtered = [];
                        filtered = filtered.concat($scope.certifiedDealers.service);
                        for(i=0;i < $scope.certifiedDealers.residential.length;i++) {
                            if(filtered.indexOf($scope.certifiedDealers.residential[i]) === -1) {
                                filtered.push($scope.certifiedDealers.residential[i]);
                            }
                        }
                        for(i=0;i < $scope.certifiedDealers.installation.length;i++) {
                            if(filtered.indexOf($scope.certifiedDealers.installation[i]) === -1) {
                                filtered.push($scope.certifiedDealers.installation[i]);
                            }
                        }
                        $scope.filterNum = filtered.length;
                    }
                    else if($scope.filter.service && $scope.filter.installation && !$scope.filter.residential && !$scope.filter.commercial) {
                        filtered = [];
                        filtered = filtered.concat($scope.certifiedDealers.service);
                        for(i=0;i < $scope.certifiedDealers.installation.length;i++) {
                            if(filtered.indexOf($scope.certifiedDealers.installation[i]) === -1) {
                                filtered.push($scope.certifiedDealers.installation[i]);
                            }
                        }
                        $scope.filterNum = filtered.length;
                    }
                    else if($scope.filter.service && !$scope.filter.installation && !$scope.filter.residential && !$scope.filter.commercial) {
                        filtered = [];
                        filtered = filtered.concat($scope.certifiedDealers.service);
                        $scope.filterNum = filtered.length;
                    }
                    //
                    if(!$scope.filter.service && $scope.filter.installation && !$scope.filter.residential && $scope.filter.commercial) {
                        filtered = [];
                        filtered = filtered.concat($scope.certifiedDealers.installation);
                        for(i=0;i < $scope.certifiedDealers.commercial.length;i++) {
                            if(filtered.indexOf($scope.certifiedDealers.commercial[i]) === -1) {
                                filtered.push($scope.certifiedDealers.commercial[i]);
                            }
                        }
                        $scope.filterNum = filtered.length;
                    }
                    else if(!$scope.filter.service && $scope.filter.installation && $scope.filter.residential && $scope.filter.commercial) {
                        filtered = [];
                        filtered = filtered.concat($scope.certifiedDealers.installation);
                        for(i=0;i < $scope.certifiedDealers.commercial.length;i++) {
                            if(filtered.indexOf($scope.certifiedDealers.commercial[i]) === -1) {
                                filtered.push($scope.certifiedDealers.commercial[i]);
                            }
                        }
                        for(i=0;i < $scope.certifiedDealers.residential.length;i++) {
                            if(filtered.indexOf($scope.certifiedDealers.residential[i]) === -1) {
                                filtered.push($scope.certifiedDealers.residential[i]);
                            }
                        }
                        $scope.filterNum = filtered.length;
                    }
                    else if(!$scope.filter.service && $scope.filter.installation && $scope.filter.residential && !$scope.filter.commercial) {
                        filtered = [];
                        filtered = filtered.concat($scope.certifiedDealers.installation);
                        for(i=0;i < $scope.certifiedDealers.residential.length;i++) {
                            if(filtered.indexOf($scope.certifiedDealers.residential[i]) === -1) {
                                filtered.push($scope.certifiedDealers.residential[i]);
                            }
                        }
                        $scope.filterNum = filtered.length;
                    }
                    //
                    if(!$scope.filter.service && !$scope.filter.installation && $scope.filter.residential && $scope.filter.commercial) {
                        filtered = [];
                        filtered = filtered.concat($scope.certifiedDealers.residential);
                        for(i=0;i < $scope.certifiedDealers.commercial.length;i++) {
                            if(filtered.indexOf($scope.certifiedDealers.commercial[i]) === -1) {
                                filtered.push($scope.certifiedDealers.commercial[i]);
                            }
                        }
                        $scope.filterNum = filtered.length;
                    }
                    else if($scope.filter.service && !$scope.filter.installation && $scope.filter.residential && !$scope.filter.commercial) {
                        filtered = [];
                        filtered = filtered.concat($scope.certifiedDealers.residential);
                        for(i=0;i < $scope.certifiedDealers.service.length;i++) {
                            if(filtered.indexOf($scope.certifiedDealers.service[i]) === -1) {
                                filtered.push($scope.certifiedDealers.service[i]);
                            }
                        }
                        $scope.filterNum = filtered.length;
                    }
                    //
                    else if($scope.filter.service && !$scope.filter.installation && !$scope.filter.residential && !$scope.filter.commercial) {
                        filtered = [];
                        filtered = filtered.concat($scope.certifiedDealers.service);
                        $scope.filterNum = filtered.length;
                    }
                    else if(!$scope.filter.service && $scope.filter.installation && !$scope.filter.residential && !$scope.filter.commercial) {
                        filtered = [];
                        filtered = filtered.concat($scope.certifiedDealers.installation);
                        $scope.filterNum = filtered.length;
                    }
                    else if(!$scope.filter.service && !$scope.filter.installation && $scope.filter.residential && !$scope.filter.commercial) {
                        filtered = [];
                        filtered = filtered.concat($scope.certifiedDealers.residential);
                        $scope.filterNum = filtered.length;
                    }
                    else if(!$scope.filter.service && !$scope.filter.installation && !$scope.filter.residential && $scope.filter.commercial) {
                        filtered = [];
                        filtered = filtered.concat($scope.certifiedDealers.commercial);
                        $scope.filterNum = filtered.length;
                    }
                    else if(!$scope.filter.service && !$scope.filter.installation && !$scope.filter.residential && !$scope.filter.commercial) {
                        $scope.filterNum = $scope.data.dealers.length;
                    }
                };
            });
        }
    ]);

}());