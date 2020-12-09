const initialState = {
    email: '',
    isLoggedIn: false
}


const GET_USER = 'GET_USER';
const LOGOUT_USER = 'LOGOUT_USER';

export function getUser(user){
    console.log(user)
    return {
        type: GET_USER,
        payload: user 
    }
}

export function logoutUser() {
    return {
      type: LOGOUT_USER,
      payload: initialState
    }
}

export default function reducer(state = initialState, action) {
    switch(action.type){
        case GET_USER:
            return {...state, email: action.payload.email, isLoggedIn: true}
        case LOGOUT_USER:
            return initialState; 
        default:
            return state;
    }
}