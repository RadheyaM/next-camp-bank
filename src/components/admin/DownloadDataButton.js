import * as React from "react";
import s from "./DownloadDataButton.module.css";
import DownloadIcon from "@mui/icons-material/Download";

const DownloadDataButton = ({ trans }) => {
  // create a downloadable csv file from trans data.
  const titleKeys = [
    "_id",
    "accountId",
    "name",
    "type",
    "category",
    "amount",
    "note",
    "user",
    "timeStamp",
  ];
  const csvArray = [];
  csvArray.push(titleKeys);
  trans.forEach((tran) => {
    csvArray.push(Object.values(tran));
  });
  let csvContent = "";
  csvArray.forEach((row) => {
    csvContent += row.join(",") + "\n";
  });
  const blob = new Blob([csvContent], {type: 'text/csv;charset=utf-8,'});
  const objUrl = URL.createObjectURL(blob);
  const currentDate = new Date().toLocaleDateString('en-GB')
  const csvName = `Transactions_${currentDate}.csv`
  return (
    <div className={s.downloadLinkDiv}>
      <DownloadIcon className={s.icon}/>
      <a className={s.downloadLink} href={objUrl} download={csvName}>
      Download Latest Transaction Data.csv
      </a> 
    </div>
    
  );
};

export default DownloadDataButton;
