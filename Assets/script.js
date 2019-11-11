var fullContainer = document.querySelector("#fullContainer");
var timerBox = document.querySelector("#timerBox");
var row01 = document.querySelector("#row01");
var row02 = document.querySelector("#row02");
var row03 = document.querySelector("#row03");
var row01col01 = document.querySelector("#row01col01");
var row02col01 = document.querySelector("#row02col01");
var row03col01 = document.querySelector("#row03col01");

var HSclearBtn = document.querySelector("#HSclearBtn");
var HSrow02col01 = document.querySelector("#HSrow02col01");

var status = "ready";
var score = 0;
var timeStart = 0;
var timeRemaining = 0;
var quizLength = questions.length;
var questionTime = 15000;
var scoreFeedback = "waiting";


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
  quizInstr.textContent = "Try to answer the following questions within the time limit. Keep in mind that the incorrect answers will penalize your scoretime!";
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
  timeRemaining = quizLength * questionTime;
  questionRender();
  status = "quizStarted";
  console.log("time at start: " + timeRemaining)
  timerBox.innerHTML = "Timer: " + timeRemaining;
  timerID = setInterval(timerCountdown, 1000);
};

function timerCountdown ()
{
  if (scoreFeedback == "waiting")
    {timeRemaining = timeRemaining - 1000; console.log(scoreFeedback + "/" + timeRemaining);};

  if (scoreFeedback == "incorrect")
    {timeRemaining = timeRemaining - (1000 + questionTime); console.log(scoreFeedback + "/" + timeRemaining);};  
  
  if (scoreFeedback == "correct")
    {timeRemaining = timeRemaining - 1000 + questionTime; console.log(scoreFeedback + "/" + timeRemaining);};

  scoreFeedback = "waiting";
  console.log(timeRemaining);
  score = timeRemaining/1000;
  timerBox.innerHTML = "Timer: " + score;
}

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
          {qOption.setAttribute("x","true");}
        else 
          {qOption.setAttribute("x","false");};

        optionCol.append(qOption);

        var startButton = document.querySelector("#startButton");
        var optionBucket = document.querySelector("#optionBucket");
        optionBucket.addEventListener("click", selectOption);
        questions[i].used = true;
      }
      return;    
    }
  }
  clearInterval(timerID);
  resultsRender();
}

function resultsRender()
{
  status = "resultsStarted";
  
  timerBox.innerHTML = null;

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
  resultsForm.setAttribute("class","text-center");
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
        scoreFeedback="correct";
      }
    else
      {
        qResponse.textContent = "Wrong!";
        scoreFeedback="incorrect";
      };
  }
  setTimeout(questionRender, 1000);
}

function resultSubmit ()
{
  {
    var user = document.getElementById("resultsInput").value;
  
    if (localStorage.getItem("userList") == "cleared" | localStorage.getItem("userList") == null)
      {
        var userListOut = [{user: user, score: score}];
        localStorage.setItem("userList", JSON.stringify(userListOut));
      }
      else
        {
          var userListOut = JSON.parse(localStorage.getItem("userList"));
          userListOut.push({user: user, score: score});
          localStorage.setItem("userList", JSON.stringify(userListOut));
        };

    window.location.href="./Assets/highScore.html";
  }
}

function builtHighScorePage()
{
  if (document.getElementById("resultsTable") !== null) 
  { 
    var rowCount = document.getElementById("resultsTable").getElementsByTagName("tr");

    document.querySelector("#resultsTable").remove();
    document.querySelector("#resultsTableBody").remove();

    for (n=1; n > rowCount; n++)
    {
      document.querySelector("#tableRow0" + [u+1]).remove();
      document.querySelector("#resultsCol010" + [u+1]).remove();
      document.querySelector("#resultsCol020" + [u+1]).remove();
    }
  }


  if (localStorage.getItem("userList") == "cleared" | localStorage.getItem("userList") == null)
  {
    console.log("No stored scores.")
  }
  else 
  {
    var userListOut = JSON.parse(localStorage.getItem("userList"));
  
    if (userListOut.length > 1)
    {userListOut.sort(compare);};

    var resultsTable = document.createElement("table");
    resultsTable.setAttribute("id", "resultsTable");
    resultsTable.setAttribute("class", "table table-sm table-bordered");
    HSrow02col01.append(resultsTable);

    //var resultsTableBody = document.createElement("resultsTableBody");
    //resultsTableBody.setAttribute("id", "resultsTableBody");
    //resultsTableBody.setAttribute("class", "");
    //resultsTable.append(resultsTableBody);

    if (userListOut.length < 5)
    {var tableCount = userListOut.length}
    else
    {var tableCount = 5};

    for (u = 0; u<tableCount; u++)
    {
      var resultsRow = document.createElement("tr");
      resultsRow.setAttribute("id", "tableRow0" + [u+1] );
      resultsRow.setAttribute("scope", "row");
      resultsTable.append(resultsRow);
      //resultsTableBody.append(resultsRow);

      var resultsCol01 = document.createElement("td");
      resultsCol01.textContent = userListOut[u].user;
      resultsCol01.setAttribute("id", "resultsCol010" + [u+1]);
      resultsCol01.setAttribute("scope", "col");
      resultsRow.append(resultsCol01);

      var resultsCol02 = document.createElement("td");
      resultsCol02.textContent = userListOut[u].score;
      resultsCol02.setAttribute("id", "resultsCol020" + [u+1]);
      resultsCol02.setAttribute("scope", "col");
      resultsRow.append(resultsCol02);
    }
  }
}

function compare(a, b) 
{
  const scoreA = a.score;
  const scoreB = b.score;

  let comparison = 0;
  if (scoreA < scoreB) 
    {comparison = 1;} 
  else 
  if (scoreA > scoreB) 
    {comparison = -1;}
  return comparison;
}


function clearHighScore()
{
  if (localStorage.getItem("userList") !== null)
  {localStorage.setItem("userList", "cleared")};

  builtHighScorePage();
}


function returnToIndex()
{window.location.href="../index.html"}


