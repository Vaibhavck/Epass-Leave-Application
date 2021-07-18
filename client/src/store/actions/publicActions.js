import axios from 'axios';

const getCurrentUser = () => {
    return (dispatch) => {
        var apiBaseUrl = process.env.REACT_APP_API_BASE_URL;
        var token = localStorage.getItem('token');

        if(token) axios({
            url: apiBaseUrl + '/auth/me',
            headers: {
                'Authorization': `Bearer ${token}`,
            },
            method: "GET",
            withCredentials: true,
        }).then((res)=>{
            dispatch({
                type: 'GET_USER_DATA',
                data: res.data
            })
        }).catch(e=>{
            dispatch({
                type: 'GET_USER_DATA',
                data: ''
            })
        })
        else dispatch({
            type: 'GET_USER_DATA',
            data: ''
        })
        // axios({
        //     url: apiBaseUrl + '/users/getCurrentUser',
        //     method: "GET",
        //     withCredentials: true,
        // }).then((res)=>{
        //     dispatch({
        //         type: 'GET_USER_DATA',
        //         data: res.data
        //     })
        // });
    }
}

export default getCurrentUser;