// import { useEffect } from "react";
import CabinTable from "../features/cabins/CabinTable";
import Heading from "../ui/Heading";
import Row from "../ui/Row";
// import { getCabins } from "../services/apiCabins";
import CreateCabinForm from "../features/cabins/CreateCabinForm";
import { useState } from "react";

function Cabins() {
  // useEffect(function () {
  //   getCabins()
  //     .then((data) => console.log(data))
  //     .catch((e) => console.error(e));
  // });

  const [showForm, setShowForm] = useState(false);

  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">All cabins</Heading>
        <p>Filter / Sort</p>
        {/* <img style={{ width: "300px" }} src="https://images.unsplash.com/photo-1621543597540-e9be3740352b?q=80&w=1965&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"/> */}
      </Row>

      <Row>
        <CabinTable />
        <button onClick={() => setShowForm((showForm) => !showForm)}>
          Add new cabin
        </button>

        {showForm && <CreateCabinForm />}
      </Row>
    </>
  );
}

export default Cabins;
