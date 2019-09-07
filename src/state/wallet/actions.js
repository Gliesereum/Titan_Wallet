import TYPES from "../../types";
import CouplerSDK from "../../sdk";

export function getWalletInfo(phone) {
    return async dispatch => {
        dispatch({type: TYPES.GET_WALLET_INFO.START});
        try {

            const {result} = await CouplerSDK.getBtcWalletInfo(phone);

            await dispatch({
                type: TYPES.GET_WALLET_INFO.SUCCESS,
                payload: result
            });
            await setTimeout(
                async () => await dispatch({
                    type: TYPES.GET_WALLET_INFO.FINISH
                }), 2400)
        } catch (e) {
            console.log("Error Wallet", e);
            setTimeout(async () => await dispatch({
                type: TYPES.GET_WALLET_INFO.ERROR,
                payload: e
            }), 0)
            setTimeout(async () => await dispatch({type: TYPES.GET_WALLET_INFO.FINISH}), 3000)
        }
    }
}

export function createNewBtcWallet(phone) {
    return async dispatch => {
        dispatch({type: TYPES.CREATE_NEW_WALLET.START});
        try {

            const {result} = await CouplerSDK.createBtcWallet(phone);

            await dispatch({
                type: TYPES.CREATE_NEW_WALLET.SUCCESS,
                payload: result
            });

            await setTimeout(
                async () => await dispatch({
                    type: TYPES.CREATE_NEW_WALLET.FINISH
                }), 2400)
        } catch (e) {
            console.log("Error Wallet", e);
            setTimeout(async () => await dispatch({
                type: TYPES.CREATE_NEW_WALLET.ERROR,
                payload: e
            }), 0)
            setTimeout(async () => await dispatch({type: TYPES.CREATE_NEW_WALLET.FINISH}), 3000)
        }
    }
}
