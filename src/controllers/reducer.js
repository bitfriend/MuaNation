
import { combineReducers } from 'redux';

import appReducer from './app/reducer';
import authReducer from './auth/reducer';
import artistReducer from './artist/reducer';
import productReducer from './product/reducer';
import relationReducer from './relation/reducer';
import reviewReducer from './review/reducer';
import discoverReducer from './discover/reducer';

const rootReducer = combineReducers({
  app: appReducer,
  auth: authReducer,
  artist: artistReducer,
  product: productReducer,
  relation: relationReducer,
  review: reviewReducer,
  discover: discoverReducer
});

export default rootReducer;
