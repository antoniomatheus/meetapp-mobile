import { all, takeLatest, put, call } from 'redux-saga/effects';
import { Alert } from 'react-native';
import { updateProfileSuccess, updateProfileFailure } from './actions';
import api from '~/services/api';

export function* updateProfile({ payload }) {
  try {
    const { name, email, ...rest } = payload.data;

    const profile = {
      name,
      email,
      ...(rest.oldPassword ? rest : {}),
    };

    const response = yield call(api.put, 'users', profile);

    Alert.alert('Successful update', 'Your profile was successfully updated');

    yield put(updateProfileSuccess(response.data));
  } catch (err) {
    Alert.alert('Failed update', 'The update failed, confirm your data');
    yield put(updateProfileFailure());
  }
}

export default all([takeLatest('@user/UPDATE_PROFILE_REQUEST', updateProfile)]);
