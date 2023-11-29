/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { useForm } from "react-hook-form";

import Input from "../../ui/Input";
import Form from "../../ui/Form";
import Button from "../../ui/Button";
import FileInput from "../../ui/FileInput";
import Textarea from "../../ui/Textarea";
import FormRow from "../../ui/FormRow";

import { useCreateCabin } from "./useCreateCabin";
import { useEditCabin } from "./useEditCabin";

function CreateCabinForm({ cabinToEdit = {}, onCloseModal }) {
  const { isCreating, createCabin } = useCreateCabin();
  const { isEditing, editCabin } = useEditCabin();
  const isWorking = isCreating || isEditing;

  const { id: editId, ...editValues } = cabinToEdit;
  const isEditSession = Boolean(editId);

  const { register, handleSubmit, reset, getValues, formState } = useForm({
    defaultValues: isEditSession ? editValues : {},
  });
  const { errors } = formState;

  function onSubmit(data) {
    const image = typeof data.image === "string" ? data.image : data.image[0];

    if (isEditSession)
      editCabin(
        { newCabinData: { ...data, image }, id: editId },
        {
          onSuccess: (data) => {
            reset();
            onCloseModal?.();
          },
        },
      );
    else
      createCabin(
        { ...data, image: image },
        {
          onSuccess: (data) => {
            reset();
            onCloseModal?.();
          },
        },
      );
  }

  function onError(errors) {
    console.error(errors);
  }

  return (
    <Form
      onSubmit={handleSubmit(onSubmit, onError)}
      // a nice trick to understand if the Form is in the modal:
      type={onCloseModal ? "modal" : "regular"}
    >
      <FormRow label="Cabin name" error={errors?.name?.message}>
        <Input
          type="text"
          id="name"
          disabled={isWorking}
          {...register("name", {
            required: "This field is required",
          })}
        />
      </FormRow>

      <FormRow label="Maximum capacity" error={errors?.maxCapacity?.message}>
        <Input
          type="number"
          id="maxCapacity"
          disabled={isWorking}
          {...register("maxCapacity", {
            required: "This field is required",
            min: {
              value: 1,
              message: "Capacity should be at least 1",
            },
          })}
        />
      </FormRow>

      <FormRow label="Regular price" error={errors?.regularPrice?.message}>
        <Input
          type="number"
          id="regularPrice"
          disabled={isWorking}
          {...register("regularPrice", {
            required: "This field is required",
            min: {
              value: 1,
              message: "Capacity should be at least 1",
            },
          })}
        />
      </FormRow>

      <FormRow label="Discount" error={errors?.discount?.message}>
        <Input
          type="number"
          id="discount"
          disabled={isWorking}
          defaultValue={0}
          {...register("discount", {
            required: "This field is required",
            validate: (value) =>
              value <= getValues().regularPrice ||
              "Discount should be less than regular price",
          })}
        />
      </FormRow>

      <FormRow
        label="Description for website"
        error={errors?.description?.message}
      >
        <Textarea
          type="number"
          id="description"
          defaultValue=""
          disabled={isWorking}
          {...register("description", {
            required: "This field is required",
          })}
        />
      </FormRow>

      <FormRow label="Cabin photo">
        <FileInput
          id="image"
          accept="image/*"
          {...register("image", {
            required: isEditSession ? false : "This field is required",
          })}
        />
      </FormRow>

      <FormRow>
        {/* type is an HTML attribute! */}
        <Button
          variation="secondary"
          type="reset"
          // This form can be reused outside the modal,
          // so we should optional chain in a callback
          onClick={() => onCloseModal?.()}
        >
          Cancel
        </Button>
        <Button disabled={isWorking}>
          {isEditSession ? "Edit cabin" : "Create new cabin"}
        </Button>
      </FormRow>
    </Form>
  );
}

export default CreateCabinForm;

// /* eslint-disable react/prop-types */
// import { useMutation, useQueryClient } from "@tanstack/react-query";
// import { toast } from "react-hot-toast";

// import Input from "../../ui/Input";
// import Form from "../../ui/Form";
// import Button from "../../ui/Button";
// import FileInput from "../../ui/FileInput";
// import Textarea from "../../ui/Textarea";
// import FormRow from "../../ui/FormRow";

// import { useForm } from "react-hook-form";
// // import { createCabin } from "../../services/apiCabins";
// import { createEditCabin } from "../../services/apiCabins";

// function CreateCabinForm({ cabinToEdit = {}, onCloseModal }) {
//   const { register, handleSubmit, reset, getValues, formState } = useForm();
//   const { errors } = formState;

//   const queryClient = useQueryClient();

//   const { mutate, isLoading: isCreating } = useMutation({
//     // mutationFn: (newCabin) => createEditCabin(newCabin),
//     // the same thing as:
//     mutationFn: createEditCabin,
//     onSuccess: () => {
//       toast.success("New cabin successfully created");
//       queryClient.invalidateQueries({ queryKey: ["cabins"] });
//       reset();
//       onCloseModal?.();
//     },
//     onError: (err) => toast.error(err.message),
//   });

//   function onSubmit(data) {
//     console.log(data);
//     mutate({ ...data, image: data.image[0] });
//   }

//   function onError(errors) {
//     console.error(errors);
//   }

//   return (
//     // in case of error onSubmit won't be called, but onError
//     <Form onSubmit={handleSubmit(onSubmit, onError)}>
//       <FormRow label="Cabin name" error={errors?.name?.message}>
//         <Input
//           type="text"
//           id="name"
//           disabled={isCreating}
//           {...register("name", {
//             required: "This field is required",
//           })}
//         />
//       </FormRow>

//       <FormRow label="Maximum capacity" error={errors?.maxCapacity?.message}>
//         <Input
//           type="number"
//           id="maxCapacity"
//           disabled={isCreating}
//           {...register("maxCapacity", {
//             required: "This field is required",
//             min: {
//               value: 1,
//               message: "Capacity should be at least 1",
//             },
//           })}
//         />
//       </FormRow>

//       <FormRow label="Regular price" error={errors?.regularPrice?.message}>
//         <Input
//           type="number"
//           id="regularPrice"
//           disabled={isCreating}
//           {...register("regularPrice", {
//             required: "This field is required",
//             min: {
//               value: 1,
//               message: "Something wrong with the price",
//             },
//           })}
//         />
//       </FormRow>

//       <FormRow label="Discount" error={errors?.discount?.message}>
//         <Input
//           type="number"
//           id="discount"
//           disabled={isCreating}
//           defaultValue={0}
//           {...register("discount", {
//             required: "This field is required",
//             validate: (value) =>
//               value <= getValues().regularPrice ||
//               "Discount should be less than regular price",
//           })}
//         />
//       </FormRow>

//       <FormRow
//         label="Description for website"
//         disabled={isCreating}
//         error={errors?.description?.message}
//       >
//         <Textarea
//           type="number"
//           id="description"
//           defaultValue=""
//           disabled={isCreating}
//           {...register("description", {
//             required: "This field is required",
//           })}
//         />
//       </FormRow>

//       <FormRow label="Cabin photo">
//         <FileInput
//           id="image"
//           accept="image/*"
//           // in the styled component
//           // type="file"
//           {...register("image", {
//             required: "This field is required",
//           })}
//         />
//       </FormRow>

//       <FormRow>
//         {/* This simply works because type reset is an HTML attribute! */}
//         <Button variation="secondary" type="reset">
//           Cancel
//         </Button>
//         <Button disabled={isCreating}>Add cabin</Button>
//       </FormRow>
//     </Form>
//   );
// }

// export default CreateCabinForm;
