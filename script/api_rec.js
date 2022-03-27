function getQueryResponses() {
    const fetch = require('node-fetch');

    let url = 'https://unogsng.p.rapidapi.com/search?start_year=1972&orderby=rating&audiosubtitle_andor=and&limit=100&subtitle=english&countrylist=78%2C46&audio=english&country_andorunique=unique&offset=0&end_year=2019';

    let options = {
    method: 'GET',
    headers: {
        'X-RapidAPI-Host': 'unogsng.p.rapidapi.com',
        'X-RapidAPI-Key': '48d1541387mshf975de543ab9ed0p157c28jsn88802a1eee4d'
        }
    };

    fetch(url, options)
        .then(res => res.json())
        .then(json => console.log(json))
        .catch(err => console.error('error:' + err));
}

function myScript() {
    console.log("LOADED AS FUCK");
    console.log("LOADED AS FUCK");
    document.getElementById("api-insert").innerHTML = "hello";
}

window.onload = myScript;