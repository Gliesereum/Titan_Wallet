import React, {Component} from 'react';
import {connect} from "react-redux";
import {View, Text} from 'react-native';
import {StatusBar} from "react-native";

class AuthScreen extends Component {
    render() {
        return (
            <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
                <StatusBar barStyle="dark-content"/>
                <Text>Auth Screen</Text>
            </View>
        );
    }
}

export default connect(state => state)(AuthScreen);
