import styled from 'styled-components/native';

import Input from '../../components/Input';
import Button from '../../components/Button';

export const Container = styled.KeyboardAvoidingView.attrs({
    behavior: 'padding', //joga o input pra cima do teclado 
})`
    flex: 1;
`;

export const Title = styled.Text`
    color: #fff;
    font-size: 20px;
    font-weight: bold;
    margin-top: 30px;
    align-self: center;
`;

export const Form = styled.ScrollView.attrs({
    showsVerticalScrollIndicator: false,
    contentContainerStyle: { padding: 30 },
})`
    align-self: stretch;
`;

export const FormInput = styled(Input)`
    margin-bottom: 18px;
`;

export const Separator = styled.View`
    height: 1px;
    background: rgba(255, 255, 255, 0.2);
    margin: 20px 0 30px;
`;

export const SubmitButton  = styled(Button)`
    margin-top: 5px;
`;

export const LogoutButton  = styled(Button)`
    margin-top: 10px;
    background: #f64c75;
`;