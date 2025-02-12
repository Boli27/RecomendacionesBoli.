const busqueda = document.getElementById("busqueda");
const btn_buscar = document.getElementById("btn_buscar");
const btn_limpiar = document.getElementById("btn_limpiar")
const resultados = document.getElementById("search-results");

btn_buscar.addEventListener("click", function (e) {
    e.preventDefault();
    fetch('travel_recommendation.json')
        .then(response => {
            if (!response.ok) {
                throw new Error('Error al cargar el archivo JSON');
            }
            return response.json();
        })
        .then(data => {
            // Limpiar resultados anteriores
            resultados.innerHTML = "";

            // La busqueda generalizada en minuscula y buscar sin problemas
            const keyword = busqueda.value.toLowerCase();

            // Switch para las palabras claves ingresadas
            switch (true) {
                case keyword === "playa" || keyword=== "playas" || keyword === "beach" || keyword=== "beaches":

                    data.beaches.forEach(beach => {
                        resultados.innerHTML += `
                            <div class="card mb-3" style="max-width: 540px;">
                                <div class="row g-0">
                                    <div class="col-md-4">
                                        <img src="${beach.imageUrl}" class="img-fluid rounded-start" alt="${beach.name}">
                                    </div>
                                    <div class="col-md-8">
                                        <div class="card-body">
                                            <h5 class="card-title">${beach.name}</h5>
                                            <p class="card-text">${beach.description}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        `;
                    });
                    break;

                case keyword === "templo" || keyword === "templos" || keyword === "temple" || keyword === "temples":

                    data.temples.forEach(temple => {
                        resultados.innerHTML += `
                            <div class="card mb-3" style="max-width: 540px;">
                                <div class="row g-0">
                                    <div class="col-md-4">
                                        <img src="${temple.imageUrl}" class="img-fluid rounded-start" alt="${temple.name}">
                                    </div>
                                    <div class="col-md-8">
                                        <div class="card-body">
                                            <h5 class="card-title">${temple.name}</h5>
                                            <p class="card-text">${temple.description}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        `;
                    });
                    break;

                case keyword === "pais" || keyword=== "paises" || keyword === "country" || keyword=== "countries":

                    data.countries.forEach(country => {
                        country.cities.forEach(city => {
                            resultados.innerHTML += `
                                <div class="card mb-3" style="max-width: 540px;">
                                    <div class="row g-0">
                                        <div class="col-md-4">
                                            <img src="${city.imageUrl}" class="img-fluid rounded-start" alt="${city.name}">
                                        </div>
                                        <div class="col-md-8">
                                            <div class="card-body">
                                                <h5 class="card-title">${city.name}</h5>
                                                <p class="card-text">${city.description}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            `;
                        });
                    });
                    break;

                    case data.countries.some(country => country.name.toLowerCase() === keyword):
                       
                        data.countries.forEach(country => {
                            if (country.name.toLowerCase() === keyword) {
                                resultados.innerHTML += `<h3 class="text-center text-black">${country.name}</h3>`;
                                country.cities.forEach(city => {
                                    resultados.innerHTML += `
                                        <div class="card mb-3" style="max-width: 540px;">
                                            <div class="row g-0">
                                                <div class="col-md-4">
                                                    <img src="${city.imageUrl}" class="img-fluid rounded-start" alt="${city.name}">
                                                </div>
                                                <div class="col-md-8">
                                                    <div class="card-body">
                                                        <h5 class="card-title">${city.name}</h5>
                                                        <p class="card-text">${city.description}</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    `;
                                });
                            }
                        });
                        break;

                default:
                    resultados.innerHTML = `<h2 class= "text-white bg-dark" >No se encontraron resultados para tu búsqueda.</h2>`;
                    break;
            }
        })
        .catch(error => {
            console.error("Error:", error);
        });
});


btn_limpiar.addEventListener("click", function(e){
    e.preventDefault();
    busqueda.value = ""
    resultados.innerHTML = "";
})
