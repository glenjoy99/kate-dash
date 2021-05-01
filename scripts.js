

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

async function renderBuzzfeedData() {
    const options = {
        method: 'GET',
        mode: 'no-cors'
      };
    var stat = await fetch('https://kate-dash.herokuapp.com/buzz');
    var text = await stat.text();
    console.log(text);
    const obj = JSON.parse(text);
    
    var buzzroot = "https://www.buzzfeed.com";
    var last = obj.buzzes.length - 1;

    var title = obj.buzzes[last].title;
    var img = obj.buzzes[last].images.standard;
    var desc = obj.buzzes[last].description;
    var link = buzzroot + obj.buzzes[last].canonical_path;

    var title1 = obj.buzzes[last-1].title;
    var img1 = obj.buzzes[last-1].images.standard;
    var desc1 = obj.buzzes[last-1].description;
    var link1 = buzzroot + obj.buzzes[last-1].canonical_path;

    var title2 = obj.buzzes[last-2].title;
    var img2 = obj.buzzes[last-2].images.standard;
    var desc2 = obj.buzzes[last-2].description;
    var link2 = buzzroot + obj.buzzes[last-2].canonical_path;

    let htmlSegment = `<li class="media"> 
                        <div class="media-left">
                            <a href="${link}">
                                <img class="media-object" src="${img}" alt="...">
                            </a> 
                        </div>
                        <div class="media-body">
                            <h4 class="media-heading">${title}</h4><p>${desc} </p>
                            
                        </div>
                        </li>` ;

    let htmlSegment2 = `<li class="media"> 
                            <div class="media-left">
                                <a href="${link1}">
                                    <img class="media-object" src="${img1}" alt="...">
                                </a>
                            </div>
                            <div class="media-body">
                                <h4 class="media-heading">${title1}</h4><p>${desc1} </p>
                            </div>
                        </li>`
    
    let htmlSegment3 = `<li class="media"> 
                            <div class="media-left">
                                <a href="${link2}">
                                    <img class="media-object" src="${img2}" alt="...">
                                </a>
                            </div>
                            <div class="media-body">
                                <h4 class="media-heading">${title2}</h4><p>${desc2} </p>
                            </div>
                        </li>`

    let container = document.querySelector('ul.media-list');
    container.innerHTML += htmlSegment;
    container.innerHTML += htmlSegment2;
    container.innerHTML += htmlSegment3;

    

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
    renderBuzzfeedData()
}, false);