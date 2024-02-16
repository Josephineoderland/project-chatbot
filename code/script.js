// DOM selectors (variables that point to selected DOM elements) goes here 👇
const chat = document.getElementById("chat");
const input = document.getElementById("name-input");
const form = document.getElementById("name-form");
const sendSound = new Audio("assets/send-message.mp3");
const receiveSound = new Audio("assets/receiving.mp3");
let values = {};
// Functions goes here 👇

// A function that will add a chat bubble in the correct place based on who the sender is
const showMessage = (message, sender) => {
  // The if statement checks if the sender is the user and if that's the case it inserts
  // an HTML section inside the chat with the posted message from the user
  if (sender === "user") {
    sendSound.play();
    console.log("Message handled by user:", message);
    chat.innerHTML += `
      <section class="user-msg">
        <div class="bubble user-bubble">
          <p>${message}</p>
        </div>
        <img src="assets/user.png" alt="User" />  
      </section>
    `;
    // The else if statement checks if the sender is the bot and if that's the case it inserts
    // an HTML section inside the chat with the posted message from the bot
  } else if (sender === "bot") {
    receiveSound.play();
    console.log("Message handled by bot:", message);
    chat.innerHTML += `
      <section class="bot-msg">
        <img src="assets/bot.png" alt="Bot" />
        <div class="bubble bot-bubble">
          <p>${message}</p>
        </div>
      </section>
    `;
  }

  // This little thing makes the chat scroll to the last message when there are too many to
  // be shown in the chat box
  chat.scrollTop = chat.scrollHeight;
};

function getInput() {
  const value = input.value;
  showMessage(value, "user");
  input.value = "";
  return value;
}

// A function to start the conversation
const greetUser = () => {
  showMessage("Hello there, what´s your name?", "bot");
  receiveSound.play();
};

// Eventlisteners goes here 👇
const handleNameInput = (event) => {
  event.preventDefault();
  // Store the value in a variable so we can access it after we
  // clear it from the input
  const name = getInput();
  values["name"] = name;
  // showMessage(`Welcome ${name}!`, "bot");
  setTimeout(showMessage, 1000, `Welcome ${name}!`, "bot");
  //tar bort så att inte boten frågar igen om namn
  event.target.removeEventListener("submit", handleNameInput);
  setTimeout(askAge, 2000);
};
//att den frågar om namnet o går vidare till nästa
function askName() {
  form.addEventListener("submit", handleNameInput);
}
// event.target.removeEventListener("submit", handleNameInput);
// After 1 second, show the next question by invoking the next function.
// passing the name into it to have access to the user's name if we want
// to use it in the next question from the bot.
// const askNextQuestion = () => {
// };

const handleAgeInput = (event) => {
  event.preventDefault();
  const age = getInput();
  values["age"] = age;
  event.target.removeEventListener("submit", handleAgeInput);
  // Kontrollera om age är en siffra och inte är en tom sträng
  if (!isNaN(age) && age.trim() !== "") {
    setTimeout(askGender, 2000);
    // Visa ett felmeddelande om åldern inte är en siffra
  } else {
    showMessage("Please enter a valid age (numeric value).", "bot");
    setTimeout(askAge, 1000);
    // När din chattbot är klar med att skriva
  }
};
function askAge() {
  showMessage(`How old are you?`, "bot");
  form.addEventListener("submit", handleAgeInput);
}

const handleGenderInput = (event) => {
  event.preventDefault();
  const gender = getInput();
  values["gender"] = gender;
  event.target.removeEventListener("submit", handleGenderInput);
  setTimeout(askHairColor, 2000);
};
function askGender() {
  showMessage(`What's your gender?`, "bot");
  form.addEventListener("submit", handleGenderInput);
}
const hairInput = (event) => {
  event.preventDefault();
  const hair = getInput();
  values["hair"] = hair;
  event.target.removeEventListener("submit", hairInput);
  setTimeout(askSport, 2000);
};
function askHairColor() {
  showMessage(`What's your hair color?`, "bot");
  form.addEventListener("submit", hairInput);
}
const sportInput = (event) => {
  event.preventDefault();
  const sport = getInput();
  values["sport"] = sport;
  event.target.removeEventListener("submit", sportInput);
  setTimeout(printFinal, 2000);
};
function askSport() {
  showMessage(`Do you practice any sports?`, "bot");
  form.addEventListener("submit", sportInput);
}

function printFinal() {
  showMessage(
    `OK! This is what I know about you. your name is ${values["name"]}, you are ${values["age"]} years old, your gender is ${values["gender"]}, you have ${values["hair"]} hair and you practice ${values["sport"]}.`,
    "bot"
  );
  console.log(values);
}

// Here we invoke the first function to get the chatbot to ask the first question when
// the website is loaded. Normally we invoke functions like this: greeting()
// To add a little delay to it, we can wrap it in a setTimeout (a built in JavaScript function):
// and pass along two arguments:
// 1.) the function we want to delay, and 2.) the delay in milliseconds
// This means the greeting function will be called one second after the website is loaded.
setTimeout(2000);
setTimeout(greetUser, 600);

askName();
