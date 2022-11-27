


const baseURL ='https://strangers-things.herokuapp.com/api/2207-FTB-ET-WEB-PT/';



// export const fetchPosts = async () => {
//     try{
//         const response = await fetch(`${baseURL}posts`)
//         console.log("response", response);
//         const {data} = await response.json();
//         console.log("This is data", data.posts);
//         return data.posts;
//     } catch(error) {
//         console.error("fetchPostsError", error);
//     }
// };

// export const registerUser = async (username, password) => {
//     try{
//     const response =await fetch(`${baseURL}users/register`,{
//         method: "POST", 
//         headers: {
//             'Content-Type': 'application/json'
//         },
//         body: JSON.stringify({
//             user: {
//                 username,
//                 password,
//             },
//         }),
//     });
//     console.log("response", response);
//     const data = await response.json();
//     console.log("data", data);
//     return data;
//     } catch(error) {
//         console.error("There was an error registering the user", error);
//     }
// };
        
// export const fetchUser = async(token) => {
//     try{
//         const response = await fetch(`${baseURL}users/me`, {  
//             headers: {
//             'Content-Type': 'application/json',
//             'Authorization': `Bearer ${token}`,
//           }})
//           console.log("USER RESPONSE", response);
//           const {data} = await response.json();
//           console.log("USER DATA", data );
//           return data;
//     }catch{
//         console.log('fetchUserError');
//     }
// };


// export const createPost = async () => {
// };

const makeHeaders = (token) => {
    const headers = {
        "Content-Type": "application/json",
    };
    
    if (token) {
        headers['Authorization'] = `Bearer ${token}`;
    }

    return headers;
};

const callAPI = async (endpointPath, defaultOptions={}) => {
    const options = {
        headers: makeHeaders(defaultOptions.token)
    };

    if (defaultOptions.method) {
        options.method = defaultOptions.method;
    };
    if (defaultOptions.body){
        options.body = JSON.stringify(defaultOptions.body);
    };

    const response = await fetch(`${baseURL}${endpointPath}`, options);
    const result = await response.json();

    return result;
};

export const fetchPosts = async () => {
    try{
        const {success, error, data} = await callAPI('posts');

        if (success){
            return {
                error: null, 
                posts: data.posts
            };
        }else {
            return {
                error: error.message,
                posts: []
            };
        }

    } catch(error) {
        console.error("fetchPostsError", error);

        return { 
            error: "Failed to load Posts",
            posts: []
        };
    }
};

export const registerUser = async (username, password) => {
    try{
        const {success, error, data} = await callAPI('users/register', {
            method: 'POST',
            body: {
                guest: {
                    username,
                    password
                },
            }
        });
      if (success) {
        return{
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
      };

    } catch(error) {
        console.error("There was an error registering the user", error);

        return {
            error: 'Registration Failed.',
            token: null,
            message: null
        };
    };
};
        
export const fetchUser = async(token) => {
    try{
        const response = await fetch(`${baseURL}users/me`, {  
            headers: makeHeaders(token),
        })
          console.log("USER RESPONSE", response);
          const {data} = await response.json();
          console.log("USER DATA", data );
          return data;
    }catch{
        console.log('fetchUserError');
    }
};


export const createPost = async () => {
};