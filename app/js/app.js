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

    // Math logic
    var difficulty = [
        {
            a: 10, b: 10 // Level 0
        },
        {
            a: 10, b: 15 // Level 1
        },
        {
            a: 10, b: 20 // Level 2
        },
        {
            a: 10, b: 50 // Level 3
        },
        {
            a: 10, b: 100 // Level 4
        },
        {
            a: 20, b: 20 // Level 5
        },
        {
            a: 50, b: 300 // Level 6
        }
    ];

    var expressionDisplayType = [0, 1]; // use these as options for Correct and Incorrect display
    
    // Generate and display the expression
    var createExpression = function() {
        // Set Difficulty
        var difficultySetting = Math.floor(Math.random() * 7); 
        var a = Math.floor(Math.random() * difficulty[difficultySetting].a) + 1;
        var b = Math.floor(Math.random() * difficulty[difficultySetting].b) + 1;

        // Randomly choose between + - * /
        switch(Math.floor(Math.random() * 4)) {
            case 0:
                console.log("Addition");
                // Calculate correct and incorrect values
                expressionValues = [a + b, a + b + (Math.floor(Math.random() * 11) - 5)];
                // Will be evaluating expressionValuesIndex against $scope.response for user scoring
                expressionValuesIndex = Math.floor(Math.random() * 2);
                // Displayed expression is randomized between correct and incorrect values
                displayedExpression = a + " + " + b + " = " + expressionValues[expressionValuesIndex];
                console.log(displayedExpression) // + " -----> " + expressionValuesIndex);
                break;
            case 1:
                console.log("Subtraction");
                // Evaluate correct and incorrect values
                expressionValues = [a - b, a - b + (Math.floor(Math.random() * 11) - 5)];
                expressionValuesIndex = Math.floor(Math.random() * 2);
                displayedExpression = a + " - " + b + " = " + expressionValues[expressionValuesIndex];
                console.log(displayedExpression);
                break;
            case 2:
                console.log("Multiplication");
                // Evaluate correct and incorrect values
                expressionValues = [a * b, a * b + (Math.floor(Math.random() * 11) - 5)];
                expressionValuesIndex = Math.floor(Math.random() * 2);
                displayedExpression = a + " * " + b + " = " + expressionValues[expressionValuesIndex];
                console.log(displayedExpression);
                break;
            case 3:
                console.log("Remainder");
                // Evaluate correct and incorrect values
                expressionValues = [a % b, a % b + (Math.floor(Math.random() * 11) - 5)];
                expressionValuesIndex = Math.floor(Math.random() * 2);
                displayedExpression = a + " % " + b + " = " + expressionValues[expressionValuesIndex];
                console.log(displayedExpression);
                break;
            default:
                console.log("Default text");
        }
    };
}]);