import React, {Component} from 'react';
import { Provider } from "react-redux";
import { store } from "./src/state/store";
import DelegateApp from "./src/boot";
import {CONFIG} from "./src/sdk"
import styled, {ThemeProvider} from 'styled-components';

const Container = styled(DelegateApp)`
	background-color: ${props => props.theme.background};
`;

class App extends Component {
    render() {
        return (
            <Provider store={store}>
                <ThemeProvider theme={{
                    background: "#f2f2f2",
                    text: "#282828"
                }}>
                    <Container config={CONFIG}/>
                </ThemeProvider>
            </Provider>
        );
    }
}

export default App;
