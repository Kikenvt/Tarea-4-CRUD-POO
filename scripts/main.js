import { Car } from './car.js';
import { CarManager } from './carManager.js';
import { searchCars } from './searchCars.js';

searchCars();
export const carManager = new CarManager();

let editinfo = false;
let carToEditId = null;

let defaultCars = [
	new Car(1, 'Ford', 'Mustang', 2, 100000),
	new Car(2, 'Chevrolet', 'Camaro', 1, 120000),
	new Car(3, 'Dodge', 'Challenger', 3, 90000),
	new Car(4, 'Nissan', 'Skyline', 1, 80000),
	new Car(5, 'Toyota', 'Supra', 2, 70000),
	new Car(6, 'Mazda', 'RX-7', 1, 60000),
	new Car(7, 'Subaru', 'WRX STI', 3, 50000),
];

// defaultCars.forEach((car) => {
// 	carManager.addCar(car);
// 	//! NO AÑADIR VUELVE A REESCRIBIR CADA VEZ QUE F5 saveToLocalStorage(carManager.listCars());

// });
//saveToLocalStorage(carManager.listCars());

const carForm = document.getElementById('model-form-events')
const modelBrandInput = document.getElementById('model-brand');
const modelNameInput = document.getElementById('model-name');
const modelQuantityInput = document.getElementById('model-quantity');
const modelPriceInput = document.getElementById('model-price');

carForm.addEventListener('submit', function (event) {
		event.preventDefault();

		const modelBrand = modelBrandInput.value;
		const modelName = modelNameInput.value;
		const modelQuantity = parseInt(modelQuantityInput.value)
		const modelPrice = parseFloat(modelPriceInput.value)

		if(editinfo === true && carToEditId){
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
	
				document.getElementById('model-form-events').reset();
			}
			carForm.reset();
			editinfo = false;
	}else{
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

			document.getElementById('model-form-events').reset();
		}
		carForm.reset();
		

	}
		updateInventoryTable();
	});

export function updateInventoryTable() {
	const tableBody = document.getElementById('clear-table');
	tableBody.innerHTML = '';

	const cars = carManager.listCars();
	cars.forEach((car) => {
		const row = document.createElement('tr');
		row.innerHTML = `
            
            <td>${car.brand}</td>
            <td>${car.model}</td>
            <td>${car.quantity}</td>
            <td>${car.price}</td>
            <td>
                <button class="btn btn-primary" id="editBtn" >Edit</button>
                <button class="btn btn-danger" id="deleteBtn" >Delete</button>
            </td>
        `;
		tableBody.appendChild(row);

		const deleteBtn = row.querySelector('#deleteBtn');
		const editBtn = row.querySelector('#editBtn');

		deleteBtn.addEventListener('click', () => {
			carManager.deleteCarById(car.id);

			updateInventoryTable();
		});

		editBtn.addEventListener('click', () => {
			editinfo = true;
			carToEditId = car.id;

			modelBrandInput.value = car.brand;
			modelNameInput.value = car.model;
			modelQuantityInput.value = car.quantity;
			modelPriceInput.value = car.price;



			
			const saveBtn = document.getElementById('add-btn');
			saveBtn.style.display = 'none';
			const updateBtn = document.getElementById('update-btn');
			updateBtn.style.display = 'inline-block';
			
			
			
		});
	});
}

updateInventoryTable();
