export const saveToLocalStorage = (cars) => {
	localStorage.setItem('cars', JSON.stringify(cars));
};

export const getFromLocalStorage = () => {
	return JSON.parse(localStorage.getItem('cars'));
};
