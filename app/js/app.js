var myApp = angular.module('myApp', []);

myApp.controller('GameCtrl', ['$scope', '$timeout', function($scope, $timeout) {
    // Initialize game time at 30 seconds and countdown interval at 1000 milliseconds
    var timeLeft = 30; //
    var downInterval = 1000;
    var upInterval = [2, 1];
    var timer;
    $scope.timeLeft = timeLeft;

    // Decrement every 1000 milliseconds
    $scope.countdown = function() {
        $scope.timeLeft--;
        if ($scope.timeLeft > 0) {
            timer = $timeout($scope.countdown, downInterval);
        }
        else {
            console.log("Time's up!");
            runOut = true;
        }
    };

    // Start timer
    $scope.startTime =  function() {
        timer = $timeout($scope.countdown, downInterval);
    };

    // Add time
    $scope.addTime = function() {
        if ($scope.timeLeft === 0) {
            timer = $timeout($scope.countdown, downInterval);
        };
        $scope.timeLeft += upInterval[0];
    };

    // Stop time
    $scope.zeroTime = function() {
        $timeout.cancel(timer);
        $scope.timeLeft = 0;
    };

    //  Reset
    $scope.resetTime = function() {
        if ($scope.timeLeft === 0) {
            timer = $timeout($scope.countdown, downInterval);
        };
        $scope.timeLeft = timeLeft;
    }
}]);