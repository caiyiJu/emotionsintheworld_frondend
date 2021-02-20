import { combineReducers } from "redux";
import leads from "./leads";
import errors from "./errors";
import messages from "./messages";
import auth from "./auth"
import filter from "./filter";


export default combineReducers({
  filter,
  leads,
  errors,
  messages,
  auth  
});