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

// filter and sum up the four categories of transaction
export const calcTotals = (transData, depositCount, bookCount, tuckCount, withCount) => {
  const depLst = [];
  const bookLst = [];
  const tuckLst = [];
  const withLst = [];
  let depTotal = 0;
  let bookTotal = 0;
  let tuckTotal = 0;
  let withTotal = 0;
  let totalBank = 0;

  transData.map((tran) => {
    if (tran.category == "Deposit") {
        depLst.push(Number(tran.amount))
    } else if (tran.category == "Book") {
        bookLst.push(Number(tran.amount))
    } else if (tran.category == "Tuckshop") {
        tuckLst.push(Number(tran.amount))
    } else {
        withLst.push(Number(tran.amount))
    }
  })

  for (let i = 0; i < depLst.length; i++) {
      depTotal += depArray[i].amount;
  }

  for (let i = 0; i < bookLst.length; i++) {
      bookTotal += bookLst[i];
  }
  
  for (let i = 0; i < tuckLst.length; i++) {
      tuckTotal += tuckLst[i];
  }

  for (let i = 0; i < withLst.length; i++) {
      withTotal += withLst[i];
  }

  totalBank = depTotal - bookTotal - tuckTotal - withTotal

  const data = [{
      dep: depTotal,
      book: bookTotal,
      tuck: tuckTotal,
      with: withTotal,
      total: totalBank,
      depositCount: depositCount,
      bookCount: bookCount,
      tuckCount: tuckCount,
      withCount: withCount
  }];

  return data
}