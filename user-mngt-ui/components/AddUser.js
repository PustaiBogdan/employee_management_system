import { Dialog, Transition } from "@headlessui/react";
import React, { useEffect, useRef } from "react";
import { Fragment, useState } from "react";
import UserList from "./UserList";
import { fetchDepartments } from "../public/src/features/departmentSlice";
import { fetchEmployees } from "../public/src/features/employeesSlice";

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
        <div className="h-12">
          <button
            onClick={openModal}
            className="rounded bg-slate-600 text-white px-6 py-2 font-semibold"
          >
            Add User
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
