import CamperRow from "./CamperRow";
import Table from "../UI/Table";
import { Fragment } from "react";
import SearchByName from "@/components/forms/SearchByName";
import { useState } from "react";
import styles from './AllCampersTable.module.css'
import {CSVLink} from 'react-csv'

const AllCampersTable = (props) => {
  const {campers, query, csvData} = props;
  const [filteredData, setFilteredData] = useState("");
  const [clearFilter, setClearFilter] = useState(true);

  const searchFilterHandler = (filterName) => {
    const lst = [];
    const names = query.data.data.data.map((camper) => {
      const name = camper.firstName + " " + camper.lastName
      if (name.toLowerCase().includes(filterName)) {
        lst.push(camper)
      }
    });
    setFilteredData(lst);
    setClearFilter(false);
  };
  const clearFilterHandler = () => {
    setClearFilter(true);
    setFilteredData("")
  }
  const downloadData = csvData.data.data.data
  console.log(downloadData)
  return (
    <Fragment>
      <SearchByName onSearch={searchFilterHandler} onClear={clearFilterHandler}/>
      <CSVLink 
        data={downloadData}
        filename={"all-camper-balances.csv"}
      >Download All Balances
      </CSVLink>
      <Table className={styles.transTable}>
        <caption>
          <h2>All Campers</h2>
        </caption>
        <thead>
          <tr>
            <th>Account Id</th>
            <th>Name</th>
          </tr>
        </thead>
        <tbody>
          {filteredData && filteredData.map((camper) => (
            <CamperRow key={camper._id} camper={camper}/>
          ))}
          {clearFilter && props.query.data.data.data.map((camper) => (
            <CamperRow key={camper._id} camper={camper}/>
          ))}
        </tbody>
      </Table>
    </Fragment>
  );
};

export default AllCampersTable;
