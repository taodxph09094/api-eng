import {
  CREATE_CLASS_REQUEST,
  CREATE_CLASS_SUCCESS,
  CREATE_CLASS_FAIL,
  MY_CLASS_REQUEST,
  MY_CLASS_SUCCESS,
  MY_CLASS_FAIL,
  ALL_CLASS_REQUEST,
  ALL_CLASS_SUCCESS,
  ALL_CLASS_FAIL,
  UPDATE_CLASS_REQUEST,
  UPDATE_CLASS_SUCCESS,
  UPDATE_CLASS_FAIL,
  UPDATE_CLASS_RESET,
  DELETE_CLASS_REQUEST,
  DELETE_CLASS_SUCCESS,
  DELETE_CLASS_FAIL,
  DELETE_CLASS_RESET,
  CLASS_DETAILS_REQUEST,
  CLASS_DETAILS_SUCCESS,
  CLASS_DETAILS_FAIL,
  CLEAR_ERRORS,
} from "../constants/classConstants";

export const newClassReducer = (state = {}, action) => {
  switch (action.type) {
    case CREATE_CLASS_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case CREATE_CLASS_SUCCESS:
      return {
        loading: false,
        orderClass: action.payload,
      };

    case CREATE_CLASS_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };

    default:
      return state;
  }
};

export const myClassReducer = (state = { ordersClass: [] }, action) => {
  switch (action.type) {
    case MY_CLASS_REQUEST:
      return {
        loading: true,
      };

    case MY_CLASS_SUCCESS:
      return {
        loading: false,
        ordersClass: action.payload,
      };

    case MY_CLASS_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };

    default:
      return state;
  }
};

export const allClassReducer = (state = { ordersClass: [] }, action) => {
  switch (action.type) {
    case ALL_CLASS_REQUEST:
      return {
        loading: true,
      };

    case ALL_CLASS_SUCCESS:
      return {
        loading: false,
        ordersClass: action.payload,
      };

    case ALL_CLASS_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };

    default:
      return state;
  }
};

export const classReducer = (state = {}, action) => {
  switch (action.type) {
    case UPDATE_CLASS_REQUEST:
    case DELETE_CLASS_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case UPDATE_CLASS_SUCCESS:
      return {
        ...state,
        loading: false,
        isUpdated: action.payload,
      };

    case DELETE_CLASS_SUCCESS:
      return {
        ...state,
        loading: false,
        isDeleted: action.payload,
      };

    case UPDATE_CLASS_FAIL:
    case DELETE_CLASS_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case UPDATE_CLASS_RESET:
      return {
        ...state,
        isUpdated: false,
      };

    case DELETE_CLASS_RESET:
      return {
        ...state,
        isDeleted: false,
      };
    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };

    default:
      return state;
  }
};

export const classDetailsReducer = (state = { orderClass: {} }, action) => {
  switch (action.type) {
    case CLASS_DETAILS_REQUEST:
      return {
        loading: true,
      };

    case CLASS_DETAILS_SUCCESS:
      return {
        loading: false,
        orderClass: action.payload,
      };

    case CLASS_DETAILS_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };

    default:
      return state;
  }
};
