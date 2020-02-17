import React, { useState, useEffect } from 'react';
import {TouchableOpacity} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import DateInput from '../../../components/DateInput';
import Background from '../../../components/Background';
import { withNavigationFocus } from 'react-navigation';
import api from '../../../services/api';

import { 
    Container, 
    HourList, 
    Hour,
    Title,
} from './styles';

function SelectDateTime({ navigation, isFocused }) {
    const [date, setDate] = useState(new Date());
    const [hours, setHours] = useState([]);
    const provider = navigation.getParam('provider');

    useEffect(() => {
        async function loadAvailable() {
            const response = await api.get(`/provider/${provider.id}/available`, {
                params: {
                    date: date.getTime(),
                }
            });

            setHours(response.data);
        }

        loadAvailable();

    }, [date, provider.id, isFocused]);

    function handleSelectHour(time) {
        
        navigation.navigate('Confirm', {
            provider,
            time,
        });
    }

    return (
        <Background>
            <Container>
                <DateInput date={date} onChange={setDate} />

                <HourList 
                    data={hours}
                    keyExtractor={ item => item.time}
                    renderItem={({ item }) => (
                        <Hour onPress={() => handleSelectHour(item.value) } enabled={item.available}>
                            <Title>{item.time}</Title>
                        </Hour>
                    )}
                />
            </Container>
        </Background>
    );
}

SelectDateTime.navigationOptions = ({ navigation }) => ({
    title: 'Selecione o horário',
    headerTitleStyle: {
        fontWeight:'bold',
    },
    headerLeft: () => (
        <TouchableOpacity onPress={() => {navigation.goBack()}}>
            <MaterialIcons name='chevron-left' size={20} color="#fff" />
        </TouchableOpacity>
    )
});

//quando tiver o focus da rota eu consigo acessar o isFocused
export default withNavigationFocus(SelectDateTime);