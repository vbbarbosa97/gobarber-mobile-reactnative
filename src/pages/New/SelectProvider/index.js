import React, { useState, useEffect } from 'react';
import {TouchableOpacity} from 'react-native';
import {MaterialIcons} from '@expo/vector-icons';

import api from '../../../services/api';

import Background from '../../../components/Background';

import { 
    Container, 
    ProviderList, 
    Provider, 
    Avatar, 
    Name,
} from './styles';

export default function SelectProvider({ navigation }) {
    const [providers, setProviders] = useState([]);

    useEffect(() => {

        async function loadProviders() {
            const response = await api.get('/provider');

            setProviders(response.data);
        }   

        loadProviders();

    }, []);

    return (
        <Background>
            <Container>
                <ProviderList 
                    data={providers}
                    keyExtractor={provider => String(provider.id)}
                    renderItem={({ item: provider }) => (
                        <Provider onPress={() => navigation.navigate('SelectDateTime', {provider})}>
                            <Avatar source={{
                                uri: provider.avatar
                                    ? `https://api.adorable.io/avatar/50/$%7B%7D.png`//provider.avatar.url
                                    : `https://api.adorable.io/avatar/50/$%7B%7D.png`
                            }} />
                            <Name>{provider.name}</Name>
                        </Provider>
                    )}
                />
            </Container>
        </Background>
    );
}

SelectProvider.navigationOptions = ({ navigation }) => ({
    title:  'Selecione o prestador',
    headerTitleStyle: {
        fontWeight:'bold',
    },
    headerLeft: () => (
        <TouchableOpacity onPress={() => {navigation.navigate('Dashboard')}}>
            <MaterialIcons name='chevron-left' size={20} color="#fff" />
        </TouchableOpacity>
    )
});