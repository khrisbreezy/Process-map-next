import Cookies from 'js-cookie';
import {NotificationManager} from 'react-notifications';

import axiosInstance from '../../config/axios';


export const LOGIN = 'LOGIN';
export const LOGOUT = 'LOGOUT';


export const loginAsync = (data) => {
    let newData = data;
    return async dispatch => {
        try {
            const {data: response} = await axiosInstance.post(`login`, newData);
            dispatch(storeAuth(response.data));
            NotificationManager.success(response.message, '', 5000);
        } catch (error) {
            NotificationManager.error(error.response.data.message, '', 5000);
            return 'error';
        }
    }
}


export const storeAuth = data => {
    Cookies.set('token', data.token, { secure: true });
    Cookies.set('user', JSON.stringify(data.user), { secure: true });
    return {
        type: 'LOGIN',
        data
    }
};


export const logout = () => {
    Cookies.remove('token');
    Cookies.remove('user');

    return {
        type: LOGOUT
    }
}
