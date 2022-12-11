import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getAllOrders, deliverOrder } from "../../actions/orderAction";

const OrderList = () => {
  const dispatch = useDispatch();
  const allOrdersState = useSelector((state) => state.allUserOrderReducer);
  const { loading, orders, error } = allOrdersState;
  console.log("Order",orders)
  useEffect(() => {
    dispatch(getAllOrders());
  }, [dispatch]);
  return (
    <div>
      <div className="md:container md:mt-0 mt-8">
        <div>
          <table className="table-auto w-full rounded border border-primary">
            <thead>
              <tr className="border-primary  rounded border">
                <th className="px-2">Order No.</th>
                <th className="px-2">User Name</th>
                <th className="px-2">Order Amount</th>
                <th className="px-2">Date</th>
                <th className="px-2">Status</th>
              </tr>
            </thead>
            <tbody className="text-center">
              {loading === true? <td colSpan={5}><h3 className="text-2xl text-center text-primary">Wait Orders are Loaded</h3></td> :null}
              {error && 
              <>
              <tr>
              <td colSpan={5}><h3 className="text-secondary text-2xl text-center">Something going wrong with Orders</h3></td>
              </tr>
              <tr>
              <td colSpan={5} className="text-center"><button className="text-slate-100 text-md px-4 py-2 border border-primary rounded hover:bg-transparent hover:border-secondary hover:text-primary bg-primary text-center" onClick={()=>window.location.reload()}>Refresh Page</button></td>
              </tr>
              </>
              }
              {orders &&
                orders.sort((a,b)=>b.createdAt.localeCompare(a.createdAt)).map((order) => (
                  <tr key={order.OrderNo} className="py-4">
                    <td className="hover:text-primary"><Link to={`/admin/editorder/${order._id}`}>{order.OrderNo}</Link></td>
                    <td>{order.name}</td>
                    <td>{order.orderAmount}</td>
                    <td>{order.createdAt.substring(0, 10)}</td>
                    <td>
                      {order.isDelivered ? (
                        <div>Delivered</div>
                      ) : (
                        <div>
                          <button
                            className="md:px-3 px-2 py-2 rounded bg-secondary text-gray-100 border border-secondary hover:bg-transparent hover:text-gray-600 transition hover:delay-100"
                            onClick={() => dispatch(deliverOrder(order._id))}
                          >
                            Deliver{console.log(order._id)}
                          </button>
                        </div>
                      )}
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

export default OrderList;
