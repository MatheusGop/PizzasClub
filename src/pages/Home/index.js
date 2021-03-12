import React, { useEffect, useState } from 'react';
import {
    Container, ImageHeader, AppName,
    Titulo, LinhaView, ContainerPizzaSize,
    ContainerItem, ContainerPizzaSizeItem, SizeName,
    SizePrice, HighlightName, HighlightPrice, ContainerModal,
    Modal, ContainerModalBody, ModalText, ModalTextDetails, ModalFooter, BotaoConfirm, TextConfirm
} from './styles';
import { ActivityIndicator, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import pizzaRepository from '../../services/pizzaRepository';

import { dataAtualFormatada } from '../../utils/formatDate';

import pizza from '../../assets/images/pizza.jpg';
import { guidGenerator } from '../../utils/idGenerator';

const Home = () => {

    const navigation = useNavigation();
    const [tamanhos, setTamanhos] = useState([])
    const [dayHighlights, setDayHighlights] = useState([]);
    const [loading, setLoading] = useState(false)
    const [visible, setVisible] = useState(false);
    const [visibleAlert, setVisibleAlert] = useState(false);
    const [order, setOrder] = useState([])
    const [user, setUser] = useState({});
    const dataAtual = new Date()

    const fetchPizzaSizes = () => {
        pizzaRepository.getPizzaSizes().then(response => {
            setTamanhos(response.data)
        })
    }

    const fetchDayHighlights = () => {
        pizzaRepository.getDayHighlights().then(response => {
            setLoading(false)
            setDayHighlights(response.data)
        })
    }

    const orderDayHighlights = (pizza) => {
        let data = {
            id: guidGenerator(),
            tamanho: pizza.tamanho,
            massa: pizza.massa,
            recheio: pizza.nome,
            preço: pizza.preço,
            pontos: pizza.pontos
        }
        setOrder(data)
        setVisible(true)
    }

    const fetchUser = () => {
        pizzaRepository.getUser().then(user => {
            if (user.status === 200) {
                setUser(user.data)
            }
        })
    }

    const createOrder = () => {
        pizzaRepository.createOrder(order).then(orderResponse => {
            if (orderResponse.status === 201) {
                pizzaRepository.getUser().then(userResponse => {
                    if (userResponse.status === 200) {
                        let pontos = userResponse.data.pontos + order.pontos
                        pizzaRepository.updatePointsUser({ pontos: pontos }).then(response => {
                            if (response.status === 200) {
                                setVisible(false)
                                setVisibleAlert(true)
                                fetchUser()
                            }
                        })
                    }
                })
            }
        })
    }

    useEffect(() => {
        setLoading(true)
        fetchPizzaSizes()
        fetchDayHighlights()
    }, [])

    useEffect(() => {
        fetchUser()
    }, [])

    const BuildPizza = (pizzaSize) => {
        navigation.navigate('MakePizza', {
            pizzaSize: pizzaSize
        })
    }

    return (
        <Container>
            <ImageHeader source={pizza} blurRadius={1}>
                <AppName>Pizza's Club</AppName>
            </ImageHeader>
            {loading === true ? <View style={{ display: 'flex', justifyContent: 'center', alignContent: 'center', alignItems: 'center', flexDirection: 'column', padding: 30 }}><ActivityIndicator color="black" size="large" /></View>
                :
                <>
                    <LinhaView>
                        <Titulo>Recomendação do dia</Titulo>
                    </LinhaView>
                    <ContainerPizzaSize>
                        {
                            dayHighlights?.map(obj => {
                                if (dataAtualFormatada(dataAtual) === obj.dia) {
                                    return (
                                        <ContainerItem key={obj.id}>
                                            <ContainerPizzaSizeItem onPress={() => { orderDayHighlights(obj) }}>
                                                <HighlightName>{obj.nome} / {obj.tamanho} / {obj.massa}</HighlightName>
                                                <HighlightPrice>R$ {obj.preço.toFixed(2)}</HighlightPrice>
                                            </ContainerPizzaSizeItem>
                                        </ContainerItem>
                                    )
                                }
                            })
                        }
                    </ContainerPizzaSize>
                    <LinhaView>
                        <Titulo>Pizzas</Titulo>
                    </LinhaView>
                    <ContainerPizzaSize>
                        {
                            tamanhos?.map(pizzaSize => {
                                return (
                                    <ContainerItem key={pizzaSize.id}>
                                        <ContainerPizzaSizeItem onPress={() => { BuildPizza(pizzaSize) }}>
                                            <SizeName>{pizzaSize.nome}</SizeName>
                                            <SizePrice>A partir de R${pizzaSize.preço.toFixed(2)}</SizePrice>
                                        </ContainerPizzaSizeItem>
                                    </ContainerItem>
                                )
                            })
                        }
                    </ContainerPizzaSize>
                </>
            }
            {
                visible === true ?
                    <ContainerModal>
                        <ContainerModalBody>
                            <Modal>
                                <ModalText style={{ marginTop: 15, marginBottom: 50 }}>Resumo do pedido</ModalText>
                                <ModalTextDetails style={{ fontWeight: 'bold', fontSize: 16 }}>Tamanho</ModalTextDetails>
                                <ModalTextDetails>{order.tamanho}</ModalTextDetails>
                                <ModalTextDetails style={{ fontWeight: 'bold', fontSize: 16, marginTop: 12.5 }}>Massa</ModalTextDetails>
                                <ModalTextDetails>{order.massa}</ModalTextDetails>
                                <ModalTextDetails style={{ fontWeight: 'bold', fontSize: 16, marginTop: 12.5 }}>Recheio</ModalTextDetails>
                                <ModalTextDetails>{order.recheio}</ModalTextDetails>
                                <ModalTextDetails style={{ fontWeight: 'bold', fontSize: 16, marginTop: 12.5 }}>Preço</ModalTextDetails>
                                <ModalTextDetails>R${order.preço.toFixed(2)}</ModalTextDetails>
                                <ModalTextDetails style={{ fontWeight: 'bold', fontSize: 16, marginTop: 12.5 }}>Pontos</ModalTextDetails>
                                <ModalTextDetails>{order.pontos}</ModalTextDetails>
                                <ModalFooter>
                                    <BotaoConfirm background="red" onPress={() => { setVisible(false) }}>
                                        <TextConfirm>Voltar</TextConfirm>
                                    </BotaoConfirm>
                                    <BotaoConfirm background="green" onPress={() => { createOrder() }}>
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
            {
                visibleAlert === true
                    ?
                    <ContainerModal>
                        <ContainerModalBody>
                            <Modal style={{ height: 190 }}>
                                <ModalText>Pontos creditados com sucesso</ModalText>
                                <ModalTextDetails style={{ fontWeight: 'bold', fontSize: 16, marginTop: 12 }}>Saldo de pontos</ModalTextDetails>
                                <ModalTextDetails>{user.pontos}</ModalTextDetails>
                                <ModalFooter style={{ justifyContent: 'center', marginTop: 30 }}>
                                    <BotaoConfirm background="green" onPress={() => { setVisibleAlert(false) }}>
                                        <TextConfirm>Ok</TextConfirm>
                                    </BotaoConfirm>
                                </ModalFooter>
                            </Modal>
                        </ContainerModalBody>
                    </ContainerModal>
                    :
                    <>
                    </>
            }
        </Container>
    );
}

export default Home;