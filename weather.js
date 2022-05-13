function getCoordsFromAPI(city) {
    const API_KEY = "d62d7cec663042c3b6b3b2cb33214ea3"
    let URL = `https://api.opencagedata.com/geocode/v1/json?q=${city}&key=${API_KEY}&language=fr&pretty=1`
        
    return fetch(URL) // on utilise la methode fetch, qui est asynchrone et qui existe par défaut dans le navigateur (on aurait aussi pu utiliser la librairie axios par exemple)
    // on utilise la méthode then() (NB: on pourrait aussi utiliser la syntaxe async/await)
    .then(response => { 
        if (response.status == 200) { // on vérifier que l'appel à l'API a fonctionné
            return response.json()  // ne pas oublier le return du callback
        }
        else console.log(`Erreur lorsqu'on a tenté de récupérer les data`);
    })
    .then(data => {
        let lat = data.results[0].geometry.lat
        let lon = data.results[0].geometry.lng
        let coords = { lat: lat, lon: lon }
        return coords
    })
}


// ############# LOGIQUE DE L'APP ##################

document.addEventListener("DOMContentLoaded", function(){
    const button = document.getElementById("submit");
    const newContent = document.createTextNode('h2');
    const affichageVille = document.getElementsByTagName('h2')[0];
    const affichageResultats = document.getElementById("res")  // afficher div qui englobe element creer


    button.addEventListener('click', function(event){

        const numberdays = document.getElementById("NbDays").value;   // option balise pour les jours    
        event.preventDefault();
        const nom_ville= document.getElementById("inputNomVille");        
        let newville = nom_ville.value;
       
        getCoordsFromAPI(newville)
        .then(coords => {
            // TODO: ranger dans uen fonction getDay()
            const newDate = new Date();
            let day = newDate.getDay();
            let week = ["Sunday", "Monday", "Tuesday","Wednesday","Thursday","Friday","Saturday"];
                 

            // appel de la seconde API
            let API_KEY_OWM = "6c601f4c97c69803c3d0ea71c97c199e"
            let URL_OWM =`https://api.openweathermap.org/data/2.5/onecall?lat=${coords.lat}&lon=${coords.lon}&appid=${API_KEY_OWM}` 
            console.log(URL_OWM);
            
            fetch(URL_OWM)
            .then(response =>{

                //document.getElementById("res").innerHTML = "";

                if(response.status ==200){
                    return response.json()
                    }
                else console.log("erreur lorsque recuparation");
            })
            .then(data_api_temps => {

                affichageResultats.innerHTML = "";

                for(let i =0; i < numberdays; i++){
                    let weekday = week[day];

                    const meteo = data_api_temps.daily[i].weather[0].id;
                
                    if(meteo >= 600 && meteo <= 622){
                        iconsrc = "./weathericons/weathers/snow.svg";
                        
                    }
                    else if(meteo == 801 || meteo == 802){
                        iconsrc = "./weathericons/weathers/cloudy.svg";    
                        
                    } else if(meteo == 803 || meteo == 804){
                        iconsrc = "./weathericons/weathers/clouds.svg";
                        
                    }else if(meteo >= 500 && meteo <= 522){
                        iconsrc = "./weathericons/weathers/rain.svg";
                        
                    }else if(meteo == 800){
                        iconsrc = "./weathericons/weathers/sun.svg";
                        
                    }

                    console.log(data_api_temps)
                    
                    let divi = document.createElement("div");         // div pour le logo
                    divi.classList = "Logotemp";                      // class logotemps pour div de logo
                    let h3 = document.createElement("H3");            //  creer un h3
                    let titre = document.createTextNode(weekday);     //  jour de semaine
                    let image = document.createElement("img");        //  creer une image  balise img
                    image.src = iconsrc;                              //  affecter ma variable image.src
    
                    divi.appendChild(h3);                             //ajouter div en h3
                    h3.appendChild(titre);                            //ecrire en h3
                    divi.appendChild(image);                          // ajouter logo

                    document.getElementById("res").appendChild(divi);  // main div id res
                    
                    if(day + 1 == 7){
                        day = 0;                                 // afficher le jour meme (premier) 
                    }
                    else{
                    day = day + 1;                               // sinon le jour suivant
                    }  
                }
                
                let SUN_URL=`https://api.sunrise-sunset.org/json?lat=${coords.lat}&lng=${coords.lon}`
               
                fetch(SUN_URL) 
                .then(response => { 
                    if (response.status == 200) { 
                        return response.json()  
                    }
                    else console.log(`Erreur lorsqu'on a tenté de récupérer les data`);
                })
                .then( dataSunrise => {
                    let heure_lever_soleil = dataSunrise.results.sunrise;
                    let coucher_du_soleil = dataSunrise.results.sunset;
                    // $.get(URL_OWM, function (dataOpenWeather) {
                    //     //Déclaration des variables de temps
                    //     console.log(dataOpenWeather)
                    //     let heure_actuelle = dataOpenWeather.current.dt;
                    //     console.log(dataOpenWeather);

                    //     heure_actuelle = new Date(heure_actuelle * 1000)
                    //     x = heure_actuelle.getHours().toString()
                    //     y = heure_actuelle.getMinutes().toString()
                    //     z = heure_actuelle.getSeconds().toString()//.getMinutes().getSeconds()//.toUTCString().slice(-11, -4).replace(':', '').replace(':', '')
                    //     heure_actuelle = x+y+z
                    //     heure_actuelle = parseInt(heure_actuelle)

                    //     coucher_du_soleil = parseInt(coucher_du_soleil.slice(0, -3).replace(':', '').replace(':', '')) + 120000
                        
                    //     heure_lever_soleil = parseInt(heure_lever_soleil.slice(0, -3).replace(':', '').replace(':', '')) + 120000
                       
                    //     console.log(heure_actuelle)
                    //     console.log(coucher_du_soleil)
                    //     console.log(heure_lever_soleil)

                    //     /*TODO: convertir unixheure_actuellestamp en date*/ 

                    //     if (heure_actuelle > heure_lever_soleil && heure_actuelle<coucher_du_soleil) {
                    //           document.getElementsByTagName("body").style.backgroundcolor = 'grey'
                              
                    //         //il fait jour
                    //         /*TODO: traitement css pour le jour*/ 

                    //     } else {
                    //         //il fait nuit
                    //         /*TODO: traitement css pour la nuit*/ 
                    //     }

                        //console.log(dataOpenWeather);
                        
                })
                    
                    
                   
                // })
            
            })
        })
        .catch(err => console.log(err));
    })
}) 