export const CONFIG = {
    APPLICATION_ID: "4ba91ec3-5a50-400f-9d29-08e4f6f022e9",
    SERVER: "https://dev.gliesereum.com/api",
    SERVER_BTC: "http://192.168.0.102:3390/api/v1",
};

const URLS = {
    GET_STATUS_API: `${CONFIG.SERVER}/status`,
    CHECK_PHONE: `${CONFIG.SERVER}/account/v1/phone/code?phone=`,
    SIGN_IN: `${CONFIG.SERVER}/account/v1/auth/signin`,

    GET_WALLET: `${CONFIG.SERVER_BTC}/wallet?phone=`,
    CREATE_WALLET: `${CONFIG.SERVER_BTC}/wallet`,
};

const SDK = {

    getApiStatus: async () => await getHttpPromise(URLS.GET_STATUS_API),

    //----------------------------------------------------------------------------------------//
    getBtcWalletInfo: async phone => await getHttpPromise(URLS.GET_WALLET + phone),

    createBtcWallet: async body => await postHttpPromise(URLS.CREATE_WALLET, body),
    //----------------------------------------------------------------------------------------//

    checkPhone: async phone => await getHttpPromise(URLS.CHECK_PHONE + phone),

    //+ `${process.env.NODE_ENV === 'development' ? '&dev=true' : '&dev=true'}`

    signIn: async body => await postHttpPromise(URLS.SIGN_IN, body),

};

export function getHttpPromise(url, token = undefined) {
    return new Promise((resolve, reject) => {
        fetch(`${url}`, {
            method: 'get',
            cache: 'default',
            headers: token ? new Headers({
                "Authorization": `Bearer ${token}`,
                "Application-Id": CONFIG.APPLICATION_ID,
                "Content-Type": "application/json",
            }) : new Headers({
                "Application-Id": CONFIG.APPLICATION_ID,
                "Content-Type": "application/json",
            }),
        }).then(checkHttpStatus)
            .then(res => {
            if(!res){
                throw new Error()
            }
            return resolve(res)
        }).catch(err => {
            console.log("Promise ERROR", err);

            reject(err.message)
        });
    })
}


export function postHttpPromise(url, body, token = undefined) {
    return new Promise((resolve, reject) => {
        fetch(`${url}`, {
            method: 'post',
            cache: 'default',
            headers: token ? new Headers({
                "Authorization": `Bearer ${token}`,
                "Application-Id": CONFIG.APPLICATION_ID,
                "Content-Type": "application/json",
            }) : new Headers({
                "Application-Id": CONFIG.APPLICATION_ID,
                "Content-Type": "application/json",
            }),
            body: JSON.stringify(body)
        }).then(checkHttpStatus)
            .then(res => {
                if(!res){
                    throw new Error()
                }
                return resolve(res)
            }).catch(err => {
            console.log("Promise ERROR", err);

            reject(err.message)
        });
    })
}

function checkHttpStatus(response) {
    if (response.headers.get("content-type").indexOf("application/json") !== -1){
        if (response.status >= 200 && response.status < 300) {
            if (response.status === 204) return [];
            return response.json()
        } else {
            return response.json().then(Promise.reject.bind(Promise));
        }
    }
}

export default SDK
