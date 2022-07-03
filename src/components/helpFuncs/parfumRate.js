export const calculateParfumRate = (array) => {

        if(array){
              const summary = array.reduce((acc, cur) => acc + cur, 0 )
              const rating = summary / array.length
              return rating.toFixed(1);
        }else {
              return 'nema ocjenu'
        }

}