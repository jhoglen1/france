
let currentQuestion = 0;
let score = 0;

function renderQuestion() {
    if (currentQuestion < questions.length) {
  return `
        <fieldset>
        
          <legend> ${questions[currentQuestion].question} </legend>
          
          <label class="answers">
          <input  type="radio" name="option" class="option"
          value="A">${questions[currentQuestion].options[0].option}</label><br>
         

          <label class="answers">
          <input type="radio" name="option" class="option"
          value="B">${questions[currentQuestion].options[1].option}</label> <br>

          <label class="answers">
          <input type="radio" name="option" class="option"
          value="C">${questions[currentQuestion].options[2].option}</label><br>

          <label class="answers">
          <input type="radio" name="option" class="option"
          value="D">${questions[currentQuestion].options[3].option}</label><br>
          
          <button id="button" class="submitAnswer"> Submit answer </button> 
          <div id="errorMessage">
          </div>
          <div class="quesnum">
            <div>Question: <span class="question">${currentQuestion + 1}</span>/10</div>
            <div>Score: <span class="score">${score}</span>/10</div>
          </div>
        </fieldset>
    `;
} else {
    renderResults();
    restartQuiz();
    $('.currentQuestion').text(10)
  }
}

function renderFeedback(){

  if (questions[currentQuestion].answer === $(".option:checked").val()){
    score ++;
    return `
          <fieldset>
            <div>
              Congratulations you got it right!
            </div>
            <button id="button" class="nextQuestion"> Next question </button> 
          </fieldset>
          `;
  }
  else{
    return `
          <fieldset>
            <div>
              You got this question wrong. <br>The answer is ${questions[currentQuestion].answer}
            </div>
            <button id="button" class="nextQuestion"> Next question </button> 
          </fieldset>
          `;

 }
  }
function startQuiz(){
  $(".quizAppForm").on("click", ".startQuiz", function(e){
    event.preventDefault()
    $(".quizAppForm").html(renderQuestion);
  });
}

function submitAnswer(){
  $(".quizAppForm").on("click", ".submitAnswer", function(e){
    e.preventDefault();

    let checkedAnswer = $(".option").is(":checked")

    if (checkedAnswer === false){
      $("#errorMessage").text("Please select an answer!");
    }
    else{
      $(".quizAppForm").html(renderFeedback);
    }
  });
}

function nextQuestion(){
  $(".quizAppForm").on("click", ".nextQuestion", function(e){
    e.preventDefault();

    currentQuestion ++;
    $(".quizAppForm").html(renderQuestion);    
  });
}
function renderResults () {
  if (score >= 0) {
    $('.quizAppForm').html(`
    
    <div class="results">
    <h3>You did Awesome!</h3>
    <p>You got ${score} / 10</p>
    <p>Try to beat your last score!</p>
    <button class="restartButton">Restart Quiz</button></div>`)
   ;
  }
}
function restartQuiz () {
  $('.quizAppForm').on('click', '.restartButton', function (event) {
    currentQuestion = 0;
     score = 0;
$(".quizAppForm").html(renderQuestion);
  }); 

}







$(startQuiz);
$(submitAnswer);
$(nextQuestion);
