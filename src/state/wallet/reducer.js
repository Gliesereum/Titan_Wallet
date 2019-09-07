import {createReducer, noMutationState} from '../../utils';
import TYPES from "../../types";

const initialState = {
    info: null,
    loading: true,
    error: null
};

export default createReducer(initialState, {
    //-------------------------------------------------//

    [TYPES.CREATE_NEW_WALLET.START]:
        (state) => noMutationState(state, {
            loading: true
        }),

    [TYPES.CREATE_NEW_WALLET.SUCCESS]:
        (state, payload) => noMutationState(state, {
            info: payload,
            error: null
        }),

    [TYPES.CREATE_NEW_WALLET.ERROR]:
        (state, payload) => noMutationState(state, {
            info: null,
            error: payload
        }),

    [TYPES.CREATE_NEW_WALLET.FINISH]:
        (state) => noMutationState(state, {
            loading: false
        }),

//-------------------------------------------------//

    [TYPES.GET_WALLET_INFO.START]:
        (state) => noMutationState(state, {
            loading: true
        }),

    [TYPES.GET_WALLET_INFO.SUCCESS]:
        (state, payload) => noMutationState(state, {
            info: payload,
            error: null
        }),

    [TYPES.GET_WALLET_INFO.ERROR]:
        (state, payload) => noMutationState(state, {
            info: null,
            error: payload
        }),

    [TYPES.GET_WALLET_INFO.FINISH]:
        (state) => noMutationState(state, {
            loading: false
        }),

    //-------------------------------------------------//
});
