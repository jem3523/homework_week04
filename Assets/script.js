var fullContainer = document.querySelector("#fullContainer");
var row01 = document.querySelector("#row01");
var row02 = document.querySelector("#row02");
var row03 = document.querySelector("#row03");
var row01col01 = document.querySelector("#row01col01");
var row02col01 = document.querySelector("#row02col01");
var row03col01 = document.querySelector("#row03col01");
var status = "ready";
var score = 0;
var timeStart = 0;
var timeRemaining = 0;
var quizLength = questions.length;
var questionTime = 10;


function buildStartPage()
{
  if(status == "resultsStarted")
  {
    document.querySelector("#resultsTitle").remove();
    document.querySelector("#resultsPara").remove();
    document.querySelector("#resultsForm").remove();
    document.querySelector("#resultsInput").remove();
    document.querySelector("#resultsBtn").remove();
  };

  var quizTitle = document.createElement("h5");
  quizTitle.textContent = "My Quiz";
  quizTitle.setAttribute("id", "quizTitle");
  quizTitle.setAttribute("class", "myPurple text-center");
  row01col01.append(quizTitle);

  var quizInstr = document.createElement("p");
  quizInstr.textContent = "Try to answer the following questions within the time limit. Keep in mind that the incorrect answers will penalize your scoretime by ten seconds!";
  quizInstr.setAttribute("id", "quizInstr");
  quizInstr.setAttribute("class", "text-center")
  row02col01.append(quizInstr);

  var quizBntCenter = document.createElement("div");
  quizBntCenter.setAttribute("id", "quizBntCenter");
  quizBntCenter.setAttribute("class", "text-center")
  row03col01.append(quizBntCenter);

  var startBnt = document.createElement("button");
  startBnt.textContent = "Start Quiz";
  startBnt.setAttribute("id", "startButton");
  startBnt.setAttribute("class", "myPurple")
  quizBntCenter.append(startBnt);

  document.querySelector("#startButton").addEventListener("click", startQuiz);
  status = "appStarted";
}


function startQuiz (event)
{  
  timeStart = quizLength * questionTime;
  timeRemaining = 0;
  questionRender();
  status = "quizStarted";
};


function questionRender()
{
  if(status == "appStarted")
  {
    document.querySelector("#startButton").remove();
    document.querySelector("#quizTitle").remove();
    document.querySelector("#quizInstr").remove();
    document.querySelector("#quizBntCenter").remove();
  }

  if(status == "quizStarted")
    { 
      document.querySelector("#qStem").remove();
      document.querySelector("#qResponse").remove();
      document.querySelector("#optionBucket").remove();
  
      for (n=1;n>4;n++)
      //research j<questions[i].choices.length
      {
        document.querySelector("#optionRow0[n]").remove();
        document.querySelector("#optionCol0[n]").remove();
        document.querySelector("#optionBtn0[n]").remove();
      }
    };

  for (i=0; i<questions.length; i++)
  {
    if (questions[i].used == false) 
    {
      var qStem = document.createElement("h5");
      qStem.textContent = questions[i].title;
      qStem.setAttribute("id", "qStem");
      row01col01.append(qStem);

      var qResponse = document.createElement("div");
      qResponse.setAttribute("id", "qResponse");
      qResponse.setAttribute("class", "invisible");
      row03col01.append(qResponse);

      var optionBucket = document.createElement("div");
      optionBucket.setAttribute("id", "optionBucket");
      optionBucket.setAttribute("class", "container m-0 p-0")
      row02col01.append(optionBucket); 

      for (j=0; j<4; j++)
      //research j<questions[i].choices.length
      {
        var optionRow = document.createElement("div");
        optionRow.setAttribute("class", "row m-2");
        optionRow.setAttribute("id","optionRow0"+[j]);
        optionBucket.append(optionRow);

        var optionCol = document.createElement("div");
        optionCol.setAttribute("class", "col m-0 pl-3");
        optionCol.setAttribute("id","optionCol0"+[j]);
        optionRow.append(optionCol);

        var qOption = document.createElement("button");
        qOption.textContent = [j+1] + ". " + questions[i].choices[j];
        qOption.setAttribute("class","btn optionButton");
        qOption.setAttribute("id","optionBtn0"+[j]);

        if (questions[i].choices[j] == questions[i].answer)
          {qOption.setAttribute("x","true")}
        else {qOption.setAttribute("x","false")};
        optionCol.append(qOption);

        var startButton = document.querySelector("#startButton");
        var optionBucket = document.querySelector("#optionBucket");
        optionBucket.addEventListener("click", selectOption);
        questions[i].used = true;
      }
      return;    
    }
  }
  resultsRender();
}

function resultsRender()
{
  status = "resultsStarted";
  
  var resultsTitle = document.createElement("h5");
  resultsTitle.textContent = "All done!";
  resultsTitle.setAttribute("id", "resultsTitle");
  resultsTitle.setAttribute("class", "myPurple text-center");
  row01col01.append(resultsTitle);

  var resultsPara = document.createElement("p");
  resultsPara.textContent = "Your final score is " + score + ".";
  resultsPara.setAttribute("id", "resultsPara");
  resultsPara.setAttribute("class", "text-center")
  row02col01.append(resultsPara);

  var resultsForm = document.createElement("form");
  resultsForm.innerHTML = "Enter your initials: ";
  resultsForm.setAttribute("id", "resultsForm");
  row03col01.append(resultsForm);

  var resultsInput = document.createElement("input");
  resultsInput.setAttribute("type", "text");
  resultsInput.setAttribute("name", "userInitials");
  resultsInput.setAttribute("id", "resultsInput");
  resultsForm.append(resultsInput);

  var resultsBtn = document.createElement("input");
  resultsBtn.setAttribute("type", "button");
  resultsBtn.setAttribute("value", "Submit");
  resultsBtn.setAttribute("class", "myPurple pl-2");
  resultsBtn.setAttribute("id", "resultsBtn");
  resultsForm.append(resultsBtn);

  var resultsBtn = document.querySelector("#resultsBtn");
  resultsBtn.addEventListener("click", resultSubmit);
}


function selectOption(event)
{
  event.preventDefault();
  if(event.target.matches("button")) 
  {
    qResponse.setAttribute("class", "visible mt-3 pt-2 border-top");
    if (event.target.attributes.x.nodeValue == "true")
      {
        qResponse.textContent = "Correct!";
        score++;
      }
    else
      {
        qResponse.textContent = "Wrong!";
        score--;
      };
  }
  setTimeout(questionRender, 1000);
}

function resultSubmit ()
{
  alert("jump to the the high score page");
}

document.addEventListener("DOMContentLoaded",buildStartPage);
//userClearsScores.addEventListener("click", clearScores);

