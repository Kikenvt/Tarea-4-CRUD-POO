import { getFromLocalStorage } from './localStorage.js';
import { carManager, defaultCars, searchInput, editinfo, carToEditId, modelBrandInput, modelNameInput, modelQuantityInput, modelPriceInput, saveUpdateBtn } from './main.js';
import { totalInventory } from './total.js';

//---------------------UPDATE CARS---------------------
// Comprueba si hay coches en el local storage y los añade al carManager o añade los coches por defecto si no hay coches en el local storage
export function updateCars() {
	const cars = getFromLocalStorage();
	console.log(cars);
	if (cars) {
		cars.forEach((car) => {
			// Comprueba si hay coches en el carManager que no estén en el local storage
			const existingCar = carManager.listCars().find((managerCar) => managerCar.id === car.id);
			if (!existingCar) {
				carManager.addCar(car);
			}
		});
	}

	// Si no hay coches en el local storage, añade los coches por defecto
	if (carManager.listCars().length === 0) {
		defaultCars.forEach((car) => {
			carManager.addCar(car);
		});
	}
}

//---------------------SEARCH CARS---------------------
// Función que busca los coches por modelo y los muestra en la tabla
export const searchCars = () => {

    const searchInput = document.getElementById('search-input');


    searchInput.addEventListener('input', function () {
        const textToSearch = searchInput.value.toLowerCase();
        const filteredCars = carManager.listCars().filter((car) => {
            return car.model.toLowerCase().includes(textToSearch);
        });
        updateInventoryTable(filteredCars);

    });

    const resetBtn = document.getElementById('reset-search-btn');
    resetBtn.addEventListener('click', function () {
        searchInput.value = '';
        updateInventoryTable(carManager.listCars());
    });

};
//---------------------UPDATE TABLE---------------------//
// Actualiza la tabla de coches, la reutilizaremos para la busqueda en searchCars.js

export function updateInventoryTable(array) {
	const tableBody = document.getElementById('clear-table');
	tableBody.innerHTML = '';

	array.forEach((car) => {
		const row = document.createElement('tr');
		row.innerHTML = `
            
            <td>${car.brand}</td>
            <td>${car.model}</td>
            <td>${car.quantity}</td>
            <td>${car.price.toLocaleString()} €</td>
            <td>
			  <div class="accion-btns">
                <button class="btn-edit" id="editBtn" > <svg class="edit-svgIcon" viewBox="0 0 512 512">
				<path d="M410.3 231l11.3-11.3-33.9-33.9-62.1-62.1L291.7 89.8l-11.3 11.3-22.6 22.6L58.6 322.9c-10.4 10.4-18 23.3-22.2 37.4L1 480.7c-2.5 8.4-.2 17.5 6.1 23.7s15.3 8.5 23.7 6.1l120.3-35.4c14.1-4.2 27-11.8 37.4-22.2L387.7 253.7 410.3 231zM160 399.4l-9.1 22.7c-4 3.1-8.5 5.4-13.3 6.9L59.4 452l23-78.1c1.4-4.9 3.8-9.4 6.9-13.3l22.7-9.1v32c0 8.8 7.2 16 16 16h32zM362.7 18.7L348.3 33.2 325.7 55.8 314.3 67.1l33.9 33.9 62.1 62.1 33.9 33.9 11.3-11.3 22.6-22.6 14.5-14.5c25-25 25-65.5 0-90.5L453.3 18.7c-25-25-65.5-25-90.5 0zm-47.4 168l-144 144c-6.2 6.2-16.4 6.2-22.6 0s-6.2-16.4 0-22.6l144-144c6.2-6.2 16.4-6.2 22.6 0s6.2 16.4 0 22.6z"></path>
			  </svg></button>
                <button class="btn-delete" id="deleteBtn" >
				<svg viewBox="0 0 448 512" class="svgIcon"><path d="M135.2 17.7L128 32H32C14.3 32 0 46.3 0 64S14.3 96 32 96H416c17.7 0 32-14.3 32-32s-14.3-32-32-32H320l-7.2-14.3C307.4 6.8 296.3 0 284.2 0H163.8c-12.1 0-23.2 6.8-28.6 17.7zM416 128H32L53.2 467c1.6 25.3 22.6 45 47.9 45H346.9c25.3 0 46.3-19.7 47.9-45L416 128z"></path></svg>
			  </button>
			  </div>
            </td>
        `;
		tableBody.appendChild(row);

		const deleteBtn = row.querySelector('#deleteBtn');
		const editBtn = row.querySelector('#editBtn');

		deleteBtn.addEventListener('click', () => {
			carManager.deleteCarById(car.id);

			searchInput.value = '';
			updateInventoryTable(carManager.listCars());

		});

		editBtn.addEventListener('click', () => {
			editinfo = true;
			carToEditId = car.id;

			modelBrandInput.value = car.brand;
			modelNameInput.value = car.model;
			modelQuantityInput.value = car.quantity;
			modelPriceInput.value = car.price;

			saveUpdateBtn.innerHTML = 'Editar vehículo';

		});
		totalInventory(carManager.listCars());
	});
}


