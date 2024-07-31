import { createAction, props } from '@ngrx/store';

export const loadData = createAction('[Cache] Load Data', props<{ page: number , row:number, filter: string }>());
export const loadDataSuccess = createAction('[Cache] Load Data Success', props<{ data: any }>());
export const loadDataFailure = createAction('[Cache] Load Data Failure', props<{ error: any }>());
export const updateCacheTime = createAction('[Cache] Update Cache Time', props<{ timestamp: number }>());
export const setPage = createAction('[Cache] Set Page', props<{ page: number ,row:number}>());
export const setFilter = createAction('[Cache] Set Filter', props<{ filter: string }>());



export const selectProduct = createAction(
    '[Product] Select Product',
    props<{ id: number }>()
  );
  export const loadProductDetails = createAction(
    '[Product] Load Product Details',
    props<{ id: number }>()
  );
  export const loadProductDetailsSuccess = createAction(
    '[Product] Load Product Details Success',
    props<{ product: any }>()
  );
  export const loadProductDetailsFailure = createAction(
    '[Product] Load Product Details Failure',
    props<{ error: any }>()
  );



export const clearCart = createAction('[Cart] Clear Cart');

  export const addToCart = createAction(
    '[Cart] Add To Cart',
    props<{ product: any }>()
  );

  export const removeFromCart = createAction(
    '[Cart] Remove from Cart',
    props<{ productId: number }>()
  );

