import TYPES from "../../types/index";
import CouplerSDK from "../../sdk/index";

export function startBoot(config) {
    return async dispatch => {
        dispatch({type: TYPES.BASE.START});
        try {

            const status = await CouplerSDK.getApiStatus();

            await dispatch({
                type: TYPES.BASE.SUCCESS,
                payload: status
            });
            await setTimeout(
                async () => await dispatch({
                    type: TYPES.BASE.FINISH
                }), 2400)
        } catch (e) {
            setTimeout(async () => await dispatch({
                type: TYPES.BASE.ERROR,
                payload: {
                    error: {
                        code: 1010
                    }
                }
            }), 0)
            setTimeout(async () => await dispatch({type: TYPES.BASE.FINISH}), 3000)
        }
    }
}

export function checkPhoneSendCode(phone) {
    return async dispatch => {
        await dispatch({type: TYPES.SEND_CODE.START});
        try {

            let phoneParse = phone.replace(new RegExp(/[&\/\\#,+()$~%.'":*?<>{}]/g), '');

            await CouplerSDK.checkPhone(phoneParse);
            await dispatch({
                type: TYPES.SEND_CODE.SUCCESS,
                payload: phoneParse
            });
            await setTimeout(
                async () => await dispatch({type: TYPES.SEND_CODE.FINISH}),
                2200
            )
        } catch (e) {
            setTimeout(async () => await dispatch({type: TYPES.SEND_CODE.ERROR, payload: e}), 1400)
            setTimeout(async () => await dispatch({type: TYPES.SEND_CODE.FINISH}), 1400)
        }
    }
}

export function verifyPhone({phone, code}) {
    return async dispatch => {
        await dispatch({type: TYPES.VERIFY_CODE.START});
        try {
            let phoneParse = phone.replace(new RegExp(/[&\/\\#,+()$~%.'":*?<>{}]/g), '');
            const res = await CouplerSDK.signIn({
                value: phoneParse,
                type: "PHONE",
                code: code
            });
            await dispatch({
                type: TYPES.VERIFY_CODE.SUCCESS,
                payload: res
            });
            await setTimeout(
                async () => await dispatch({type: TYPES.VERIFY_CODE.FINISH}),
                3800
            )
        } catch (e) {
            setTimeout(() => dispatch({type: TYPES.VERIFY_CODE.ERROR, payload: e}), 2400);
            setTimeout(() => dispatch({type: TYPES.VERIFY_CODE.FINISH}), 2400);
        }
    }
}

export function logOut() {
    return dispatch => {
        dispatch({type: TYPES.BASE.START});
        dispatch({type: TYPES.LOG_OUT.LOG_OUT});
        setTimeout(() => dispatch({type: TYPES.BASE.FINISH}), 3000)
    }
}

export function noRequestCode() {
    return dispatch => dispatch({type: TYPES.NO_REQUEST_CODE.NO_REQUEST_CODE})
}

