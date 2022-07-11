let infoCar = sessionStorage.getItem(`infoCar`);
infoCar = JSON.parse(infoCar);

let innerHTML = 
    `<img class="carPicture" src="/assets/images/cars/${infoCar.brand.toLowerCase()}-${infoCar.model.toLowerCase()}.webp" alt="${infoCar.brand.toLowerCase()}-${infoCar.model.toLowerCase()}">
    <h2 class="carTitle">${infoCar.brand}-${infoCar.model}</h2>
    <div class="carInfo">
        <ol>
            <li id="motor">
                <p>Motor</p>
                <ul>`;

for (const spec of infoCar.motor) {
	innerHTML += `<li>${spec}</li>`;
}

innerHTML += 
                `</ul>
            </li>
            <li id="exterior">
                <p>Exterior</p>
                <ul>`;
                
for (const spec of infoCar.exterior) {
    innerHTML += `<li>${spec}</li>`;
}
                        
innerHTML += 
                `</ul>
            </li>
            <li id="safety">
                <p>Seguridad</p>
                <ul>`

for (const spec of infoCar.safety) {
    innerHTML += `<li>${spec}</li>`;
}
                    
innerHTML += 
	    		`</ul>
            </li>
            <li id="dimensions">
                <p>Dimensiones</p>
                <ul>`

for (const spec of infoCar.dimensions) {
    innerHTML += `<li>${spec}</li>`;
}

innerHTML +=
                `</ul>
            </li>
        </ol>
    </div>
    <div class="buttons">
        <button class='btn btn-primary' id="book">Reservar</button>
        <button class='btn btn-primary' id="catalog">Volver al catálogo</button>
    </div>`;

let main = document.querySelector("main");
main.innerHTML = innerHTML;

let bookButton = document.querySelector("#book");
let catalogButton = document.querySelector("#catalog");

catalogButton.addEventListener('click', () => {
    window.location = '/pages/catalog.html';
})