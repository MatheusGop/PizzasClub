import styled from 'styled-components/native';

export const Container = styled.View`
    flex: 1;
`;

export const ContainerPizzaPasta = styled.View`
    flex: 1;
    /* margin: 10px; */
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
`;

export const ContainerItem = styled.View`
    width: 100%;
    height: 100px;
    /* background-color: green; */
    padding: 8px 10px;
`;

export const ContainerPizzaPastaItem = styled.TouchableOpacity`
    flex: 1;
    background-color: #FFF;
    border-top-width: 1px;
    border-bottom-width: 1px;
    border-color: #DDD;
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-direction: row;
    padding: 10px;
`;

export const PastaName = styled.Text`
    font-size: 18px;
    text-transform: uppercase;
    font-family: 'Roboto';
`;

// export const RadioBotao = styled.TouchableOpacity`
//     border-radius: 1000000px;
//     width: 25px;
//     height: 25px;
//     border: 1px solid black;
//     background-color: ${props => props.background}
// `;