export const getAllMedicineReducer = (state = { medicines: [] }, action) => {
  switch (action.type) {
    case "GET_MEDICINES_REQUEST":
      return {
        ...state,
        loading: true,
      };
    case "GET_MEDICINES_SUCCESS":
      return {
        medicines: action.payload,
        loading: false,
      };
    case "GET_MEDICINES_FAIL":
      return {
        error: action.payload,
        loading: false,
      };

    default:
      return state;
  }
};

export const getSearchMedicineReducer = (state = { searchMedicines: [] }, action) => {
  switch (action.type) {
    case "GET_SEARCH_REQUEST":
      return {
        ...state,
        loading: true,
      };
    case "GET_SEARCH_SUCCESS":
      return {
        searchMedicines: action.payload,
        loading: false,
      };
    case "GET_SEARCH_FAIL":
      return {
        error: action.payload,
        loading: false,
      };

    default:
      return state;
  }
};

export const getCompanyDataReducer = (state = { companyData: [] }, action) => {
  switch (action.type) {
    case "GET_COMPANY_REQUEST":
      return {
        ...state,
        loading: true,
      };
    case "GET_COMPANY_SUCCESS":
      return {
        companyData: action.payload,
        loading: false,
      };
    case "GET_COMPANY_FAIL":
      return {
        error: action.payload,
        loading: false,
      };

    default:
      return state;
  }
};

export const getDailyOfferPageDataReducer = (state = { medicines: [] }, action) => {
  switch (action.type) {
    case "GET_DAILY_OFFER_PAGE_DATA_REQUEST":
      return {
        ...state,
        loading: true,
      };
    case "GET_DAILY_OFFER_PAGE_DATA_SUCCESS":
      return {
        medicines: action.payload,
        loading: false,
      };
    case "GET_DAILY_OFFER_PAGE_DATA_FAIL":
      return {
        error: action.payload,
        loading: false,
      };

    default:
      return state;
  }
};

export const getPointsPageDataReducer = (state = { medicines: [] }, action) => {
  switch (action.type) {
    case "GET_POINTS_PAGE_DATA_REQUEST":
      return {
        ...state,
        loading: true,
      };
    case "GET_POINTS_PAGE_DATA_SUCCESS":
      return {
        medicines: action.payload,
        loading: false,
      };
    case "GET_POINTS_PAGE_DATA_FAIL":
      return {
        error: action.payload,
        loading: false,
      };

    default:
      return state;
  }
};

export const getSaltDataReducer = (state = { saltData: [] }, action) => {
  switch (action.type) {
    case "GET_SALT_REQUEST":
      return {
        ...state,
        loading: true,
      };
    case "GET_SALT_SUCCESS":
      return {
        saltData: action.payload,
        loading: false,
      };
    case "GET_SALT_FAIL":
      return {
        error: action.payload,
        loading: false,
      };

    default:
      return state;
  }
};

export const addMedicineReducer = (state = {}, action) => {
  switch (action.type) {
    case "ADD_MEDICINES_REQUEST":
      return {
        ...state,
        loading: true,
      };
    case "ADD_MEDICINES_SUCCESS":
      // console.log("Payload Data", action);
      return {
        success: true,
        loading: false,
      };
    case "AD_MEDICINES_FAIL":
      return {
        error: action.payload,
        loading: false,
      };

    default:
      return state;
  }
};
export const getMedicineByIdReducer = (state = {}, action) => {
  switch (action.type) {
    case "GET_MEDICINEBYID_REQUEST":
      return {
        ...state,
        loading: true,
      };
    case "GET_MEDICINEBYID_SUCCESS":
      return {
        medicine: action.payload,
        loading: false,
      };
    case "GET_MEDICINEBYID_FAIL":
      return {
        error: action.payload,
        loading: false,
      };

    default:
      return state;
  }
};

export const updateMedicineByIdReducer = (state = {}, action) => {
  switch (action.type) {
    case "UPDATE_MEDICINEBYID_REQUEST":
      return {
        ...state,
        updateloading: true,
      };
    case "UPDATE_MEDICINEBYID_SUCCESS":
      return {
        updatesuccess: true,
        updateloading: false,
      };
    case "UPDATE_MEDICINEBYID_FAIL":
      return {
        updateerror: action.payload,
        updateloading: false,
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
      // console.log("Payload Data", action);
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
