export const getSliderImageReducer = (state = {  }, action) => {
    switch (action.type) {
      case "GET_SLIDER_IMAGE_REQUEST":
        return {
          ...state,
          loading: true,
        };
      case "GET_SLIDER_IMAGE_SUCCESS":
        return {
          sliderImage: action.payload,
          loading: false,
        };
      case "GET_SLIDER_IMAGE_FAIL":
        return {
          error: action.payload,
          loading: false,
        };
  
      default:
        return state;
    }
  };