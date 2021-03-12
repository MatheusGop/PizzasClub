import React, { useState, useEffect } from 'react';

import {
    Container, ContainerPizzaFilling, ContainerItemFilling,
    ContainerPizzaFillingItem, NameFilling, ContainerModal,
    Modal, ContainerModalBody, ModalText, ModalTextDetails, ModalFooter, BotaoConfirm, TextConfirm
} from './styles';
import { Headline } from 'react-native-paper';
import pizzaRepository from '../../services/pizzaRepository';

import { guidGenerator } from '../../utils/idGenerator';

import Header from '../../components/Header';
import { View, Text } from 'react-native';

const SelectFilling = ({ navigation, route }) => {

    const { pizzaSize, pizzaPasta } = route.params

    const [fillings, setFillings] = useState();
    const [visible, setVisible] = useState(false);
    const [order, setOrder] = useState([])

    const fetchPizzaFilling = () => {
        pizzaRepository.getPizzaFillings().then(response => {
            setFillings(response.data)
        })
    }

    const createOrder = (pizzaFilling) => {
        let data = {
            id: guidGenerator(),
            tamanho: pizzaSize.nome,
            massa: pizzaPasta.nome,
            preço: pizzaSize.preço,
            recheio: pizzaFilling
        }
        setOrder(data)
        setVisible(true)
    }

    const handleOrderPizza = () => {
        pizzaRepository.createOrder(order).then(response => {
            if (response.status === 201) {
                navigation.navigate('Home');
                // pizzaRepository.getOrderById(data.id).then(response => {
                //     setOrder(response.data)
                //     setVisible(true)
                // })
            }
        })
    }

    useEffect(() => {
        fetchPizzaFilling()
    }, [])

    return (
        <>
            <Container>
                <Header navigation={navigation} />
                <Headline style={{ textAlign: 'center', fontSize: 22, paddingTop: 15, paddingBottom: 15, paddingLeft: 5, paddingRight: 5 }}>Selecione o recheio da sua pizza</Headline>
                <ContainerPizzaFilling>
                    {
                        fillings?.map(obj => {
                            return (
                                <ContainerItemFilling key={obj.id}>
                                    <ContainerPizzaFillingItem onPress={() => { createOrder(obj.nome) }}>
                                        <NameFilling>{obj.nome}</NameFilling>
                                    </ContainerPizzaFillingItem>
                                </ContainerItemFilling>
                            )
                        })
                    }
                </ContainerPizzaFilling>
            </Container>
            {
                visible === true ?
                    <ContainerModal>
                        <ContainerModalBody>
                            <Modal>
                                {/* <ModalText>Pedido Efetuado com sucesso</ModalText> */}
                                <ModalText style={{ marginTop: 15, marginBottom: 50 }}>Resumo do pedido</ModalText>
                                <ModalTextDetails style={{ fontWeight: 'bold', fontSize: 16 }}>Tamanho</ModalTextDetails>
                                <ModalTextDetails>{order.tamanho}</ModalTextDetails>
                                <ModalTextDetails style={{ fontWeight: 'bold', fontSize: 16, marginTop: 12.5 }}>Massa</ModalTextDetails>
                                <ModalTextDetails>{order.massa}</ModalTextDetails>
                                <ModalTextDetails style={{ fontWeight: 'bold', fontSize: 16, marginTop: 12.5 }}>Recheio</ModalTextDetails>
                                <ModalTextDetails>{order.recheio}</ModalTextDetails>
                                <ModalTextDetails style={{ fontWeight: 'bold', fontSize: 16, marginTop: 12.5 }}>Preço</ModalTextDetails>
                                <ModalTextDetails>R${order.preço.toFixed(2)}</ModalTextDetails>
                                <ModalFooter>
                                    <BotaoConfirm background="red" onPress={() => { setVisible(false) }}>
                                        <TextConfirm>Voltar</TextConfirm>
                                    </BotaoConfirm>
                                    <BotaoConfirm background="green" onPress={() => { handleOrderPizza() }}>
                                        <TextConfirm>Confirmar</TextConfirm>
                                    </BotaoConfirm>
                                </ModalFooter>
                            </Modal>
                        </ContainerModalBody>
                    </ContainerModal>
                    :
                    <>
                    </>
            }
        </>
    );
}

export default SelectFilling;