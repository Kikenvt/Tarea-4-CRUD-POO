import { getFromLocalStorage } from './localStorage.js';
import { updateInventoryTable } from './main.js';
import { carManager, defaultCars } from './main.js';


//---------------------UPDATE CARS---------------------
// Comprueba si hay coches en el local storage y los añade al carManager o añade los coches por defecto si no hay coches en el local storage
export function updateCars() {
	const cars = getFromLocalStorage();
	
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
//---------------------TOTAL INVENTORY---------------------
// Funcion para calcular el precio total de los coches

export const totalInventory = (array) => {
	const totalTemplate = document.getElementById('total-template');

	let totalPrice = 0;

	array.forEach((car) => {
		totalPrice += car.quantity * car.price;
	});
	totalTemplate.innerHTML = `Inventario total: ${totalPrice.toLocaleString()} €`;
};


