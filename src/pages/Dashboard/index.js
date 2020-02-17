import React, {useEffect, useState} from 'react';
import api from '../../services/api';
import { MaterialIcons } from '@expo/vector-icons';
import { withNavigationFocus, withNavigation } from 'react-navigation'
import Background from '../../components/Background';
import Appointment from '../../components/Appointment';

import { Container, Title, List } from './styles';


function Dashboard({ isFocused }) {
    const [appointments, setAppointments] = useState([]);

    

    useEffect(() => {
        async function loadAppointments() {
            const response = await api.get('/appointments');
    
            setAppointments(response.data);
        }
        loadAppointments();
    }, [isFocused]);
    
    //função que cancela um agendamento
    async function handleCancel(id) {
        const response = await api.delete(`/appointments/${id}`);

        setAppointments(
            appointments.map( appointment =>
                appointment.id === id 
                ? {
                    ...appointment,
                    canceled_at: response.data.canceled_at,
                } 
                : appointment   
            )
        );
    }

    return (
        <Background>
            <Container>
                <Title>Agendamentos</Title>

                <List 
                    data={appointments}
                    keyExtractor={item => String(item.id)}
                    renderItem={({ item }) => (
                        <Appointment onCancel={() => handleCancel(item.id)} data={item} />
                    )}
                />
            </Container>            
        </Background>   
    );
}

Dashboard.navigationOptions = {
    tabBarLabel: 'Agendamentos',
    tabBarIcon: ({ tintColor }) => (
        <MaterialIcons name='event' size={20} color={tintColor} />
    ),
}

//quando tiver o focus da rota eu consigo acessar o isFocused
export default withNavigationFocus(Dashboard);