import {Provider} from "react-redux";
import App, {Container} from 'next/app';
import thunkMiddleware from "redux-thunk";
import {applyMiddleware, combineReducers, createStore} from "redux";
import {composeWithDevTools} from "redux-devtools-extension";
import storage from 'redux-persist/lib/storage';
import {NotificationContainer} from 'react-notifications';


import {persistReducer, persistStore} from 'redux-persist';
import {PersistGate} from "redux-persist/integration/react";
import phaseData from "../store/reducers/phaseStore";
import auth from "../store/reducers/auth";
import AuthModal from "../components/AuthModal";

import '../styles/sass/main.scss';
import 'react-notifications/lib/notifications.css';
import 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css';
import 'filepond/dist/filepond.min.css'

const persistConfig = {
    key: 'root',
    storage,
    blacklist: ['auth']
}

const reducers = combineReducers({
    auth: auth,
    phaseData: persistReducer(persistConfig, phaseData)
});

const store = process.env.environment === 'dev' ? createStore(reducers, composeWithDevTools(applyMiddleware(thunkMiddleware))) : createStore(reducers, applyMiddleware(thunkMiddleware));


const persistor = persistStore(store);

export default class extends App {
    render() {
        const {Component, pageProps} = this.props;

        return <Provider store={store}>
                <PersistGate persistor={persistor} loading={null}>
                    <Component {...pageProps} />
                    <AuthModal />
                    <NotificationContainer/>
                </PersistGate>
        </Provider>
    }
}
