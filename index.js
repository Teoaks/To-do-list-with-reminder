// Declaring the close button factory
const addCloseButton = (element) => {
  // Creating "x" button! 
  const span = document.createElement("SPAN");
  const txt = document.createTextNode("\u00D7");
  span.className = "close";
  span.appendChild(txt);
  element.appendChild(span);


  // and adding a click listener to it so it can dismiss its parent
  span.addEventListener('click', (e) => {
    console.log(e)
    const parentElement = e.target.parentElement

    parentElement.style.display = 'none'
  });
};


// Declaring a factory to add click event listener that will check or uncheck the element
const addCheckedListener = (element) => {
  element.addEventListener('click', () => {
    element.classList.toggle('checked');
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

}

// TODO Apply the same logic for the alarm icon as with close button - Nisam uspeo da primenim logiku, uradim kod, i nema greske na conzoli, ali i dalje ne radi
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
  };
 
})}



addAlarmIconToListItems();
document.querySelector(".addBtn").addEventListener("click", addAlarmIconToListItems);



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
/*
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
*/
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





function addAlarmIconToListItems() { 
  let myNodeListIcon = document.querySelectorAll("li");
  myNodeListIcon.forEach((liElement) => {
    if (!liElement.querySelector(".alarm-icon")) {
      let span = document.createElement("SPAN");
      let icon = document.createTextNode("⏰");
      span.classList.add("alarm-icon");
      span.appendChild(icon);
      liElement.appendChild(span)
    };
    
    /*//Alarm is set and remembered in the list item factory
   alarmIsSetOnTheListItem = (fabrikaGovana) => {
    if (fabrikaGovana.querySelector("alarm-icon").addEventListener("click",)) {
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
      
    }
  }*/
  });
}
  
  
  addAlarmIconToListItems();
  document.querySelector(".addBtn").addEventListener("click", addAlarmIconToListItems);
  