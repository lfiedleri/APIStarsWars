const URL_BASE = 'https://swapi.dev/api';
const URL_PEOPLE = URL_BASE + '/people/';
let carta, boton, datos, notGo = false, gen;

function* generador(datos) {
    carta.innerHTML = '';
    for (let temp of datos) {
        yield temp.name;
        carta.innerHTML += ` 
    <div id="tarjSola" class="card mb-3 container" style="max-width: 540px;">
        <div class="row g-0">
          <div class="col-md-12">
            <div class="card-body">
              <h6 class="card-title">${temp.name}</h6>
              <p class="card-text">Estatura: "${temp.height}" cm. Peso: "${temp.mass}" kg.</p>
            </div>
          </div>
        </div>
    </div>`;
    }
}

const muestraInfo = (event) => {
    event.preventDefault();
    if (!notGo) {
        const { value, done } = gen.next();
        console.log('value:', value);
        console.log('done:', done);
        notGo = done;
    } else {
        console.log('Nada más que mostrar');
        datos = undefined;
        boton.style.display = "none";
    }
}

document.addEventListener('DOMContentLoaded', async () => {
    carta = document.getElementById('carta');
    boton = document.getElementById('first_card');
    const results = await fetch(URL_PEOPLE);
    const response = await results.json();
    datos = response.results;
    console.log('datos:', datos);
    gen = generador(datos);
    gen.next();
    boton.addEventListener('mouseover', muestraInfo);
});