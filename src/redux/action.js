export const USER_SGIN_IN = 'USER_SGIN_IN'
export const ACCESS_TOKEN = 'ACCESS_TOKEN'
export const USER_SGIN_OUT = 'USER_SGIN_OUT'

export function UserLogin(text) {
  return {type: USER_SGIN_IN, UserID: text}
}

export function GetAccessToekn(accesstoken) {
  return {type: ACCESS_TOKEN, AccessToken: accesstoken}
}
export function SetUserStatus(flag) {
  return {type: USER_SGIN_OUT, OFF: flag}
}
