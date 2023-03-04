window.onload = () => {
    let loading = document.querySelector(".over-lay");
    fadeOut(loading);
}
// get all selectors
let myOptionBox = document.querySelector(".optionBox");
let allLevels = document.querySelector(".levelsName");
let allLevelsSpan = document.querySelectorAll(".levelsName span");
let myGear = document.querySelector(".gear");
let startButton = document.querySelector(".start");
let levelNameSpan = document.querySelector(".message .lvl");
let secondsSpan = document.querySelector(".message .seconds");
let theWord = document.querySelector(".the-word");
let upconingWords = document.querySelector(".upconing-word");
let input = document.querySelector(".input");
let timeLeftSpan = document.querySelector(".time span");
let scoreGet = document.querySelector(".score .get");
let scoreTotal = document.querySelector(".score .total");

// all words 
const words = {
    "Easy": ["Hello", "Code", "Town"],
    "Normal": ["Linkedin", "Country", "Youtube", "Twitter", "Testing"],
    "Hard": ["Javascript", "Programming", "Leetcode"]
};
// get lenght of my level array from local if found else get the default
let length = words[localStorage.getItem("levelName") ? localStorage.getItem("levelName") : "Normal"].length;

//levels
const level = {
    "Easy": 5,
    "Normal": 3,
    "Hard": 2
};
let defaultLevelName = "Normal";
let defaultLevelSeconds = level[defaultLevelName];
// if you have value in local storage
if (window.localStorage.getItem("levelName")) {
     defaultLevelName = window.localStorage.getItem("levelName");
     defaultLevelSeconds = level[defaultLevelName];
} 
   

//start option box
// show and hide option box
myGear.onclick = () => {
    allLevels.classList.toggle("hide");
}
// select level name
document.addEventListener("click", (e) => {
    if (e.target.classList.contains("easy") || e.target.classList.contains("normal") || e.target.classList.contains("hard")) {
        defaultLevelName = e.target.innerHTML;
        defaultLevelSeconds = level[defaultLevelName];
        window.localStorage.setItem("levelName", defaultLevelName);
        location.reload();
    };
});

// set alldata to mypage
levelNameSpan.innerHTML = defaultLevelName;
secondsSpan.innerHTML = defaultLevelSeconds;
timeLeftSpan.innerHTML = defaultLevelSeconds;
scoreTotal.innerHTML = length;

// disable paste event
input.onpaste = () => false;

// get my array from object if found in local storage else use default
let myArray;
let levelNameStorage = localStorage.getItem("levelName");
if (levelNameStorage) {
     myArray = words[levelNameStorage];
} else {
     myArray = words["Normal"];
}

// startbutton game
startButton.onclick = ()=> {
    startButton.remove();
    input.focus();
    getWords();
}

function getWords() {
    let randomWord = myArray[Math.floor(Math.random() * myArray.length)];
    let wordIndex = myArray.indexOf(randomWord);
    // add 3 seconds to time in the first word only
    if (myArray.length === length) {
        timeLeftSpan.innerHTML = defaultLevelSeconds +3;
    }
    // remove the word from the array 
    myArray.splice(wordIndex, 1);
    theWord.innerHTML = randomWord;
    // empty uocomming word
    upconingWords.innerHTML = " ";
    // add all words in upcomming word
    for (let i = 0; i < myArray.length; i++) {
        let div = document.createElement("div");
        let text = document.createTextNode(myArray[i])
        div.appendChild(text)
        upconingWords.appendChild(div);
    }
    play();
}
// faunction make count down and check the word to show results
function play() {
    let starts = setInterval(() => {
        timeLeftSpan.innerHTML--;
        if (timeLeftSpan.innerHTML === "0") {
            clearInterval(starts);
            if (theWord.innerHTML.toLowerCase() === input.value.toLowerCase()) {
                input.value = "";
                scoreGet.innerHTML++;
                if (myArray.length > 0) {
                    timeLeftSpan.innerHTML = defaultLevelSeconds;
                    getWords();
                } else {
                    Swal.fire({
                        icon: 'success',
                        title: 'Excellent',
                        text: ` Your Score Is ${length} From ${length}`
                    })
                }
            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'Game Over',
                    text: ` Your Score Is ${scoreGet.innerHTML} From ${length}`
               })
            }
        }
    }, 1000);
};
//function to make fade out to loading 
function fadeOut(element) { 
    let fade = setInterval(() => {
        if (element.style.opacity <= 0) {
            element.remove();
            clearInterval(fade);
        }
        element.style.opacity-=0.1;
    }, 1000);
 }