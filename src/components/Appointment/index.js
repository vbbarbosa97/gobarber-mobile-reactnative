import React, { useMemo } from 'react';
import { TouchableOpacity } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { parseISO, formatRelative } from 'date-fns';
import pt from 'date-fns/locale/pt';
import { 
    Container,
    Left,
    Avatar,
    Info,
    Time,
    Name,
} from './styles';

export default function Appointment({ data, onCancel }) {
    
    const dateFormated = useMemo(
        () => {
            return formatRelative(parseISO(data.date), new Date(), {
                locale: pt,
                addSuffix: true,
            });
        }, [data.date]
    );

    return (
        <Container past={data.past}>
            <Left>
                <Avatar 
                    //No heroku não esta com a pasta de imagens
                    source={{ uri: data.provider.avatar
                        ? (`https://api.adorable.io/avatar/50/$%7B%7D.png`)//data.provider.avatar.url
                        : (`https://api.adorable.io/avatar/50/$%7B%7D.png`)
                    }}
                />

                <Info>
                    <Name>{data.provider.name}</Name>
                    <Time>{dateFormated}</Time>
                </Info>
            </Left>

            {
                data.cancelable && !data.canceled_at && (
                    <TouchableOpacity onPress={onCancel}>
                        <MaterialIcons name='event-busy' size={20} color="#f64c75" />
                    </TouchableOpacity>
                )
            }
            
        </Container>
    );
}