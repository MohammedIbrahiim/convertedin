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
  on(productAction.addToCart, (state, { product }) => ({
    ...state,
    items:state.items?[...state.items, product]:[state.items,product]
  }))


  
);

export function reducer(state: ProductState | undefined, action: Action) {
  return productReducer(state, action);
}

export const metaReducers: MetaReducer<ProductState>[] = [];
