const transactionBalance = (depArray, payArray) => {
  let sum1 = 0;
  let sum2 = 0;

  for (let i = 0; i < depArray.length; i++) {
    sum1 += Number(depArray[i].amount);
  }

  for (let i = 0; i < payArray.length; i++) {
    sum2 += Number(payArray[i].amount);
  }
  return sum1 - sum2;
};

export default transactionBalance;

export const euro = new Intl.NumberFormat('en-US', {
  style: "currency",
  currency: "EUR"
})

export const addDay = (arr) => {
    const addedDay = []

    for (let i=0; i < arr.length; i++) {
        const day = new Date(arr[i].timeStamp);
        arr[i].day = day.getDay();
        addedDay.push(arr[i]);
    }
    return addedDay;
};