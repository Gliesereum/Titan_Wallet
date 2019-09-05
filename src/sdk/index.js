export const CONFIG = {
    APPLICATION_ID: "4ba91ec3-5a50-400f-9d29-08e4f6f022e9",
    CORPORATION_ID: "3d7feeb7-cc5c-49a4-a673-6e9ad349f70f",
    SERVER: "https://dev.gliesereum.com/api",
};

const URLS = {
    GET_STATUS_API: `${CONFIG.SERVER}/status`,
    GET_CORPORATION_INFO: `${CONFIG.SERVER}/account/v1/corporation/`,
    GET_BUSINESS_LIST: `${CONFIG.SERVER}/karma/v1/business/search/document`,
    GET_BUSINESS_SINGLE: `${CONFIG.SERVER}/karma/v1/business/full-model-by-id?id=`,
    GET_BUSINESS_WORKERS: `${CONFIG.SERVER}karma/v1/working-space/workers/by-business?businessId=`,
    FREE_TIME: `${CONFIG.SERVER}/karma/v1/record/free-time`,
    CHECK_PHONE: `${CONFIG.SERVER}/account/v1/phone/code?phone=`,
    SIGN_IN: `${CONFIG.SERVER}/account/v1/auth/signin`,
    MAKE_RECORD: `${CONFIG.SERVER}/karma/v1/record`,
};

const SDK = {

    getApiStatus: async () => await getHttpPromise(URLS.GET_STATUS_API),

    infoCorpById: async id => await getHttpPromise(URLS.GET_CORPORATION_INFO + id),

    businessList: async id => await postHttp(URLS.GET_BUSINESS_LIST, {corporationIds: [id]}),

    // infoBusinessById: async id => await getAsync(URLS.GET_BUSINESS_SINGLE + id),
    //
    //
    // soonRecord: async body => await postAsync(URLS.FREE_TIME, body),
    //
    // makeRecord: async (token, body) => await postAsync(URLS.MAKE_RECORD, body, token),
    //
    // checkPhone: async phone => await getAsync(URLS.CHECK_PHONE + phone + `${process.env.NODE_ENV === 'development' ? '&dev=true' : '&dev=true'}`),
    //
    // signIn: async body => await postAsync(URLS.SIGN_IN, body),

};

export function getHttpPromise(url, token = '') {
    return new Promise((resolve, reject) => {
        fetch(`${url}`, {
            method: 'get',
            cache: 'default',
            headers: token.length ? new Headers({
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


async function postHttp(url, body) {
    try {
        const res = await fetch(url, {
            method: 'post',
            cache: 'default',
            headers: new Headers({
                "Application-Id": CONFIG.APPLICATION_ID,
                "Content-Type": "application/json",
            }),
            body: JSON.stringify(body)
        });
        return checkHttpStatus(res)
    } catch (e) {
        return e
    }
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
