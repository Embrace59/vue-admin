import cookie from "cookie_js";

const adminToken = 'admin_token';
const usernameKey = "username";

export function cookieGetToken() {
    return cookie.get(adminToken);
}

export function cookieSetToken(token) {
    console.log(token);
    cookie.set(adminToken, token)
}

export function cookieRemoveToKen() {
    return cookie.remove(adminToken);
}

export function cookieSetUserName(value) {
    return cookie.set(usernameKey, value);
}

export function cookieGetUserName() {
    return cookie.get(usernameKey);
}

export function cookieRemoveUserName() {
    return cookie.remove(usernameKey);
}