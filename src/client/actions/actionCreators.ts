import { ProductActions } from './actions';
import { Product } from '../types'
import { actionTypes } from '../constants/actionTypes'

export const addProduct = (product: Product): ProductActions => ({
    type: actionTypes.ADD_PRODUCT,
    payload: product,
});
