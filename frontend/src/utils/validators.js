
export const emailPattern = `^(?=.{2,254}$)[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$`;

export const datePattern = `^[0-3]?[0-9].[0-3]?[0-9].(?:[0-9]{2})?[0-9]{2}$`;


export const phonePattern = `^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$`;


export const isEmpty = (obj) => {
    for(var prop in obj) {
      if(obj.hasOwnProperty(prop)) {
        return false;
      }
    }

    return JSON.stringify(obj) === JSON.stringify({});
  }