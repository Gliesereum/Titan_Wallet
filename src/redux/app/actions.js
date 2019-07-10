const actions = {

    GLOBAL_SPINNER_ON: 'GLOBAL_SPINNER_ON',
    GLOBAL_SPINNER_OFF: 'GLOBAL_SPINNER_OFF',

    $startApplication: () => {
        return async dispatch => {
            try {

                await dispatch({type: actions.GLOBAL_SPINNER_ON});

                setTimeout(async () => {
                    await dispatch({type: actions.GLOBAL_SPINNER_OFF});
                    console.log("Send router!")
                }, 2800);
            } catch (e) {
                console.log(e)
            }
        }
    },
};


export default actions;
