export const PriceForUI = (number, country) => {

       const splitedPrice = number.split('');
       let firstNum = number.slice(0, number.length - 2);
       
       return firstNum + '.' + number.slice(number.length - 2, 100)
       
}
