import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getMedicineById, updateMedicine,updateRawDataMedicine } from "../../actions/medicineAction";

const EditMedicine = () => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("0");
  const [category, setCategory] = useState("Medicine");
  const [twoLines, setTwoLines] = useState("This is testing product so information may changes after sometime. So don't rely on these information.");
  const [firstDescription, setFirstDescription] = useState("This is testing description1 for our medicine.");
  const [secondDescription, setSecondDescription] = useState("This is testing description2 for our medicine.");
  const [thirdDescription, setThirdDescription] = useState("This is testing description3 for our medicine.");
  const [points,setPoints] = useState('100')
  const [packet,setPacket] = useState('100X11')
  const [salt, setSalt] = useState("Unknown");
  const [company, setCompany] = useState("OTHERS");
  const [image, setImage] = useState("");
  const { id } = useParams();
  const [useImage,setUseImage] = useState(false)
  console.log('Medicine image', image)
  const dispatch = useDispatch();

  const getMedicineByState = useSelector(
    (state) => state.getMedicineByIdReducer
  );
  const { medicine } = getMedicineByState

  useEffect(() => {
    if (medicine) {
      if (medicine._id === id) {
        setName(medicine.name);
        setPrice(medicine.Rate);
        setCategory(medicine.category);
        setSalt(medicine.Salt);
        setTwoLines(medicine.twoLines);
        setFirstDescription(medicine.firstDescription);
        setSecondDescription(medicine.secondDescription);
        setThirdDescription(medicine.thirdDescription);
        setPacket(medicine.packet);
        setCompany(medicine.company);
        setPoints(medicine.points);
      } else {
        dispatch(getMedicineById(id));
      }
    } else {
      dispatch(getMedicineById(id));
    }
  }, [medicine, dispatch,id]);

  const submitForm = (e) => {
    e.preventDefault();
    const editmedicine = {
      _id: id,
      name,
      price,
      category,
      twoLines,
      firstDescription,
      secondDescription,
      thirdDescription,
      packet,
      salt,
      points,
      company
    };
    if(useImage === false){
      dispatch(updateRawDataMedicine(editmedicine));
    }else{
      dispatch(updateMedicine(editmedicine,image));
    }
  };

  return (
    <div>
      <div>Edit Medicine Page</div>
      <div>
        <div>
          <div>
            <div className="max-w-lg mx-auto shadow px-6 py-7 rounded overflow-hidden">
              <h2 className="text-2xl uppercase font-medium mb-1">
                Product Editing Page
              </h2>
              <p className="text-gray-600 mb-6 text-sm">
                Edit Product If you want
              </p>
              <form encType="multipart/form-data" className="space-y-4">
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
                  <label htmlFor="twoLines" className="text-gray-600 mb-2 block">
                    Two Lines
                  </label>
                  <input
                    type="text"
                    value={twoLines}
                    onChange={(e) => setTwoLines(e.target.value)}
                    className="block w-full border border-gray-300 px-4 py-3 text-gray-600 text-sm rounded focus:border-primary placeholder-gray-400"
                    placeholder="Enter Salt Name of Medicine"
                  />
                </div>
                <div>
                  <label htmlFor="description1" className="text-gray-600 mb-2 block">
                    Description 1
                  </label>
                  <input
                    type="text"
                    value={firstDescription}
                    onChange={(e) => setFirstDescription(e.target.value)}
                    className="block w-full border border-gray-300 px-4 py-3 text-gray-600 text-sm rounded focus:border-primary placeholder-gray-400"
                    placeholder="Enter Salt Name of Medicine"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="text-gray-600 mb-2 block">
                  Description 2
                  </label>
                  <input
                    type="text"
                    value={secondDescription}
                    onChange={(e) => setSecondDescription(e.target.value)}
                    className="block w-full border border-gray-300 px-4 py-3 text-gray-600 text-sm rounded focus:border-primary placeholder-gray-400"
                    placeholder="Enter Salt Name of Medicine"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="text-gray-600 mb-2 block">
                  Description 3
                  </label>
                  <input
                    type="text"
                    value={thirdDescription}
                    onChange={(e) => setThirdDescription(e.target.value)}
                    className="block w-full border border-gray-300 px-4 py-3 text-gray-600 text-sm rounded focus:border-primary placeholder-gray-400"
                    placeholder="Enter Salt Name of Medicine"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="text-gray-600 mb-2 block">
                    Packets
                  </label>
                  <input
                    type="text"
                    value={packet}
                    onChange={(e) => setPacket(e.target.value)}
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
                <div>
                  <label htmlFor="image" className="text-gray-600 mb-2 block">
                    Image <span className="px-2 text-red-600">(Compulsory**)</span>
                  </label>
                  <input
                    type="file"
                    name="myImage"
                    accept=".jpg, .png, .jpeg"
                    // value={image}
                    onChange={(e) => {setImage(e.target.files[0]);
                    setUseImage(true)}}
                    className="block w-full border border-gray-300 px-4 py-3 text-gray-600 text-sm rounded  hover:cursor-pointer   file:mr-4 file:py-2 file:px-4
                    file:rounded-full file:border-0
                    file:text-sm file:font-semibold
                    file:bg-slate-100 file:text-primary
                    hover:file:bg-slate-100"
                  />
                </div>
                <div className="mt-4">
                  <button
                    onClick={(e) => submitForm(e)}
                    className="block w-full py-2 text-center text-white  hover:text-primary transition uppercase font-roboto font-medium focus:border-primary placeholder-gray-400 bg-primary border border-primary rounded hover:bg-transparent"
                  >
                    Update Medicine Data
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditMedicine;
