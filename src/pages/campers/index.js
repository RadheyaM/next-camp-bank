import AllCampersTable from "@/components/campers/AllCampersTable"

const DUMMY_DATA = [
  {
    accountId: "10001",
    name: "Billy Bob McDoogle",
    balance: 0.0,
    transactions: [
      {
        id: "123abcd",
        dateTimeStamp: "01/07/2023 10:17",
        type: "Payment",
        category: "Book",
        amount: 6.99,
      },
      {
        id: "6493hney",
        dateTimeStamp: "01/07/2023 09:00",
        type: "Deposit",
        category: "n/a",
        amount: 50.0,
      },
    ],
  },
  {
    accountId: "10002",
    name: "Boaty McBoatFace",
    balance: 0.0,
    transactions: [
      {
        id: "154efgh",
        dateTimeStamp: "01/07/2023 11:55",
        type: "Payment",
        category: "Tuck",
        amount: 6.99,
      },
      {
        id: "155ehjh",
        dateTimeStamp: "01/07/2023 09:45",
        type: "Deposit",
        category: "n/a",
        amount: 25.0,
      },
    ],
  },
  {
    accountId: "10003",
    name: "Grainne Griffin",
    balance: 0.0,
    transactions: [
      {
        id: "174ruty",
        dateTimeStamp: "01/07/2023 10:01",
        type: "Deposit",
        category: "n/a",
        amount: 20.0,
      },
      {
        id: "432sqww",
        dateTimeStamp: "01/07/2023 10:15",
        type: "Payment",
        category: "Tuck",
        amount: 4.75,
      },
    ],
  },
];

const Campers = (props) => {
  return (
    <AllCampersTable campers={DUMMY_DATA}/>
  );
};

export default Campers;
