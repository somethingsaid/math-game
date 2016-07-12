var myApp = angular.module('myApp', []);

myApp.controller('GameCtrl', ['$scope', '$timeout', function($scope, $timeout) {
    // Initialize game time at 30 seconds and countdown interval at 1000 milliseconds
    var timeLeft = 30; //
    var downInterval = 1000;
    var upInterval = [2, 1];
    var timer;
    var gameEnd = true;
    $scope.timeLeft = timeLeft;

    // Decrement every 1000 milliseconds
    $scope.countdown = function() {
        $scope.timeLeft--;
        if ($scope.timeLeft > 0) {
            timer = $timeout($scope.countdown, downInterval);
        }
        else {
            console.log("Time's up!");
            console.log("Correct / Attempts: " + $scope.numCorrect + " / " + $scope.numQuestions);
            gameEnd = true;
        }
    };

    // Start timer
    $scope.startTime =  function() {
        gameEnd = false;
        timer = $timeout($scope.countdown, downInterval);
        $scope.numQuestions = 0;
        $scope.numCorrect = 0;
        createExpression(); // start game and initialize first question
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
        gameEnd = true;
        $timeout.cancel(timer);
        $scope.timeLeft = 0;
    };

    //  Reset
    $scope.resetTime = function() {
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
                $scope.displayedExpression = a + " + " + b + " = " + expressionValues[expressionValuesIndex];
                console.log($scope.displayedExpression) // + " -----> " + expressionValuesIndex);
                break;
            case 1:
                console.log("Subtraction");
                // Evaluate correct and incorrect values
                expressionValues = [a - b, a - b + (Math.floor(Math.random() * 11) - 5)];
                expressionValuesIndex = Math.floor(Math.random() * 2);
                $scope.displayedExpression = a + " - " + b + " = " + expressionValues[expressionValuesIndex];
                console.log($scope.displayedExpression);
                break;
            case 2:
                console.log("Multiplication");
                // Evaluate correct and incorrect values
                expressionValues = [a * b, a * b + (Math.floor(Math.random() * 11) - 5)];
                expressionValuesIndex = Math.floor(Math.random() * 2);
                $scope.displayedExpression = a + " * " + b + " = " + expressionValues[expressionValuesIndex];
                console.log($scope.displayedExpression);
                break;
            case 3:
                console.log("Remainder");
                // Evaluate correct and incorrect values
                expressionValues = [a % b, a % b + (Math.floor(Math.random() * 11) - 5)];
                expressionValuesIndex = Math.floor(Math.random() * 2);
                $scope.displayedExpression = a + " % " + b + " = " + expressionValues[expressionValuesIndex];
                console.log($scope.displayedExpression);
                break;
            default:
                console.log("Default text");
        }
        $scope.numQuestions++;
    };

    // User Response
    $scope.response = function(response) {
        if (response === expressionValuesIndex) {
            if (gameEnd === false) {
                $scope.feedback = "Correct! Gain some time.";
                console.log("Correct! Gain some time."); // Gain is 1 seconds?
                $scope.timeLeft += 1;
                $scope.numCorrect++;
                createExpression();
            };
        }
        else if (response !== expressionValuesIndex) {
            if (gameEnd === false) {
                $scope.feedback = "Incorrect! Lose some time.";
                console.log("Incorrect! Lose some time."); // Loss is 2 seconds?
                $scope.timeLeft -= 2;
                createExpression();
            };
        }
        else {
            console.log("Something unexpected happened: ");
            console.log("User response: " + typeof(response) + " ; Expression Value Index: " + expressionValuesIndex);
        }
    };
}]);