$(document).ready(function () {

  var config = {
    apiKey: "AIzaSyCG3CTuWrn-KmPgBriDGtGQBaP_dvfAQv4",
    authDomain: "train-f94cf.firebaseapp.com",
    databaseURL: "https://train-f94cf.firebaseio.com",
    projectId: "train-f94cf",
    storageBucket: "train-f94cf.appspot.com",
    messagingSenderId: "309918343692"
  };
  firebase.initializeApp(config);

  var database = firebase.database();
  var audio = new Audio("assets/audio/train_whistle.mp3");

  // Button for add)ing trains
  $("#add-train-button").on("click", function (event) {
    event.preventDefault();

    // Grabs user input
    var current = moment().format("hh:mm");
    var trainName = $("#train-name-input").val().trim();
    var trainDest = $("#train-destination-input").val().trim();
    var trainStart = moment($("#train-time-input").val().trim(), "HH:mm").format("HH:mm a");
    var trainFreq = moment($("#train-frequency-input").val().trim(), "mm").format("mm");
    var formated = moment(trainStart, "hh:mm").subtract(1, "years");
    var diff = moment().diff(moment(formated), "minutes");
    var apart = diff % trainFreq;
    var away = trainFreq - apart;
    var arrival = moment().add(away, "minutes").format("hh:mm");
    console.log(arrival);

    // Creates local "temporary" object for holding employee data
    var newTrain = {
      name: trainName,
      destination: trainDest,
      start: trainStart,
      frequency: trainFreq,
      away: away,
      arrival: arrival

    };




    // Uploads train data to the database
    database.ref().push(newTrain);

    // Logs everything to console
    console.log(newTrain.name);
    console.log(newTrain.destination);
    console.log(newTrain.start);
    console.log(newTrain.frequency);
    console.log(newTrain.away);
    console.log(newTrain.arrival);

    // Alert
    audio.play();
    alert("Train successfully added");

    // Clears all of the text-boxes
    $("#train-name-input").val("");
    $("#train-destination-input").val("");
    $("#train-time-input").val("");
    $("#train-frequency-input").val("");
  });

  // 3. Create Firebase event for adding trains to the database and a row in the html when a user adds an entry
  database.ref().on("child_added", function (childSnapshot, prevChildKey) {

    console.log(childSnapshot.val());

    // Store everything into a variable.
    var trainName = childSnapshot.val().name;
    var trainDest = childSnapshot.val().destination;
    var trainStart = childSnapshot.val().start;
    var trainFreq = childSnapshot.val().frequency;
    var trainArrival = childSnapshot.val().arrival;
    var trainAway = childSnapshot.val().away;

    // Train Info
    console.log(trainName);
    console.log(trainDest);
    console.log(trainStart);
    console.log(trainFreq);
    console.log(trainArrival);
    console.log(trainAway);



    // Prettify the train start
    // var trainStartPretty = moment.unix(trainStart).format("HH:mm a");

    // Calculate the months worked using hardcore math
    // To calculate the months worked
    // var empMonths = moment().diff(moment.unix(empStart, "X"), "months");
    // console.log(empMonths);

    // Calculate the total billed rate
    // var empBilled = empMonths * empRate;
    // console.log(empBilled);

    // Add each train's data into the table
    $("#train-table > tbody").append("<tr><td>" + trainName + "</td><td>" + trainDest + "</td><td>" +
      trainFreq + " mins" + "</td><td>" + trainAway + "</td><td>" + trainArrival + "</td></tr>");
  });


});
// Example Time Math
// -----------------------------------------------------------------------------
// Assume Employee start date of January 1, 2015
// Assume current date is March 1, 2016

// We know that this is 15 months.
// Now we will create code in moment.js to confirm that any attempt we use mets this test case