// Declaring the close button factory
const addCloseButton = (element) => {
  // Creating "x" button! 
  const span = document.createElement("SPAN");
  const txt = document.createTextNode("\u00D7");
  span.className = "close";
  span.appendChild(txt);
  element.appendChild(span)

  // and adding a click listener to it so it can dismiss its parent
  span.addEventListener('click', (e) => {
    console.log(e)
    const parentElement = e.target.parentElement

    parentElement.style.display = 'none'
  })
}

// Declaring a factory to add click event listener that will check or uncheck the element
const addCheckedListener = (element) => {
  element.addEventListener('click', () => {
    element.classList.toggle('checked')
  })
}

const staticListElements = document.querySelectorAll('li')

staticListElements.forEach(listElement => {
  addCloseButton(listElement)
  addCheckedListener(listElement)

})

// Create a new list item when clicking on the "Add" button
function newElement() {
  let li = document.createElement("li");
  let inputValue = document.getElementById("myInput").value;
  let t = document.createTextNode(inputValue);
  li.appendChild(t);
  if (inputValue === '') {
    alert("You must write something!");
  } else {
    document.getElementById("myUL").appendChild(li);
  }
  document.getElementById("myInput").value = "";

  addCloseButton(li)
  addCheckedListener(li)

/*   for (i = 0; i < close.length; i++) {
    console.log('asdas')
    close[i].onclick = function() {
      console.log('working')
      let div = this.parentElement;
      div.style.display = "none";
    }
  } */
/* 
   var x = document.getElementById("hidden");
    if (x.style.display === "none") {
      x.style.display = "block";
    } else {
      x.style.display = "none";
    } */
  
}





// Create a "close" button and append it to each list item
/*
const myNodeList = document.querySelectorAll("LI"); //
for (i = 0; i < myNodeList.length; i++) {
  let span = document.createElement("SPAN");
  let txt = document.createTextNode("\u00D7");
  //adding "close" class to the span element 
  span.classList.add("close");
  span.appendChild(txt);
  myNodeList[i].appendChild(span);
} */

// Create a "close" button and append it to each list item
/* const myNodeList = document.querySelectorAll("li");
myNodeList.forEach((liElement) => {
  let span = document.createElement("SPAN");
  let text = document.createTextNode("\u00D7");
  span.classList.add("close");
  span.appendChild(text);
  liElement.appendChild(span)
}); */


// Click on a close button to hide the current list item
/*let closeButtonElements = document.querySelectorAll(".close");
for (i = 0; i < closeButtonElements.length; i++) {
  closeButtonElements[i].onclick = function() {
    let div = this.parentElement;
    div.style.display = "none";
  }
}*/

// Click on a close button to hide the current list item

//Samo omogucava gasenje list item-a koji su vec bili tu, a oni koji su dinamicno dodati ne mogu da se uklone
/*let closeButtonElements = document.querySelectorAll(".close");
closeButtonElements.forEach((closeElement) => {
  let parentElement = closeElement.parentElement;
  closeElement.addEventListener("click", () => {
    parentElement.style.display = "none";
    
  });
});
*/
// Click on a close button to hide the current list item - radi kako treba
// const list = document.querySelector("ul");
/* list.addEventListener("click", (event) => {
  if (event.target.classList.contains("close")) {
    let parentElement = event.target.parentElement;
    parentElement.style.display = "none";
  }
}); */



// Add a "checked" symbol when clicking on a list item

// let addCheckedMark = document.querySelector('li');
/* list.addEventListener('click', function(ev) {
  if (ev.target.tagName === 'LI') {
    ev.target.classList.toggle('checked');
  }
}); */


// TODO Apply the same logic for the alarm icon as with close button
//Add an "alarm" symbol when adding new list item 
function addAlarmIconToListItems() { 
let myNodeListIcon = document.querySelectorAll("li");
myNodeListIcon.forEach((liElement) => {
  if (!liElement.querySelector(".alarm-icon")) {
    let span = document.createElement("SPAN");
    let icon = document.createTextNode("⏰");
    span.classList.add("alarm-icon");
    span.appendChild(icon);
    liElement.appendChild(span)
  }
});
}


addAlarmIconToListItems();
document.querySelector(".addBtn").addEventListener("click", addAlarmIconToListItems);

function listItemClickIconSetAlarm() {
  const alarmIcons = document.querySelectorAll(".alarm-icon");
  alarmIcons.forEach((icon) => {
   icon.addEventListener('click', () => {
    
   });
   
  });
}

let listItemToSetAlarmTo;



const timerRef = document.querySelector(".timer-display");
const hourInput = document.getElementById("hourInput");
const minuteInput = document.getElementById("minuteInput");
const activeAlarms = document.querySelector(".activeAlarms");
const setAlarm = document.getElementById("set");
let alarmsArray = [];
let alarmSound = document.querySelector('audio')
alarmSound.load();

let initialHour = 0,
  initialMinute = 0,
  alarmIndex = 0;

//Append zeroes for single digit
const appendZero = (value) => (value < 10 ? "0" + value : value);

//Search for value in object
const searchObject = (parameter, value) => {
  let alarmObject,
    objIndex,
    exists = false;
  alarmsArray.forEach((alarm, index) => {
    if (alarm[parameter] == value) {
      exists = true;
      alarmObject = alarm;
      objIndex = index;
      return false;
    }
  });
  return [exists, alarmObject, objIndex];
};

//Display Time
function displayTimer() {
  let date = new Date();
  let [hours, minutes, seconds] = [
    appendZero(date.getHours()),
    appendZero(date.getMinutes()),
    appendZero(date.getSeconds()),
  ];

  //Display time
  timerRef.innerHTML = `${hours}:${minutes}:${seconds}`;

  //Alarm
  alarmsArray.forEach((alarm, index) => {
    if (alarm.isActive) {
      if (`${alarm.alarmHour}:${alarm.alarmMinute}` === `${hours}:${minutes}`) {
        alarmSound.play();
        alarmSound.loop = true;
      }
    }
  });
}

const inputCheck = (inputValue) => {
  inputValue = parseInt(inputValue);
  if (inputValue < 10) {
    inputValue = appendZero(inputValue);
  }
  return inputValue;
};

hourInput.addEventListener("input", () => {
  hourInput.value = inputCheck(hourInput.value);
});

minuteInput.addEventListener("input", () => {
  minuteInput.value = inputCheck(minuteInput.value);
});

//Create alarm div
const createAlarm = (alarmObj) => {
  //Keys from object
  const { id, alarmHour, alarmMinute } = alarmObj;
  //Alarm div
  let alarmDiv = document.createElement("div");
  alarmDiv.classList.add("alarm");
  alarmDiv.setAttribute("data-id", id);
  alarmDiv.innerHTML = `<span>${alarmHour}: ${alarmMinute}</span>`;

  //checkbox
  let checkbox = document.createElement("input");
  checkbox.setAttribute("type", "checkbox");
  checkbox.addEventListener("click", (e) => {
    if (e.target.checked) {
      startAlarm(e);
    } else {
      stopAlarm(e);
    }
  });
  alarmDiv.appendChild(checkbox);
  //Delete button
  let deleteButton = document.createElement("button");
  deleteButton.innerHTML = `<i class="fa-solid fa-trash-can"></i>`;
  deleteButton.classList.add("deleteButton");
  deleteButton.addEventListener("click", (e) => deleteAlarm(e));
  alarmDiv.appendChild(deleteButton);
  activeAlarms.appendChild(alarmDiv);
};

//Set Alarm
setAlarm.addEventListener("click", () => {
  alarmIndex += 1;

  //alarmObject
  let alarmObj = {};
  alarmObj.id = `${alarmIndex}_${hourInput.value}_${minuteInput.value}`;
  alarmObj.alarmHour = hourInput.value;
  alarmObj.alarmMinute = minuteInput.value;
  alarmObj.isActive = false;
  console.log(alarmObj);
  alarmsArray.push(alarmObj);
  createAlarm(alarmObj);
  hourInput.value = appendZero(initialHour);
  minuteInput.value = appendZero(initialMinute);
});

//Start Alarm - a ustvari markira da je spreman za pustanje kad dodje vreme
const startAlarm = (e) => {
  let searchId = e.target.parentElement.getAttribute("data-id");

  // const correspondingAlarm = alarmsArray.find(alarm => alarm.id === searchId)

  let [exists, obj, index] = searchObject("id", searchId);
  if (exists) {
    alarmsArray[index].isActive = true;
  }
};

//Stop alarm
const stopAlarm = (e) => {
  let searchId = e.target.parentElement.getAttribute("data-id");
  let [exists, obj, index] = searchObject("id", searchId);
  if (exists) {
    alarmsArray[index].isActive = false;
    alarmSound.pause();
    alarmSound.currentTime = 0;
  }
};




//delete alarm
const deleteAlarm = (e) => {
  let searchId = e.target.parentElement.parentElement.getAttribute("data-id");
  let [exists, obj, index] = searchObject("id", searchId);
  if (exists) {
    e.target.parentElement.parentElement.remove();
    alarmsArray.splice(index, 1);
  }
};

window.onload = () => {
  setInterval(displayTimer, 1000);
  initialHour = 0;
  initialMinute = 0;
  alarmIndex = 0;
  alarmsArray = [];
  hourInput.value = appendZero(initialHour);
  minuteInput.value = appendZero(initialMinute);
};

const listAlarmIconSet = (e) => {
  let iconClick = e.target.parentElement.parentElement.getAttribute()
}

/*
var alarmString = null;

// Select HTML5 Audio element
const alarmAudio = document.querySelector(".alarm-audio");

// Select DOM element with create-alarm class
const createAlarm = document.querySelector(".create-alarm");

// Select DOM element of active alarm container
const activeAlarm = document.querySelector(".active-alarm");
const clearAlarm = document.querySelector(".clear-alarm");

// Select DOM element of active alarm text
const alarmTextContainer = document.querySelector("alarm-text");

const alarmText = (time) => `Alarm set at time ${time}`;

// Initialize alarm sound
alarmAudio.src = "http://soundbible.com/grab.php?id=2061&type=mp3";
alarmAudio.load();

//Stop alarm sound
function stopAlarmSound() {
  let audio = document.querySelector("audio");
  audio.pause();
  audio.currentTime = 0;
}

// Handle Create Alarm submit
const handleSubmit = (event) => {
  // Prevent default action of reloading the page
  event.preventDefault();
  const { hour, sec, min, zone } = document.forms[0];
  alarmString = getTimeString({
    hours: hour.value,
    seconds: sec.value,
    minutes: min.value,
    zone: zone.value
  });
  // Reset form after submit
  document.forms[0].reset();
  // Hide create alarm
  createAlarm.style.display = "none";
  // show active alarm with text
  activeAlarm.style.display = "block";
  alarmTextContainer.innerHTML = alarmText(alarmString);
};

const handleClear = () => {
  alarmString = "";
  activeAlarm.style.display = "none";
  createAlarm.style.display = "block";
};

// Trigger handleClear on button click
clearAlarm.addEventListener("click", handleClear);
// Attach submit event to the form
document.forms[0].addEventListener("submit", handleSubmit);

// Function to check if alarm needs to be triggered
const checkAlarm = (timeString) => {
  if (alarmString === timeString) {
    alarmAudio.play();
  }
};

// Function to convert time to string value
const getTimeString = ({ hours, minutes, seconds, zone }) => {
  if (minutes / 10 < 1) {
    minutes = "0" + minutes;
  }
  if (seconds / 10 < 1) {
    seconds = "0" + seconds;
  }
  return `${hours}:${minutes}:${seconds} ${zone}`;
};

// Function to display current time on screen
const renderTime = () => {
  var currentTime = document.getElementById("current-time");
  const currentDate = new Date();
  var hours = currentDate.getHours();
  var minutes = currentDate.getMinutes();
  var seconds = currentDate.getSeconds();
  var zone = hours >= 12 ? "PM" : "AM";
  if (hours > 12) {
    hours = hours % 12;
  }
  const timeString = getTimeString({ hours, minutes, seconds, zone });
  checkAlarm(timeString);
  currentTime.innerHTML = timeString;
};

// Update time every second
setInterval(renderTime, 1000);
 
//Stop alarm sound when "Clear Alarm" is clicked
*/
