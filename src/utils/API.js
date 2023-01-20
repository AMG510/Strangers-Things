const BASE_URL = "https://strangers-things.herokuapp.com/api/2209-ftb-pt-web-pt/";



export async function registerUser(user) {
    const response = await fetch(`${BASE_URL}/users/register`, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(user)
    })
    const data = await response.json();
    return data;
}

export async function loginUser(user) {
    const response = await fetch(`${BASE_URL}/users/login`, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(user)
    })
    const data = await response.json();
    return data;
}

export async function fetchAllPost () {
    const response = await fetch(`${BASE_URL}/posts`);
    const result = await response.json();
    return result.data.posts;
}

export async function myPost(token) {
    const response = await fetch(`${BASE_URL}/users/me`, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    })
    const result = await response.json();
    return result.posts;
}
export async function addPost (post, token) {
    const response = await fetch(`${BASE_URL}/posts`, {
        method: "POST",
        headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(post)
    })
    const result = await response.json();
    return result.data.post;
}
export async function postDelete (postId, token) {
    const response = await fetch(`${BASE_URL}/posts/${postId}`, {
        method: "DELETE",
        headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
        }
    })
    const result = await response.json();
    if (result.error) throw result.error;
    return;
}

export async function myMessages (token) {
    const response = await fetch(`${BASE_URL}/users/me`, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    })
    const result = await response.json();
    return result.data;
}

export async function sendMessage (message, postId, token) {
    const response = await fetch(`${BASE_URL}/posts/${postId}/messages`, {
        method: "POST",
        headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(message)
    })
    const result = await response.json();
    return result.data.message;
}
