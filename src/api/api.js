const baseURL ='https://strangers-things.herokuapp.com/api/2207-FTB-ET-WEB-PT/';

const makeHeaders = (token) => {
    console.log("running makeHeaders")
    const headers = {
        "Content-Type": "application/json",
    };
    
    if (token) {
        headers['Authorization'] = `Bearer ${token}`;
    }

    return headers;
};

// const callAPI = async (endpointPath, defaultOptions={}) => {
//     const options = {
//         headers: makeHeaders(defaultOptions.token)
//     };

//     if (defaultOptions.method) {
//         options.method = defaultOptions.method;
//     };
//     if (defaultOptions.body){
//         options.body = JSON.stringify(defaultOptions.body);
//     };

//     try{
//         const response = await fetch(`${baseURL}${endpointPath}`, options);
//         const {success, error, data} = await response.json();

//         if (success) {
//             return {
//                 success: success,
//                 error: null,
//                 data: data
//             };
//         } else {
//             return {
//                 success: success,
//                 error: error.message,
//                 data: null
//             };
//         }
//     } catch {error} {
//         console.error(`Failed while calling ${endpointPath}:`, error);

//       return {
//         success: false,
//         error: defaultOptions.defaultError,
//         data: null
//       };
//     }
// };


const callAPI = async (endpointPath, defaultOptions={}) => {
    console.log("running callAPI")
    const { token, method, body } = defaultOptions;

    const options = {
        headers: makeHeaders(token)
    };

    if (method) {
        options.method=method;
    }

    if (body) {
        options.body=JSON.stringify(body);
    }

    const response=await fetch(`${baseURL}${endpointPath}`, options);
    const result=await response.json();

    return result;
};


// export const fetchPosts = async () => {
//     const {success, error, data} = await callAPI('posts', {
//         defaultError: 'failed to load Posts'
//     });

//     return {
//         error: error,
//         posts: success ? data.posts : []
//     };
// };

export const fetchPosts = async(token) => {
    try{
        console.log("running fetchPosts")
        const {success, error, data} = await callAPI("posts", {
            token:token,
        });

        if (success) {
            return {
                error: null,
                posts: data.posts
            };
        } else {
            return {
                error: error.message,
                posts: []
            };
        }
    } catch (error) {
        console.error("Error in fetchPosts!!!", error);
        return {
            error: "Failed to load Posts",
            posts: []
        };
    }
};

// export const registerUser = async (username, password) => {
//     const {success, error, data} = await callAPI('users/register', {
//         method: 'POST',
//         body: {
//             user: {
//                 username,
//                 password
//             },
//         },
//         defaultError: 'Registration Failed.'
//     });

//     return {
//         error: error,
//         token: success ? data.token : null
//     };
// };
     
export const registerUser = async(username, password) => {
    try {
        console.log("running registerUser")
        const {success, error, data} = await callAPI("users/register", {
            method: "POST", 
            body: {
                user: {
                    username, 
                    password
                },
            },
        });

        if (success) {
            return {
                error: null, 
                token: data.token,
                message: data.message
            };
        } else {
            return {
                error: error.message,
                token: null,
                message: null
            };
        }
    } catch(error) {
        console.error("Error in registerUser!!!", error);

        return {
            error: "Registration Failed.",
            token: null,
            message: null
        };
    }
};


// export const fetchUser = async(token) => {
//     const {success, error, data} = await fetch('users/me', {
//         token: token,
//         defaultError: 'Failed to load User information'
//     });
//     return {
//         error: error,
//         user: success ? data.user : null
//     };
// };

export const fetchUser = async(token) => {
    try {
        console.log("running fetchUser")
        const {success, error, data} = await callAPI("users/me", {
            token: token
        });
        if (success) {
            return {
                error: null,
                user: data.username
            };
        }
    } catch(error) {
        console.error("Error in fetchUser!!", error);

        return {
            error: "Failed to load User information",
            user: null
        };
    }
};

// export const createPost = async (
//     token, 
//     title, 
//     description, 
//     price, 
//     location 
//     ) => {
//     const post = {
//         title: title,
//         description: description,
//         price: price
//     };
//     if (location) {
//         post.location = location;
//     }

//     const {success, error, data} = await callAPI('posts', {
//         token: token,
//         method: 'POST',
//         body: {
//             post: post
//         },
//         defaultError: "Failed to create Post"
//     });
//     return {
//         error: error,
//         post: success ? data.post: null
//     };
// }

export const createPost = async(
    token, 
    title,  
    description,
    price,
    location) => {
    try {
        console.log("running createPost")
        const post = {
            title: title,
            description: description,
            price: price
        };
        if (location) {
            post.location = location;
        }
        const { success, error, data} = await callAPI("posts", {
            token: token,
            method: "POST", 
            body: {
                post: post
            },
        });

        if (success) {
            return {
                error: null,
                post: data.post
            };
        }
    } catch (error) {
        console.error("Error in createPost!!", error);

        return { 
            error: "Failed to create post",
            post: null
        };
    }
}; 

export const loginUser = async(username, password) => {
    try {
        console.log("running loginUser")
        const {success, error, data} = await callAPI("users/login", {
            method: "POST", 
            body: {
                user: {
                    username, 
                    password
                },
            },
        });

        if (success) {
            return {
                error: null, 
                token: data.token,
                message: data.message
            };
        } else {
            return {
                error: error.message,
                token: null,
                message: null
            };
        }
    } catch(error) {
        console.error("Error in loginUser!!!", error);

        return {
            error: "Login Failed.",
            token: null,
            message: null
        };
    }
};

export const deletePost = async(token, postId) => {
    try {
        console.log("running deletePost")

        const{success, error, data} = await callAPI(`posts/${postId}`, {
            method: "DELETE",
            token: token,
        });
        
        if(success) {
            return {
                error: null,
                data:null
            };
        }else{ 
            return { 
                error: error.message,
                data:null
            };
        }
        
    }catch(error){
        console.error("Error in deletePost", error);
        return{
            error: "Failed to delete post",
            data:null
        };
    }
};