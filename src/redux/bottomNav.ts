import { createSlice } from '@reduxjs/toolkit';
import { PURGE } from 'redux-persist';

interface BottomNavData {
    visible: boolean,
    badgeCamp: number | false,
    badgeRank: number | false,
    badgeNotify: number | false,
    badgeUser: number | false,
}

const initialState: BottomNavData = {
    visible: true,
    badgeCamp: false,
    badgeRank: false,
    badgeNotify: false,
    badgeUser: false,
};

const bottomNav = createSlice({
    name: 'bottomNav',
    initialState,
    reducers: {
      ocultarBottom:  (state) => {
        state.visible = false;
      },
      exibirBottom:  (state) => {
        state.visible = true;
      },
      setBadgeCamp: (state, action) => {
        state.badgeCamp = action.payload;
      },
      setBadgeRank: (state, action) => {
        state.badgeRank = action.payload;
      },
      setBadgeNotify: (state, action) => {
        state.badgeNotify = action.payload;
      },
      setBadgeUser: (state, action) => {
        state.badgeUser = action.payload;
      },
    },
    extraReducers: (builder) => {
      builder.addCase(PURGE, () => {
        return initialState;
      });
    },
  });

export const { ocultarBottom, exibirBottom,  setBadgeCamp, setBadgeNotify, setBadgeUser } = bottomNav.actions;

export default bottomNav.reducer;
