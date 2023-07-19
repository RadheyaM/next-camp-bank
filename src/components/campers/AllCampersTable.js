import CamperRow from "./CamperRow";
import Table from "../UI/Table";
import { Fragment } from "react";
import SearchByName from "@/components/forms/SearchByName";
import { useState } from "react";

const AllCampersTable = (props) => {
  const {campers, query} = props;
  const [filteredData, setFilteredData] = useState("");
  const [clearFilter, setClearFilter] = useState(true);
  // const apiData = query.data.data.campers;
  // you can fetch data from the api here...

  const searchFilterHandler = (filterName) => {
    console.log("Filter: ", filterName);
    const lst = [];
    const names = query.data.data.data.map((camper) => {
      console.log("here is the name: ", camper.name)
      const name = camper.firstName + " " + camper.lastName
      if (name.toLowerCase().includes(filterName)) {
        lst.push(camper)
      }
    });
    console.log("the l list: ", lst)
    setFilteredData(lst);
    setClearFilter(false);
  };
  const clearFilterHandler = () => {
    setClearFilter(true);
    setFilteredData("")
  }
  return (
    <Fragment>
      <SearchByName onSearch={searchFilterHandler} onClear={clearFilterHandler}/>
      <Table>
        <caption>
          <h2>All Campers</h2>
        </caption>
        <thead>
          <tr>
            <th>Account Id</th>
            <th>Name</th>
            <th>Balance</th>
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
