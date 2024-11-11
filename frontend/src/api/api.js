const API_URL = 'http://localhost:3000/api';

const signup = async (userData) => {
    try{
        const response = await fetch(`${API_URL}/auth/signup`,{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(userData),
        })

        const data = await response.json();
        return data;
    }
    catch(err){
        console.error('Error Signing up',err);
        throw err;
    }
}

const signin = async (userData) => {
    try{
        const response = await fetch(`${API_URL}/auth/signin`,{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(userData),
        })

        const data = await response.json();
        if(data.token){
            localStorage.setItem('token',data.token);
        }
        return data;
    }
    catch(error){
        console.error('Error Signin in',error);
        throw error;
    }
}

export {
    signup,
    signin,
}