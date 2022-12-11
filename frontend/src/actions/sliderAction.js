import axios from "axios";

export const getSliderImage = ()=> async (dispatch)=>{
    dispatch({ type: "GET_SLIDER_IMAGE_REQUEST" })
    try {
      const res = await axios.get("/api/slider/getSliderImage");
      dispatch({ type: "GET_SLIDER_IMAGE_SUCCESS", payload: res.data })
    } catch (err) {
      dispatch({ type: "GET_SLIDER_IMAGE_FAIL", payload: err });
    }
}

export const updateSliderImage = (name, image)=> async (dispatch) =>{
  try {
    var formData = new FormData()
    formData.append('image',image)
    formData.append('name',name)
    await axios.post('/api/slider/updateSlider',formData)
    window.alert("Slider Image Updated")
    window.location.href="/admin"
  } catch (error) {
    window.alert("Something Going Wrong",error)
  }
}