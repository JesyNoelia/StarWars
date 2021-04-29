

//PRIMERO DEBO VER LOS DATOS
//pedir los datos a la api


//////ESTO ES PARA PINTAR EL LISTADO DE NOMBRES DE LA IZQUIERDA
async function getAllPeople(pNumPag) {//esta funcion va a consultar la api, hayq ue hacer la peticion, que va a applicar un fetch
    const url = "https://swapi.dev/api/people/?page=" + pNumPag;
    let request = await fetch(url, { method: 'GET' }) //ESTO ES UNA PROMESA. 
    let data = await request.json();
    printAllPeople(data); //HAY QUE PINTAR LAS FUNCIONES EN EVENTOS, recordar que este script, esta en el head.
    //el data devuelve todo el objeto
}
getAllPeople(1)


///////ESTO ES PARA PINTRA LA INFORMACION DE UNA SOLA PEROSNA EN LA VENTANA DE LA DERECHA.
async function getOnePerson(pUrl) {
    let request = await fetch(pUrl, { method: 'GET' });
    let data = await request.json();
    printInfoPerson(data);//esto devuelve en la consola informacion del evento que pincho
}

async function getFilm(pUrl) {
    let request = await fetch(pUrl, { method: 'GET' });
    let data = await request.json();
    printInfoFilm(data);
}