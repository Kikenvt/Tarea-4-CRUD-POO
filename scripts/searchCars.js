import { carManager, updateInventoryTable } from "./main.js";

export const searchCars = () => {

    const searchInput = document.getElementById('search-input');
    const clearTable = document.getElementById('clear-table');

    searchInput.addEventListener('input', function () {
        const textToSearch = searchInput.value.toLowerCase();
        const filteredCars = carManager.listCars().filter((car) => {
            return car.model.toLowerCase().includes(textToSearch);
        });
        updateTable(filteredCars);
        
    });

    const resetBtn = document.getElementById('reset-search-btn');
    resetBtn.addEventListener('click', function () {
        searchInput.value = '';
        updateInventoryTable();
    });

    function updateTable(filteredCars){
        clearTable.innerHTML = '';
        filteredCars.forEach((car) => {
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
            clearTable.appendChild(row);
        });
    }
}