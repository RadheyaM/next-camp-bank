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

export const allTransactionBalances = (depArray, payArray, allCampers) => {
  const camperBalances = []
  console.log("ALL CAMPERS INTIAL:", allCampers)
  for (let l = 0; l < allCampers.length; l++) {
      console.log("CAMPER: ", allCampers[l].accountId)
      let sum1 = 0;
      let sum2 = 0;

      for (let i = 0; i < depArray.length; i++) {
        if (depArray[i].accountId === allCampers[l].accountId){
          sum1 += Number(depArray[i].amount);
        }
      }

      for (let i = 0; i < payArray.length; i++) {
        if (payArray[i].accountId === allCampers[l].accountId){
          sum2 += Number(payArray[i].amount);
        }
      }
      camperBalances.push(
        {
          accountId: allCampers[l].accountId,
          name: allCampers[l].firstName + " " + allCampers[l].lastName,
          balance: sum1 - sum2
        }
      )
  }
  console.log("CAMPER BALANCES:", camperBalances)
  return camperBalances
};

export const addDay = (arr) => {
    const addedDay = []

    for (let i=0; i < arr.length; i++) {
        const day = new Date(arr[i].timeStamp);
        arr[i].day = day.getDay();
        addedDay.push(arr[i]);
    }
    return addedDay;
};