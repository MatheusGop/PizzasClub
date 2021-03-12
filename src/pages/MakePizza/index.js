import React, { useEffect, useState } from 'react';
import { ActivityIndicator } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import {
    Container, ContainerPizzaPasta, ContainerItem,
    ContainerPizzaPastaItem, PastaName
} from './styles';
import { Headline } from 'react-native-paper';

import Header from '../../components/Header';

const MakePizza = ({ route }) => {

    const navigation = useNavigation()
    const [loading, setLoading] = useState(false)
    const [massas, setMassas] = useState([]);

    useEffect(() => {
        setLoading(true)
        axios.get('https://www.amock.io/api/themax1/pizza-massas').then(response => {
            setMassas(response.data)
            setLoading(false)
        })
    }, [])

    const BuildPizza = (pizzaPasta) => {
        navigation.navigate('SelectFilling', {
            pizzaSize: route.params.pizzaSize,
            pizzaPasta: pizzaPasta
        })
    }

    return (
        <Container>
            <Header navigation={navigation} />
            <Headline style={{ textAlign: 'center', padding: 15 }}>Selecione a massa da sua pizza</Headline>
            <ContainerPizzaPasta>
                {loading === true ? <ActivityIndicator size="large" color="black" />
                    :
                    massas?.map(pizzaPasta => {
                        return (
                            <ContainerItem key={pizzaPasta.id}>
                                <ContainerPizzaPastaItem onPress={() => { BuildPizza(pizzaPasta) }}>
                                    <PastaName>{pizzaPasta.nome}</PastaName>
                                </ContainerPizzaPastaItem>
                            </ContainerItem>
                        )
                    })
                }
                <ContainerItem>

                </ContainerItem>
            </ContainerPizzaPasta>
            {/* <MassaList massas={massas} titulo={props.route.params.titulo} preço={props.route.params.preço}/> */}
        </Container>
    );
}

export default MakePizza;