var initState = {
    apiBaseUrl: process.env.REACT_APP_API_BASE_URL,
    isUserAuthenticated: false,
}

const publicReducer = (state = initState, action) => {
    switch(action.type){
        case 'AUTHENTICATE':
            state.isUserAuthenticated = true;
            console.log("this action is dispatched", state);
            return state;
        
        case 'GET_USER_DATA':
            return {
                userData : action.data,
            };

        case 'GET_API_URL':
            return state;

        default:
            return state;
    }
}

export default publicReducer;