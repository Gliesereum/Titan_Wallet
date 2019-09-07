import React, {Component, Fragment} from "react";
import {connect} from "react-redux";
import {View, Button, StatusBar, AsyncStorage} from "react-native"
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import {startBoot,} from "../state/app/actions"
import Start from "../screen/Start";
import Details from "../screen/Details";
import LottieView from 'lottie-react-native';
import Auth from "../screen/Auth";
import Profile from "../screen/Profile";
import History from "../screen/History";
import Send from "../screen/Send";
import Kyc from "../screen/KYC";

const AppNavigator = createStackNavigator({
    Start: Start,
    Details: Details,
    Profile: Profile,
    History: History,
    Send: Send,
    Kyc: Kyc
},{
    initialRouteName: 'Start',
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
    async componentDidMount() {
        await this.props.startBoot(this.props.config);
    };

    _reloadServer(){
        this.props.startBoot(this.props.config);
    }

    render() {
        const {error, loading, auth, authLoading} = this.props.app;
        return (
            <Fragment>
                <StatusBar barStyle="light-content" />
                {loading ? (
                    <View style={{backgroundColor: "#272C3A", flex:1, justifyContent: "center", alignItems: "center"}}>
                        <LottieView style={{width: 200, height: 200}} source={require('../vectors/wallet')} autoPlay loop />
                    </View>
                ) : error ? (
                    <View style={{backgroundColor: "#272C3A",flex:1, justifyContent: "center", alignItems: "center"}}>
                        <View style={{width: 300, height: 300}}>
                            <LottieView source={require('../vectors/error-app')} autoPlay loop />
                        </View>
                        <View>
                            <Button title={"Обновить"} onPress={() => this._reloadServer()}/>
                        </View>
                    </View>
                ) : !auth ? <Auth/> : (
                        authLoading ? (
                            <View style={{backgroundColor: "#272C3A", flex:1, justifyContent: "center", alignItems: "center"}}>
                                <LottieView style={{width: 200, height: 200}} source={require('../vectors/loading-spinner')} autoPlay loop />
                            </View>
                        ) : <AppContainer/>
                    )}

            </Fragment>
        )
    }
}

export default connect(state => state, {
    startBoot
})(Delegate);
