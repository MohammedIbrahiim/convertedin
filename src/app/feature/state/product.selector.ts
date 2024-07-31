import { createFeatureSelector, createSelector } from "@ngrx/store";
import { ProductState } from "./reducer";

export const selectProductState= createFeatureSelector<ProductState>("product")

export const selectAllProducts = createSelector(
    selectProductState,
    (state: ProductState) => state.product
  );

  
  export const selectSearchResults = createSelector(
    selectAllProducts,
    selectProductState,
    (products, state: ProductState) => {
      if (!products) return [];
  
      // Apply search filter
      let filteredProducts = products;
      if (state.filter) {
        filteredProducts = products.filter((product: { name: string; }) =>
          product.name.toLowerCase().includes(state.filter.toLowerCase())
        );
      }
  
      return filteredProducts
    }
  );


  export const selectCartItems = createSelector(
    selectProductState,
    state => state.items
  );
