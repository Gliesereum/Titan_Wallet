import React, {Component} from "react";
import {
    View,
    Text,
    StyleSheet,
    StatusBar,
    Image,
    Dimensions,
    TouchableOpacity,
    ScrollView,
    RefreshControl
} from "react-native"
import {connect} from "react-redux";
import {logOut} from "../state/app/actions"
import {getWalletInfo, createNewBtcWallet} from "../state/wallet/actions"
import { Ionicons } from '@expo/vector-icons';
import {KeyboardAwareScrollView} from "react-native-keyboard-aware-scroll-view";
import LottieView from "lottie-react-native";

const styles = StyleSheet.create({
    root: {
        flex: 1,
        backgroundColor: "#272C3A",
        width:Dimensions.get('window').width,
        height:Dimensions.get('window').height,
    },
    logo: {
        backgroundColor: "#9e8b7f",
        position: 'absolute',
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
    },
    navigation: {
        flex: 1,
        justifyContent: "center",
        alignContent: "center",
        alignItems: "center",
    },
    navigationIcon: {
        width: 60,
        height: 60
    }
});

class LogoTitle extends React.Component {
    render() {
        return (
            <Image
                source={require("../image/titan.png")}
                style={{ width: 30, height: 30 }}
            />
        );
    }
}

class Start extends Component {
    static navigationOptions = ({ navigation }) => {
        return {
            headerTitle: <LogoTitle />,
            headerStyle: {
                backgroundColor: '#272C3A',
                borderBottomWidth: 0,
            },
        };
    };

    componentDidMount() {
        this.props.getWalletInfo(this.props.app.phoneRequest)
    }

    render() {
        const {user} = this.props.app.auth;
        const {loading, error} = this.props.wallet;
        return (
            <View
                style={styles.root}
            >
                <StatusBar barStyle="light-content" />
                {loading ? (
                        <View style={{backgroundColor: "#272C3A", flex:1, justifyContent: "center", alignItems: "center"}}>
                            <LottieView style={{width: 100, height: 100}} source={require('../vectors/btc-coins')} autoPlay loop />
                        </View>
                    )
                    : !error ? (
                        <KeyboardAwareScrollView contentContainerStyle={{
                            flex: 1,
                        }}>
                            <View style={{
                                flex: 1,
                                justifyContent: "center",
                                alignContent: "center",
                                alignItems: "center"
                            }}>
                                <TouchableOpacity onPress={() => this.props.getWalletInfo(this.props.app.phoneRequest)}>
                                    <View style={{
                                        marginTop: 0,
                                        justifyContent: "center",
                                        alignItems: "center",
                                        width: 150,
                                        height: 150,
                                        backgroundColor: "#2b313f",
                                        borderRadius: 150
                                    }}>
                                        <Ionicons
                                            name="logo-bitcoin"
                                            size={100} color={"#23D29C"}
                                        />
                                    </View>
                                </TouchableOpacity>
                                <Text selectable={true}
                                      style={{
                                          marginTop: 10,
                                          fontSize: 12,
                                          color: "#fff",
                                          textAlign: "center",
                                          padding: 20
                                      }}>
                                    {this.props.wallet.info.address}
                                </Text>
                                <Text style={{fontSize: 32, color: "#fff", textAlign: "center", padding: 10}}>
                                    {this.props}: {this.props.wallet.info.amount} {this.props}
                                </Text>
                            </View>
                            <View style={{
                                width:Dimensions.get('window').width,
                                marginTop: 20,
                                height: 80,
                                marginBottom: 10,
                                justifyContent: "center",
                                alignItems: "center",
                                flexDirection: "row",
                                backgroundColor: "#2b313f"
                            }}>
                                <View style={styles.navigation}>
                                    <Ionicons
                                        onPress={() => this.props.navigation.navigate('Profile', {
                                            fullName: `${this.props.app.auth.user.firstName} ${this.props.app.auth.user.lastName}`
                                        })}
                                        name="ios-contact"
                                        size={30} color={"#23D29C"}
                                    />
                                    <Text style={{fontSize: 10, color: "#fff"}}>
                                        {this.props}
                                    </Text>
                                </View>
                               <View style={styles.navigation}>
                                    <Ionicons
                                        onPress={() => this.props.navigation.navigate('Send', {
                                            fullName: `${this.props.app.auth.user.firstName} ${this.props.app.auth.user.lastName}`
                                        })}
                                        name="ios-repeat"
                                        size={30} color={"#23D29C"}
                                    />
                                    <Text style={{fontSize: 12, color: "#fff", textAlign: "center"}}>
                                        {this.props}
                                    </Text>
                                </View>
                                <View style={styles.navigation}>
                                    <Ionicons
                                        onPress={() => this.props.navigation.navigate('History', {
                                            fullName: `${this.props.app.auth.user.firstName} ${this.props.app.auth.user.lastName}`
                                        })}
                                        name="ios-paper"
                                        size={30} color={"#23D29C"}
                                    />
                                    <Text style={{fontSize: 12, color: "#fff", textAlign: "center"}}>
                                        {this.props}
                                    </Text>
                                </View>
                                <View style={styles.navigation}>
                                    <Ionicons
                                        onPress={() => this.props.navigation.navigate('Details', {
                                            wallet: this.props.wallet.info.address
                                        })}
                                        name="ios-cash"
                                        size={30} color={"#23D29C"}
                                    />
                                    <Text style={{fontSize: 12, color: "#fff", textAlign: "center"}}>
                                        {this.props}
                                    </Text>
                                </View>
                            </View>
                        </KeyboardAwareScrollView>
                    ) : (
                        <KeyboardAwareScrollView contentContainerStyle={{
                            flex: 1,
                            justifyContent: "center",
                            alignContent: "center",
                            alignItems: "center"
                        }}>
                            <View style={{
                                flex: 1,
                                justifyContent: "center",
                                alignContent: "center",
                                alignItems: "center"
                            }}>
                                <LottieView
                                    style={{width: 200, height: 200, marginBottom: 0}}
                                    source={require('../vectors/bitcoin')}
                                    autoPlay
                                    loop
                                />
                                <Text style={{fontSize: 18, color: "#fff", textAlign: "center", padding: 10}}>
                                    {this.props} {user.firstName} {user.lastName}
                                </Text>
                                <Text style={{fontSize: 18, color: "#fff", textAlign: "center", padding: 10}}>
                                    {this.props}
                                </Text>
                                <TouchableOpacity onPress={e => this.props.createNewBtcWallet({
                                    phone: this.props.app.phoneRequest,
                                    node: this.props
                                })}>
                                    <View style={{marginTop: 20, justifyContent: "center", alignItems: "center"}}>
                                        <Ionicons
                                            name="ios-add-circle-outline"
                                            size={100} color={"#23D29C"}
                                        />
                                    </View>
                                </TouchableOpacity>
                            </View>
                        </KeyboardAwareScrollView>
                    )}
            </View>
        )
    }
}

export default connect(state => state, {logOut, getWalletInfo, createNewBtcWallet})(Start);
