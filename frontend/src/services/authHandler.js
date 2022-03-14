export function setToken(userToken) {
    userToken = 'Bearer ' + userToken;
    sessionStorage.setItem('token', JSON.stringify(userToken));
}
  
export function getToken() {
    const tokenString = sessionStorage.getItem('token');
    const userToken = JSON.parse(tokenString);
    return userToken
}

export function deleteTokens() {
    sessionStorage.clear();
}

export function setUserID(userID) {
    sessionStorage.setItem('user', JSON.stringify(userID));
}
  
export function getUserID() {
    const userIdString = sessionStorage.getItem('user');
    const userId = JSON.parse(userIdString);
    return userId
}

export function setAdminID(adminID) {
    sessionStorage.setItem('admin', JSON.stringify(adminID));
}
  
export function getAdminID() {
    const adminIdString = sessionStorage.getItem('admin');
    const adminId = JSON.parse(adminIdString);
    return adminId
}