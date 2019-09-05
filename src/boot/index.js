import React, {Component, Fragment} from "react";
import {connect} from "react-redux";
import {View, Text, StyleSheet, Button, ActivityIndicator} from "react-native"
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import {
    startBoot,
    getBusinessList
} from "../state/app/actions"
import Start from "../screen/Start";
import Details from "../screen/Details";
import LottieView from 'lottie-react-native';

const AppNavigator = createStackNavigator({
    Home: Start,
    Details: Details,
},{
    initialRouteName: 'Home',
    defaultNavigationOptions: {
        headerStyle: {
            backgroundColor: '#272C3A',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
            fontWeight: 'bold',
        },
    },
});

const AppContainer = createAppContainer(AppNavigator);

class Delegate extends Component {
    componentDidMount() {
        this.props.startBoot(this.props.config);
        this.props.getBusinessList(this.props.config);
    };

    _reloadServer(){
        this.props.startBoot(this.props.config);
        this.props.getBusinessList(this.props.config);
    }

    render() {
        const {error, loading} = this.props.app;
        return (
            <Fragment>
                {loading ? (
                    <View style={{flex:1, justifyContent: "center", alignItems: "center"}}>
                        <LottieView source={require('../vectors/loader')} autoPlay loop />
                    </View>
                ) : error ? (
                    <View style={{flex:1, justifyContent: "center", alignItems: "center"}}>
                        <View style={{width: 300, height: 300}}>
                            <LottieView source={require('../vectors/error-app')} autoPlay loop />
                        </View>
                        <View>
                            <Button title={"Обновить"} onPress={() => this._reloadServer()}/>
                        </View>
                    </View>
                ) : (
                    <AppContainer />
                )}

            </Fragment>
        )
    }
}

export default connect(state => state, {
    startBoot, getBusinessList
})(Delegate);
