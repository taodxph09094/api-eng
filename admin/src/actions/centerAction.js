import axios from "axios";
import {
  ALL_CENTERS_FAIL,
  ALL_CENTERS_REQUEST,
  ALL_CENTERS_SUCCESS,
  CLEAR_ERRORS,
  CREATE_CENTER_FAIL,
  CREATE_CENTER_REQUEST,
  CREATE_CENTER_SUCCESS,
  DELETE_CENTER_FAIL,
  DELETE_CENTER_REQUEST,
  DELETE_CENTER_SUCCESS,
  UPDATE_CENTER_FAIL,
  UPDATE_CENTER_REQUEST,
  UPDATE_CENTER_SUCCESS,
} from "../constants/centerConstants";

// Create
export const createCenter = (center) => async (dispatch) => {
  try {
    dispatch({ type: CREATE_CENTER_REQUEST });

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const { data } = await axios.post(
      "/api/v1/admin/center/new",
      center,
      config
    );

    dispatch({
      type: CREATE_CENTER_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: CREATE_CENTER_FAIL,
      payload: error.response.data.message,
    });
  }
};

// Get All CENTERs (admin)
export const getCenter = () => async (dispatch) => {
  try {
    dispatch({ type: ALL_CENTERS_REQUEST });

    const { data } = await axios.get("/api/v1/admin/center");

    dispatch({ type: ALL_CENTERS_SUCCESS, payload: data.center });
  } catch (error) {
    dispatch({
      type: ALL_CENTERS_FAIL,
      payload: error.response.data.message,
    });
  }
};

// Update CENTER
export const updateCenter = (id, center) => async (dispatch) => {
  try {
    dispatch({ type: UPDATE_CENTER_REQUEST });

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const { data } = await axios.put(
      `/api/v1/admin/center/${id}`,
      center,
      config
    );

    dispatch({ type: UPDATE_CENTER_SUCCESS, payload: data.success });
  } catch (error) {
    dispatch({
      type: UPDATE_CENTER_FAIL,
      payload: error.response.data.message,
    });
  }
};

// Delete CENTER
export const deleteCenter = (id) => async (dispatch) => {
  try {
    dispatch({ type: DELETE_CENTER_REQUEST });

    const { data } = await axios.delete(`/api/v1/admin/center/${id}`);

    dispatch({ type: DELETE_CENTER_SUCCESS, payload: data.success });
  } catch (error) {
    dispatch({
      type: DELETE_CENTER_FAIL,
      payload: error.response.data.message,
    });
  }
};

// Clearing Errors
export const clearErrors = () => async (dispatch) => {
  dispatch({ type: CLEAR_ERRORS });
};
