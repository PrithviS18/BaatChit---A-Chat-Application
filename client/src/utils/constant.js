export const HOST = import.meta.env.VITE_SERVER_URL;

export const AUTH_ROUTES = 'api/auth';
export const SIGNUP_ROUTE = `${AUTH_ROUTES}/signup`;
export const LOGIN_ROUTE = `${AUTH_ROUTES}/login`;
export const GET_USER_INFO = `${AUTH_ROUTES}/user-info`;
export const UPDATE_PROFILE = `${AUTH_ROUTES}/update-profile`;
export const ADD_PROFILE_IMAGE = `${AUTH_ROUTES}/add-profile-image`;
export const DELETE_PROFILE_IMAGE = `${AUTH_ROUTES}/delete-profile-image`;
export const LOGOUT_ROUTE =`${AUTH_ROUTES}/logout`;

export const CONTACTS_ROUTE='api/contacts';
export const SEARCH_CONTACTS_ROUTE=`${CONTACTS_ROUTE}/search`;
export const GET_ALL_CONTACTS_ROUTE =`${CONTACTS_ROUTE}/get-all-contacts`;

export const MESSAGES_ROUTE = "api/messages";
export const GET_ALL_MESSAGES_ROUTE = `${MESSAGES_ROUTE}/get-messages`;

export const CHANNEL_ROUTE = "api/channels";
export const CREATE_CHANNEL_ROUTE = `${CHANNEL_ROUTE}/create-channel`;
export const GET_ALL_CHANNEL_ROUTE = `${CHANNEL_ROUTE}/get-channels`;
export const GET_CHANNEL_MESSAGES_ROUTE = `${CHANNEL_ROUTE}/get-channel-messages`;