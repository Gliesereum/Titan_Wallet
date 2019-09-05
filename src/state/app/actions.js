import TYPES from "../../types/index";
import CouplerSDK from "../../sdk/index";

export function startBoot(config) {
    return async dispatch => {
        dispatch({type: TYPES.BASE.START});
        try {
            const status = await CouplerSDK.getApiStatus();
            const corpInfo = await CouplerSDK.infoCorpById(config.CORPORATION_ID);

            await dispatch({
                type: TYPES.BASE.SUCCESS,
                payload: {
                    status: status,
                    corpInfo: corpInfo,
                }
            });
            await setTimeout(
                async () => await dispatch({
                    type: TYPES.BASE.FINISH
                }), 2000)
        } catch (e) {
            console.log("startBoot", e);
            setTimeout(async () => await dispatch({
                type: TYPES.BASE.ERROR,
                payload: {
                    error: {
                        code: 1010
                    }
                }
            }), 2000)
            setTimeout(async () => await dispatch({type: TYPES.BASE.FINISH}), 3000)
        }
    }
}

export function getBusinessList(config) {
    return async dispatch => {
        dispatch({type: TYPES.BUSINESS_LIST.START});
        try {
            const businessList = await CouplerSDK.businessList(config.CORPORATION_ID);
            await dispatch({
                type: TYPES.BUSINESS_LIST.SUCCESS,
                payload: businessList
            });
            await setTimeout(
                async () => await dispatch({type: TYPES.BUSINESS_LIST.FINISH}),
                1400
            )
        } catch (e) {
            setTimeout(() => dispatch({type: TYPES.BUSINESS_LIST.ERROR, payload: e}), 0)
            setTimeout(() => dispatch({type: TYPES.BUSINESS_LIST.FINISH}), 0)
        }
    }
}
