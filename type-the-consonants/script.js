const wordToType = document.getElementById("wordToType");
const submitButton = document.getElementById("submit");
const reloadButton = document.getElementById("reload");
const userInput = document.getElementById("userInput");
userInput.value = "";
let words = [];


// Display new random word when clicking reload button
reloadButton.addEventListener("click", UIdisplayWord); 

// Enable submit button when user starts typing
userInput.addEventListener("keyup", enableSubmitButton);

// Validate string entered by user when clicking submit button
submitButton.addEventListener("click", validateWords);

fetchWords();

// Fetch all words from API
async function fetchWords(){
    try {
        const response = await axios.get("https://random-word-api.herokuapp.com/all");
        words = response.data;
        getNewWord();
        UIdisplayWord();
    }
    catch(e) {console.log("error!")};
};

function getNewWord(){
   const index = Math.trunc(Math.random() * (words.length - 1));
   return words[index];
};

// Display new word
function UIdisplayWord(){
   wordToType.innerText = getNewWord();
   wordToType.style.visibility = "visible";
   userInput.value = "";
   disableSubmitButton();
   enableUserInput();
};



function enableSubmitButton(){
    if (userInput.value) {
        submitButton.classList.remove("disabled");
        submitButton.classList.add("enabled");
    } else {
        disableSubmitButton();
    }
};

function animateSubmitButton(){
        submitButton.classList.add("lds-dual-ring");
        submitButton.innerText = "Checking";
        setTimeout(() => {
            submitButton.classList.remove("lds-dual-ring");
        }, 1300);
};

function disableSubmitButton(){
    submitButton.classList.remove("enabled");
    submitButton.classList.add("disabled");
    submitButton.innerText = "Submit";
    submitButton.classList.remove("success");
    submitButton.classList.remove("fail");
};

function disableUserInput(){
    userInput.classList.add("disabled");
    userInput.disabled = true;
};

function enableUserInput(){
    userInput.classList.remove("disabled");
    userInput.disabled = false;
};



// Validate string entered by user
function validateWords(){
    animateSubmitButton();
    disableUserInput();
    const fetchedWord = wordToType.innerText;

    const fetchedWordConsonants = fetchedWord
        .split("")
        .map(letter => letter.replace(/[aeiou]/g, ''))
        .join("")
        .toLowerCase();

    if (fetchedWordConsonants === userInput.value.toLowerCase()) {
        userWins();
    } else {
        userLoses();
    }
};

function userWins(){
    setTimeout(() => {
            submitButton.innerText = "Correct!";
            submitButton.classList.add("success");
        }, 1300);
    submitButton.classList.remove("enabled");
    submitButton.classList.add("disabled");
   
};

function userLoses(){
    setTimeout(() => {
            submitButton.innerText = "Incorrect!";
            submitButton.classList.add("fail");
        }, 1300);
};


