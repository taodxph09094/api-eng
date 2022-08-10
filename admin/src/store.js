import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";

import {
  allUsersReducer,
  forgotPasswordReducer,
  profileReducer,
  userDetailsReducer,
  userReducer,
} from "./reducers/userReducer";
import {
  allCenterReducer,
  centerReducer,
  newCenterReducer,
} from "./reducers/centerReducer";
import {
  courseDetailsReducer,
  courseReducer,
  courseReviewsReducer,
  coursesReducer,
  newCourseReducer,
  newReviewReducer,
  reviewReducer,
} from "./reducers/courseReducer";
import {
  allClassReducer,
  classDetailsReducer,
  classReducer,
  myClassReducer,
  newClassReducer,
} from "./reducers/classReducer";
import { cartReducer } from "./reducers/cartReducer";
const reducer = combineReducers({
  user: userReducer,
  profile: profileReducer,
  forgotPassword: forgotPasswordReducer,
  allUsers: allUsersReducer,
  userDetails: userDetailsReducer,
  allCenter: allCenterReducer,
  newCenter: newCenterReducer,
  center: centerReducer,
  newReview: newReviewReducer,
  newCourse: newCourseReducer,
  course: courseReducer,
  courseReviews: courseReviewsReducer,
  review: reviewReducer,
  courses: coursesReducer,
  courseDetails: courseDetailsReducer,
  orderClass: classReducer,
  classDetails: classDetailsReducer,
  newClass: newClassReducer,
  myClass: myClassReducer,
  allClass: allClassReducer,
  cart: cartReducer,
});

let initialState = {
  cart: {
    cartItems: localStorage.getItem("cartItems")
      ? JSON.parse(localStorage.getItem("cartItems"))
      : [],
    centerInfo: localStorage.getItem("centerInfo")
      ? JSON.parse(localStorage.getItem("centerInfo"))
      : {},
  },
};

const middleware = [thunk];

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
