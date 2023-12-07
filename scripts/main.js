import { Car } from "./car.js";
import { CarManager } from "./carManager.js";
import { saveToLocalStorage } from "./localStorage.js";

const carManager = new CarManager()

let defaultCars = [
   new Car(1, 'Ford', 'Mustang', 2, 100000),
    new Car(2, 'Chevrolet', 'Camaro', 1, 120000),
    new Car(3, 'Dodge', 'Challenger', 3, 90000),
    new Car(4, 'Nissan', 'Skyline', 1, 80000),
    new Car(5, 'Toyota', 'Supra', 2, 70000),
    new Car(6, 'Mazda', 'RX-7', 1, 60000), 
    new Car(7, 'Subaru', 'WRX STI', 3, 50000),
]

defaultCars.forEach(car => carManager.addCar(car))



document.getElementById('model-form-events').addEventListener('submit', function(event) {
    event.preventDefault()

    const modelBrand = document.getElementById('model-brand').value
    const modelName = document.getElementById('model-name').value
    const modelQuantity = parseInt(document.getElementById('model-quantity').value)
    const modelPrice = parseFloat(document.getElementById('model-price').value)

    if (modelBrand && modelName && !isNaN(modelQuantity) && !isNaN(modelPrice)) {
        const newCar = new Car(Date.now(), modelBrand, modelName, modelQuantity, modelPrice)
        carManager.addCar(newCar)
        
        document.getElementById('model-form-events').reset()
    }
    this.reset()

    saveToLocalStorage(carManager.listCars())
    updateInventoryTable()
    
})

function updateInventoryTable(){
    const tableBody = document.getElementById('clear-table')
    tableBody.innerHTML = ''

    const cars = JSON.parse(localStorage.getItem('cars'))

    cars.forEach(car => {
        const row = document.createElement('tr')
        row.innerHTML = `
            
            <td>${car.brand}</td>
            <td>${car.model}</td>
            <td>${car.quantity}</td>
            <td>${car.price}</td>
            <td>
                <button class="btn btn-primary" id="editBtn" >Edit</button>
                <button class="btn btn-danger" id="deleteBtn" >Delete</button>
            </td>
        `
        tableBody.appendChild(row)
    })
}

updateInventoryTable()

