import { configureStore } from "@reduxjs/toolkit";
import { persistReducer, persistStore } from 'redux-persist';
import AsyncStorage from "@react-native-async-storage/async-storage";
import authReducer from "./reducers/authReducer";
import thunk from 'redux-thunk';
import isVerticalReducer from "./reducers/isVerticalReducer";
import contactsReducer from "./reducers/contactsReducer";

const authPersistConfig = {
    key: 'auth',
    storage: AsyncStorage,
}
const contactPersistConfig = {
    key: 'contact',
    storage: AsyncStorage,
}

const authPersistedReducer = persistReducer(authPersistConfig, authReducer)
const contactsPersistedReducer = persistReducer(contactPersistConfig, contactsReducer)
const Store = configureStore({
    reducer: {
        auth: authPersistedReducer,
        contacts: contactsPersistedReducer,
        isVertical: isVerticalReducer,
    },
    middleware: [thunk]
})

export type RootState = ReturnType<typeof Store.getState>;
export type AppDispatch = typeof Store.dispatch;
export const persistor = persistStore(Store)
export default Store;