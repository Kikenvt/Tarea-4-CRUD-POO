export class CarManager { 
    #products
    constructor() {
        this.#products = []
    }
    listCars() {
        return this.#products
    }
    addCar(car) {
        this.#products.unshift(car)
    }

    updateCar(id, updatedCar) {
        const index = this.#products.findIndex(car => car.id === id)

        try {
            if (index !== -1) {
                this.#products[index] = updatedCar
            } else {
                throw new Error('Car not found')
            }
        } catch (error) {
            console.log(error)
        }
    }

    deleteCarById(id) {
        const index = this.#products.findIndex(car => car.id === id)

        try {
            if (index !== -1) {
                this.#products.splice(index, 1)
            } else {
                throw new Error('Car not found')
            }
        } catch (error) {
            console.log(error)
        }
    }

    showCar(){
        for (const car of this.#products) {
            console.log(`ID: ${car.id} | Brand: ${car.brand} | Model: ${car.model} | Quantity: ${car.quantity} | Price: ${car.price}`)
        }
    }

    get products() {
        return this.#products
    }

    set products(value) {
        this.#products = value
    }
}