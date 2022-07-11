let list = [];
let cardContainer = document.querySelector("#cardContainer");
let favEvents = [];

function addFavCar(carToAdd) {
	let favCars = localStorage.getItem("favCars");
	if (!favCars) {
		localStorage.setItem("favCars", carToAdd);
	} else {
		let favCars = localStorage.getItem("favCars");
		favCars += `, ${carToAdd}`;
		localStorage.setItem("favCars", favCars);
	}
}

function patchCar(carID, state) {
	fetch(`http://localhost:3000/cars/${carID}`, {
		method: "PATCH",
		body: JSON.stringify({
			favourite: state,
		}),
		headers: {
			"Content-type": "application/json; charset=UTF-8",
		},
	})
		.then((res) => res.json())
		.then((data) => console.log(data));
}

function loadCards(request) {
	let url = `http://localhost:3000/cars/${request || ""}`;
	fetch(url)
		.then((res) => res.json())
		.then((data) => {
			for (const car of data) {
				let newCard = document.createElement("div");
				newCard.classList = `card col-3 p-0 m-3 border-0 flex-column rounded-4 card-colors`;
				newCard.id = `${car.brand} ${car.model}`;
				// Card template
				newCard.innerHTML = `<img
                        src="/assets/images/cars/${car.brand.toLowerCase()}-${car.model.toLowerCase()}.webp"
                        alt="${car.brand}-${car.model}"
                        class="row m-0"
                    />
                    <div class="${car.id} fav-btn ${
					car.favourite == "Yes" && "isFav"
				}">
                        <i class="fa-solid fa-heart favButton"></i>
                    </div>
                    <div class="row col-12 align-self-center justify-content-center m-0 py-2">
                        <div class="col-3 p-0 align-self-center">
                            <img
                                src="/assets/images/logos/${car.brand.toLowerCase()}-logo.webp"
                                class="carLogo"
                                alt="${car.brand}-logo"
                            />
                        </div>
                        <div class="col-8 p-0">
                            <h3 class="text-center m-0 car-title">${
															car.brand
														} ${car.model}</h3>
                            <div class="row d-flex justify-content-center mt-2 mx-0">
                                <div class="specs col-5 d-flex flex-column p-0">
                                    <i class="fa-solid fa-truck-ramp-box align-self-center"></i>
                                    <p class="align-self-center m-0 specs-value-text">${
																			car.trunk
																		}</p>
                                    <p class="align-self-center m-0 specs-title-text">MALETERO</p>
                                </div>
                                <div class="specs col-5 d-flex flex-column p-0">
                                    <i class="fa-solid fa-people-group align-self-center"></i>
                                    <p class="align-self-center m-0 specs-value-text">${
																			car.passengers
																		}</p>
                                    <p class="align-self-center m-0 specs-title-text">PASAJEROS</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="row m-0 justify-content-evenly pb-2">
                        <button
                            type="button"
                            class="${
															car.id
														} btn btn-primary col-4 align-self-center see-more-btn"
                        >
                            Ver más
                        </button>
                        <button
                            type="button"
                            class="btn btn-primary col-4 align-self-center booking-btn"
                        >
                            Reserva
                        </button>
                    </div>`;
				cardContainer.appendChild(newCard);
			}

			let seeMoreButton = document.querySelectorAll(".see-more-btn");
			let bookingButton = document.querySelectorAll(".booking-btn");
			let favButton = document.querySelectorAll(".fav-btn");

			for (let index = 0; index < seeMoreButton.length; index++) {
				seeMoreButton[index].addEventListener("click", (e) => {
					let carID = e.path[0].classList[0];
					let searchArgs = e.path[2].id;
					searchArgs = searchArgs.split(" ");
					fetch(`http://localhost:3000/cars/${(carID % 2) == 0 ?2 : 1}`)
						.then((res) => res.json())
						.then((data) => {
							sessionStorage.setItem("infoCar", JSON.stringify(data));
							window.location = "/pages/carInfo.html";
						});
				});
			}

			for (let index = 0; index < favButton.length; index++) {
				favButton[index].addEventListener("click", () => {
					let classes = favButton[index].classList;
					if (classes[2] == "isFav") {
						console.log("Removed");
						favButton[index].classList = `${classes[0]} ${classes[1]}`;
						patchCar(classes[0], "No");
					} else {
						console.log("Added");
						favButton[index].classList = `${classes[0]} ${classes[1]} isFav`;
						patchCar(classes[0], "Yes");
					}
				});
			}
		});
}

let page = document.querySelector("main");
switch (page.id) {
	case "catalog":
		loadCards();
		break;
	case "favourites":
		loadCards("?favourite=Yes");
		break;
}

setTimeout(() => {
	if (cardContainer.innerHTML == "") {
		Swal.fire({
			icon: "error",
			title: "Parece que todavía no hay nada por aquí",
			text: "Vuelve al catálogo y selecciona algunos de nuestros vehículos para añadirlos a tus favoritos.",
            confirmButtonText: `Volver al catálogo`,
		})
            .then(() => {
                window.location = "/pages/catalog.html";
            })
	}
}, 500);
