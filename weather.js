document.addEventListener("DOMContentLoaded", function(){
    const button = document.getElementById("submit");
        
    button.addEventListener('click', function(event){
        
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
            console.log(data.results[0])           
        
        let lat = data.results[0].geometry.lat
        let lon = data.results[0].geometry.lng
        const affichageVille = document.getElementsByTagName('h2')[0];
        affichageVille.innerHTML = `${lat} / ${lon}`
        let API_KEY_OWM = "6c601f4c97c69803c3d0ea71c97c199e"
        let URL_OWM =`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&appid=${API_KEY_OWM}` 
        
            fetch(URL_OWM)
             .then(response =>{
                if(response.status ==200){
                    return response.json()
                }
                else console.log("erreur lorsque recuparation");
            })
            .then(data =>{
                console.log(data);


            })
            .catch(err => console.log(err));
        
            })
        
        




        })
        .catch(err => console.log(err))


}) 