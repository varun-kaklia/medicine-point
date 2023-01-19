import axios from "axios";

export const getAllMedicines = (limit,page,brand,salt,select,inStock) => async (dispatch) => {
  dispatch({ type: "GET_MEDICINES_REQUEST" })
  try {
    const res = await axios.get(`/api/medicines/getAllMedicine?limit=${limit !== undefined || ""? limit:""}&page=${page !== undefined || ""? page: 1}&brand=${brand !== undefined || ""? brand: ""}&salt=${salt !== undefined || ""? salt: ""}&select=${select !== undefined || ""?select:""}&instock=${inStock !== false ?inStock:""}`);
    dispatch({ type: "GET_MEDICINES_SUCCESS", payload: res.data})
  } catch (err) {
    dispatch({ type: "GET_MEDICINES_FAIL", payload: err });
  }
};

export const getCompany = ()=>async(dispatch)=>{
  dispatch({type:"GET_COMPANY_REQUEST"})
  try {
    const res = await axios('/api/medicines/company');
    dispatch({type:"GET_COMPANY_SUCCESS",payload:res.data})
    
  } catch (error) {
    dispatch({type:"GET_COMPANY_FAIL",payload:error})
    
  }
}

export const getDailyOfferPageData = ()=>async(dispatch)=>{
  dispatch({type:"GET_DAILY_OFFER_PAGE_DATA_REQUEST"})
  try {
    const res = await axios('/api/medicines/dailyOfferPage');
    dispatch({type:"GET_DAILY_OFFER_PAGE_DATA_SUCCESS",payload:res.data})
    
  } catch (error) {
    dispatch({type:"GET_DAILY_OFFER_PAGE_DATA_FAIL",payload:error})
    
  }
}

export const getPointsPageData = ()=>async(dispatch)=>{
  dispatch({type:"GET_POINTS_PAGE_DATA_REQUEST"})
  try {
    const res = await axios('/api/medicines/pointsPage');
    dispatch({type:"GET_POINTS_PAGE_DATA_SUCCESS",payload:res.data})
    
  } catch (error) {
    dispatch({type:"GET_POINTS_PAGE_DATA_FAIL",payload:error})
    
  }
}

export const getSalt = ()=>async(dispatch)=>{
  dispatch({type:"GET_SALT_REQUEST"})
  try {
    const res = await axios('/api/medicines/salt');
    dispatch({type:"GET_SALT_SUCCESS",payload:res.data})
    
  } catch (error) {
    dispatch({type:"GET_SALT_FAIL",payload:error})
    
  }
}

export const searchMedicine = (search) => async(dispatch)=>{
  dispatch({type:'GET_SEARCH_REQUEST'})
  try {
    const res = await axios.post(`/api/medicines/search?query=${search}`)
    dispatch({type:'GET_SEARCH_SUCCESS',payload:res.data})
  } catch (error) {
    dispatch({type:'GET_SEARCH_FAIL',payload:error})
  }
}

export const addMedicine = (medicine) => async (dispatch) => {
  dispatch({ type: "ADD_MEDICINES_REQUEST" });
  try {
    const response = await axios.post("/api/medicines/addmedicine", {medicine});
    dispatch({ type: "ADD_MEDICINES_SUCCESS", payload: response.data });
  } catch (err) {
    dispatch({ type: "ADD_MEDICINES_FAIL", payload: err });
  }
};

export const getMedicineById = (id) => async (dispatch) => {
  dispatch({ type: "GET_MEDICINEBYID_REQUEST" });
  try {
    const response = await axios.post("/api/medicines/getmedicinebyid", {
      id,
    })
    dispatch({ type: "GET_MEDICINEBYID_SUCCESS", payload: response.data })
  } catch (err) {
    dispatch({ type: "GET_MEDICINEBYID_FAIL", payload: err });
  }
};

export const updateMedicine = (updatedMedicine,image) => async (dispatch) => {
  dispatch({ type: "UPDATE_MEDICINEBYID_REQUEST" });
  try {
    // console.log("UPdated Medicine in actions", updatedMedicine)
    var formData = new FormData()
    // console.log("Image",image)
    formData.append('_id', updatedMedicine._id)
    formData.append('category', updatedMedicine.category)
    formData.append('twoLines', updatedMedicine.twoLines)
    formData.append('description1', updatedMedicine.description1)
    formData.append('description2', updatedMedicine.description2)
    formData.append('description3', updatedMedicine.description3)
    formData.append('packet', updatedMedicine.packet)
    formData.append('image', image)
    // console.log("New Data in Medicine Action", formData)
    const response = await axios.post("/api/medicines/updatemedicine", 
      formData,
    );
    // console.log("Response of Action file from api", res);
    dispatch({ type: "UDPATE_MEDICINEBYID_SUCCESS", payload: response.data });
    window.location.href = "/admin/medicinelist";
  } catch (err) {
    dispatch({ type: "UDPATE_MEDICINEBYID_FAIL", payload: err });
  }
};

export const updateRawDataMedicine = (updateMedicine)=>async(dispatch)=>{
  try{
    await axios.post('/api/medicines/updateRawDataMedicine',updateMedicine)
    window.alert("Medicine Updated Successfully");
    window.location.href="/admin/medicinelist"
  }catch(error){
    window.alert("Something going wrong",error)
  }
}

export const deleteMedicine = (medicineId, name) => async (dispatch) => {
  try {
    await axios.post("/api/medicines/deletemedicine", {medicineId});
    window.alert(`${name} is deleted successfully`);
    window.location.href = "/admin/medicinelist";
    // console.log(res);
  } catch (error) {
    window.alert("Something going wrong, unable to delete medicine", error);
  }
};

export const updateForProduct = (medicineId, name, pageValue, points) => async (dispatch) => {
  try {
    await axios.post("/api/medicines/pointsPage", { medicineId, pageValue, points});
    window.alert(`${name} is updated on Points Page`);
    // window.location.reload()
    window.location.href = "/admin/points";
    // console.log(res);
  } catch (error) {
    window.alert("Something going wrong, unable to delete medicine", error);
  }
};

export const updateForDailyOffer = (medicineId, name, dailyOfferPage, dailyRegularPrice) => async (dispatch) => {
  try {
    await axios.post("/api/medicines/dailyOffer", { medicineId, name, dailyOfferPage, dailyRegularPrice});
    window.alert(`${name} is updated on Daily Offer Page`);
    // window.location.reload()
    window.location.href = "/admin/dailyoffer";
    // console.log(res);
  } catch (error) {
    window.alert("Something going wrong", error);
  }
};

