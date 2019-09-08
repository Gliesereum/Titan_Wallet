import React, {Component} from 'react';
import { Provider } from "react-redux";
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from "./src/state/store";
import DelegateApp from "./src/boot";
import {CONFIG} from "./src/sdk"
import styled, {ThemeProvider} from 'styled-components';
import {AsyncStorage} from "react-native";

const Container = styled(DelegateApp)`
	background-color: ${props => props.theme.background};
`;

class App extends Component {

    async componentDidMount() {
        const keys = await AsyncStorage.getAllKeys();
        await AsyncStorage.multiRemove(keys)
    }

    render() {
        return (
            <Provider store={store}>
                <PersistGate loading={false} persistor={persistor}>
                    <ThemeProvider theme={{
                        background: "#252a3a",
                        text: "#d6d6d6"
                    }}>
                        <Container config={CONFIG}/>
                    </ThemeProvider>
                </PersistGate>
            </Provider>
        );
    }
}

export default App;
