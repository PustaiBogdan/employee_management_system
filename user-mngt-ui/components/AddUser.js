import { Dialog, Transition } from "@headlessui/react";
import React, { useEffect, useRef } from "react";
import { Fragment, useState } from "react";
import UserList from "./UserList";
import { fetchDepartments } from "../public/src/features/departmentSlice";
import {
  fetchEmployees,
  fetchEmployeesByDepartment,
} from "../public/src/features/employeesSlice";
import { useDispatch, useSelector } from "react-redux";

const AddUser = () => {
  const USER_API_BASE_URL = "http://localhost:8080/api/v1/users";
  const dispatch = useDispatch();

  const departments = useSelector((state) => state.departments.departments);
  const employees = useSelector((state) => state.employees.employees);

  const firstNameRef = useRef(null);
  const lastNameRef = useRef(null);
  const emailIdRef = useRef(null);
  const departmentIdRef = useRef(null);
  const managerIdRef = useRef(null);

  // const status = useSelector((state) => state.departments.status);
  // const error = useSelector((state) => state.departments.error);

  // useEffect(() => {
  //   if (status === "idle") {

  //   }
  // }, [status, dispatch]);
  const [isOpen, setIsOpen] = useState(false);
  // const [user, setUser] = useState({
  //   id: "",
  //   firstName: "",
  //   lastName: "",
  //   emailId: "",
  //   parentId: "",
  //   managerId: "",
  // });
  // const [responseUser, setResponseUser] = useState({
  //   id: "",
  //   firstName: "",
  //   lastName: "",
  //   emailId: "",
  // });

  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    dispatch(fetchDepartments());
    dispatch(fetchEmployees());
    setIsOpen(true);
  }

  function getEmployeesByDepartment(department) {
    const departmentId = departmentIdRef.current.value;
    dispatch(fetchEmployeesByDepartment(departmentId));
  }

  // const handleChange = (event) => {
  //   const value = event.target.value;
  //   setUser({ ...user, [event.target.name]: value });
  // };

  const saveUser = async (e) => {
    e.preventDefault();

    const newUser = {
      firstName: firstNameRef.current.value,
      lastName: lastNameRef.current.value,
      emailId: emailIdRef.current.value,
      departmentId: departmentIdRef.current.value,
      managerId: managerIdRef.current.value,
    };

    const response = await fetch(USER_API_BASE_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify(newUser),
    });
    if (!response.ok) {
      throw new Error("Something went wrong");
    }
    dispatch(fetchEmployees());

    // setResponseUser(_user);
    reset(e);
  };

  const reset = (e) => {
    e.preventDefault();
    setIsOpen(false);
  };

  return (
    <>
      <div className="container mx-auto my-8">
        <div className="flex items-center h-12 m-6">
          <button
            onClick={openModal}
            className="rounded bg-slate-600 text-white px-6 py-2 font-semibold m-6"
          >
            Add Employee
          </button>

          <div className="relative">
            <select
              ref={departmentIdRef}
              name="departmentId"
              className="appearance-none rounded bg-slate-600 text-white px-6 py-2 font-semibold"
            >
              <option key={0} value="">
                Alegeți Departamentul
              </option>
              {departments.map((department) => (
                <option key={department.id} value={department.id}>
                  {department.description}
                </option>
              ))}
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
              <svg
                className="fill-current h-4 w-4"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
              >
                <path d="M5.516 7.548c0.436-0.446 1.045-0.481 1.576 0l2.908 2.859 2.908-2.859c0.531-0.481 1.141-0.446 1.576 0 0.436 0.446 0.408 1.197 0 1.615l-3.415 3.356c-0.267 0.262-0.701 0.262-0.968 0l-3.415-3.356c-0.408-0.418-0.436-1.17 0-1.615z" />
              </svg>
            </div>
          </div>
          <button
            onClick={() =>
              getEmployeesByDepartment(departmentIdRef.current.value)
            }
            className="ml-4 rounded bg-slate-600 text-white px-6 py-2 font-semibold"
          >
            Get Employee by Department
          </button>
        </div>
      </div>
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog
          as="div"
          className="fixed inset-0 z-10 overflow-y-auto"
          onClose={closeModal}
        >
          <div className="min-h-screen px-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <div className="inline-block w-full max-w-md p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-md">
                <Dialog.Title
                  as="h3"
                  className="text-lg font-medium leading-6 text-gray-900"
                >
                  Add new User
                </Dialog.Title>
                <div className="flex max-w-md max-auto">
                  <div className="py-2">
                    <div className="h-14 my-4">
                      <label className="block text-gray-600 text-sm font-normal">
                        First Name
                      </label>
                      <input
                        ref={firstNameRef}
                        type="text"
                        name="firstName"
                        className="h-10 w-96 border mt-2 px-2 py-2"
                      ></input>
                    </div>
                    <div className="h-14 my-4">
                      <label className="block text-gray-600 text-sm font-normal">
                        Last Name
                      </label>
                      <input
                        ref={lastNameRef}
                        type="text"
                        name="lastName"
                        className="h-10 w-96 border mt-2 px-2 py-2"
                      ></input>
                    </div>
                    <div className="h-14 my-4">
                      <label className="block text-gray-600 text-sm font-normal">
                        Email Id
                      </label>
                      <input
                        ref={emailIdRef}
                        type="text"
                        name="emailId"
                        className="h-10 w-96 border mt-2 px-2 py-2"
                      ></input>
                    </div>
                    <div className="h-14 my-4">
                      <label className="block text-gray-600 text-sm font-normal">
                        Department
                      </label>
                      <select
                        ref={departmentIdRef}
                        name="departmentId"
                        className="h-10 w-96 border mt-2 px-2 py-2"
                      >
                        <option key={0} value="">
                          Alegeți
                        </option>
                        {departments.map((department) => (
                          <option key={department.id} value={department.id}>
                            {department.description}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div className="h-14 my-4">
                      <label className="block text-gray-600 text-sm font-normal">
                        Manager
                      </label>
                      <select
                        ref={managerIdRef}
                        name="departmentId"
                        className="h-10 w-96 border mt-2 px-2 py-2"
                      >
                        <option key={0} value="">
                          Alegeți
                        </option>
                        {employees.map((employee) => (
                          <option key={employee.id} value={employee.id}>
                            {employee.firstName} {employee.lastName}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div className="h-14 my-4 space-x-4 pt-4">
                      <button
                        onClick={saveUser}
                        className="rounded text-white font-semibold bg-green-400 hover:bg-green-700 py-2 px-6"
                      >
                        Save
                      </button>
                      <button
                        onClick={reset}
                        className="rounded text-white font-semibold bg-red-400 hover:bg-red-700 py-2 px-6"
                      >
                        Close
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition>
    </>
  );
};

export default AddUser;
