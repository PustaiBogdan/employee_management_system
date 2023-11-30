import React from "react";
import { useSelector } from "react-redux";

const DepartmentList = () => {
  const departments = useSelector((state) => state.departments.departments);
  const loading = useSelector((state) => state.departments.loading);

  return (
    <div className="container mx-auto my-8">
      <div className="flex shadow border-b">
        <table className="min-w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="text-left font-medium text-gray-500 uppercase tracking-wide py-3 px-6">
                Department Name
              </th>
              <th className="text-right font-medium text-gray-500 uppercase tracking-wide py-3 px-6"></th>
            </tr>
          </thead>
          {!loading && (
            <tbody className="bg-white">
              {departments.map((department) => (
                <tr key={department.id}>
                  <td className="text-left py-3 px-6">
                    {department.description}
                  </td>
                  {/* Adăugați celule pentru alte informații necesare */}
                  <td className="text-right py-3 px-6">
                    {/* Buton de editare/ștergere */}
                  </td>
                </tr>
              ))}
            </tbody>
          )}
        </table>
      </div>
    </div>
  );
};

export default DepartmentList;
