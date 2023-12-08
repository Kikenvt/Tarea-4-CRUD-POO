// Funcion para calcular el precio total de los coches

export const totalInventory = (array) => {
	const totalTemplate = document.getElementById('total-template');

	let totalPrice = 0;

	array.forEach((car) => {
		totalPrice += car.quantity * car.price;
	});
	totalTemplate.innerHTML = `Inventario total: ${totalPrice.toLocaleString()} €`;
};
