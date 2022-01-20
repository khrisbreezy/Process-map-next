import { LOGIN, LOGOUT } from '../actions/auth';

import Cookies from 'js-cookie';

const token = Cookies.get('token'), user = Cookies.get('user');

const initialState = {
    loggedIn: !!token && !!user,
    user: user || null,
    token: token || token
};

const auth = (state = initialState, action) => {
    switch (action.type) {
        case LOGIN:
            const {user, token} = action.data;
            return {
                ...state,
                user,
                token,
                loggedIn: true
            }
        case LOGOUT:
            return {
                ...state,
                user: null,
                token: null,
                loggedIn: false
            }

        default:
            return state;
    }
};

export default auth;
