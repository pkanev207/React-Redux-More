/* eslint-disable no-unused-vars */
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getAddress } from "../../services/apiGeocoding";

function getPosition() {
  return new Promise(function (resolve, reject) {
    navigator.geolocation.getCurrentPosition(resolve, reject);
  });
}

// We can not just call async functions in reducer - Redux is by nature completely synchronous
// This will become our fetchAddress function to call later in our code
// Should not called it with smth like "getAddress", cause "get" is reserved for the selectors
// this will produce three additional action types - one for each - pending, fulfilled, rejected
export const fetchAddress = createAsyncThunk(
  // this is the action type name, Redux needs it internally:
  "user/fetchAddress",
  // the actual code we want to execute, as soon as the action is dispatch:
  async function () {
    // 1) We get the user's geolocation position
    const positionObj = await getPosition();
    const position = {
      latitude: positionObj.coords.latitude,
      longitude: positionObj.coords.longitude,
    };

    // 2) Then we use a reverse geocoding API to get a description of the user's address,
    // so we can display it the order form, so that the user can correct it if wrong
    const addressObj = await getAddress(position);
    const address = `${addressObj?.locality}, ${addressObj?.city} ${addressObj?.postcode}, ${addressObj?.countryName}`;

    // 3) Then we return an object with the data that we are interested in.
    // Payload of the FULFILLED state!!!
    return { position, address };
  },
);

const initialState = {
  username: "Jonasss",
  status: "idle",
  position: {},
  address: "",
  error: "",
};

// here we create a slice of global ui state, called "user"
const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    updateName(state, action) {
      state.username = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      // the actual reducer finally comes into play...
      .addCase(fetchAddress.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(fetchAddress.fulfilled, (state, action) => {
        state.position = action.payload.position;
        state.address = action.payload.address;
        state.status = "idle";
      })
      .addCase(fetchAddress.rejected, (state, action) => {
        state.status = "error";
        state.error = "There was a problem getting your address. Try again!";
        // error string is auto placed on action.error ???
        // state.error = action.error.message;
      });
  },
});

// here we will get access to the action creators
export const { updateName } = userSlice.actions;

export default userSlice.reducer;
