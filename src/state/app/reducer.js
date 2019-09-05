import {createReducer, noMutationState} from '../../utils';
import TYPES from "../../types";

const initialState = {
    status: null,
    loading: true,
    corporation: null,
    businessList: [],
    businessListLoading: false,
    welcome: "Coupler - кнопка услуг!",
    errorBusinessList: null,
    error: null
};

export default createReducer(initialState, {
    //-------------------------------------------------//

    [TYPES.BUSINESS_LIST.START]:
        (state) => noMutationState(state, {
            businessListLoading: true
        }),

    [TYPES.BUSINESS_LIST.SUCCESS]:
        (state, payload) => noMutationState(state, {
            businessList: payload
        }),

    [TYPES.BUSINESS_LIST.ERROR]:
        (state, payload) => noMutationState(state, {
            errorBusinessList: payload.code
        }),

    [TYPES.BUSINESS_LIST.FINISH]:
        (state) => noMutationState(state, {
            businessListLoading: false
        }),


    //-------------------------------------------------//

    [TYPES.BASE.START]:
        (state) => noMutationState(state, {
            loading: true
        }),

    [TYPES.BASE.SUCCESS]:
        (state, {status, corpInfo}) => noMutationState(state, {
            status: status,
            corpInfo: corpInfo,
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
