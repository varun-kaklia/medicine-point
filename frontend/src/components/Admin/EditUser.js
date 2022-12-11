import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getUserById, updateUserByAdmin } from "../../actions/userAction";

const EditUser = () => {
  const [name, setName] = useState("");
  const [email1, setEmail1] = useState("");
  const [password, setPassword] = useState("");
  const [address,setAddress] = useState('')
  const [balance, setBalance] = useState("");
  const [phone1, setPhone1] = useState("");
  const [points, setPoints] = useState("");
  const [wallet, setWallet] = useState("");
  const [DlNo, setDlNo] = useState("");
  const [GSTIN, setGSTIN] = useState("");
  const {rid} = useParams();
  const dispatch = useDispatch();

  const getUserByState = useSelector(
    (state) => state.getUserByIdReducer
    );
  const { user } = getUserByState;
  console.log("user",user)

  useEffect(() => {
    if (user) {
      if(user.rid === JSON.parse(rid)){
        setName(user.name);
        setEmail1(user.email1);
        setPassword(user.password);
        setAddress(user.address);
        setBalance(user.balance);
        setPhone1(user.phone1);
        setPoints(user.points);
        setWallet(user.wallet);
        setDlNo(user.DlNo);
        setGSTIN(user.GSTIN);
      }else{
        dispatch(getUserById(rid));
      }
    } else {
      dispatch(getUserById(rid));
    }
  }, [dispatch,user]);

  const submitForm = (e) => {
    e.preventDefault();
    dispatch(updateUserByAdmin(points, wallet, rid, password))
    window.location.href="/admin/manageaccount"
  };

  return (
    <div>
      <div>Edit User Page</div>
      <div>
        <div>
          <div>
            <div className="max-w-lg mx-auto shadow px-6 py-7 rounded overflow-hidden">
              <h2 className="text-2xl uppercase font-medium mb-1">
                User Editing Page
              </h2>
              <p className="text-gray-600 mb-6 text-sm">
                Edit User Details If you want
              </p>
              <form encType="multipart/form-data" className="space-y-4">
                <div>
                  <label htmlFor="name" className="text-gray-600 mb-2 block">
                    Name of User
                  </label>
                  <input
                    type="text"
                    value={name}
                    className="block w-full border border-gray-300 px-4 py-3 text-gray-600 text-sm rounded focus:border-primary placeholder-gray-400"
                    disabled
                  />
                </div>
                <div>
                  <label htmlFor="email" className="text-gray-600 mb-2 block">
                    Email
                  </label>
                  <input
                    type="email"
                    value={email1}
                    className="block w-full border border-gray-300 px-4 py-3 text-gray-600 text-sm rounded focus:border-primary placeholder-gray-400"
                    placeholder="Enter Email of User"
                    disabled
                  />
                </div>
                <div>
                  <label htmlFor="password" className="text-gray-600 mb-2 block">
                    Password
                  </label>
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="block w-full border border-gray-300 px-4 py-3 text-gray-600 text-sm rounded focus:border-primary placeholder-gray-400"
                    placeholder="Enter Password"
                  />
                </div>
                <div>
                  <label htmlFor="address" className="text-gray-600 mb-2 block">
                    Address
                  </label>
                  <input
                    type="text"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    className="block w-full border border-gray-300 px-4 py-3 text-gray-600 text-sm rounded focus:border-primary placeholder-gray-400"
                    placeholder="Enter User Address"
                    disabled
                  />
                </div>
                <div>
                  <label htmlFor="balance" className="text-gray-600 mb-2 block">
                    Balance
                  </label>
                  <input
                    type="number"
                    value={balance}
                    onChange={(e) => setBalance(e.target.value)}
                    className="block w-full border border-gray-300 px-4 py-3 text-gray-600 text-sm rounded focus:border-primary placeholder-gray-400"
                    placeholder="Enter User Remaining Balance"
                    disabled
                  />
                </div>
                <div>
                  <label htmlFor="phon1" className="text-gray-600 mb-2 block">
                    Phone
                  </label>
                  <input
                    type="number"
                    value={phone1}
                    onChange={(e) => setPhone1(e.target.value)}
                    className="block w-full border border-gray-300 px-4 py-3 text-gray-600 text-sm rounded focus:border-primary placeholder-gray-400"
                    placeholder="Enter User Phone Number"
                    disabled
                  />
                </div>
                <div>
                  <label htmlFor="points" className="text-gray-600 mb-2 block">
                    Points
                  </label>
                  <input
                    type="number"
                    value={points}
                    onChange={(e) => setPoints(e.target.value)}
                    className="block w-full border border-gray-300 px-4 py-3 text-gray-600 text-sm rounded focus:border-primary placeholder-gray-400"
                    placeholder="Enter User Points"
                  />
                </div>
                <div>
                  <label htmlFor="wallet" className="text-gray-600 mb-2 block">
                    Wallet
                  </label>
                  <input
                    type="number"
                    value={wallet}
                    onChange={(e) => setWallet(e.target.value)}
                    className="block w-full border border-gray-300 px-4 py-3 text-gray-600 text-sm rounded focus:border-primary placeholder-gray-400"
                    placeholder="Enter User Wallet Balance"
                  />
                </div>
                <div>
                  <label htmlFor="gstin" className="text-gray-600 mb-2 block">
                    GSTIN
                  </label>
                  <input
                    type="text"
                    value={GSTIN}
                    onChange={(e) => setGSTIN(e.target.value)}
                    className="block w-full border border-gray-300 px-4 py-3 text-gray-600 text-sm rounded focus:border-primary placeholder-gray-400"
                    placeholder="Enter User GSTIN Number"
                    disabled
                  />
                </div>
                <div>
                  <label htmlFor="dlNo" className="text-gray-600 mb-2 block">
                    DLNo
                  </label>
                  <input
                    type="text"
                    value={DlNo}
                    onChange={(e) => setDlNo(e.target.value)}
                    className="block w-full border border-gray-300 px-4 py-3 text-gray-600 text-sm rounded focus:border-primary placeholder-gray-400"
                    placeholder="Enter User Balance"
                    disabled
                  />
                </div>
                <div className="mt-4">
                  <button
                    onClick={(e) => submitForm(e)}
                    className="block w-full py-2 text-center text-white  hover:text-primary transition uppercase font-roboto font-medium focus:border-primary placeholder-gray-400 bg-primary border border-primary rounded hover:bg-transparent"
                  >
                    Update User Data
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

export default EditUser;
