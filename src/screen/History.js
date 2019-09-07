import React, {Component, Fragment} from "react";
import {
    View,
    Dimensions,
    StatusBar,
    ScrollView, TouchableHighlight, Text
} from "react-native"
import {connect} from "react-redux";
import LottieView from "lottie-react-native";

class History extends Component {
    static navigationOptions = ({ navigation }) => {
        return {
            title: "История",
            headerStyle: {
                backgroundColor: '#272C3A',
                borderBottomWidth: 0,
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
                fontWeight: 'bold',
            },
        };
    };

    state = {
        transactions:[
            {"id":"1", "name":"Перевод Максу", "amount":"0.7832322", "balance":"0.008333"},
            {"id":"2", "name":"Перевод Андрею", "amount":"23.7832322", "balance":"12.208873"},
            {"id":"3", "name":"Перевод Олегу", "amount":"1.7546322", "balance":"4.908873"},
            {"id":"4", "name":"Перевод Ирине", "amount":"0.000322", "balance":"8.898873"},
        ]
    };

    render() {
        const { navigation } = this.props;
        return (
            <Fragment>
                <StatusBar barStyle="light-content" />
                <View style={{
                    width:Dimensions.get('window').width,
                    height:Dimensions.get('window').height,
                    flex: 1,
                    backgroundColor: "#272C3A"
                }}>
                    <View style={{
                        width:Dimensions.get('window').width,
                        height: 120,
                        justifyContent: "center",
                        alignItems: "center",
                        alignContent: "center"
                    }}>
                        <LottieView
                            style={{width: 100, height: 100}}
                            source={require('../vectors/coin-history')}
                            autoPlay={true}
                            loop={false}
                        />
                        <Text style={{
                            color: "#fff",
                            fontSize: 18,
                            marginBottom: 20
                        }}>
                            История всех транзакций
                        </Text>
                    </View>
                    <ScrollView>
                        {this.state.transactions.map(tx => {
                            return (
                                <TouchableHighlight
                                    key={tx.id}
                                    style={{
                                        marginBottom: 2,
                                        width: Dimensions.get('window').width,
                                        height: 40,
                                        backgroundColor: "#2b313f",
                                        //alignContent: "center",
                                        //alignItems: "center",
                                        justifyContent: "center",
                                        paddingLeft: 20
                                    }}>
                                    <Text style={{
                                        color: "#fff",
                                        fontSize: 12,
                                    }}>
                                        {tx.balance} | {tx.name} {tx.amount} BTC
                                    </Text>
                                </TouchableHighlight>
                            )
                        })}
                    </ScrollView>
                </View>
            </Fragment>
        )
    }
}

export default connect(state => state)(History);
