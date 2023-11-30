import { Dialog, Transition } from "@headlessui/react";
import React from "react";
import { useRef } from "react";
import { Fragment } from "react";
import { useState } from "react";
import { fetchDepartments } from "../public/src/features/departmentSlice";
import { useDispatch, useSelector } from "react-redux";

const AddDepartment = () => {
  const USER_API_BASE_URL = "http://localhost:8080/api/v1/departments";
  const dispatch = useDispatch();
  const [isDepartmentModalOpen, setIsDepartmentModalOpen] = useState(false);
  const departments = useSelector((state) => state.departments.departments);
  const departmentName = useRef(null);
  const departmentIdRef = useRef(null);
  const openDepartmentModal = () => {
    setIsDepartmentModalOpen(true);
  };

  const closeDepartmentModal = () => {
    setIsDepartmentModalOpen(false);
  };

  const handleSaveDepartment = async (e) => {
    e.preventDefault();

    const newDepartment = {
      description: departmentName.current.value,
      parentId: departmentIdRef.current.value,
    };

    const response = await fetch(USER_API_BASE_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify(newDepartment),
    });
    if (!response.ok) {
      throw new Error("Something went wrong");
    }
    dispatch(fetchDepartments());

    reset(e);
  };

  const reset = (e) => {
    e.preventDefault();
    closeDepartmentModal();
  };

  return (
    <>
      <div className="container mx-auto my-8">
        <div className="h-12 m-6">
          <button
            onClick={openDepartmentModal}
            className="rounded bg-slate-600 text-white px-6 py-2 font-semibold m-6 mt-0"
          >
            Add Department
          </button>
        </div>
      </div>

      <Transition appear show={isDepartmentModalOpen} as={Fragment}>
        <Dialog
          as="div"
          className="fixed inset-0 z-10 overflow-y-auto"
          onClose={closeDepartmentModal}
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
                        Department Name
                      </label>
                      <input
                        ref={departmentName}
                        type="text"
                        name="firstName"
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
                          Alegeti
                        </option>
                        {departments.map((department) => (
                          <option key={department.id} value={department.id}>
                            {department.description}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className="h-14 my-4 space-x-4 pt-4">
                      <button
                        onClick={handleSaveDepartment}
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

export default AddDepartment;
