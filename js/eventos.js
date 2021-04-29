let ulPeople = document.getElementById('personajes')
let botones = document.querySelectorAll('.botones div')




function printAllPeople(pData) {

    ulPeople.innerHTML = "";

    botones[1].style.display = (!pData.next) ? 'none' : 'block'
    botones[0].style.display = (!pData.previous) ? 'none' : 'block'

    botones[1].dataset.url = pData.next;
    botones[0].dataset.url = pData.previous;

    botones[1].addEventListener('click', goToPage);
    botones[0].addEventListener('click', goToPage);

    let string = pData.next;
    //console.log(string[string.length - 1]);



    pData.results.forEach(person => {
        printPerson(person);
    });
}


function goToPage(event) {
    //console.log(event.target.dataset.url);
    let page = event.target.dataset.url.split('=')[1];
    getAllPeople(page)
}



function printPerson(pJsonPerson) {
    //console.log(pJsonPerson.url);/
    let li = document.createElement('li');
    let liContent = document.createTextNode(pJsonPerson.name);
    li.dataset.url = pJsonPerson.url;

    li.addEventListener('click', getUrlPerson);
    li.appendChild(liContent);

    ulPeople.appendChild(li);
}

function getUrlPerson(event) {


    let lis = document.querySelectorAll('#personajes li')
    lis.forEach(li => li.classList.remove('activo'));

    event.target.classList.add('activo');
    getOnePerson(event.target.dataset.url);
}

const sectionInfo = document.getElementById('vistaPersonaje');
function printInfoPerson(pJsonPerson) {
    //console.log(pJsonPerson);
    sectionInfo.innerHTML = "";
    let h2 = document.createElement('h2');
    let contentH2 = document.createTextNode(pJsonPerson.name);

    let ul = document.createElement('ul');

    ul.innerHTML = `<li>Altura: ${pJsonPerson.height}</li>
    <li>Peso: ${pJsonPerson.mass}</li>
    <li>Color de Piel: ${pJsonPerson.skin_color}</li>
    <li>Color de pelo: ${pJsonPerson.hair_color}</li>
    <li>Genero: ${pJsonPerson.gender}</li>
    <li>Año de Nacimiento: ${pJsonPerson.birth_year}</li>`

    h2.appendChild(contentH2);

    sectionInfo.appendChild(h2);
    sectionInfo.appendChild(ul);

    let h2s = document.createElement('h2');
    let divPeliculas = document.createElement('div');
    divPeliculas.classList.add('peliculas');
    let contentH2s = document.createTextNode(`Peliculas en las que aparece`);
    h2s.appendChild(contentH2s);

    sectionInfo.appendChild(h2s);
    sectionInfo.appendChild(divPeliculas);

    let films = pJsonPerson.films;
    films.forEach(film => getFilm(film))
}


function printInfoFilm(pFilm) {
    let divPeliculas = document.querySelector('.peliculas');

    let article = document.createElement('article');
    let h3 = document.createElement('h3');
    let ul = document.createElement('ul');

    let h3content = document.createTextNode(`Titulo: ${pFilm.title}`);

    ul.innerHTML = `<li>Capitulo:  ${pFilm.episode_id}</li>
    <li>Director: ${pFilm.director}</li>
    <li>Año: ${pFilm.release_date}</li>`

    h3.appendChild(h3content);

    article.appendChild(h3);
    article.appendChild(ul);

    divPeliculas.appendChild(article);
}
