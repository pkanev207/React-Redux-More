// import { useEffect } from "react";
import CabinTable from "../features/cabins/CabinTable";
import Heading from "../ui/Heading";
import Row from "../ui/Row";
// import { getCabins } from "../services/apiCabins";

function Cabins() {
  // useEffect(function () {
  //   getCabins()
  //     .then((data) => console.log(data))
  //     .catch((e) => console.error(e));
  // });

  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">All cabins</Heading>
        <p>Filter / Sort</p>
        {/* <img style={{ width: "300px" }} src="https://images.unsplash.com/photo-1621543597540-e9be3740352b?q=80&w=1965&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"/> */}
      </Row>

      <Row>
        <CabinTable />
      </Row>
    </>
  );
}

export default Cabins;
