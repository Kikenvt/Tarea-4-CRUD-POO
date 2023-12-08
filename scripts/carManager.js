import { getFromLocalStorage, saveToLocalStorage } from './localStorage.js';
export class CarManager {
	#products;
	// Con el constructor se inicializa el array de productos con los productos del local storage o con un array vacío si no hay productos en el local storage
	constructor() {
		this.#products = getFromLocalStorage() || [];
	}
	// Devuelve el array de productos
	listCars() {
		return (this.#products = getFromLocalStorage() || []);
	}
	// Añade un producto al array de productos y lo guarda en el local storage
	addCar(car) {
		this.#products.push(car);
		saveToLocalStorage(this.#products);
	}
	// Edita un producto del array de productos y lo guarda en el local storage
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
			alert(error);
		}
	}
	// Elimina un producto del array de productos y lo guarda en el local storage
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
			alert(error);
		}
	}

	get products() {
		return this.#products;
	}

	set products(value) {
		this.#products = value;
		saveToLocalStorage(this.#products);
	}
}
