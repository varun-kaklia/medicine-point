import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getAllUsers, deleteUser } from "../../actions/userAction";

const UserList = () => {
  const dispatch = useDispatch();
  const userState = useSelector((state) => state.getAllUsersReducer);
  const { loading, error, users } = userState;

  useEffect(() => {
    dispatch(getAllUsers());
  }, [dispatch]);

  return (
    <div className="md:mt-0 mt-4 w-full">
      <div className="border rounded md:mx-4 mb-2 py-2 shadow">
      <h2 className="text-center font-medium text-xl">User Lists</h2>
      </div>
      <div className="md:mx-4">
        <div>
          <table className="table-auto border divide-x divide-y w-full">
            <thead className="divide-x divide-y">
              <tr >
                <th className="md:px-2">User Name</th>
                <th className="md:px-2">User Balance</th>
                <th className="md:px-2">Delete</th>
                <th className="md:px-2">Edit</th>
              </tr>
            </thead>
            <tbody className="divide-x divide-y">
              {loading && <>Wait Users are Loaded</>}
              {error && `Something going wrong with Users`}
              {users &&
                users.sort((a,b)=>a.name > b.name? 1 : -1).map((user) => (
                  <tr key={user._id} className="divide-x text-center divide-y">
                    {/* <td>{user._id}</td> */}
                    <td>{user.name}</td>
                    <td>{user.balance}</td>
                    <td className="p-2">
                      <div>
                        <button
                          className="md:px-4 md:py-2 px-2 py-1 rounded border bg-secondary text-gray-100 buser border-secondary hover:bg-transparent hover:border-secondary hover:border transition hover:delay-100 hover:text-secondary"
                          onClick={() => {
                            dispatch(deleteUser(user._id));
                          }}
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                    <td>
                    <div className="p-2">
                        <Link to={`/admin/edituser/${user.rid}`}>
                        <button
                          className="md:px-4 md:py-2 px-2 py-1 rounded border bg-primary text-gray-100 buser border-primary hover:bg-transparent hover:border-primary hover:border transition hover:delay-100 hover:text-primary">
                        Edit
                      </button>
                      </Link>
                      </div>
                      
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default UserList;
