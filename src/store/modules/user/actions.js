export function updateProfileRequest({
  first_name, last_name, user_name,
  oldPassword, password, confirmPassword,
  phonenumber, email, birth_date, gender, image
}) {
  return {
    type: '@user/UPDATE_PROFILE_REQUEST',
    payload: {
      first_name, last_name, user_name,
      oldPassword, password, confirmPassword,
      phonenumber, email, birth_date, gender, image
    },
  };
}
export function updateProfileSuccess(profile) {
  return {
    type: '@user/UPDATE_PROFILE_SUCCESS',
    payload: { profile },
  };
}
export function updateProfileFailure() {
  return {
    type: '@user/UPDATE_PROFILE_REQUEST',
  };
}
