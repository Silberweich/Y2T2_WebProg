//onload="getAPI()"
function getAPI(){
    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Host': 'unogsng.p.rapidapi.com',
            'X-RapidAPI-Key': '48d1541387mshf975de543ab9ed0p157c28jsn88802a1eee4d'
        }
    };

    fetch('https://unogsng.p.rapidapi.com/search?start_year=1980&orderby=rating&audiosubtitle_andor=or&limit=10&end_rating=9&subtitle=english&audio=english&country_andorunique=unique&offset=0&end_year=2020', options)
        .then(response => response.json())
        .then(data => console.log(data))
        .catch(err => console.error(err));
}

function myScript() {
    console.log("LOADED AS FUCK");
    console.log("LOADED AS FUCK");
    document.getElementById("api-insert").innerHTML = "hello";
}

window.onload = myScript;
//window.onload = getAPI;