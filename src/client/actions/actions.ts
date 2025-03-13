// import actionType constants
import { actionTypes} from '../constants/actionTypes';
import { Product } from "../types";


interface AddProductAction {
    type: actionTypes.ADD_PRODUCT,
    payload: Product;
}

export type ProductActions = AddProductAction