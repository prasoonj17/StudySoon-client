import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    // Token is stored as a plain string, so no need for JSON.parse
    token: localStorage.getItem("token") || null,
    // Add other data (e.g., user data) if needed
    signupData: null,
};

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        // Set signup data
        setSignupData: (state, value) => {
            state.signupData = value.payload;
        },
        // Set token (for login, signup, etc.)
        setToken: (state, value) => {
            state.token = value.payload;  // Redux state me token set karna
            console.log("Hii ASjhcsk - ",value.payload);
            localStorage.setItem("token", value.payload);  // localStorage me token store karna
        }
        
    },
});

export const { setToken, setSignupData } = authSlice.actions;
export default authSlice.reducer;
