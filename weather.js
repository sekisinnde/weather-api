document.addEventListener("DOMContentLoaded", function(){
    const button = document.getElementById("submit");
    var newContent = document.createTextNode('h2');

    button.addEventListener('click', function(event){
        const numberdays = document.getElementById("NbDays").value;
        console.log(numberdays);
    
        event.preventDefault();
        const nom_ville= document.getElementById("inputNomVille");
        console.log(nom_ville.value);
        
        const API_KEY = "d62d7cec663042c3b6b3b2cb33214ea3"
        let newville = nom_ville.value;
        let URL = `https://api.opencagedata.com/geocode/v1/json?q=${newville}&key=${API_KEY}&language=fr&pretty=1`
        
        fetch(URL) // on utilise la methode fetch, qui est asynchrone et qui existe par défaut dans le navigateur (on aurait aussi pu utiliser la librairie axios par exemple)
        // on utilise la méthode then() (NB: on pourrait aussi utiliser la syntaxe async/await)
        .then(response => { 
            if (response.status == 200) { // on vérifier que l'appel à l'API a fonctionné
                return response.json()  // ne pas oublier le return du callback
            }
            else console.log(`Erreur lorsqu'on a tenté de récupérer les data`);
        })
        .then(data => {
            //console.log(data.results[0])  
            const newDate = new Date();
            let day = newDate.getDay();
            let week = ["Sunday", "Monday", "Tuesday","Wednesday","Thursday","Friday","Saturday"];
            
            //console.log(day);        
            
            let lat = data.results[0].geometry.lat
            let lon= data.results[0].geometry.lng

            const affichageVille = document.getElementsByTagName('h2')[0];
            const affichageResultats = document.getElementById("res")
        

            // appel de la seconde API
            let API_KEY_OWM = "6c601f4c97c69803c3d0ea71c97c199e"
            let URL_OWM =`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&appid=${API_KEY_OWM}` 
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

           for(let i =0; i < numberdays ;i++){
                let weekday = week[day];

                const meteo = data_api_temps.daily[i].weather[0].id;
               
                if(meteo >= 600 || meteo <= 622){
                    iconsrc = "./weathericons/weathers/snow.svg";
                    
                }
                 if(meteo == 801 || meteo == 802){
                    iconsrc = "./weathericons/weathers/clouds.svg";    
                    
                } if(meteo == 803 || meteo == 804){
                    iconsrc = "./weathericons/weathers/cloudy.svg";
                    
                } if(meteo >= 500 || meteo <= 522){
                    iconsrc = "./weathericons/weathers/rain.svg";
                    
                } if(meteo == 800){
                    iconsrc = "./weathericons/weathers/sun.svg";
                    
                }
                
            let divi = document.createElement("div");
            divi.classList= "Logotemp";
            let h3 = document.createElement("H3");
            let titre = document.createTextNode(weekday);
            let image = document.createElement("img");
            image.src = iconsrc;

            h3.appendChild(titre);
            divi.appendChild(h3);
            divi.appendChild(image);

            document.getElementById("res").appendChild(divi);
            
             if(day + 1 == 7)
            {day = 0;}
            else 
            {day = day + 1;}
           }
            })
        })
        .catch(err => console.log(err))
    })
}) 