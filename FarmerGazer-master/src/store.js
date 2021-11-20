/**
 * @author Di Wang
 */
import { createStore, applyMiddleware } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage/session';
import thunk from 'redux-thunk';
import reducer from './reducer';

const persistConfig = {
	key: 'root',
	storage,
};

const persistedReducer = persistReducer(persistConfig, reducer);

let store = createStore(persistedReducer, applyMiddleware(thunk));
let persistor = persistStore(store);

export { store, persistor };
