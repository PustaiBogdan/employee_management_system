import { React, useState, useEffect } from "react";
import EditUser from "./EditUser";
import User from "./User";
import { useSelector, useDispatch } from "react-redux";
import { fetchEmployees } from "../public/src/features/employeesSlice";
import { fetchDepartments } from "../public/src/features/departmentSlice";

const UserList = () => {
  const USER_API_BASE_URL = "http://localhost:8080/api/v1/users";
  const dispatch = useDispatch();
  // const [users, setUsers] = useState(null);
  const [loading, setLoading] = useState(true);
  const [userId, setUserId] = useState(null);
  const [responseUser, setResponseUser] = useState(null);
  const departments = useSelector((state) => state.departments.departments);
  const employees = useSelector((state) => state.employees.employees);
  const status = useSelector((state) => state.employees.status);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        dispatch(fetchDepartments());
        dispatch(fetchEmployees());
      } catch (error) {
        console.log(error);
      }
      setLoading(false);
    };
    fetchData();
  }, [dispatch, responseUser]);

  const deleteUser = async (e, id) => {
    e.preventDefault();
    try {
      const response = await fetch(USER_API_BASE_URL + "/" + id, {
        method: "DELETE",
      });
      console.log(response);
      if (response.ok) {
        dispatch(fetchEmployees());
      } else {
        console.log("eroare la fetch employees");
      }
    } catch (error) {
      console.log("Error:", error);
    }
  };

  const editUser = (e, id) => {
    e.preventDefault();
    setUserId(id);
    dispatch(fetchEmployees());
  };

  return (
    <>
      <div className="container mx-auto my-8">
        <div className="flex shadow border-b">
          <table className="min-w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="text-left font-medium text-gray-500 uppercase tracking-wide py-3 px-6">
                  First Name
                </th>
                <th className="text-left font-medium text-gray-500 uppercase tracking-wide py-3 px-6">
                  Last Name
                </th>
                <th className="text-left font-medium text-gray-500 uppercase tracking-wide py-3 px-6">
                  Email
                </th>
                <th className="text-left font-medium text-gray-500 uppercase tracking-wide py-3 px-6">
                  Manager
                </th>
                <th className="text-left font-medium text-gray-500 uppercase tracking-wide py-3 px-6">
                  Department
                </th>
                <th className="text-right font-medium text-gray-500 uppercase tracking-wide py-3 px-6">
                  Actions
                </th>
              </tr>
            </thead>
            {!loading && (
              <tbody className="bg-white">
                {employees?.map((user) => {
                  const departmentName =
                    departments.find(
                      (department) => department.id === user.departmentId
                    )?.description || "N/A";
                  const manager = employees.find(
                    (employee) => employee.id === user.managerId
                  );

                  // Construiți numele managerului sau returnați "N/A" dacă managerul nu există
                  const managerName = manager
                    ? `${manager.firstName} ${manager.lastName}`
                    : "N/A";

                  // const managerName =
                  //   employees.find((employee) => employee.id === user.managerId)
                  //     ?.firstName || "N/A";

                  return (
                    <User
                      user={user}
                      key={user.id}
                      deleteUser={deleteUser}
                      editUser={editUser}
                      departmentName={departmentName}
                      managerName={managerName}
                    />
                  );
                })}
              </tbody>
            )}
          </table>
        </div>
      </div>
      <EditUser userId={userId} setResponseUser={setResponseUser} />
    </>
  );
};

export default UserList;
