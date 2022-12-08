import { AUTH } from "../constants/actionTypes";
import * as api from "../api";

export const signin = (formData, history) => async (dispatch) => {
  try {
    // log in
    history.push("/");
  } catch (error) {
    console.log(error);
  }
};

export const signup = (formData, history) => async (dispatch) => {
  try {
    // sign up
    history.push("/");
  } catch (error) {
    console.log(error);
  }
};
