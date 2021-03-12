import styled from 'styled-components/native';

export const Container = styled.ScrollView.attrs({
    vertical: true,
    showsVericalScrollIndicator: false,
})`
    flex: 1;
`;

export const ContainerPizzaFilling = styled.View`
    flex: 1;
    /* margin: 10px; */
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
`;

export const ContainerItemFilling = styled.View`
    width: 100%;
    height: 100px;
    /* background-color: green; */
    padding: 8px 10px;
`;

export const ContainerPizzaFillingItem = styled.TouchableOpacity`
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

export const NameFilling = styled.Text`
    font-size: 18px;
    text-transform: uppercase;
    font-family: 'Roboto';
`;

export const ContainerModal = styled.View`
    width: 100%;
    height: 100%;
    flex: 1;
    background-color: rgba(0, 0, 0, .5);
    display: none;
    position: absolute;
`;

export const ContainerModalBody = styled.View`
    flex: 1;
    justify-content: center;
    align-items: center;
`;

export const Modal = styled.View`
    width: 95%;
    height: 500px;
    padding: 15px;
    background-color: white;
    border-radius: 10px;
`;

export const ModalFooter = styled.View`
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-direction: row;
    margin-top: 75px;
`;

export const BotaoConfirm = styled.TouchableOpacity`
    width: 175px;
    height: 50px;
    background-color: ${props => props.background};
    display: flex;
    justify-content: center;
    border-radius: 5px;
`;

export const TextConfirm = styled.Text`
    font-size: 18px;
    color: white;
    text-align: center;
`;

export const ModalText = styled.Text`
    font-size: 20px;
    text-align: center;
`;

export const ModalTextDetails = styled.Text`
    font-size: 15px;
    text-align: center;
`;