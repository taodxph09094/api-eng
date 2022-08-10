import {
  CREATE_CLASS_SUCCESS,
  CREATE_CLASS_REQUEST,
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
  DELETE_CLASS_REQUEST,
  DELETE_CLASS_SUCCESS,
  DELETE_CLASS_FAIL,
  CLASS_DETAILS_REQUEST,
  CLASS_DETAILS_SUCCESS,
  CLASS_DETAILS_FAIL,
  CLEAR_ERRORS,
} from "../constants/classConstants";

import axios from "axios";

// Create Order
export const createClass = (orderClass) => async (dispatch) => {
  try {
    dispatch({ type: CREATE_CLASS_REQUEST });

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const { data } = await axios.post("/api/v1/class/new", orderClass, config);

    dispatch({ type: CREATE_CLASS_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: CREATE_CLASS_FAIL,
      payload: error.response.data.message,
    });
  }
};

// My Orders
export const myClass = () => async (dispatch) => {
  try {
    dispatch({ type: MY_CLASS_REQUEST });

    const { data } = await axios.get("/api/v1/class/me");

    dispatch({ type: MY_CLASS_SUCCESS, payload: data.ordersClass });
  } catch (error) {
    dispatch({
      type: MY_CLASS_FAIL,
      payload: error.response.data.message,
    });
  }
};

// Get All Orders (admin)
export const getAllClass = () => async (dispatch) => {
  try {
    dispatch({ type: ALL_CLASS_REQUEST });

    const { data } = await axios.get("/api/v1/admin/class");

    dispatch({ type: ALL_CLASS_SUCCESS, payload: data.ordersClass });
  } catch (error) {
    dispatch({
      type: ALL_CLASS_FAIL,
      payload: error.response.data.message,
    });
  }
};

// Update Order
export const updateClass = (id, orderClass) => async (dispatch) => {
  try {
    dispatch({ type: UPDATE_CLASS_REQUEST });

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const { data } = await axios.put(
      `/api/v1/admin/class/${id}`,
      orderClass,
      config
    );

    dispatch({ type: UPDATE_CLASS_SUCCESS, payload: data.success });
  } catch (error) {
    dispatch({
      type: UPDATE_CLASS_FAIL,
      payload: error.response.data.message,
    });
  }
};

// Delete Order
export const deleteOrder = (id) => async (dispatch) => {
  try {
    dispatch({ type: DELETE_CLASS_REQUEST });

    const { data } = await axios.delete(`/api/v1/admin/class/${id}`);

    dispatch({ type: DELETE_CLASS_SUCCESS, payload: data.success });
  } catch (error) {
    dispatch({
      type: DELETE_CLASS_FAIL,
      payload: error.response.data.message,
    });
  }
};

// Get Order Details
export const getClassDetails = (id) => async (dispatch) => {
  try {
    dispatch({ type: CLASS_DETAILS_REQUEST });

    const { data } = await axios.get(`/api/v1/class/${id}`);

    dispatch({ type: CLASS_DETAILS_SUCCESS, payload: data.orderClass });
  } catch (error) {
    dispatch({
      type: CLASS_DETAILS_FAIL,
      payload: error.response.data.message,
    });
  }
};

// Clearing Errors
export const clearErrors = () => async (dispatch) => {
  dispatch({ type: CLEAR_ERRORS });
};
