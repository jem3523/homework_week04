//convert element IDs that do not get removed into var for later use
var fullContainer = document.querySelector("#fullContainer");
var timerBox = document.querySelector("#timerBox");
var row01 = document.querySelector("#row01");
var row02 = document.querySelector("#row02");
var row03 = document.querySelector("#row03");
var row01col01 = document.querySelector("#row01col01");
var row02col01 = document.querySelector("#row02col01");
var row03col01 = document.querySelector("#row03col01");
var HSclearBtn = document.querySelector("#HSclearBtn");
var HSgoBackBtn = document.querySelector("#HSgoBackBtn");
var HSrow02col01 = document.querySelector("#HSrow02col01");

//set global variables up front
var status = "ready";
var score = 0;
var timeRemaining = 0;
var quizLength = questions.length;
var questionTime = 15000;
var scoreFeedback = "waiting";

//this function builds the index page; it auto-runs on opening of window
function buildStartPage()
{
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

//this function is activated by clicking the start button; it sets the time remaining, and after rending the first question, it updates the timer
function startQuiz (event)
{  
  timeRemaining = quizLength * questionTime;
  questionRender();
  status = "quizStarted";
  console.log("time at start in miliseconds: " + timeRemaining)
  // the interval repeats every second until it is cleared
  timerID = setInterval(timerCountdown, 1000);
};

//this function is called by the interval function; it also controls the score (deduct if q is missed; add if q is correct; otherwise simple countdown)
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
  //the score must be converted back to seconds for user-friendly view
  score = timeRemaining/1000;
  timerBox.innerHTML = "Timer: " + score;
}

//this function renders each question after removing elements seen on the landing page or a previous queston
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
      //loop through in order to remove each option (research n<questions[i].choices.length)
      {
        document.querySelector("#optionRow0[n]").remove();
        document.querySelector("#optionCol0[n]").remove();
        document.querySelector("#optionBtn0[n]").remove();
      }
    };

  //cycle for each question looking to see if "used" setting in question is false. Once it gets a hit, it drops/returns, 
  //thereby only selecting one question at a time. it then builds the parts of the question.

  for (i=0; i<questions.length; i++)
  {
    if (questions[i].used == false) 
    {
      var qStem = document.createElement("h5");
      qStem.textContent = questions[i].title;
      qStem.setAttribute("id", "qStem");
      row01col01.append(qStem);

      //although this is built upfront, it is invisible until the user selects an answer
      var qResponse = document.createElement("div");
      qResponse.setAttribute("id", "qResponse");
      qResponse.setAttribute("class", "invisible");
      row03col01.append(qResponse);

      var optionBucket = document.createElement("div");
      optionBucket.setAttribute("id", "optionBucket");
      optionBucket.setAttribute("class", "container m-0 p-0")
      row02col01.append(optionBucket); 

      for (j=0; j<4; j++)
      //loop through in order to add each option (research j<questions[i].choices.length)
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

        //this is how the correct answer is marked (not realistic in the real world because it would be totally hackable)
        if (questions[i].choices[j] == questions[i].answer)
          {qOption.setAttribute("x","true");}
        else 
          {qOption.setAttribute("x","false");};

        optionCol.append(qOption);

        var startButton = document.querySelector("#startButton");
        var optionBucket = document.querySelector("#optionBucket");

        //once build, the event listerer starts for clicking the option
        optionBucket.addEventListener("click", selectOption);

        //after the question is used, it is marked so that it is not selected in the next loop
        questions[i].used = true;
      }
      return;    
    }
  }
  //when no questions are left, stop the timer and render the results
  clearInterval(timerID);
  resultsRender();
}

//this function renders the results (still on the landing page)
function resultsRender()
{
  status = "resultsStarted";
  
  //make the timer disapper, then build the elements
  timerBox.innerHTML = null;

  //this time we are looping through an array to create all the elements needed (instead of creating with unqiue sets of code)
  elementList = [
  {id:"resultsTitle", element:"h5",    eclass:"myPurple text-center", type:"",       value: "",       appendTo:"row01col01",  content:"All Done!"},
  {id:"resultsPara",  element:"p",     eclass:"text-center",          type:"",       value: "",       appendTo:"row02col01",  content:"Your final score: " + score},
  {id:"resultsForm",  element:"form",  eclass:"text-center",          type:"",       value: "",       appendTo:"row03col01",  content:""},
  {id:"formRow",      element:"div",   eclass:"row align-middle",     type:"",       value: "",       appendTo:"resultsForm", content:""},
  {id:"formCol01",    element:"div",   eclass:"col-xs-12 col-md-4",   type:"",       value: "",       appendTo:"formRow",     content:""},
  {id:"resultsInstr", element:"label", eclass:"text-center",          type:"text",   value: "",       appendTo:"formCol01",   content:"Enter your initials (limit: 3 characters):"},
  {id:"formCol02",    element:"div",   eclass:"col-xs-12 col-md-4",   type:"",       value: "",       appendTo:"formRow",     content:""},
  {id:"resultsInput", element:"input", eclass:"form-control",         type:"text",   value: "",       appendTo:"formCol02",   content:""},
  {id:"formCol03",    element:"div",   eclass:"col-xs-12 col-md-4 text-center text-md-left",   type:"",       value: "",       appendTo:"formRow",     content:""},
  {id:"resultsBtn",   element:"input", eclass:"myPurple mt-3 mt-md-1",       type:"button", value: "Submit", appendTo:"formCol03",   content:""},
  ];

  for (r=0; r<elementList.length; r++)
  {
    var tempElement = document.createElement(elementList[r].element);
    tempElement.textContent = elementList[r].content;
    tempElement.setAttribute("id", elementList[r].id);
    tempElement.setAttribute("class", elementList[r].eclass);
    tempElement.setAttribute("type", elementList[r].type);
    tempElement.setAttribute("value", elementList[r].value);
    var tempPlacement = document.querySelector("#" + elementList[r].appendTo);
    tempPlacement.append(tempElement);
  }

  var resultsBtn = document.querySelector("#resultsBtn");
  resultsBtn.addEventListener("click", resultSubmit);
}

//this function is triggered when the user selects an option; it checks for the correct answer
//then makes the response visable to the user AND send the correct/incorrect variable for scoring in the 
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
  //this timeout is set so that within one second of the response being given, the next question is rendered
  setTimeout(questionRender, 1000);
}

//this function takes the initials from the input and stores it with the final score in localstorage
function resultSubmit ()
{
  {
    var user = document.getElementById("resultsInput").value.substring(0,3);

    //first check to see if the array exists in local storage
    if (localStorage.getItem("userList") == "cleared" | localStorage.getItem("userList") == null)
      {
        //if not, even the array marks need to be included
        var userListOut = [{user: user, score: score}];
        localStorage.setItem("userList", JSON.stringify(userListOut));
      }
      else
        {
          //if so, then no need to include initial brackets for array; instead convert to object and PUSH a new entry
          var userListOut = JSON.parse(localStorage.getItem("userList"));
          userListOut.push({user: user, score: score});
          localStorage.setItem("userList", JSON.stringify(userListOut));
        };

    //this moves user to the highscore page (where it will autorun a function to build a table dynamically)
    window.location.href="./Assets/highScore.html";
  }
}

//this function builds the table of highscores stored in local storage
function builtHighScorePage()
{
  //but first check if there is any info in local storage,
  if (document.getElementById("resultsTable") !== null) 
  { 
    //if there is local storage, then there is also a table already on the page ... so remove that table
    var rowCount = document.getElementById("resultsTable").getElementsByTagName("tr");

    document.querySelector("#resultsTable").remove();

    for (n=1; n > rowCount; n++)
    {
      document.querySelector("#tableRow0" + [u+1]).remove();
      document.querySelector("#resultsCol010" + [u+1]).remove();
      document.querySelector("#resultsCol020" + [u+1]).remove();
    }
  }

  //if the localstorage has been cleared, all data is replace with on word, so either"cleared" or null should be replace with new entries
  if (localStorage.getItem("userList") == "cleared" | localStorage.getItem("userList") == null)
  {
    console.log("No stored scores.")
  }
  else 
  {
    var userListOut = JSON.parse(localStorage.getItem("userList"));
  
    //to rank the scores, the array must be sorted ... but only if there is more than one entry to sort
    if (userListOut.length > 1)
    {userListOut.sort(compare);};

    //then start building the table for the highscores pulled from local storage
    var resultsTable = document.createElement("table");
    resultsTable.setAttribute("id", "resultsTable");
    resultsTable.setAttribute("class", "table");
    HSrow02col01.append(resultsTable);


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

      var resultsCol01 = document.createElement("td");
      resultsCol01.textContent = userListOut[u].user;
      resultsCol01.setAttribute("id", "resultsCol010" + [u+1]);
      resultsCol01.setAttribute("scope", "col");
      resultsCol01.setAttribute("class", "font-weight-bold");
      resultsRow.append(resultsCol01);

      var resultsCol02 = document.createElement("td");
      resultsCol02.textContent = userListOut[u].score;
      resultsCol02.setAttribute("id", "resultsCol020" + [u+1]);
      resultsCol02.setAttribute("scope", "col");
      resultsRow.append(resultsCol02);
    }
  }
}

//this is the compare function used as part of the array sorting
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

//this function takes the entire array in local storage and replaces it with one word, then rebuilds the highscore page with no table
function clearHighScore()
{
  if (localStorage.getItem("userList") !== null)
  {localStorage.setItem("userList", "cleared")};

  builtHighScorePage();
}

//this function returns the user back to the landing page, where an auto-function rebuilds the page
function returnToIndex()
{window.location.href="../index.html"}


