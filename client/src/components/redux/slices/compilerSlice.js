import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentLanguage: "html",
  fullCode: {
    html: "",
    css: "",
    javascript: "",
  },
};

const compilerSlice = createSlice({
  name: "compilerSlice",
  initialState,
  reducers: {
    updateCode: (state, action) => {
      state.fullCode[state.currentLanguage] = action.payload;
    },
    setLanguage: (state, action) => {
      state.currentLanguage = action.payload;
    },
  },
});

export const { updateCode, setLanguage } = compilerSlice.actions;
export default compilerSlice.reducer;
