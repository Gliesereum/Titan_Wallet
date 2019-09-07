import {createReducer, noMutationState} from '../../utils';
import TYPES from "../../types";

const initialState = {
    auth: null,
    status: null,
    loading: true,
    phoneRequest: null,
    authLoading: false,
    welcome: "Coupler - кнопка услуг!",
    errorSendCode: null,
    error: null
};

export default createReducer(initialState, {

    //-------------------------------------------------//

    [TYPES.VERIFY_CODE.START]:
        (state) => noMutationState(state, {
            authLoading: true
        }),

    [TYPES.VERIFY_CODE.SUCCESS]:
        (state, payload) => noMutationState(state, {
            auth: payload
        }),

    [TYPES.VERIFY_CODE.ERROR]:
        (state, payload) => noMutationState(state, {
            auth: null,
            error: payload.code
        }),

    [TYPES.VERIFY_CODE.FINISH]:
        (state) => noMutationState(state, {
            authLoading: false
        }),

    //-------------------------------------------------//

    [TYPES.NO_REQUEST_CODE.NO_REQUEST_CODE]:
        (state) => noMutationState(state, {
            phoneRequest: null
        }),

    //-------------------------------------------------//

    [TYPES.LOG_OUT.LOG_OUT]:
        (state) => noMutationState(state, {
            auth: null,
            phoneRequest: null,
            authLoading: false
        }),

    //-------------------------------------------------//

    [TYPES.SEND_CODE.START]:
        (state) => noMutationState(state, {
            authLoading: true
        }),

    [TYPES.SEND_CODE.SUCCESS]:
        (state, payload) => noMutationState(state, {
            phoneRequest: payload,
            errorSendCode: null,
        }),

    [TYPES.SEND_CODE.ERROR]:
        (state, payload) => noMutationState(state, {
            errorSendCode: payload.code
        }),

    [TYPES.SEND_CODE.FINISH]:
        (state) => noMutationState(state, {
            authLoading: false
        }),

    //-------------------------------------------------//

    [TYPES.BASE.START]:
        (state) => noMutationState(state, {
            authLoading: false,
            loading: true
        }),

    [TYPES.BASE.SUCCESS]:
        (state, payload) => noMutationState(state, {
            status: payload,
            error: null,
        }),

    [TYPES.BASE.ERROR]:
        (state, payload) => noMutationState(state, {
            error: payload.error.code
        }),

    [TYPES.BASE.FINISH]:
        (state) => noMutationState(state, {
            loading: false
        }),
});
