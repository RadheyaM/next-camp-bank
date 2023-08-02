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

export const euro = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "EUR",
});

//filter an object.
export const filterFn = (objArray, filterKey, filterValue) => {
  const lst = [];
  objArray.map((obj) => {
    for (const [key, value] of Object.entries(obj)) {
      if ((key === filterKey) & (value === filterValue)) {
        lst.push(obj);
      }
    }
  });
  return lst;
};

//amount hardcoded in.
export const sumObjectArrayAmounts = (objArray) => {
  let sum = 0;
  objArray.map((obj) => {
    const amount = Number(obj.amount);
    sum = sum + amount;
  });
  return sum;
};
