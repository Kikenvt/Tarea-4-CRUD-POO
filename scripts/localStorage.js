

export const saveToLocalStorage = (car) => {
    
    localStorage.setItem('cars', JSON.stringify(car))
    
}

export const getFromLocalStorage = () => {
   return JSON.parse(localStorage.getItem('cars'))
}