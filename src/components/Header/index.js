import React from 'react';
import { View } from 'react-native';
import { Appbar } from 'react-native-paper';
// import { Container } from './styles';

const Header = (props) => {
    return (
        <Appbar.Header>
            <Appbar.BackAction onPress={() => { props.navigation.goBack() }} />
            <Appbar.Content title="" />
        </Appbar.Header>
    );
}

export default Header;