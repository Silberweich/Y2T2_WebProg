/**
 * This is the file containing External API service.
 * The API service will make request everytime that homepage(index.html) is loaded
 * Check line 46 and 47, comment out the placeholder function and uncomment realGetAPI()
 * 
 */

function randomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min)
}

function realGetAPI(){
    console.log("GETTING API FRFR");
    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Host': 'unogsng.p.rapidapi.com',
            'X-RapidAPI-Key': '48d1541387mshf975de543ab9ed0p157c28jsn88802a1eee4d'
        }
    };

    fetch('https://unogsng.p.rapidapi.com/search?start_year=1980&orderby=rating&audiosubtitle_andor=or&limit=10&end_rating=9&subtitle=english&audio=english&country_andorunique=unique&offset=0&end_year=2020', options)
        .then(response => response.json())
        .then(data => {
            let results = data.results;
            let pick = results[randomInt(0, 9)];
            document.getElementById("api-insert").innerHTML = ` <img src="${pick.poster}" alt="${pick.title}" style="float: left; margin: 1vh; height: 42.5vh;">
                                                                <h3>Title : ${pick.title} (${pick.year})</h3>
                                                                <p>Release date : ${pick.titledate}</p>
                                                                <p>Series or movie : ${pick.vtype}</p>
                                                                <p>iMDB rating : ${pick.imdbrating} [id: ${pick.imdbid}]</p>
                                                                <p>Synopsis : ${pick.synopsis}</p>`
        })
        .catch(err => console.error(err));
}

function placeHolder() {
    document.getElementById("api-insert").innerHTML = `<img src="Assets/Movies/HOG.jpg" alt="House of Gucci" style="float: left; margin: 1vh; height: 42.5vh;">
                                                       <h3>Title : PLACE HOLDER TITLE, <b>README.md</b> can give you extra information</h3>
                                                       <p>PLACE HOLDER : The External API service is turn off to avoid losing money</p>
                                                       <p>PLACE HOLDER : RapidAPI give limit of 100 requesr per day</p>
                                                       <p>PLACE HOLDER : ++++</p>
                                                       <p>PLACE HOLDER : Check (./script/rec_api.js) to see how to open the External API function</p>`;
}

//uncomment realGetAPI, and comment placeHolder to test, dont forget to put it back, if it goes over, you pay.
window.onload = placeHolder;
//window.onload = realGetAPI;

