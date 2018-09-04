export const ADD_AUTHED_USER = 'ADD_AUTHED_USER';

export function addAuthorizedUser(id) {
    return {
        type: ADD_AUTHED_USER,
        id: id,
    }
}
