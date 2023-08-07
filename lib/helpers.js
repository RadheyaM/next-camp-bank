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

//should be able to deal with changing filter params.
export const dynamicFilterFn = (objArray, filterObj) => {
  console.log(
    "you're in the dynamic filter fn",
    "filter: ",
    filterObj
  );
  const lst = [];
  const lst2 = [];
  const lst3 = [];
  const lst4 = [];
  //user
  if ((filterObj.user !== "All") & (filterObj.user !== "")) {
    objArray.map((tran) => {
      if (tran.user === filterObj.user) {
        lst.push(tran);
      }
    });
    console.log("lst: ", lst);
  }
  //category
  if ((filterObj.category !== "All") & (filterObj.category !== "")) {
    if (lst) {
      lst.map((tran) => {
        if (filterObj.category === tran.category) {
          lst2.push(tran);
        }
      });
    } else {
      objArray.map((tran) => {
        if (filterObj.category === tran.category) {
          lst2.push(tran);
        }
      });
    }
    console.log("lst2: ", lst2);
  }
  //date
  if ((filterObj.date !== "All") & (filterObj.date !== "")) {
    if (lst2) {
      lst2.map((tran) => {
        const date = new Date(tran.timeStamp).toLocaleDateString();
        if (date === filterObj.date) {
          lst3.push(tran);
        }
      });
    } else {
      objArray.map((tran) => {
        date = new Date(tran.timeStamp).toLocaleDateString();
        if (date === filterObj.date) {
          lst3.push(tran);
        }
      });
    }
    console.log("lst3: ", lst3);
  }
  //note
  if ((filterObj.note !== "All") & (filterObj.note !== "")) {
    if (lst3) {
      lst3.map((tran) => {
        if (filterObj.note === "With") {
          if (tran.note) {
            lst4.push(tran);
          }
        } else if (filterObj.note === "Without") {
          if (!tran.note) {
            lst4.push(tran);
          }
        }
      });
    } else {
      objArray.map((tran) => {
        if (filterObj.note === "With") {
          if (tran.note) {
            lst4.push(tran);
          }
        } else if (filterObj.note === "Without") {
          if (!tran.note) {
            lst4.push(tran);
          }
        }
      });
    }
    console.log("lst4: ", lst4);
  }
  if (lst4) {
    return lst4;
  } else {
    return objArray;
  }
};

//filter an object.
export const filterFn = (objArray, filterKey, filterValue) => {
  const lst = [];
  if (filterKey === "note") {
    objArray.map((obj) => {
      if (filterValue) {
        if (obj.note) {
          lst.push(obj);
        }
      } else if (!filterValue) {
        if (!obj.note) {
          lst.push(obj);
        }
      }
    });
    return lst;
  }
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

//iterates through dates, saves to array, adds array to a set.
export const getDateRange = (objArray) => {
  const lst = [];
  objArray.map((obj) => {
    const date = new Date(obj.timeStamp).toLocaleDateString();
    lst.push(date);
  });
  return new Set(lst);
};

export const filterDates = (objArray, filterDate) => {
  const lst = [];
  objArray.map((obj) => {
    const date = new Date(obj.timeStamp).toLocaleDateString();
    if (date === filterDate) {
      lst.push(obj);
    }
  });
  return lst;
};
