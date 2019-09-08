export function createReducer(initialState, reducerMap) {
    return (state = initialState, action) => {
        const reducer = reducerMap[action.type];
        return reducer
            ? reducer(state, action.payload)
            : state;
    };
}


export function noMutationState(state, newState) {
    return {...state, ...newState}
}

export function convertHex(hex, opacity) {
    hex = hex.replace('#', '');
    let r = parseInt(hex.substring(0, 2), 16);
    let g = parseInt(hex.substring(2, 4), 16);
    let b = parseInt(hex.substring(4, 6), 16);

    let result = 'rgba(' + r + ',' + g + ',' + b + ',' + opacity / 100 + ')';
    return result;
}


export function shadeColor(color, percent) {
    let R = parseInt(color.substring(1, 3), 16);
    let G = parseInt(color.substring(3, 5), 16);
    let B = parseInt(color.substring(5, 7), 16);
    R = parseInt(R * (100 + percent) / 100);
    G = parseInt(G * (100 + percent) / 100);
    B = parseInt(B * (100 + percent) / 100);
    R = (R < 255) ? R : 255;
    G = (G < 255) ? G : 255;
    B = (B < 255) ? B : 255;
    let RR = ((R.toString(16).length === 1) ? "0" + R.toString(16) : R.toString(16));
    let GG = ((G.toString(16).length === 1) ? "0" + G.toString(16) : G.toString(16));
    let BB = ((B.toString(16).length === 1) ? "0" + B.toString(16) : B.toString(16));
    return "#" + RR + GG + BB;
}

import { AsyncStorage } from "react-native";

// import {store} from '../redux/store';

const timeOutMessageError = new Error("Превишен интервал ожидания. Повторите попытку!");

const timeOut = (reject, time = 60000) => (setTimeout(() => reject(timeOutMessageError), time));


// eslint-disable-next-line
export const asyncRequest = (url, method = "GET", body, headers, time) => {
    return new Promise((resolve, reject) => {
        const timer = timeOut(reject, time);
        fetch(`${config.url}${url}`, {
            method: method,
            cache: "default",
            headers: header(headers),
            body: JSON.stringify(body)
        }).then(checkHttpStatus).then(data => {
            clearInterval(timer);
            resolve(data);
        }).catch(err => {
            reject(err);
        });
    });
};

function checkHttpStatus(response) {
    if (response.status >= 200 && response.status < 300) {
        return response.json();
    } else {
        return response.json().then(Promise.reject.bind(Promise));
    }
}

const requestConfig = (method, token, body) => {
    return {
        method,
        cache: "default",
        headers: header(token),
        body: JSON.stringify(body)
    };
};


export const asyncRequestTest = (url, method = "GET", moduleUrl = "karma", token, body, requestTime) => {
    return new Promise(async (resolve, reject) => {
        const timer = timeOut(reject, requestTime);
        try {
            const fullURL = `${config.url}${moduleUrl}/v1/${url}`;
            const _requestConfig = requestConfig(method, token, body);
            const request = await fetch(fullURL, _requestConfig);
            if (request.status === 204) {
                clearTimeout(timer);
                resolve();
            }
            if (request.status >= 200 && request.status <= 300) {
                const data = await request.json();
                clearTimeout(timer);
                resolve(data);
            }
            const data = await request.json();
            clearTimeout(timer);
            reject(data);
        } catch (e) {
            clearTimeout(timer);
            reject(e);
        }
    });
};

export const asyncRequestAuth = (url, method = "GET", moduleUrl = "karma", body, requestTime) => {
    return new Promise(async (resolve, reject) => {
        const timer = timeOut(reject, requestTime);
        const token = JSON.parse(await AsyncStorage.getItem("token")).accessToken;
        try {
            const fullURL = `${config.url}${moduleUrl}/v1/${url}`;
            const _requestConfig = requestConfig(method, token, body);
            const request = await fetch(fullURL, _requestConfig);
            if (request.status === 204) {
                clearTimeout(timer);
                resolve();
            }
            if (request.status >= 200 && request.status <= 300) {

                if (method === 'DELETE') {
                    clearTimeout(timer);
                    resolve();
                }

                const data = await request.json();
                clearTimeout(timer);
                resolve(data);
            }
            const data = await request.json();
            clearTimeout(timer);
            reject(data);
        } catch (e) {
            clearTimeout(timer);
            reject(e);
        }
    });
};


export const withToken = fn => (...argv) => {
    // console.log(store);
    // const token = store.getState().auth.accessToken;
    // return fn({...argv, token});
};


function header(token) {
    const defaultHeaders = { "content-type": "application/json", "accept": "application/json" };
    if (!token) {
        return defaultHeaders;
    }
    return { ...defaultHeaders, "Authorization": `Bearer ${token}` };
};



