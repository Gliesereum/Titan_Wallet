import {createReducer} from '../../utils';

import actions from './actions';

const initialState = {
    loading: true,
    welcome: "Welcome Titan Wallet"
};


const appReducer = createReducer(initialState, {
    [actions.GLOBAL_SPINNER_ON]: (state) => {
        return {
            ...state,
            loading: true
        };
    },
    [actions.GLOBAL_SPINNER_OFF]: (state) => {
        return {
            ...state,
            loading: false
        };
    }
});


export default appReducer;
