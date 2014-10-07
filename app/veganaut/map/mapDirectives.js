(function(module) {
    'use strict';

    // TODO: not really sure how to treat tiny directives and filters like this

    module.directive('vgScoreDiffBadge', [function() {
        return {
            restrict: 'E',
            scope: {
                team: '=',
                diff: '='
            },
            controller: ['$scope', function($scope) {
                $scope.getTooltip = function() {
                    return 'location.score.explanation.scoreDiff.' +
                        (($scope.diff >= 0) ? 'positive' : 'negative');
                };
            }],
            templateUrl: '/veganaut/map/vgScoreDiffBadge.tpl.html'
        };
    }]);

    module.directive('vgTeamPointsDisplay', [function() {
        return {
            restrict: 'E',
            scope: {
                location: '='
            },
            templateUrl: '/veganaut/map/vgTeamPointsDisplay.tpl.html'
        };
    }]);

    module.directive('vgAvailablePointsBadge', [function() {
        return {
            restrict: 'E',
            scope: {
                available: '='
            },
            templateUrl: '/veganaut/map/vgAvailablePointsBadge.tpl.html'
        };
    }]);

    module.directive('vgMissionPoints', [function() {
        return {
            restrict: 'E',
            scope: {
                current: '=',
                potential: '='
            },
            templateUrl: '/veganaut/map/vgMissionPoints.tpl.html'
        };
    }]);

    module.directive('vgLocationTypeBadge', [function() {
        return {
            restrict: 'E',
            scope: {
                loc: '=location'
            },
            templateUrl: '/veganaut/map/vgLocationTypeBadge.tpl.html'
        };
    }]);

    module.filter('withSign', [function() {
        return function(value) {
            var sign = (value >= 0) ? '+' : '−'; // This is a minus sign, not a dash. Unicode, yeah
            return sign + Math.abs(value);
        };
    }]);
})(window.veganaut.mainModule);