export class Car {
	#id;
	#brand;
	#model;
	#quantity;
	#price;
	constructor(id, brand, model, quantity, price) {
		this.#id = id;
		this.#brand = brand;
		this.#model = model;
		this.#quantity = quantity;
		this.#price = price;
	}
	get id() {
		return this.#id;
	}
	get brand() {
		return this.#brand;
	}
	get model() {
		return this.#model;
	}
	get quantity() {
		return this.#quantity;
	}
	get price() {
		return this.#price;
	}
	set id(id) {
		this.#id = id;
	}
	set brand(value) {
		this.#brand = value;
	}
	set model(value) {
		this.#model = value;
	}
	set quantity(value) {
		this.#quantity = value;
	}
	set price(value) {
		this.#price = value;
	}

	toJSON() {
		return {
			id: this.#id,
			brand: this.#brand,
			model: this.#model,
			quantity: this.#quantity,
			price: this.#price,
		};
	}
}
