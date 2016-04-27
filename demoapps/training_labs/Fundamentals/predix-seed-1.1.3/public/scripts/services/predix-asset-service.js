/*global define */
define(['angular', 'sample-module'], function (angular, module) {
    'use strict';
    /**
     * PredixAssetService is a sample angular service that integrates with Predix Asset Server API
     */
    module.factory('PredixAssetService', ['$q', '$http', function ($q, $http) {
        /**
         * predix asset server base url
         */
        var baseUrl = 'https://predix-asset-mvp2-seed-app.grc-apps.svc.ice.ge.com/asset';

        /**
         * this method transforms asset entity into an object format consumable by px-context-browser item
         */
        var transformChildren = function (entity) { // transform your entity to context browser entity format
            return {
                name: entity.assetId, // Displayed name in the context browser
                id: entity.uri, // Unique ID (could be a URI for example)
                parentId: entity.parent, // Parent ID. Used to place the children under the corresponding parent in the browser.
                classification: entity.classification, // Classification used for fetching the views.
                isOpenable: true
            };
        };

        /**
         * this method fetch asset children by parentId
         */
        var getEntityChildren = function (parentId, options) {
            var numberOfRecords = 100;
            var deferred = $q.defer();
            var childrenUrl = baseUrl + '?pageSize=' + numberOfRecords + '&topLevelOnly=true&filter=parent=' + parentId;
            var childEntities = {
                meta: {link: ''},
                data: []
            };
            if (options && options.hasOwnProperty('link')) {
                if (options.link === '') {
                    deferred.resolve(childEntities);
                    return deferred.promise;
                }
                else {
                    //overwrite url if there is link
                    childrenUrl = options.link;
                }
            }

            $http.get(childrenUrl, {headers: {'x-tenant': 'experience_seed_app'}})
                .success(function (data, status, headers) {
                    var linkHeader = headers('Link');
                    var link = '';
                    if (data.length !== 0) {
                        if (linkHeader && linkHeader !== '') {
                            var posOfGt = linkHeader.indexOf('>');
                            if (posOfGt !== -1) {
                                link = linkHeader.substring(1, posOfGt);
                            }
                        }
                    }

                    childEntities = {
                        meta: {link: link, parentId: parentId},
                        data: data
                    };
                    deferred.resolve(childEntities);
                })
                .error(function () {
                    deferred.reject('Error fetching asset with id ' + parentId);
                });


            return deferred.promise;
        };

        /**
         * get asset by parent id
         */
        var getAssetsByParentId = function (parentId, options) {
            var deferred = $q.defer();

            getEntityChildren(parentId, options).then(function (results) {
                var transformedChildren = [];
                for (var i = 0; i < results.data.length; i++) {
                    transformedChildren.push(transformChildren(results.data[i]));
                }

                results.data = transformedChildren;

                deferred.resolve(results);

            }, function () {
                deferred.reject('Error fetching asset with id ' + parentId);
            });

            return deferred.promise;
        };

        return {
            getAssetsByParentId: getAssetsByParentId
        };
    }]);
});
