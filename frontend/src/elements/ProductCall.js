import React, { useState } from "react";

const QuantityChange = (product) => {
  const [quantity, setQuantity] = useState(1);

  const handleQuantity = (e, rid) => {
    var changeQuantity = [...quantity];
    changeQuantity = changeQuantity.map((x) => {
      if (x.rid === rid) x.data = e.target.value;
      return x;
    });
    setQuantity(changeQuantity);
  };
  return (
    <div>
      <div className="flex justify-between px-2">
        <div className="text-md text-gray-800 uppercase mb-1 ">Quantity</div>
        <div className="flex h-6 ml-4 border border-gray-300 text-gray-600 divide-x divide-gray-300 w-max mb-0">
          <div
            className="h-6 w-8 flex text-xl items-center justify-center cursor-pointer select-none"
            onClick={() => (quantity != 0 ? setQuantity(quantity - 1) : "null")}
          >
            -
          </div>
          <input
            className="h-6 focus:ring-0 w-10 flex text-base justify-center items-start"
            type="number"
            placeholder={quantity}
            onChange={(e) => handleQuantity(e, product.rid)}
          />
          {console.log(product.rid === product.rid ? quantity : null)}
          <div
            className="h-6 w-6 flex text-xl items-center justify-center cursor-pointer select-none"
            onClick={() => setQuantity(quantity + 1)}
          >
            +
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuantityChange;
