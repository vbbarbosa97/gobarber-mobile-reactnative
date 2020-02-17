import styled from 'styled-components/native';
import { RectButton } from 'react-native-gesture-handler';

export const Container = styled(RectButton)`
    height: 46px;
    border-radius: 4px;
    background: #3b9eff;

    align-items: center;
    justify-content: center;
`;

export const Text = styled.Text`
    font-weight: bold;
    font-size: 16px;
    color: #fff;
`;