const getRandomValues = (array: any, count: number, previousArray: any) => {
  let same = true;
  let random = [];
  while (same) {
    random = array.sort(() => Math.random() - Math.random()).slice(0, count);

    for (let i = 0; i < count; i++) {
      if (array[i] === previousArray[i]) {
        same = true;
        break;
      } else {
        same = false;
      }
    }
  }
  return random;
};

export default getRandomValues;
