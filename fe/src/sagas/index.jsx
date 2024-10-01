import { takeLatest, put, call } from 'redux-saga/effects';
import { LOGOUT } from '../actions/actions';
import { persistor } from '../store/store';
import { clearState } from '../actions/index';

function* handleLogout () {
    yield call([persistor, persistor.purge]); // clear local storage
    yield put(clearState()); // clear state
}


export default function* rootSaga()  {
    yield takeLatest(LOGOUT, handleLogout);
}