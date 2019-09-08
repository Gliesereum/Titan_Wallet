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
        transactions:[]
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
                            {this.props}
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
                                        {tx.balance} | {tx.name} {tx.amount} {this.props}
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
