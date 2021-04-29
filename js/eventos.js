let ulPeople = document.getElementById('personajes')//representa el listado dnd se van a pintar todos los personajes
let botones = document.querySelectorAll('.botones div')

//let botonPrev = document.querySelector('.botones div')


function printAllPeople(pData) {

    ulPeople.innerHTML = "";

    /////ACTIVAR O DESACTIVAR LOS BOTONES.
    //console.log(pData);
    botones[1].style.display = (!pData.next) ? 'none' : 'block'// para los casos que quiero saber si un valor es nulo, se pone !delante del valor. esto siginifca que data es ditinto de nulo. (cuando no hay next es none, cuando hay next block.) (!pData.next = no existe)
    botones[0].style.display = (!pData.previous) ? 'none' : 'block'

    botones[1].dataset.url = pData.next; //con esto estoy creando un dataset en el div que funciona como boton y le paso la info de siguiente y de next ( el next es el nombre que tiene en el objeto, no tiene nada que ver con el texto del boton.) como pData es local, tengo que buscar la forma de "pintar" algo en el html para luego recogerlo. entonces creo el data y luego en la funcion gotoPage lo recojo.
    botones[0].dataset.url = pData.previous;

    botones[1].addEventListener('click', goToPage);
    botones[0].addEventListener('click', goToPage);


    //el pData tiene la informacion de del next y prev. para sacar el ultimo caracter de una cadena de caracteres, que es una lista de caracteres, como es una lista tiene longitud, y para sacar el ultimo de la lista es el menos 1.

    let string = pData.next;
    //console.log(string[string.length - 1]);


    /////PINTADO DE LA LISTA
    pData.results.forEach(person => {
        printPerson(person);
    });
}


function goToPage(event) {
    //console.log(event.target.dataset.url); //del evento que recibo, el objeto que toco obtener la info del data set.
    let page = event.target.dataset.url.split('=')[1];//esto devuelve el utlimo valor de la url, osea el ultimo numero de la pagina, este valor es el que necesitaba para pasar como parametro a la funcion printAllpeople.
    getAllPeople(page)
}



function printPerson(pJsonPerson) {
    //console.log(pJsonPerson.url);//esto devuelve informacion del objeto, como el numero de personaje de la url, es igual al id, del personaje, se puede usar la url para obtener ese personaje. 
    let li = document.createElement('li');
    let liContent = document.createTextNode(pJsonPerson.name);
    li.dataset.url = pJsonPerson.url;

    li.addEventListener('click', getUrlPerson);
    li.appendChild(liContent);

    ulPeople.appendChild(li);
}

function getUrlPerson(event) {

    //limpiar la clase de cualquier li.
    let lis = document.querySelectorAll('#personajes li')
    lis.forEach(li => li.classList.remove('activo'));

    //activar el boton que he tocado.
    event.target.classList.add('activo');
    //alert(event.target.dataset.url); //esto devuelve, del evento, el objeto que toco del dataset dame la url. para consultar a la api.
    getOnePerson(event.target.dataset.url);
}

const sectionInfo = document.getElementById('vistaPersonaje');
function printInfoPerson(pJsonPerson) {
    //console.log(pJsonPerson); //este log da toda la informacion del personaje, la info de las peliculas donde aparece, esta dentro de films que es un array y luego otro array.
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

    /* let li = document.createElement('li');
    let liContent = document.createTextNode(`Altura: ${pJsonPerson.height}`); */

    h2.appendChild(contentH2);
    //li.appendChild(liContent);

    //ul.appendChild(li);
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
    films.forEach(film => getFilm(film)) //recorremos el array llamamos a getfilm y getfilm llama a pintarinfo film
    //console.log(films);
}


function printInfoFilm(pFilm) {
    let divPeliculas = document.querySelector('.peliculas');

    /* divPeliculas.innerHTML += `<article>
    <h3>Titulo de la pelicula ${pFilm.title}</h3>
    <ul>
        <li>Capitulo:  ${pFilm.episode_id}</li>
        <li>Director: ${pFilm.director}</li>
        <li>Año: ${pFilm.release_date}</li>
    </ul>
</article>`; */

    let article = document.createElement('article');
    let h3 = document.createElement('h3');
    let ul = document.createElement('ul');
    /* let li1 = document.createElement('li');
    let li2 = document.createElement('li');
    let li3 = document.createElement('li'); */

    let h3content = document.createTextNode(`Titulo: ${pFilm.title}`);
    //let li1Content = document.createTextNode(`Capítulo: ${pFilm.episode_id}`);
    //let li2Content = document.createTextNode(`Director: ${pFilm.director}`);
    //let li3Content = document.createTextNode(`Año: ${pFilm.release_date}`);

    ul.innerHTML = `<li>Capitulo:  ${pFilm.episode_id}</li>
    <li>Director: ${pFilm.director}</li>
    <li>Año: ${pFilm.release_date}</li>`


    h3.appendChild(h3content);
    // li1.appendChild(li1Content);
    // li2.appendChild(li2Content);
    // li3.appendChild(li3Content);

    //ul.appendChild(li1);
    //ul.appendChild(li2);
    //ul.appendChild(li3);

    article.appendChild(h3);
    article.appendChild(ul);

    divPeliculas.appendChild(article);
}