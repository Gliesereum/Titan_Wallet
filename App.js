import React, {Component} from 'react';
import { Provider } from "react-redux";
import { store } from "./src/redux/store";
import DelegateApp from "./src/boot";

export default class App extends Component {
    render() {
        return (
            <Provider store={store}>
                <DelegateApp/>
            </Provider>
        );
    }
}
