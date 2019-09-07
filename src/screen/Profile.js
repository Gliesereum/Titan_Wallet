import React, {Component, Fragment} from "react";
import {
    View,
    Text,
    Dimensions,
    StatusBar,
    Image
} from "react-native"
import {connect} from "react-redux";
import {logOut} from "../state/app/actions"
import {Ionicons} from "@expo/vector-icons";

class Profile extends Component {
    static navigationOptions = ({navigation}) => {
        return {
            title: "Профиль",
            //title: navigation.getParam('fullName'),
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

    render() {
        const {user} = this.props.app.auth;
        console.log(user);
        return (
            <Fragment>
                <StatusBar barStyle="light-content"/>
                <View style={{
                    width: Dimensions.get('window').width,
                    height: Dimensions.get('window').height,
                    flex: 1,
                    justifyContent: "center",
                    alignItems: "center",
                    backgroundColor: "#272C3A"
                }}>
                    <Text style={{fontSize: 20, color: "#23D29C", marginBottom:20}}>
                        Профиль
                    </Text>
                    <View>
                        <Image
                            style={{width: 150, height: 150, borderRadius: 10}}
                            source={{uri: user.avatarUrl}}
                        />
                    </View>
                    <Text style={{fontSize: 24, color: "#fff", marginTop:20}}>
                        {user.firstName} {user.lastName}
                    </Text>
                    <Text style={{fontSize: 24, color: "#fff", marginTop:20}}>
                        {user.country}
                    </Text>
                    <View style={{
                        marginTop: 20,
                        height: 80,
                        justifyContent: "center",
                        alignItems: "center",
                    }}>
                        <View style={{
                            justifyContent: "center",
                            alignItems: "center",
                            alignContent: "center"
                        }}>
                            <Ionicons
                                onPress={() => this.props.logOut()}
                                name="ios-power"
                                size={45} color={"#23D29C"}
                            />
                            <Text style={{fontSize: 12, color: "#fff", textAlign: "center"}}>
                                Выйти
                            </Text>
                        </View>
                    </View>
                </View>
            </Fragment>
        )
    }
}

export default connect(state => state, {logOut})(Profile);
