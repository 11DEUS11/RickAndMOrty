const axiosInstance = axios.create({
    baseURL: 'https://rickandmortyapi.com'
});

const container = document.getElementById("characters-container");
const prevBtn = document.getElementById("prev");
const nextBtn = document.getElementById("next");


let currentPage = 1;
let totalPages = 1;

function getCharacters(page = 1) {
    axiosInstance.get(`/api/character/?page=${page}`)
        .then(response => {
            const characters = response.data.results;
            totalPages = response.data.info.pages;
            renderCharacters(characters);
            updateButtons(page);
        })
        .catch(error => {
            container.innerHTML = `<p> Error al obtener personajes ${error.message}</p>`
        });
}

function renderCharacters(characters) {
    container.innerHTML = "";
    characters.forEach(character => {
        const characterDiv = document.createElement("div");
        characterDiv.className = "character";
        characterDiv.innerHTML = `
             <img class="character-image"src="${character.image}" alt="${character.name}">
             <h2>${character.name}</h2>
             <p style="font-size 1.2rem;"> Especie: ${character.species}</p>
             <p style="font-size 1.2rem;"> Estado: ${character.status}</p>
             <p style="font-size 1.2rem;"> Genero: ${character.gender}</p>
             <p style="font-size 1.2rem;"> Origen: ${character.origin.name}</p>
             <p style="font-size 1.2rem;"> Ubicación: ${character.location.name}</p>
             <p style="font-size 1.2rem;"> Episodios: ${character.episode.length}</p>
        `;
        container.appendChild(characterDiv);
    });
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

