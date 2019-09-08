import React, {Component, Fragment} from "react";
import {
    View,
    Text,
    Dimensions,
    StatusBar, TextInput, TouchableHighlight, Modal
} from "react-native"
import {connect} from "react-redux";
import { CreditCardInput, LiteCreditCardInput } from "react-native-credit-card-input";
import LottieView from "lottie-react-native";
import {KeyboardAwareScrollView} from "react-native-keyboard-aware-scroll-view";

class Send extends Component {
    state = {
        text:"",
        amount: "",
        modalVisible: false,
        modalMessage: "Модуль платежей отключен!"
    };
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

    _onChange(form){
        console.log(form);
    }

    _setModalVisible(visible, msg) {
        this.setState({
            modalVisible: visible,
            modalMessage: msg
        });
    }

    render() {
        const { navigation } = this.props;
        return (
            <Fragment>
                <StatusBar barStyle="light-content" />
                <KeyboardAwareScrollView contentContainerStyle={{
                    flex: 1,
                }}>
                    <View style={{
                        width:Dimensions.get('window').width,
                        height:Dimensions.get('window').height,
                        flex: 1,
                        justifyContent: "center",
                        alignItems: "center",
                        backgroundColor: "#272C3A"
                    }}>
                        <LottieView
                            style={{width: 200, height: 200}}
                            source={require('../vectors/creditcards')}
                            autoPlay={true}
                            loop={true}
                        />
                        <Text style={{marginBottom: 20, marginTop: 20, fontSize: 28, color: "#23D29C"}}>
                            {this.props}
                        </Text>
                        <View>
                            <TextInput
                                style={{
                                    fontSize: 22,
                                    height: 60,
                                    width: Dimensions.get('window').width,
                                    marginBottom:20,
                                    color: "#fff",
                                    paddingLeft:20,
                                    paddingRight:20,
                                    backgroundColor: "#2b313f",
                                }}
                                placeholderTextColor={"#ccc"}
                                placeholder="Кому адрес BTC"
                                onChangeText={(amount) => this.setState({amount})}
                                value={this.state.amount}
                            />
                        </View>
                        <View>
                            <TextInput
                                style={{
                                    fontSize: 22,
                                    height: 60,
                                    width: Dimensions.get('window').width,
                                    marginBottom:20,
                                    color: "#fff",
                                    paddingLeft:20,
                                    paddingRight:20,
                                    backgroundColor: "#2b313f",
                                }}
                                placeholderTextColor={"#ccc"}
                                placeholder="Сколько (например: 0.127654) BTC"
                                onChangeText={(text) => this.setState({text})}
                                value={this.state.text}
                            />
                        </View>
                        <View style={{
                            width: Dimensions.get('window').width,
                            height: 60,
                        }}>
                            <TouchableHighlight
                                style={{
                                    marginTop: 0,
                                    width: Dimensions.get('window').width,
                                    height: 60,
                                    backgroundColor: "#23D29C",
                                    justifyContent: "center",
                                    alignContent: "center",
                                    alignItems: "center",
                                }}
                                onPress={() => {
                                    this._setModalVisible(!this.state.modalVisible);
                                }}>
                                <Text style={{
                                    color: "#fff",
                                    fontSize: 24,
                                }}>
                                    {this.props}
                                </Text>
                            </TouchableHighlight>
                        </View>
                        <Modal
                            animationType="slide"
                            presentationStyle={"overFullScreen"}
                            transparent={true}
                            visible={this.state.modalVisible}
                        >
                            <View style={{
                                backgroundColor: "#2b313f",
                                marginTop: 60,
                                borderTopRightRadius: 20,
                                borderTopLeftRadius: 20,
                                padding:60,
                                flex: 1,
                                justifyContent:"center",
                                alignItems: "center",
                                alignContent: "center"
                            }}>

                                <LottieView
                                    style={{width: 200, height: 200}}
                                    source={require('../vectors/done')}
                                    autoPlay={true}
                                    loop={false}
                                />

                                <Text style={{
                                    color: "#fff",
                                    fontSize: 24,
                                    marginTop: 40,
                                    marginBottom: 40
                                }}>
                                    {this.props}
                                </Text>

                                <TouchableHighlight
                                    style={{
                                        marginBottom: 20,
                                        width: Dimensions.get('window').width,
                                        height: 60,
                                        backgroundColor: "#23D29C",
                                        justifyContent: "center",
                                        alignContent: "center",
                                        alignItems: "center",
                                    }}
                                    onPress={() => {
                                        this.props.navigation.navigate('Start')
                                        this._setModalVisible(!this.state.modalVisible);
                                    }}>
                                    <Text style={{
                                        color: "#fff",
                                        fontSize: 24,
                                    }}>
                                        {this.props}
                                    </Text>
                                </TouchableHighlight>
                            </View>
                        </Modal>
                    </View>
                </KeyboardAwareScrollView>
            </Fragment>
        )
    }
}

export default connect(state => state)(Send);
