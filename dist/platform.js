import {SAVE_KEY,restoreState} from './engine.js';
// Replace this adapter with native storage, ads and billing in each app build.
export const platform={
  name:'web', ads:false, payments:false,
  load(){try{return restoreState(localStorage.getItem(SAVE_KEY));}catch{return restoreState(null);}},
  save(state){try{localStorage.setItem(SAVE_KEY,JSON.stringify(state));return true;}catch{return false;}},
};
