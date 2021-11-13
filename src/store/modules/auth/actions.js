export function signInRequest( phonenumber, password) {
  return {
    type: '@auth/SIGN_IN_REQUEST',
    payload: { phonenumber, password },
  };
}
export function signInSuccess(token, user, worker) {
  return {
    type: '@auth/SIGN_IN_SUCCESS',
    payload: {token, user, worker },
  };
};
export function signFailure() {
  return {
    type: '@auth/SIGN_IN_FAILURE',
  }
}
export function signUpRequest(
  first_name, last_name, user_name,
  password, phonenumber, email, birth_date, gender
) {
  return {
    type: '@auth/SIGN_UP_REQUEST',
    payload: {
      first_name, last_name, user_name,
      password, phonenumber, email, birth_date, gender
    },
  }
}
export function signOut() {
  return {
    type: '@auth/SIGN_OUT',
  }
}
