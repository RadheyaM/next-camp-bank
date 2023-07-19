export const transactionBalance = (depArray, payArray) => {
  let sum1 = 0;
  let sum2 = 0;

  for (let i = 0; i < depArray.length; i++) {
    sum1 += depArray[i];
  }

  for (let i = 0; i < payArray.length; i++) {
    sum2 += payArray[i];
  }
  console.log("the sums", sum1, sum2)
  return sum1 - sum2;
};