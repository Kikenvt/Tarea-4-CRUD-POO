import { carManager, updateInventoryTable } from "./main.js";

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

}