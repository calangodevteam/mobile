import { createSlice } from '@reduxjs/toolkit';

interface ThemeSliceData {
    isThemeDark: boolean,
}

const initialState: ThemeSliceData = {
    isThemeDark: false,
};

const themeSlice = createSlice({
    name: 'theme',
    initialState,
    reducers: {
        toggleTheme: (state) => {
        state.isThemeDark = !state.isThemeDark;
      },
    },
  });

export const { toggleTheme } = themeSlice.actions;

export default themeSlice.reducer;
