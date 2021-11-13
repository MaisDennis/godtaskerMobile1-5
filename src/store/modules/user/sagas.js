import { takeLatest, call, put, all } from 'redux-saga/effects';
import { Alert } from 'react-native';
// -----------------------------------------------------------------------------
import api from '~/services/api';
import { updateProfileSuccess, updateProfileFailure } from './actions';
// -----------------------------------------------------------------------------
export function* updateProfile({ payload }) {
  try {
    const {
      first_name, last_name, user_name,
      oldPassword, password, confirmPassword,
      phonenumber, email, birth_date, gender,
      image,
    } = payload;
    // console.log(payload)

    let response = null
    let responseWorker= null;

    if (!image) {
      response = yield call(api.put, 'users/no-photo', {
        first_name,
        last_name,
        user_name,
        oldPassword,
        password,
        confirmPassword,
        phonenumber,
        birth_date,
        gender,
        // instagram,
        // linkedin,
        // bio,
        // avatar_id
      });
      responseWorker = yield call(api.put, 'workers/no-photo', {
        first_name,
        last_name,
        worker_name: user_name,
        oldPassword,
        password,
        confirmPassword,
        phonenumber,
        email,
        birth_date,
        gender,
        // instagram,
        // linkedin,
        // bio,
        // avatar_id
      });

    } else {

      const imageResponse = yield call(api.get, 'files', {
        params: { image },
      })
      const avatar_id = imageResponse.data[0].id

      response = yield call(api.put, 'users', {
        first_name,
        last_name,
        user_name,
        oldPassword,
        password,
        confirmPassword,
        phonenumber,
        birth_date,
        gender,
        avatar_id
      });
      console.log(response)

      responseWorker = yield call(api.put, 'workers', {
        first_name,
        last_name,
        worker_name: user_name,
        phonenumber,
        birth_date,
        gender,
        avatar_id,
      });
    }

    Alert.alert('Perfil atualizado com sucesso!');
    console.log(responseWorker.data);
    yield put(updateProfileSuccess(response.data));

  } catch (error) {
    console.log(error)
    Alert.alert('Erro ao atualizar o perfil');

    // Alert.alert(error.data.error);
    // yield put(updateProfileFailure());
  }
}
// -----------------------------------------------------------------------------
export default all([
  takeLatest('@user/UPDATE_PROFILE_REQUEST', updateProfile)
]);
