/**
 * **Autor**: Enrique Fernández - Campoamor Fernández
 * **GitHub**:https://github.com/Kikenvt/Tarea-4-CRUD-POO.git
 */


import { updateCars } from './functions.js';
import { Car } from './car.js';
import { CarManager } from './carManager.js';
import { searchCars } from './functions.js';
import { updateInventoryTable } from './functions.js';

// Con esto al cargar la página se muestra el loader durante 2 segundos.
window.addEventListener('DOMContentLoaded', function () {
	setTimeout(function () {
		document.querySelector('.loader-page').style.display = 'none';
	}, 2000);
});

// Al cargar la página se actualizan los coches y se muestra la tabla de coches y la barra de búsqueda
document.addEventListener('DOMContentLoaded', function () {
	updateCars();
	searchCars();
	updateInventoryTable(carManager.listCars());
});

// Instancia de la clase CarManager
export const carManager = new CarManager();
// Declaramos los coches por defecto que se añadirán si no hay coches en el local storage
export let defaultCars = [
	new Car(1, 'Cupra', 'Formentor', 12, 37000),
	new Car(2, 'Cupra', 'Leon', 10, 32300),
	new Car(3, 'Cupra', 'Born', 3, 42700),
	new Car(4, 'Cupra', 'Tavascan', 3, 53600),
	new Car(5, 'Seat', 'Ibiza', 5, 17000),
	new Car(6, 'Seat', 'Leon', 10, 25500),
	new Car(7, 'Seat', 'Arona', 12, 19700),
	new Car(8, 'Seat', 'Ateca', 7, 31300),
	new Car(9, 'Seat', 'Tarraco', 4, 33400),
];

// Inicializamos las variables para editar coches
export let editinfo = false;
export let carToEditId = null;

//---------------------ADD CARS---------------------
// Vinculamos los elementos del DOM con las variables para el formulario de añadir/editar coches
// Tambien las exportaremos para utilizar en funciones.js y no declararlas de nuevo
const carForm = document.getElementById('model-form-events');
export const modelBrandInput = document.getElementById('model-brand');
export const modelNameInput = document.getElementById('model-name');
export const modelQuantityInput = document.getElementById('model-quantity');
export const modelPriceInput = document.getElementById('model-price');
export const searchInput = document.getElementById('search-input');
export const saveUpdateBtn = document.getElementById('add-update-btn');

//Formulario de añadir/editar coches
carForm.addEventListener('submit', function (event) {
	event.preventDefault();

	const modelBrand = modelBrandInput.value;
	const modelName = modelNameInput.value;
	const modelQuantity = parseInt(modelQuantityInput.value);
	const modelPrice = parseFloat(modelPriceInput.value);

	// Comprueba si se está editando un coche
	if (editinfo === true && carToEditId) {
		const editCar = carManager.listCars().find((car) => car.id === carToEditId);
		if (
			modelBrand &&
			modelName &&
			!isNaN(modelQuantity) &&
			!isNaN(modelPrice)
		) {
			editCar.brand = modelBrand;
			editCar.model = modelName;
			editCar.quantity = modelQuantity;
			editCar.price = modelPrice;

			carManager.updateCar(carToEditId, editCar);

			carForm.reset();
			editinfo = false;
			saveUpdateBtn.innerHTML = 'Agregar vehículo';
		}
	} else {
		// Comprueba si se está añadiendo un coche
		if (
			modelBrand &&
			modelName &&
			!isNaN(modelQuantity) &&
			!isNaN(modelPrice)
		) {
			const newCar = new Car(
				Date.now(),
				modelBrand,
				modelName,
				modelQuantity,
				modelPrice
			);
			carManager.addCar(newCar);
			carForm.reset();
		}
		carForm.reset();
	}
	updateInventoryTable(carManager.listCars());
});
