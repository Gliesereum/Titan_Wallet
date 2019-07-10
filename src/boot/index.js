import React, {Component} from "react";
import {
    View,
    Text,
    ActivityIndicator,
    ScrollView,
    RefreshControl,
    StyleSheet,
    StatusBar
} from "react-native"
import {connect} from "react-redux";
import actionApp from "../redux/app/actions"
import Brand from "../vectors/Brand";

const styles = StyleSheet.create({
    root: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#000"
    }
});

class Delegate extends Component {
    componentDidMount() {
        this.props.$startApplication()
    };

    render() {
        return (
            <View style={styles.root}>
                <StatusBar barStyle="light-content"/>
                {this.props.app.loading ? <Brand/> :
                    (
                        <Text style={{fontSize: 20, color: "#fff"}}>
                            {this.props.app.welcome}
                        </Text>
                    )
                }
            </View>
        )
    }
}

const {$startApplication} = actionApp;

export default connect(state => state, {$startApplication})(Delegate);
