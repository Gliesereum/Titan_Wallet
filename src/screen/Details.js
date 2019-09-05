import React, {Component, Fragment} from "react";
import {
    View,
    Text,
    Dimensions,
    Button, StatusBar
} from "react-native"
import {connect} from "react-redux";

class Details extends Component {
    static navigationOptions = ({ navigation }) => {
        return {
            title: navigation.getParam('bId'),
            headerStyle: {
                backgroundColor: '#272C3A',
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
                fontWeight: 'bold',
            },
        };
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
                    justifyContent: "center",
                    alignItems: "center",
                    backgroundColor: "red"
                }}>
                    <Text style={{fontSize: 30, color: "#fff"}}>
                        {navigation.getParam('bId')}
                    </Text>
                </View>
            </Fragment>
        )
    }
}

export default connect(state => state)(Details);
