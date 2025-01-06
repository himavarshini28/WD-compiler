import { createSlice } from "@reduxjs/toolkit";
import { PayloadAction } from "@reduxjs/toolkit";

export interface CompilerSliceStateType {
  fullCode: { html: string; css: string; javascript: string };
  currentLanguage: "html" | "css" | "javascript";
  currentCode: string;
}

const initialState: CompilerSliceStateType = {
  fullCode: {
    html: "This is HTML code",
    css: "This is CSS code",
    javascript: "This is Javascript code",
  },
  currentLanguage: "html",
  currentCode: "",
};

const compilerSlice = createSlice({
  name: "compilerSlice",
  initialState,
  reducers: {
    updateCurrentLanguage: (
      state,
      action: PayloadAction<CompilerSliceStateType["currentLanguage"]>
    ) => {
      state.currentLanguage = action.payload;
    },
    updateCode: (
      state,
      action: PayloadAction<string>
    ) => {
      state.fullCode[state.currentLanguage] = action.payload;
    },
  },
});

export default compilerSlice.reducer;
export const { updateCurrentLanguage, updateCode } = compilerSlice.actions;
