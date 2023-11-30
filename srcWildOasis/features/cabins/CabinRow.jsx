/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import styled from "styled-components";

import CreateCabinForm from "./CreateCabinForm";
import { useDeleteCabin } from "./useDeleteCabin";
import { formatCurrency } from "../../utils/helpers";
import { HiPencil, HiSquare2Stack, HiTrash } from "react-icons/hi2";
import { useCreateCabin } from "./useCreateCabin";
import Modal from "../../ui/Modal";
import ConfirmDelete from "../../ui/ConfirmDelete";
import Table from "../../ui/Table";
import Menus from "../../ui/Menus";

// const TableRow = styled.div`
//   display: grid;
//   grid-template-columns: 0.6fr 1.8fr 2.2fr 1fr 1fr 1fr;
//   column-gap: 2.4rem;
//   align-items: center;
//   padding: 1.4rem 2.4rem;

//   &:not(:last-child) {
//     border-bottom: 1px solid var(--color-grey-100);
//   }
// `;

const Img = styled.img`
  display: block;
  width: 6.4rem;
  aspect-ratio: 3 / 2;
  object-fit: cover;
  object-position: center;
  transform: scale(1.5) translateX(-7px);
`;

const Cabin = styled.div`
  font-size: 1.6rem;
  font-weight: 600;
  color: var(--color-grey-600);
  font-family: "Sono";
`;

const Price = styled.div`
  font-family: "Sono";
  font-weight: 600;
`;

const Discount = styled.div`
  font-family: "Sono";
  font-weight: 500;
  color: var(--color-green-700);
`;

function CabinRow({ cabin }) {
  const { isDeleting, deleteCabin } = useDeleteCabin();
  const { isCreating, createCabin } = useCreateCabin();

  const {
    id: cabinId,
    name,
    maxCapacity,
    regularPrice,
    discount,
    image,
    description,
  } = cabin;

  function handleDuplicate() {
    createCabin({
      name: `Copy of ${name}`,
      maxCapacity,
      regularPrice,
      discount,
      image,
      description,
    });
  }

  return (
    <Table.Row>
      <Img src={image} />
      <Cabin>{name}</Cabin>
      <div>Fits up to {maxCapacity} guests</div>
      <Price>{formatCurrency(regularPrice)}</Price>
      {discount ? (
        <Discount>{formatCurrency(discount)}</Discount>
      ) : (
        <span>&mdash;</span>
      )}
      <div>
        <Modal>
          <Menus.Menu>
            <Menus.Toggle id={cabinId} />
            {/* we have many Menus on the page, so we are using the cabinId 
            to connect Toggle with the List to know which Toggle opens which List. 
            And then the parent component will keep track which cabin will be displayed 🤓 */}
            <Menus.List id={cabinId}>
              <Menus.Button icon={<HiSquare2Stack />} onClick={handleDuplicate}>
                Duplicate
              </Menus.Button>

              <Modal.Open opens="edit">
                <Menus.Button icon={<HiPencil />}>Edit</Menus.Button>
              </Modal.Open>

              <Modal.Open opens="delete">
                <Menus.Button icon={<HiTrash />}>Delete</Menus.Button>
              </Modal.Open>
            </Menus.List>

            <Modal.Window name="edit">
              <CreateCabinForm cabinToEdit={cabin} />
            </Modal.Window>

            <Modal.Window name="delete">
              <ConfirmDelete
                resourceName="cabins"
                disabled={isDeleting}
                onConfirm={() => deleteCabin(cabinId)}
              />
            </Modal.Window>
          </Menus.Menu>
        </Modal>
      </div>
    </Table.Row>
  );
}

export default CabinRow;

// import { useMutation } from "@tanstack/react-query";
// import { deleteCabin } from "../../services/apiCabins";
// import { useQueryClient } from "@tanstack/react-query";

// export default function CabinRow({ cabin }) {
//   const {
//     id: cabinId,
//     name,
//     maxCapacity,
//     regularPrice,
//     discount,
//     image,
//   } = cabin;

//   const queryClient = useQueryClient();

//   const { isLoading: isDeleting, mutate } = useMutation({
//     // mutationFn: (id) => deleteCabin(id),
//     // since the id is the same, we can write it like this, it's the same thing:
//     mutationKey: deleteCabin,
//     // invalidating the cache as soon as this mutation is done
//     // meaning: refetch and this must be called on the queryClient
//     onSuccess: () => {
//       alert("Cabin successfully deleted!");
//       queryClient.invalidateQueries({
//         // the unique query key we specify early
//         queryKey: ["cabins"],
//       });
//     },
//     // here we receive if there is an error from deleteCabin mutation  function
//     // whenever there is an error react query will try to fetch a few more times
//     onError: (err) => alert(err.message),
//   });

//   return (
//     <TableRow role="row">
//       <Img src={image} />
//       <Cabin>{name}</Cabin>
//       <Price>{regularPrice}</Price>
//       <Discount>{discount}</Discount>
//       <button onClick={() => mutate(cabinId)} disabled={isDeleting}>
//         Delete
//       </button>
//     </TableRow>
//   );
// }
