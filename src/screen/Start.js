import React, {Component} from "react";
import {
    View,
    ScrollView,
    Text,
    StyleSheet,
    StatusBar,
    ActivityIndicator,
    Image,
    RefreshControl,
    Dimensions,
    TouchableOpacity,
    Button,
} from "react-native"
import {connect} from "react-redux";
import {
    getBusinessList
} from "../state/app/actions"

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
    }
});

class LogoTitle extends React.Component {
    render() {
        return (
            <Image
                source={require("../image/titan.png")}
                style={{ width: 24, height: 34 }}
            />
        );
    }
}

class Start extends Component {
    static navigationOptions = ({ navigation }) => {
        return {
            headerTitle: <LogoTitle />,
            // headerRight: (
            //     <Button
            //         onPress={() => alert('This is a button!')}
            //         title="Info"
            //         color="#fff"
            //     />
            // ),
            // title: "Coupler",
            // headerStyle: {
            //     backgroundColor: '#ff8a2d',
            // },
            // headerTintColor: '#000',
            // headerTitleStyle: {
            //     fontWeight: 'bold',
            // },
        };
    };

    // _onRefresh = () => {
    //     console.log("Refreshing")
    //     this.props.getBusinessList(this.props.config)
    // };

    render() {
        const {app} = this.props;
        const {corpInfo, businessList} = app;
        return (
            <View style={styles.root}>
                <StatusBar barStyle="light-content" />
                <View style={{flex: 1}}>
                    <View style={{
                        height: 160,
                        justifyContent: "center",
                        backgroundColor: "#ffd3b9",
                        alignItems: 'stretch'
                    }}>
                        <Image
                            resizeMode="cover"
                            onLoadStart={e => console.log("Start Loading Image")}
                            onLoad={e => console.log("Success Loading Image")}
                            onLoadEnd={e => console.log("End Loading Image")}
                            onError={e => console.log("Error Loading Image")}
                            style={styles.logo}
                            source={{
                                //uri: corpInfo.coverUrl
                                uri: corpInfo.logoUrl
                            }}
                        />
                        <Image
                            onLoadStart={e => console.log("Start Loading Image")}
                            onLoad={e => console.log("Success Loading Image")}
                            onLoadEnd={e => console.log("End Loading Image")}
                            onError={e => console.log("Error Loading Image")}
                            style={{
                                width: 100,
                                height:100,
                                borderRadius: 6,
                                marginLeft: 12,
                                opacity: 0.9,
                                backgroundColor: "#dac6b7"
                            }}
                            source={{uri: corpInfo.logoUrl}}
                        />
                    </View>
                    <View style={{
                        backgroundColor: "#ffead8",
                        height: 40,
                        justifyContent: "center",
                        alignItems: "center",
                        borderBottomColor: '#ccb8aa',
                        borderBottomWidth: 1
                    }}>
                        <Text style={{fontSize: 24, color: "#444"}}>
                            {corpInfo.name}
                        </Text>
                    </View>
                    <ScrollView
                        contentContainer={{flex: 1}}
                        contentContainerStyle={{flexGrow:1, backgroundColor: "#f2f2f2"}}
                    >
                        {businessList.length && businessList.map(bs => {
                            return (
                                <TouchableOpacity
                                    onPress={() => this.props.navigation.navigate('Details', {
                                        bId: bs.id
                                    })}
                                    style={{
                                        marginTop: 8,
                                        backgroundColor: "#ffffff",
                                        marginBottom: 4,
                                        height: 90,
                                        padding: 8,
                                        justifyContent: "center",
                                        alignContent: "center",
                                        shadowColor: "#000",
                                        shadowOffset: {
                                            width: 0,
                                            height: 1,
                                        },
                                        shadowOpacity: 0.20,
                                        shadowRadius: 1.41,
                                        elevation: 2,
                                    }}
                                    key={bs.id}>
                                    <Text style={{fontSize: 16, color: "#444"}}>
                                        {bs.name}
                                    </Text>
                                </TouchableOpacity>
                            )
                        })}
                    </ScrollView>
                    <View style={{
                        backgroundColor: "#ffd2a2",
                        height: 40,
                        justifyContent: "center",
                        alignItems: "center"
                    }}>
                        <Text style={{fontSize: 12, color: "#444"}}>
                            {corpInfo.name}
                        </Text>
                    </View>
                </View>
            </View>
        )
    }
}

export default connect(state => state, {
    getBusinessList
})(Start);
