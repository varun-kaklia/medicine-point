export const registerUserReducer = (state = {}, action) => {
  switch (action.type) {
    case "USER_REGISTER_REQUEST":
      return {
        loading: true,
      };
    case "USER_REGISTER_SUCCESS":
      return {
        loading: false,
        success: true,
      };
    case "USER_REGISTER_FAIL":
      return {
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export const updateUserReducer = (state = {}, action) => {
  switch (action.type) {
    case "UPDATE_USER_REQEUST":
      return {
        ...state,
        loading:true
      }
    case "USER_UPDATE_SUCCESS":
      return {
        loading: false,
        success:true
      }
    case "USER_UPDATE_FAIL":
      return {
        loading: false,
        error:action.payload
      }
  
    default:
      return state
  }
}
export const updateUserByAdminReducer = (state = {}, action) => {
  switch (action.type) {
    case "UPDATE_USERBYADMIN_REQEUST":
      return {
        ...state,
        loading:true
      }
    case "USER_UPDATEBYADMIN_SUCCESS":
      return {
        loading: false,
        success:true
      }
    case "USER_UPDATEBYADMIN_FAIL":
      return {
        loading: false,
        error:action.payload
      }
  
    default:
      return state
  }
}

export const loginUserReducer = (state = {}, action) => {
  switch (action.type) {
    case "USER_LOGIN_REQUEST":
      return {
        loading: true,
      };
    case "USER_LOGIN_SUCCESS":
      return {
        loading: false,
        success: true,
        currentUser: action.payload,
      };
    case "USER_LOGIN_FAIL":
      return {
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export const getAllUsersReducer = (state = { users: [] }, action) => {
  switch (action.type) {
    case "GET_USERS_REQUEST":
      return {
        ...state,
        loading: true,
      };
    case "GET_USERS_SUCCESS":
      return {
        users: action.payload,
        loading: false,
      };
    case "GET_USERS_FAIL":
      return {
        error: action.payload,
        loading: false,
      };
    default:
      return state;
  }
};

export const findUserBySellerReducer = (state = { users: [] }, action) => {
  switch (action.type) {
    case "GET_USERSBYSELLER_REQUEST":
      return {
        ...state,
        loading: true,
      };
    case "GET_USERSBYSELLER_SUCCESS":
      return {
        users: action.payload,
        loading: false,
      };
    case "GET_USERSBYSELLER_FAIL":
      return {
        error: action.payload,
        loading: false,
      };
    default:
      return state;
  }
};

export const getUserByIdReducer = (state = {}, action) => {
  switch (action.type) {
    case "GET_USERBYID_REQUEST":
      return {
        ...state,
        loading: true,
      };
    case "GET_USERBYID_SUCCESS":
      return {
        user: action.payload,
        loading: false,
      };
    case "GET_USERBYID_FAIL":
      return {
        error: action.payload,
        loading: false,
      };

    default:
      return state;
  }
};