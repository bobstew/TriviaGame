//Global variables


var starting;
var htmlInfo;
var counter = 20;
var questions = ["What was the nickname of the 1991 freshman basketball recruiting class?", 
				"What was the last year Michigan football won the national championship?", 
				"Who was the Michigan football coach after Lloyd Carr?",
				"Who was the last Michigan football player to win the Heisman trophy?",
				"Why is Tom Brady so awesome?",
				"What is the nickname of the Michigan football stadium?",
				"In what Michigan city is the university located?",
				"Who is the current coach of the Michigan football team?"
				];
var answers = [["The Fab Five", "The Fabolous Freshman", "Mighty Michiganders", "The Force"],
				["1999", "2007", "2014", "1997"],
				["John Harbaugh" , "Brady Hoke", "Bo Schembechler", "Rich Rodriguez"],
				["Desmond Howard", "Tom Brady", "Charles Woodson", "Anthony Thomas"],
				["Best NFL QB ever", "Hot wife", "6 superbowl wins", "all the above"],
				["football town", "The Big House", "Michigan Stadium", "The Big One"],
				["Ann Arbor", "Detroit", "Lansing", "Flint"],
				["Brady Hoke", "Nick Saban", "Don Brown", "Jim Harbaugh"]];
var images = ["<img class='center-block img-right' src='assets/images/1.jpg'>",
			"<img class='center-block img-right' src='assets/images/2.jpg'>",
			"<img class='center-block img-right' src='assets/images/3.jpg'>",
			"<img class='center-block img-right' src='assets/images/4.jpg'>",
			"<img class='center-block img-right' src='assets/images/5.jpg'>",
			"<img class='center-block img-right' src='assets/images/6.jpg'>",
			"<img class='center-block img-right' src='assets/images/7.jpg'>",
			"<img class='center-block img-right' src='assets/images/8.jpg'>"];
var correctAnswers = ["A. The Fab Five",
					 "D. 1997",
					 "D. Rich Rodriguez",
					 "C. Charles Woodson",
					 "D. all the above",
					 "B. The Big House",
					 "A. Ann Arbor",
					 "D. Jim Harbaugh"];
var questionCounter = 0;
var selecterAnswer;
var clock;
var right = 0;
var wrong = 0;



$(document).ready(function() {
// Create start button and initialize

function initialize() {
	starting = "<p class='text-center main-button-container'><a class='btn btn-primary btn-lg btn-block start-button' href='#' role='button'>Start Quiz</a></p>";
	$(".mainArea").html(starting);
}

initialize();

//create function to generate html seen

$("body").on("click", ".start-button", function(event){
	event.preventDefault();  // added line to test issue on GitHub Viewer
	
	htmlGenerated();

	timerFunct();

}); // Closes start-button click

$("body").on("click", ".answer", function(event){
	//create conditions for right answr
	
	selectedAnswer = $(this).text();
	if(selectedAnswer === correctAnswers[questionCounter]) {
		

		clearInterval(clock);
		win();
	}
	else {
		//create condition for wrong answr
		clearInterval(clock);
		lose();
	}
}); 

$("body").on("click", ".reset-button", function(event){
	
	reset();
}); // Closes reset-button 

});  //  Closes jQuery

function timeOut() {

	//time out loss
	wrong++
	htmlInfo = "<p class='text-center timer-p'>Time Remaining: <span class='timer'>" + counter + "</span></p>" + "<p class='text-center'>You ran out of time!  The correct answer was: " + correctAnswers[questionCounter] + "</p>" + "<img class='center-block img-wrong' src='assets/images/x.png'>";
	$(".mainArea").html(htmlInfo);
	setTimeout(wait, 3000);  
}
//register win

function win() {
	right++;
	htmlInfo = "<p class='text-center timer-p'>Time Remaining: <span class='timer'>" + counter + "</span></p>" + "<p class='text-center'>Correct! The answer is: " + correctAnswers[questionCounter] + "</p>" + images[questionCounter];
	$(".mainArea").html(htmlInfo);
	setTimeout(wait, 3000);  
}
//register loss

function lose() {
	wrong++;
	htmlInfo = "<p class='text-center timer-p'>Time Remaining: <span class='timer'>" + counter + "</span></p>" + "<p class='text-center'>Wrong! The correct answer is: "+ correctAnswers[questionCounter] + "</p>" + "<img class='center-block img-wrong' src='assets/images/x.png'>";
	$(".mainArea").html(htmlInfo);
	setTimeout(wait, 3000); 
}

function htmlGenerated() {
	htmlInfo = "<p class='text-center timer-p'>Time Remaining: <span class='timer'>20</span></p><p class='text-center'>" + questions[questionCounter] + "</p><p class='first-answer answer'>A. " + answers[questionCounter][0] + "</p><p class='answer'>B. "+answers[questionCounter][1]+"</p><p class='answer'>C. "+answers[questionCounter][2]+"</p><p class='answer'>D. "+answers[questionCounter][3]+"</p>";
	$(".mainArea").html(htmlInfo);
}

function wait() {
	if (questionCounter < 7) {
	questionCounter++;
	htmlGenerated();
	counter = 20;
	timerFunct();
	}
	else {
		final();
	}
}

function timerFunct() {
	clock = setInterval(thirtySeconds, 1000);
	function thirtySeconds() {
		if (counter === 0) {
			clearInterval(clock);
			timeOut();
		}
		if (counter > 0) {
			counter--;
		}
		$(".timer").html(counter);
	}
}

function final() {
	htmlInfo = "<p class='text-center timer-p'>Time Remaining: <span class='timer'>" + counter + "</span></p>" + "<p class='text-center'>All done, here's how you did!" + "</p>" + "<p class='summary-correct'>Correct Answers: " + right + "</p>" + "<p>Wrong Answers: " + wrong + "</p>"  + "<p class='text-center reset-button-container'><a class='btn btn-primary btn-lg btn-block reset-button' href='#' role='button'>Reset The Quiz!</a></p>";
	$(".mainArea").html(htmlInfo);
}

function reset() {
	questionCounter = 0;
	right = 0;
	wrong = 0;
	
	counter = 20;
	htmlGenerated();
	timerFunct();
}


