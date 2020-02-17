import { all, takeLatest, call, put } from 'redux-saga/effects';
import api from '../../../services/api';
import { Alert } from 'react-native';

import {signInSuccess, signFailure} from './actions';

export function* signIn({ payload }) {
    
    try {
        const { email, password } = payload;

        const response = yield call(api.post, '/session', {
            email,
            password,
        });

        const { token, user } = response.data;
 
        //Verificando se o usuario é prestador
        if(user.provider){
            Alert.alert('Erro no login', 'Usuario não pode ser um prestador!');
            
            yield put(signFailure());
            return;
        }

        //setando o token como default nas chamadas API
        api.defaults.headers.Authorization = `Bearer ${token}`; 

        yield put(signInSuccess(token, user));
        
        //history.push('/dashboard');
    } catch (err) {
        Alert.alert('Falha na autenticação', 'Falha na autenticação, verifique os seus dados!');
        
        yield put(signFailure());
    }
    
}

export function* signUp({ payload }) {
    try {
        const { name, email, password } = payload;

        yield call(api.post, '/users', {
            name,
            email,
            password,
        });

        //history.push('/');

    } catch (err) {
        Alert.alert('Falha no cadastro', 'Falha no cadastro, verifique seus dados!');

        yield put(signFailure());
    }
    
}

export function setToken({ payload }) {
    if(!payload) return;

    const { token } = payload.auth;

    if(token){
        api.defaults.headers.Authorization = `Bearer ${token}`; 
        //setando o token em todas as chamadas na API como default
    }
}



export default all([
    takeLatest('persist/REHYDRATE', setToken), //fica ouvindo a camada de persistencia
    takeLatest('@auth/SIGN_IN_REQUEST', signIn),
    takeLatest('@auth/SIGN_UP_REQUEST', signUp),
]);