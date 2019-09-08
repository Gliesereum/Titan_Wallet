import React, {Component, Fragment} from "react";
import {
    View,
    Text,
    Dimensions,
    TextInput,
    StatusBar, TouchableHighlight, Modal
} from "react-native"
import {connect} from "react-redux";
import {CreditCardInput} from "react-native-credit-card-input";
import LottieView from "lottie-react-native";
import {KeyboardAwareScrollView} from "react-native-keyboard-aware-scroll-view";

class Details extends Component {
    state = {
        modalVisible: false,
        modalMessage: "Модуль платежей отключен!"
    };
    static navigationOptions = ({ navigation }) => {
        return {
            //title: navigation.getParam(''),
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

    _setModalVisible(visible, msg) {
        this.setState({
            modalVisible: visible,
            modalMessage: msg
        });
    }

    _onChange(form){
        console.log(form);
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
                            style={{width: 100, height: 100}}
                            source={require('../vectors/pay-bank')}
                            autoPlay={true}
                            loop={false}
                        />
                        <Text style={{marginBottom: 20, fontSize: 20, color: "#23D29C"}}>
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
                                placeholder="Введите сумму пополнения"
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
                                backgroundColor: "#d6dcff",
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
                                    style={{width: 100, height: 100}}
                                    source={require('../vectors/connection-error')}
                                    autoPlay={true}
                                    loop={false}
                                />

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

                                <CreditCardInput onChange={this._onChange} />
                            </View>
                        </Modal>
                    </View>
                </KeyboardAwareScrollView>
            </Fragment>
        )
    }
}

export default connect(state => state)(Details);
