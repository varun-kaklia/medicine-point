import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast, ToastContainer } from "react-toastify";
import { addMedicine } from "../../actions/medicineAction";

const AddNewMedicine = () => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [salt, setSalt] = useState("");
  const [company, setCompany] = useState("");

  const addMedicineState = useSelector((state) => state.addMedicineReducer);
  const { loading, error, success } = addMedicineState;
  const dispatch = useDispatch();

  const submitForm = (e) => {
    e.preventDefault();
    const medicine = {
      name,
      price,
      category,
      salt,
      company,
    };
    dispatch(addMedicine(medicine));
  };

  useEffect(() => {
    if (loading) {
      toast.info("Please Wait!", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
    if (error) {
      toast.error("Got Some Errors.!", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } else {
      toast.success("🦄 Wow so easy!", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  }, []);

  return (
    <div>
      {loading && (
        <ToastContainer
          position="top-center"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
      )}
      {error && (
        <ToastContainer
          position="top-center"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
      )}
      {success && (
        <ToastContainer
          position="top-center"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
      )}
      <div>
        <div className="max-w-lg mx-auto shadow px-6 py-7 rounded overflow-hidden">
          <h2 className="text-2xl uppercase font-medium mb-1">
            Product Editing Page
          </h2>
          <p className="text-gray-600 mb-6 text-sm">Edit Product If you want</p>
          <form action="" className="space-y-4">
            <div>
              <label htmlFor="email" className="text-gray-600 mb-2 block">
                Name of Medicine
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="block w-full border border-gray-300 px-4 py-3 text-gray-600 text-sm rounded focus:border-primary placeholder-gray-400"
                placeholder="Enter New Name of Medicine"
              />
            </div>
            <div>
              <label htmlFor="email" className="text-gray-600 mb-2 block">
                Price
              </label>
              <input
                type="number"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                className="block w-full border border-gray-300 px-4 py-3 text-gray-600 text-sm rounded focus:border-primary placeholder-gray-400"
                placeholder="Enter Price of Medicine"
              />
            </div>
            <div>
              <label htmlFor="email" className="text-gray-600 mb-2 block">
                Category
              </label>
              <input
                type="text"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="block w-full border border-gray-300 px-4 py-3 text-gray-600 text-sm rounded focus:border-primary placeholder-gray-400"
                placeholder="Enter Category Name of Product"
              />
            </div>
            <div>
              <label htmlFor="email" className="text-gray-600 mb-2 block">
                Salt
              </label>
              <input
                type="text"
                value={salt}
                onChange={(e) => setSalt(e.target.value)}
                className="block w-full border border-gray-300 px-4 py-3 text-gray-600 text-sm rounded focus:border-primary placeholder-gray-400"
                placeholder="Enter Salt Name of Medicine"
              />
            </div>
            <div>
              <label htmlFor="email" className="text-gray-600 mb-2 block">
                Company
              </label>
              <input
                type="text"
                value={company}
                onChange={(e) => setCompany(e.target.value)}
                className="block w-full border border-gray-300 px-4 py-3 text-gray-600 text-sm rounded focus:border-primary placeholder-gray-400"
                placeholder="Enter Company Name of Medicine"
              />
            </div>
            <div className="mt-4">
              <button
                onClick={(e) => submitForm(e)}
                className="block w-full py-2 text-center text-white bg-primary border border-primary rounded hover:bg-transparent hover:text-primary transition uppercase font-roboto font-medium"
              >
                Add Medicine
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddNewMedicine;
