import React, { FormEvent, useState } from "react";
import { BiCalendarPlus } from "react-icons/bi";

// interface ToggleTypes {
//   toggle: boolean,
//   setToggle: React.Dispatch<React.SetStateAction<boolean>>
// }

const AddAppointment: React.FC = ({onSendAppointment, lastId}) => {
  const [toggle, setToggle] = useState(false);
  const [formData, setFormData] = useState({
    ownerName: "",
    petName: "",
    aptDate: "",
    aptTime: "",
    aptNotes: "",
  })
  let clearData = {
    ownerName: "",
    petName: "",
    aptDate: "",
    aptTime: "",
    aptNotes: "",
  }

  const handleFormData = (e: FormEvent) => {
    e.preventDefault();
    const newAppointment = {
      id: lastId + 1,
      ownerName: formData.ownerName,
      petName: formData.petName,
      aptDate: formData.aptDate + " " + formData.aptTime,
      aptNotes: formData.aptNotes,
    }
    onSendAppointment(newAppointment);
    setFormData(clearData);
    setToggle(!toggle);
  }
  return (
    <div>
      <button
        onClick={() => setToggle(!toggle)}
        className={`bg-blue-400 text-white px-2 py-3 w-full text-left rounded-t-md`}
      >
        <div>
          <BiCalendarPlus className="inline-block align-text-top" /> Add
          Appointment
        </div>
      </button>
      {
        toggle && 
        <div className="border-r-2 border-b-2 border-l-2 border-light-blue-500 rounded-b-md pl-4 pr-4 pb-4 pt-4">
          <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start  sm:pt-5">
            <label
              htmlFor="ownerName"
              className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2 py-1"
            >
              Owner Name
            </label>
            <div className="mt-1 sm:mt-0 sm:col-span-2">
              <input
                type="text"
                name="ownerName"
                id="ownerName"
                onChange={(e) => {setFormData({...formData, ownerName: e.target.value})}}
                className="pl-8 py-2 border-2 rounded-md focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm focus:outline-none border-gray-300"
              />
            </div>
          </div>

          <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start  sm:pt-5">
            <label
              htmlFor="petName"
              className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2 py-1"
            >
              Pet Name
            </label>
            <div className="mt-1 sm:mt-0 sm:col-span-2">
              <input
                type="text"
                name="petName"
                id="petName"
                onChange={(e) => {setFormData({...formData, petName: e.target.value})}}
                className="pl-8 py-2 border-2 rounded-md focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm focus:outline-none border-gray-300"
              />
            </div>
          </div>

          <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start  sm:pt-5">
            <label
              htmlFor="aptDate"
              className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2 py-1"
            >
              Apt Date
            </label>
            <div className="mt-1 sm:mt-0 sm:col-span-2">
              <input
                type="date"
                name="aptDate"
                id="aptDate"
                onChange={(e) => {setFormData({...formData, aptDate: e.target.value})}}
                className="pl-8 py-2 border-2 rounded-md focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm focus:outline-none border-gray-300"
              />
            </div>
          </div>

          <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start  sm:pt-5">
            <label
              htmlFor="aptTime"
              className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2 py-1"
            >
              Apt Time
            </label>
            <div className="mt-1 sm:mt-0 sm:col-span-2">
              <input
                type="time"
                name="aptTime"
                id="aptTime"
                onChange={(e) => {setFormData({...formData, aptTime: e.target.value})}}
                className="pl-8 py-2 border-2 rounded-md focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm focus:outline-none border-gray-300"
              />
            </div>
          </div>

          <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start  sm:pt-5">
            <label
              htmlFor="aptNotes"
              className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2 py-1"
            >
              Appointment Notes
            </label>
            <div className="mt-1 sm:mt-0 sm:col-span-2">
              <textarea
                id="aptNotes"
                name="aptNotes"
                rows={3}
                onChange={(e) => {setFormData({...formData, aptNotes: e.target.value})}}
                className="p-2 border-2 rounded-md focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm focus:outline-none border-gray-300"
                placeholder="Detailed comments about the condition"
              ></textarea>
            </div>
          </div>

          <div className="pt-5">
            <div className="flex justify-end">
              <button
                type="submit"
                onClick={handleFormData}
                className="ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-400 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-400"
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      }
    </div>
  );
};

export default AddAppointment;
