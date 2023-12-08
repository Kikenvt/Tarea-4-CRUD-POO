import { getFromLocalStorage, saveToLocalStorage } from "./localStorage.js";
export class CarManager {
	#products;
	constructor() {
		this.#products = getFromLocalStorage() || [];
	}

	listCars() {
		return this.#products = getFromLocalStorage() || [];
	}

	addCar(car) {
		this.#products.push(car);
		saveToLocalStorage(this.#products);
	}

	updateCar(id, updatedCar) {
		const index = this.#products.findIndex((car) => car.id === id);

		try {
			if (index !== -1) {
				this.#products[index] = updatedCar;
				saveToLocalStorage(this.#products);
			} else {
				throw new Error('Car not found');
			}
		} catch (error) {
			console.log(error);
		}
	}

	deleteCarById(id) {
		const index = this.#products.findIndex((car) => car.id === id);

		try {
			if (index !== -1) {
				this.#products.splice(index, 1);
				saveToLocalStorage(this.#products);
			} else {
				throw new Error('Car not found');
			}
		} catch (error) {
			console.log(error);
		}
	}

	get products() {
		return this.#products;
	}

	set products(value) {
		this.#products = value;
		saveToLocalStorage(this.#products);
	}

	// saveCarsToLocalStorage() {
	// 	localStorage.setItem('cars', JSON.stringify(this.#products));
	// }
}
