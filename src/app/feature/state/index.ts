import { Action, createReducer, MetaReducer, on } from '@ngrx/store';
import  {productAction} from './product-type';

export const productsFeatureKey = 'product';

export interface ProductState {
  selectedProduct: any;
  product: any;
  cacheTime: number | null;
  page: number;
  row: number;
  filter: string;
  searchTerm: string;
  searchResults: any;
  items: any[];

}

export const initialState: ProductState = {
  selectedProduct: undefined,

  product: undefined,
  cacheTime: null,
  page: 0,
  row: 10,
  filter: 'beauty',
  searchTerm: '',
  searchResults: undefined,
  items: []


};

export const productReducer = createReducer(
  initialState,
  on(productAction.loadDataSuccess, (state, { data }) => ({...state,data})),
  on(productAction.updateCacheTime, (state, { timestamp }) => ({ ...state, cacheTime: timestamp })),
  on(productAction.loadDataFailure, (state, { error }) => ({ ...state, error })),
  on(productAction.setPage, (state, { page ,row}) => ({ ...state, page, row })),
  on(productAction.setFilter, (state, { filter }) => ({ ...state, filter })),
  on(productAction.loadProductDetailsSuccess, (state, { product }) => ({ ...state, selectedProduct: product })),
  on(productAction.loadProductDetailsFailure, (state, { error }) => ({ ...state, error })),



  on(productAction.clearCart, state => ({
    ...state,
    items: []
  })),
  on(productAction.addToCart, (state, { product }) => {
    const existingProductIndex = state.items.findIndex(item => item.product?.id === product?.id);
    console.log(state.items);
    
    console.log(existingProductIndex);
    
    if (existingProductIndex !== -1) {
      // If the product is already in the cart, increment the count
      return {
        ...state,
        items: state.items.map((item, index) =>
          index === existingProductIndex
            ? { ...item, count: item.count + 1 }
            : item
        )
      };
    } else {
      // If the product is not in the cart, add it with a count of 1
      return {
        ...state,
        items: [...state.items, { product, count: 1 }]
      };
    }
  }),
  on(productAction.increaseCount, (state, { productId }) => {
    // Increase count for the specified productId
    return {
      ...state,
      items: state.items.map(item =>
        item.product.id === productId
          ? { ...item, count: item.count + 1 }
          : item
      )
    };
  }),
  on(productAction.decreaseCount, (state, { productId }) => {
    // Decrease count for the specified productId, ensuring count does not go below 1
    return {
      ...state,
      items: state.items.map(item =>
        item.product.id === productId
          ? { ...item, count: Math.max(item.count - 1, 1) }
          : item
      )
    };
  }),

  on(productAction.removeFromCart, (state, { product }) => {
    // Optionally handle complete removal of product
    return {
      ...state,
      items: state.items.filter(item => item.product.id !== product.id)
    };
  }),
);



  

/**   ...state,
    items:state.items?[...state.items, product]:[state.items,product] */

export function reducer(state: ProductState | undefined, action: Action) {
  return productReducer(state, action);
}

export const metaReducers: MetaReducer<ProductState>[] = [];
