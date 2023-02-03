$(document).ready(function () {

    let counter = 0;
    let points = 0;

    var correctAnswerPosition = 0;    
    $("#qcounter").html(counter);
    $("#points").html(points);

    doTheFetch();


    

    $("button").click(function (e) { 
        e.preventDefault();
        if ($(this).attr("id").endsWith(correctAnswerPosition + 1)) {
            points++;
            $("#points").html(points);
            $(this).css("background-color", "green");
            setTimeout(function(){
                alert("Correct!");
                $("button").css("background-color", "white");
            doTheFetch();
            }, 100)
            
        } else {
            $(this).css("background-color", "red");
            points--;
            $("#points").html(points);
        }
        
    });

    console.log(Math.floor(Math.random() * 4));


    function doTheFetch() {
        fetch("https://opentdb.com/api.php?amount=1&type=multiple", {method: "GET"})
    .then(response=>response.json())
    .then(data=>{
        console.log(data);
        $("#category").html(data.results[0].category);
        $("#difficulty").html(data.results[0].difficulty);
        $("#question").html(data.results[0].question);

        correctAnswerPosition = Math.floor(Math.random() * 4);
        console.log(correctAnswerPosition);
        let incorrectCount = 0;


        
        for (var i = 0; i < 4; i++) {
            if (i == correctAnswerPosition) {
                $("#option" + (correctAnswerPosition+1)).html(data.results[0].correct_answer);
            } else {
                $("#option" + (i+1)).html(data.results[0].incorrect_answers[incorrectCount]);
                incorrectCount++;
            }
        }

        counter++;
        $("#qcounter").html(counter);

    });

    }




});