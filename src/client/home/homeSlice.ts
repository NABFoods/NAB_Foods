import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// Type for ProductState
export interface HomeState {
  // Object w/ keys equal to product id
  foodCard: {
    product_name: string;
    price: number;
    sold_out: boolean;
    img_url: string;
    description: string;
  };
}

export type product = {
  product_name: string;
};

// Initial state for productsSlice
const initialState: HomeState = {
  foodCard: {
    product_name: '',
    price: 0,
    sold_out: false,
    img_url: '',
    description: '',
  },
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
      state.foodCard = action.payload;
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
