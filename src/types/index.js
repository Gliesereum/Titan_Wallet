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
    WINDOW: createOneKeyType('WINDOW_OPEN'),

    BUSINESS_LIST: createType('BUSINESS_LIST'),
    BUSINESS_SINGLE: createType("BUSINESS_SINGLE"),
    BUSINESS: createOneKeyType("BUSINESS_SINGLE_CLEAN"),

    RECORD_ADD_SERVICE: createOneKeyType("RECORD_ADD_SERVICE"),
    RECORD_REMOVE_SERVICE: createOneKeyType("RECORD_REMOVE_SERVICE"),
    SELECT_WORKER: createOneKeyType("SELECT_WORKER"),

    FREE_TIME_RECORD: createType("FREE_TIME_RECORD"),

    SEND_CODE: createType("SEND_CODE"),

    VERIFY_CODE_IN_RECORD: createType("VERIFY_CODE_IN_RECORD"),

    CLEAN_PHONE_STATE: createOneKeyType("CLEAN_PHONE_STATE"),

    CLEAN_RECORD_RESULT: createOneKeyType("CLEAN_RECORD_RESULT"),

    CLEAN_RECORD_SUCCESS: createOneKeyType("CLEAN_RECORD_SUCCESS"),

    MODAL_ACTIVE: createOneKeyType("MODAL_ACTIVE"),

    CLOSE_MODAL_CLEAN_ERROR: createOneKeyType("CLOSE_MODAL_CLEAN_ERROR"),
};

export default TYPES
