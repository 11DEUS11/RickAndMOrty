const BASE_URL = "https://rickandmortyapi.com/api/character/";


const container = document.getElementById("characters-container");
const prevBtn = document.getElementById("prev");
const nextBtn = document.getElementById("next");



let currentPage = 1;
let totalPages = 1; 



async function getCharacters(page = 1){
    try {
        
        const response = await fetch(`${BASE_URL}?page=${page}`)
        
        if(!response.ok) throw new Error(`HTTP Error ${response.status} ${response.statusText}`);

       
        const data = await response.json();

       
       totalPages = data.info.pages;

       renderCharacters(data.results);
        
        updateButtons();

    } catch(error) {
       
        container.innerHTML = `<p> Error al obtener personajes ${error.message}</p>`

    }
}



function renderCharacters(characters) {
    
    container.innerHTML = ""; 
   
   characters.forEach(p => {
        
        const card = document.createElement("div");
        card.className = "card";
        
        card.innerHTML = `
            <img class="character-image"src="${p.image}" alt="${p.name}">
            <h2>${p.name}</h2>
            <p style="font-size 1.2rem;"> Especie: ${p.species}</p>
            <p style="font-size 1.2rem;"> Estado: ${p.status}</p>
            <p style="font-size 1.2rem;"> Genero: ${p.gender}</p>
            <p style="font-size 1.2rem;"> Origen: ${p.origin.name}</p>
            <p style="font-size 1.2rem;"> Ubicación: ${p.location.name}</p>
            <p style="font-size 1.2rem;"> Episodios: ${p.episode.length}</p>
        `;

        container.appendChild(card);
   })
}

 

 function updateButtons() {
    prevBtn.disabled = currentPage === 1; 
    nextBtn.disabled = currentPage === totalPages; 
 }


    prevBtn.addEventListener('click', () => {
        if(currentPage > 1) {
            currentPage--; 
            getCharacters(currentPage); 
            
        }
    })

nextBtn.addEventListener('click', () => {
    if(currentPage < totalPages) {
        currentPage++; 
        getCharacters(currentPage); 
    }
})



getCharacters();