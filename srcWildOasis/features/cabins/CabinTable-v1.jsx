/* eslint-disable no-unused-vars */
import { useQuery } from "@tanstack/react-query";
import styled from "styled-components";
import { getCabins } from "../../services/apiCabins";
import CabinRow from "./CabinRow";
import Spinner from "../../ui/Spinner";

const Table = styled.div`
  border: 1px solid var(--color-grey-200);

  font-size: 1.4rem;
  background-color: var(--color-grey-0);
  border-radius: 7px;
  overflow: hidden;
`;

const TableHeader = styled.header`
  display: grid;
  grid-template-columns: 0.6fr 1.8fr 2.2fr 1fr 1fr 1fr;
  column-gap: 2.4rem;
  align-items: center;

  background-color: var(--color-grey-50);
  border-bottom: 1px solid var(--color-grey-100);
  text-transform: uppercase;
  letter-spacing: 0.4px;
  font-weight: 600;
  color: var(--color-grey-600);
  padding: 1.6rem 2.4rem;
`;

// with useEffect the data will be fetch every time we navigate away from the page,
// but here we have cache. If we move away from this browser tab and then
// come back - that will trigger refetch, unless the data is fresh,
// the stale data also triggers refetch
export default function CabinTable() {
  const {
    isLoading,
    data: cabins,
    error,
  } = useQuery({
    // the query key can be a complex array or just an array with a string
    // this is what identifies each data
    queryKey: ["cabins"],
    // this function needs to return a promise
    // the received data will be stored into the cache
    queryFn: getCabins,
  });

  if (isLoading) return <Spinner />;

  return (
    // by specifying the role, the browser will know that should be a table
    <Table role="table">
      <TableHeader role="header">
        <div>Image</div>
        <div>Cabin</div>
        <div>Capacity</div>
        <div>Price</div>
        <div>Discount</div>
        <div></div>
      </TableHeader>
      {cabins.map((cabin) => {
        return <CabinRow cabin={cabin} key={cabin.id} />;
      })}
    </Table>
  );
}
