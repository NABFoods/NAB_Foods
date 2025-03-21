import { createSlice, isAction, PayloadAction } from '@reduxjs/toolkit';
import { Links } from '../../../../types';

export interface MenuState {
  isOpen: boolean;
  links: {
    [id: number]: Links;
  };
}

const initialState: MenuState = {
  isOpen: false,
  links: {},
};

const menuSlice = createSlice({
  initialState,
  name: 'menu',
  reducers: {
    openMenu: (state, action: PayloadAction<any>) => {
      let isOpen = action.payload;

      isOpen === false ? (isOpen = true) : (isOpen = false);
      console.log(isOpen);
      state.isOpen = isOpen;
    },
    createLinks: (state, action: PayloadAction<any>) => {
      const menuLinks = action.payload;

      menuLinks.forEach((link: Links) => {
        state.links[link.id] = link;
      });
    },
  },
});

export const { openMenu, createLinks } = menuSlice.actions;
export default menuSlice.reducer;
