function createType(name) {
    const PARSE_NAME = name.toUpperCase();
    return {
        START: `${PARSE_NAME}_START`,
        SUCCESS: `${PARSE_NAME}_SUCCESS`,
        ERROR: `${PARSE_NAME}_ERROR`,
        FINISH: `${PARSE_NAME}_FINISH`,
    }
}

function createOneKeyType(name) {
    const PARSE_NAME = name.toUpperCase();
    return {
        [PARSE_NAME]: `${PARSE_NAME}`
    }
}

const TYPES = {
    BASE: createType('BASE'),
    SEND_CODE: createType("SEND_CODE"),

    GET_WALLET_INFO: createType("GET_WALLET_INFO"),
    CREATE_NEW_WALLET: createType("CREATE_NEW_WALLET"),

    VERIFY_CODE: createType("VERIFY_CODE"),

    NO_REQUEST_CODE: createOneKeyType("NO_REQUEST_CODE"),

    LOG_OUT: createOneKeyType("LOG_OUT"),
};

export default TYPES
