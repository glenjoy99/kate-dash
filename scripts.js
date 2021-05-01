

var selectedValue = "Westminster";
var url = 'https://api.openweathermap.org/data/2.5/weather?q=' + selectedValue + ',usa&units=imperial&APPID=e69792e4cd7eb22b21c14d073a957577';     

function checkDropdown() {
    var ddl;
    ddl = document.getElementById("citytype");
    selectedValue = ddl.options[ddl.selectedIndex].value;
    console.log(selectedValue);
    url = 'https://api.openweathermap.org/data/2.5/weather?q=' + selectedValue + ',usa&units=imperial&APPID=e69792e4cd7eb22b21c14d073a957577';     
    renderTemperature();
}

async function getCurrentTemperature() {
    
        try {
            let response =  await fetch(url);
            return  await response.json();
        } catch (error) {
            console.log(error)
        }
}

async function getTopNews() {
    var key = 'E6WYCVDCHvwtOBuexQuKJWePGc0jPei-486_MuGUYf9biFRd';
    var url = 'https://api.currentsapi.services/v1/latest-news?' +
    'language=us&' +
    'apiKey=E6WYCVDCHvwtOBuexQuKJWePGc0jPei-486_MuGUYf9biFRd';
    try {
        let response =  await fetch(url);
        return  await response.json();
    } catch (error) {
        console.log(error)
    }

}

async function renderTemperature() {
    var tempdata =  await getCurrentTemperature();
    console.log(tempdata);
    var currtemp = tempdata.main.temp;
    var high = tempdata.main.temp_max;
    var low = tempdata.main.temp_min;
    let htmlSegment = `<div class="current">
                            <p>${currtemp} degrees </p>
                            <p> High: ${high} Low: ${low} </p>
                        </div>`;

    let container = document.querySelector('div.data');
    container.innerHTML = htmlSegment;
    
}


async function renderCOVIDStatus() {
    const options = {
        method: 'GET',
        mode: 'no-cors'
      };
    var stat = await fetch('https://kate-dash.herokuapp.com/stats');
    var num = await stat.text();
    console.log(num);

    var regexstr = /\<span class=\\"icon__label\\"\>(\d+)/g;

    const matches = [...num.matchAll(regexstr)];

    console.log(matches);

    

    let htmlSegment = `<div class="confirmed">
                            <p>${matches[0][1]} confirmed cases over 7 days </p>
                            <p>${matches[1][1]} total confirmed cases </p>
                            <p>${matches[2][1]} administered tests </p>
                            <p>${(matches[1][1]/matches[2][1]).toFixed(2)} % positivity rate </p>
                        </div>`;

    let container = document.querySelector('div.cases');
    container.innerHTML = htmlSegment;
}   

async function displayDateAndTime() {
    var currentdate = new Date(); 
    var datetime = (currentdate.getMonth()+1) + "/"
                + currentdate.getDate()  + "/" 
                + currentdate.getFullYear();

    let htmlSegment = `<p>
    Today is ${datetime} </p>`;

    let container = document.querySelector('div.title-date');
    container.innerHTML += htmlSegment;
          
}







function search(){

    var value = document.getElementById("input-search").value;
    console.log(value);
    window.open(
        "https://www.google.com/search?q="+value);

    return false;
}

function blackboard() {
    window.open(
        "https://bb.mcdaniel.edu/webapps/login/#");

    return false;
}

function mcdaniel() {
    window.open(
        "https://webapps.mcdaniel.edu/login/");

    return false;
}

function drive() {
    window.open(
        "https://drive.google.com");

    return false;
}



document.addEventListener('DOMContentLoaded', function() {
    renderTemperature();
    renderCOVIDStatus();
    displayDateAndTime();
}, false);