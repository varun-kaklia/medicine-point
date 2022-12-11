import React from "react";
import { FaHome, FaAngleDoubleRight } from "react-icons/fa";
import { Link } from "react-router-dom";

const Breakcrumb = ({id}) => {

  return (
    <div>
      <div className=" container py-4">
        {/* BreadCrumbs */}
        <Link to="#" className="text-primary flex gap-3 items-center text-base">
          <FaHome />
          <span className="text-sm text-gray-400">
            <FaAngleDoubleRight />
          </span>
          <div className="text-gray-600 font-medium uppercase">{id}</div>
        </Link>
      </div>
    </div>
  );
};

export default Breakcrumb;
