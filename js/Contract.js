// Contract counter:

// Assignation of kinds of vehicles and cost per rented day:
let costPerDay = new Map([
	["Car", [50, 40, 30]],
	["SUV", [70, 60, 45]],
	["Pick-up", [130, 110, 80]],
	["Truck", [200, 150, 120]],
]);

class Contract {
	constructor(startDate, endDate, objectID) {
		this.setID();
		this.startDate = startDate;
		this.endDate = endDate;
		this.objectID = objectID;
		this.state = "Awaiting confirmation";
		this.setCost();
	}

	configState(state) {
		this.state = state;
	}

	setID() {
		// Contract counting variable initialization:
		let id = 0;
		fetch("http://localhost:3000/contracts")
			.then((res) => res.json())
			.then((data) => {
				data.length != 0 && (id = data[data.length - 1].id);
                id++;
		        this.id = id;
			});
		    // This last step provides the id of the last item posted as a contract
		
	}

	setCost() {
		// Getting information about the vehicle from the API:
		fetch(`http://localhost:3000/cars/${this.objectID}`)
			.then((res) => res.json())
			.then((data) => {
				let car = data;
				let bodyType = costPerDay.get(data.bodytype);
				// Calculating number of days this contract vehicle has been rented:
				let duration = luxon.Interval.fromDateTimes(
					this.startDate,
					this.endDate
				);
				duration = duration.length("days");
				// Setting this contract cost based on the fare per day:
				this.cost = bodyType[data.level - 1] * duration;
			});
	}
}
