import React from "react";

const TableCell = ({ label }) => {
  return (
    <td className="text-left px-6 py-4 whitespace-nowrap">
      <div className="text-sm text-gray-500">{label}</div>
    </td>
  );
};

export default TableCell;
