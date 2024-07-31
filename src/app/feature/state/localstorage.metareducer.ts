import { ActionReducer, INIT, UPDATE } from '@ngrx/store';
import { AppState } from '../../reducers';
import { ProductState } from './reducer';

export function localStorageMetaReducer(reducer: ActionReducer<any>): ActionReducer<any> {
  return (state, action) => {
    if (action.type === INIT || action.type === UPDATE) {
      const storageValue = localStorage.getItem('state');
      if (storageValue) {
        return JSON.parse(storageValue);
      }
    }

    const nextState = reducer(state, action);
    localStorage.setItem('state', JSON.stringify(nextState));
    return nextState;
  };
}
