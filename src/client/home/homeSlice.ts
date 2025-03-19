import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Product } from '../../types';

// Type for ProductState
// export interface HomeState {
//   // Object w/ keys equal to product id
//   foodCard: {
//     product_name: string;
//     price: number;
//     sold_out: boolean;
//     img_url: string;
//     description: string;
//   };
// }

export interface HomeState {
  foodCard: { [id: number]: Product };
}

export type product = {
  products: {};
};

// Initial state for productsSlice
const initialState: HomeState = {
  foodCard: {},
};

//Using toolkit's createSlice to create reducers for homeSlice
const homeSlice = createSlice({
  initialState,
  name: 'home',
  reducers: {
    //   useEffect(() => {
    //     fetch('http://localhost:3000/api')
    //     .then(response => response.json())
    //     .then(data => {
    //       console.log(data.menu)
    //       dispatch(getFoodInfo(data.menu))
    //   })
    getFoodInfo: (state, action: PayloadAction<any>) => {
      //state.foodCard = action.payload;

      const products = action.payload;
      // console.log(products);
      products.forEach((product: Product) => {
        state.foodCard[product.id] = product;
        // console.log('FOOD CARD IS THIS', state.foodCard);
      });
    },
    // receivedProducts(state, action: PayloadAction<Product[]>) {
    //   const products = action.payload;
    //   products.forEach((product) => {
    //     state.products[product.id] = product;
    //   });
    // }, // define reducers here}
  },
});

// extracts & exports action creator (receivedProducts) as a .actions object containing all action creators of productsSlice
export const { getFoodInfo } = homeSlice.actions;
export default homeSlice.reducer;
