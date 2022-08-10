import {
  ADMIN_COURSE_FAIL,
  ADMIN_COURSE_REQUEST,
  ADMIN_COURSE_SUCCESS,
  ALL_COURSE_FAIL,
  ALL_COURSE_REQUEST,
  ALL_COURSE_SUCCESS,
  ALL_REVIEW_FAIL,
  ALL_REVIEW_REQUEST,
  ALL_REVIEW_SUCCESS,
  CLEAR_ERRORS,
  COURSE_DETAILS_FAIL,
  COURSE_DETAILS_REQUEST,
  COURSE_DETAILS_SUCCESS,
  DELETE_COURSE_FAIL,
  DELETE_COURSE_REQUEST,
  DELETE_COURSE_RESET,
  DELETE_COURSE_SUCCESS,
  DELETE_REVIEW_FAIL,
  DELETE_REVIEW_REQUEST,
  DELETE_REVIEW_RESET,
  DELETE_REVIEW_SUCCESS,
  NEW_COURSE_FAIL,
  NEW_COURSE_REQUEST,
  NEW_COURSE_RESET,
  NEW_COURSE_SUCCESS,
  NEW_REVIEW_FAIL,
  NEW_REVIEW_REQUEST,
  NEW_REVIEW_RESET,
  NEW_REVIEW_SUCCESS,
  UPDATE_COURSE_FAIL,
  UPDATE_COURSE_REQUEST,
  UPDATE_COURSE_RESET,
  UPDATE_COURSE_SUCCESS,
} from "../constants/courseConstants";

export const coursesReducer = (state = { courses: [] }, action) => {
  switch (action.type) {
    case ALL_COURSE_REQUEST:
    case ADMIN_COURSE_REQUEST:
      return {
        loading: true,
        courses: [],
      };
    case ALL_COURSE_SUCCESS:
      return {
        loading: false,
        courses: action.payload.courses,
        coursesCount: action.payload.coursesCount,
        resultPerPage: action.payload.resultPerPage,
        filteredCoursesCount: action.payload.filteredCoursesCount,
      };

    case ADMIN_COURSE_SUCCESS:
      return {
        loading: false,
        courses: action.payload,
      };
    case ALL_COURSE_FAIL:
    case ADMIN_COURSE_FAIL:
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

export const newCourseReducer = (state = { course: {} }, action) => {
  switch (action.type) {
    case NEW_COURSE_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case NEW_COURSE_SUCCESS:
      return {
        loading: false,
        success: action.payload.success,
        course: action.payload.course,
      };
    case NEW_COURSE_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case NEW_COURSE_RESET:
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

export const courseReducer = (state = {}, action) => {
  switch (action.type) {
    case DELETE_COURSE_REQUEST:
    case UPDATE_COURSE_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case DELETE_COURSE_SUCCESS:
      return {
        ...state,
        loading: false,
        isDeleted: action.payload,
      };

    case UPDATE_COURSE_SUCCESS:
      return {
        ...state,
        loading: false,
        isUpdated: action.payload,
      };
    case DELETE_COURSE_FAIL:
    case UPDATE_COURSE_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case DELETE_COURSE_RESET:
      return {
        ...state,
        isDeleted: false,
      };
    case UPDATE_COURSE_RESET:
      return {
        ...state,
        isUpdated: false,
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

export const courseDetailsReducer = (state = { course: {} }, action) => {
  switch (action.type) {
    case COURSE_DETAILS_REQUEST:
      return {
        loading: true,
        ...state,
      };
    case COURSE_DETAILS_SUCCESS:
      return {
        loading: false,
        course: action.payload,
      };
    case COURSE_DETAILS_FAIL:
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

export const newReviewReducer = (state = {}, action) => {
  switch (action.type) {
    case NEW_REVIEW_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case NEW_REVIEW_SUCCESS:
      return {
        loading: false,
        success: action.payload,
      };
    case NEW_REVIEW_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case NEW_REVIEW_RESET:
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

export const courseReviewsReducer = (state = { reviews: [] }, action) => {
  switch (action.type) {
    case ALL_REVIEW_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case ALL_REVIEW_SUCCESS:
      return {
        loading: false,
        reviews: action.payload,
      };
    case ALL_REVIEW_FAIL:
      return {
        ...state,
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

export const reviewReducer = (state = {}, action) => {
  switch (action.type) {
    case DELETE_REVIEW_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case DELETE_REVIEW_SUCCESS:
      return {
        ...state,
        loading: false,
        isDeleted: action.payload,
      };
    case DELETE_REVIEW_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case DELETE_REVIEW_RESET:
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
