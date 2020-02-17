import styled from 'styled-components/native';

export const Container = styled.SafeAreaView`
    flex: 1;
`;

export const Title = styled.Text`
    color: #fff;
    font-size: 20px;
    font-weight: bold;
    margin-top: 30px;
    align-self: center;
`;

export const List = styled.FlatList.attrs({
    showsVerticalScrollIndicator: false, //pra não mostrar o indicador de scroll
    contentContainerStyle: { padding: 30 }, //estilo do conteudo da lista
})``;