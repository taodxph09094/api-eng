import {
  ALL_CENTERS_FAIL,
  ALL_CENTERS_REQUEST,
  ALL_CENTERS_SUCCESS,
  CLEAR_ERRORS,
  CREATE_CENTER_FAIL,
  CREATE_CENTER_REQUEST,
  CREATE_CENTER_RESET,
  CREATE_CENTER_SUCCESS,
  DELETE_CENTER_FAIL,
  DELETE_CENTER_REQUEST,
  DELETE_CENTER_RESET,
  DELETE_CENTER_SUCCESS,
  UPDATE_CENTER_FAIL,
  UPDATE_CENTER_REQUEST,
  UPDATE_CENTER_RESET,
  UPDATE_CENTER_SUCCESS,
} from "../constants/centerConstants";

export const newCenterReducer = (state = { center: {} }, action) => {
  switch (action.type) {
    case CREATE_CENTER_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case CREATE_CENTER_SUCCESS:
      return {
        loading: false,
        success: action.payload.success,
        center: action.center,
      };

    case CREATE_CENTER_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case CREATE_CENTER_RESET:
      return {
        ...state,
        success: false,
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

export const allCenterReducer = (state = { center: [] }, action) => {
  switch (action.type) {
    case ALL_CENTERS_REQUEST:
      return {
        loading: true,
      };

    case ALL_CENTERS_SUCCESS:
      return {
        loading: false,
        center: action.payload,
      };

    case ALL_CENTERS_FAIL:
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

export const centerReducer = (state = {}, action) => {
  switch (action.type) {
    case DELETE_CENTER_REQUEST:
    case UPDATE_CENTER_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case UPDATE_CENTER_SUCCESS:
      return {
        ...state,
        loading: false,
        isUpdated: action.payload,
      };

    case DELETE_CENTER_SUCCESS:
      return {
        ...state,
        loading: false,
        isDeleted: action.payload,
      };

    case UPDATE_CENTER_FAIL:
    case DELETE_CENTER_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case UPDATE_CENTER_RESET:
      return {
        ...state,
        isUpdated: false,
      };

    case DELETE_CENTER_RESET:
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
