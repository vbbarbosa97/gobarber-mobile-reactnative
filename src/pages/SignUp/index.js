import React, { useRef, useState } from 'react';
import { Image } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

import { signUpRequest } from '../../store/modules/auth/actions';
import logo from '../../assets/logo.png'

import Background from '../../components/Background';

import { 
    Container, 
    Form, 
    FormInput, 
    SubmitButton,
    SignLink,
    SignLinkText
} from './styles';

export default function SignUp({ navigation }) {
    const dispatch = useDispatch();
    const loading = useSelector(state => state.auth.loading);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const emailRef = useRef();
    const passwordRef = useRef();

    function handleSubmit() {
        //console.log(name,email,password);
       dispatch(signUpRequest(name, email, password));
       navigation.navigate('SignIn');
    }

    return (
        <Background>
            <Container>
                <Image source={logo} />

                <Form>
                    <FormInput 
                        icon="person-outline"
                        autoCorrect={false}
                        autoCapitalize="none"//não coloca letra maiuscula automaticamnete
                        placeholder="Nome completo"
                        returnKeyType="next"
                        onSubmitEditing={() => emailRef.current.focus()}
                        value={name}
                        onChangeText={setName}
                    />
                    <FormInput 
                        icon="mail-outline"
                        keyboardType="email-address"
                        autoCorrect={false}
                        autoCapitalize="none"//não coloca letra maiuscula automaticamnete
                        placeholder="Digite seu e-mail"
                        ref={emailRef}
                        returnKeyType="next"
                        onSubmitEditing={() => passwordRef.current.focus()}
                        value={email}
                        onChangeText={setEmail}
                    />

                    <FormInput 
                        icon="lock-outline"
                        secureTextEntry
                        placeholder="Sua senha"
                        ref={passwordRef}
                        returnKeyType="send"
                        onSubmitEditing={handleSubmit}
                        value={password}
                        onChangeText={setPassword}
                    />

                    <SubmitButton loading={loading} onPress={handleSubmit} >Cadastrar</SubmitButton>
                </Form>

                <SignLink onPress={() => navigation.navigate('SignIn')}>
                    <SignLinkText>Já possuo uma conta!</SignLinkText>
                </SignLink>
            </Container>
        </Background>
    );
}