import { takeLatest, call, put, all} from 'redux-saga/effects';
import { Alert } from 'react-native';
// -----------------------------------------------------------------------------
// import history from '~/services/history';
import api from '~/services/api';
import { signInSuccess, signFailure } from './actions';
// -----------------------------------------------------------------------------
export function* signIn({ payload }) {
  try {
    const { phonenumber, password } = payload;
    const response = yield call(api.post, 'sessions', {
      phonenumber,
      password,
    });
    // console.tron.log(response.data)
    const { token, user } = response.data;

    api.defaults.headers.Authorization = `Bearer ${token}`;

    const responseWorkers = yield call(api.get, 'workers/mobile', {
      params: { test: '' },
    });

    const worker = responseWorkers.data.find(
      w => w.phonenumber == phonenumber
    );
    // console.tron.log(worker)
    yield put(signInSuccess(token, user, worker));
    // history.push('/dashboard');

  } catch (error) {
    yield put(signFailure());
    console.tron.log(error)
    Alert.alert('Dados inválidos')
    // toast.error('Falha na autenticação, verifique seus dados');
  }
}
// -----------------------------------------------------------------------------
// export function setToken({payload }) {
//   if(!payload) return;
//   const { token } = payload.auth;
//   if (token) {
//     api.defaults.headers.Authorization = `Bearer ${token}`;
//   }
// }
// -----------------------------------------------------------------------------
export function* signUp({ payload }) {
  try {
    const {
      first_name, last_name, user_name,
      password, phonenumber, email, birth_date, gender
    } = payload;

    yield call(api.post, 'users', {
      first_name, last_name, user_name,
      password, phonenumber, email, birth_date, gender, subscriber: false
    })

    yield call(api.post, 'workers', {
      first_name,
      last_name,
      worker_name: user_name,
      worker_password: password,
      phonenumber,
      email,
      birth_date,
      gender,
      subscriber: false
    })
    // Alert.alert('Usuário cadastrado com sucesso!')
    Alert.alert(
      'Success!',
      `User ${user_name} created`
    )

  } catch (error) {
    console.log(error)
    Alert.alert(
      'Error: Sign up failed',
      'e-mail address or phonenumber may already exist. Please contact support.'
    )
  }
}

// -----------------------------------------------------------------------------
export function signOnOut() {
  // history.push('/');
}
// -----------------------------------------------------------------------------
export default all([
  // takeLatest('persist/REHYDRATE', setToken),
  takeLatest('@auth/SIGN_IN_REQUEST', signIn),
  takeLatest('@auth/SIGN_UP_REQUEST', signUp),
  takeLatest('@auth/SIGN_OUT', signOnOut),
]);
