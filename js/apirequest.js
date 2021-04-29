async function getAllPeople(pNumPag) {
    const url = "https://swapi.dev/api/people/?page=" + pNumPag;
    let request = await fetch(url, { method: 'GET' })
    let data = await request.json();
    printAllPeople(data);
}
getAllPeople(1)

async function getOnePerson(pUrl) {
    let request = await fetch(pUrl, { method: 'GET' });
    let data = await request.json();
    printInfoPerson(data);
}

async function getFilm(pUrl) {
    let request = await fetch(pUrl, { method: 'GET' });
    let data = await request.json();
    printInfoFilm(data);
}
