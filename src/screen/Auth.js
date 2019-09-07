import React, {Component, Fragment} from "react";
import {
    Text,
    TouchableOpacity,
    Dimensions,
    StatusBar,
    Image,
    View,
    Modal, TouchableHighlight, Alert
} from "react-native";
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view'
import {connect} from "react-redux";
import styled from "styled-components";
import PhoneInput from 'react-native-phone-input';
import CodeInput from 'react-native-confirmation-code-input';
import {checkPhoneSendCode, noRequestCode, verifyPhone} from "../state/app/actions";
import {shadeColor} from "../utils";
import LottieView from "lottie-react-native";

class Auth extends Component {

    state = {
        phone: undefined,
        code: undefined,
        phoneValid: false,
        codeValid: false,
        modalVisible: false,
        modalMessage: "Что то пошло не так!"
    };

    _setModalVisible(visible, msg) {
        this.setState({
            modalVisible: visible,
            modalMessage: msg
        });
    }

    _resetState(){
        this.setState({
            phone: null,
            phoneValid: false
        });
        this.props.noRequestCode()
    }

    _validPhone = e => {
        const phoneRe = new RegExp("^\\++?\\d{11}$");
        this.setState({
            phoneValid: phoneRe.test(e)
        });
        if (phoneRe) this.setState({phone: e})
    };

    _validCode = e => {
        if (e.length === 6) {
            this.setState({
                code: e,
                codeValid: true
            })
        } else {
            this.setState({
                code: undefined,
                codeValid: false
            })
        }
    };

    render() {
        return (
            <Fragment>
                <StatusBar barStyle="light-content"/>
                {this.props.app.authLoading ? (
                    <View style={{backgroundColor: "#272C3A", flex: 1, justifyContent: "center", alignItems: "center"}}>
                        <LottieView style={{width: 200, height: 200}} source={require('../vectors/loading-spinner')}
                                    autoPlay loop/>
                    </View>
                ) : (
                    <AuthContainerStyle>
                        <KeyboardAwareScrollView>
                            <AuthContainerHeaderStyle>
                                <Image
                                    source={require("../image/titan.png")}
                                    style={{width: 100, height: 100}}
                                />
                                <AuthTextStyle>
                                    TITAN
                                </AuthTextStyle>
                                <Text style={{
                                    marginTop: 20,
                                    marginBottom: 20,
                                    fontSize: 16,
                                    color: "#f2f2f2",
                                    textAlign: "center"
                                }}>
                                    Bitcoin кошелек в твоем смарфоне.
                                </Text>
                                {this.props.app.phoneRequest ? (
                                    <View style={{height: 170}}>
                                        <CodeInput
                                            containerStyle={{marginBottom: 60}}
                                            ref="codeInputRef"
                                            keyboardType="numeric"
                                            codeLength={6}
                                            activeColor={"#23D29C"}
                                            ignoreCase={true}
                                            className='border-circle'
                                            secureTextEntry={false}
                                            autoFocus={true}
                                            size={44}
                                            codeInputStyle={{
                                                fontWeight: '600',
                                                fontSize: 20,
                                                borderWidth: 1.5,
                                            }}
                                            onFulfill={(code) => this._validCode(code)}
                                        />
                                        <TouchableOpacity
                                            style={{height:60}}
                                            onPress={e => this.state.codeValid ? this.props.verifyPhone({
                                                phone:this.state.phone,
                                                code: this.state.code
                                            }): this._setModalVisible(!this.state.modalVisible, "Нет кода нет проверки!")}
                                        >
                                            <View style={{
                                                width: Dimensions.get('window').width,
                                                height: 60,
                                                backgroundColor: this.state.codeValid ? "#23D29C" : "#2b313f",
                                                justifyContent: "center",
                                                alignContent: "center",
                                                alignItems: "center",
                                            }}>
                                                <Text style={{
                                                    color: this.state.codeValid ? "#ffffff" : "#69758e",
                                                    fontSize: 20
                                                }}>
                                                    Подтвердить код
                                                </Text>
                                            </View>
                                        </TouchableOpacity>
                                        <TouchableOpacity style={{margin: 20}}>
                                            <Text style={{color: "#69758e", textAlign: "right", marginBottom: 20}} onPress={e => this._resetState()}>
                                                Не пришел код?
                                            </Text>
                                        </TouchableOpacity>
                                    </View>
                                ) : (
                                    <View>
                                        <PhoneInput
                                            initialCountry={"ru"}
                                            onChangePhoneNumber={e => this._validPhone(e)}
                                            autoFormat={true}
                                            textProps={{
                                                placeholder: '+78121234567',
                                                placeholderTextColor: '#69758e'
                                            }}
                                            text={{color: "#fff"}}
                                            style={{
                                                paddingLeft: 50,
                                                padding: 30,
                                                marginTop: 20,
                                                //marginLeft: 40,
                                                //marginRight: 40,
                                                backgroundColor: "#1e2331",
                                                //borderRadius: 4
                                            }}
                                            textStyle={{fontSize: 26, color: "#fff"}}
                                            ref={ref => {
                                                this.phone = ref;
                                            }}/>
                                        <TouchableOpacity
                                            onPress={e => this.state.phoneValid
                                                ? this.props.checkPhoneSendCode(this.state.phone)
                                                : this._setModalVisible(!this.state.modalVisible, "Номер телефона это важно!")
                                            }
                                        >
                                            <View style={{
                                                marginTop: 0,
                                                width: Dimensions.get('window').width,
                                                height: 60,
                                                backgroundColor: this.state.phoneValid ? "#23D29C" : "#2b313f",
                                                justifyContent: "center",
                                                alignContent: "center",
                                                alignItems: "center",
                                            }}>
                                                <Text style={{
                                                    color: this.state.phoneValid ? "#ffffff" : "#69758e",
                                                    fontSize: 20
                                                }}>
                                                    Получить код
                                                </Text>
                                            </View>
                                        </TouchableOpacity>
                                    </View>
                                )}
                                <Text style={{
                                    margin: 20,
                                    fontSize: 14,
                                    color: "#7e95bf",
                                    textAlign: "center"
                                }}>
                                    Ваш кошелек будет привязан к мобильному номеру
                                </Text>
                            </AuthContainerHeaderStyle>
                        </KeyboardAwareScrollView>
                    </AuthContainerStyle>
                )}
                <Modal
                    animationType="slide"
                    presentationStyle={"overFullScreen"}
                    transparent={true}
                    visible={this.state.modalVisible}
                >
                    <View style={{
                        backgroundColor: "#1e2331",
                        marginTop: 60,
                        borderTopRightRadius: 20,
                        borderTopLeftRadius: 20,
                        padding:20,
                        flex: 1,
                        justifyContent:"center",
                        alignItems: "center",
                        alignContent: "center"
                    }}>
                        <Text style={{fontSize: 32, color: "#fff", textAlign: "center"}}>
                            Внимание
                        </Text>

                        <LottieView
                            style={{width: 100, height: 100}}
                            source={require('../vectors/connection-error')}
                            autoPlay={true}
                            loop={false}
                        />

                        <Text style={{
                            fontSize: 24,
                            color: "#fff",
                            textAlign: "center",
                            marginBottom: 20,
                        }}>
                            {this.state.modalMessage}
                        </Text>

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
                                Понятно
                            </Text>
                        </TouchableHighlight>
                    </View>
                </Modal>
            </Fragment>
        )
    }
}

const AuthContainerStyle = styled.View`
    width: ${Dimensions.get('window').width};
    height: ${Dimensions.get('window').height};
    flex: 1;
    background: ${props => shadeColor(props.theme.background, -40)};
`;

const AuthContainerHeaderStyle = styled.View`
    flex: 1;
    align-items: center;
    padding-top: 160px;
    padding-bottom: 20px;
    background: ${props => shadeColor(props.theme.background, -40)};
    justify-content: space-between;
    align-content: stretch;
`;

const AuthTextStyle = styled.Text`
    margin-left: 6px;
    text-align: center;
    margin-top: 20px;
    font-size: 24px;
    font-weight: bold;
    letter-spacing: 6px;
    color: ${props => props.theme.text};
`;

export default connect(state => state, {
    checkPhoneSendCode, noRequestCode, verifyPhone
})(Auth);
