

function randomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min)
}

function getAPI(){
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

function myScript() {
    console.log("LOADED AS FUCK");
    console.log("LOADED AS FUCK");
    document.getElementById("api-insert").innerHTML = `<img src="Assets/Movies/HOG.jpg" alt="House of Gucci" style="float: left; margin: 1vh; height: 42.5vh;">
                                                       <h3>Title : PLACE HOLDER</h3>
                                                       <p>Title : EDIT LINE 42 and 43 on api_rec.js to change to getAPI()</p>
                                                       <p>Title : PLACE HOLDER</p>
                                                       <p>Title : PLACE HOLDER</p>
                                                       <p>Title : PLACE HOLDER</p>`;
}

window.onload = myScript;
//window.onload = getAPI;

//uncomment getAPI, and comment myScript to test, dont forget to put it back, if it goes over, you pay