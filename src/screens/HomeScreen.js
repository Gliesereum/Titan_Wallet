import React, {Component} from 'react';
import {connect} from "react-redux";
import {View, Text, Button, AsyncStorage} from 'react-native';
import {StackActions, NavigationActions} from 'react-navigation';
import {StatusBar} from "react-native";

class HomeScreen extends Component {
    render() {
        return (
            <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
                <StatusBar barStyle="dark-content"/>
                <Text>Home Screen</Text>
            </View>
        );
    }
}

export default connect(state => state)(HomeScreen);
