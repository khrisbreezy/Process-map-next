
export const convertObjectToArray = (arr) => {
    return Object.keys(arr).map(key =>  {
        return {
            value: arr[key],
            information: capitalize(key)
        }
    });
};

const capitalize = (word) => {
    return word
      .toLowerCase()
      .replace(/\w/, firstLetter => firstLetter.toUpperCase());
};