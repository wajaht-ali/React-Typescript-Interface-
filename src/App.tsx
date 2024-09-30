import React, { useCallback, useEffect, useState } from "react";
import { BiArchive } from "react-icons/bi";
import "./styles/App.css";
import Search from "./components/Search";
import AddAppointment from "./components/AddAppointment";
// import appointmentList from "../public/data.json";
import AppointmentInfo from "./components/AppointmentInfo";
import Appointment from "./models/Appointment";

interface AppointmentDataTypes {
  appointmentList: Appointment[],
  setAppointmentList: React.Dispatch<React.SetStateAction<Appointment[]>>
}
interface SearchQueryTypes {
  
}
const App: React.FC = () => {
  const [appointmentList, setAppointmentList] = useState<AppointmentDataTypes["appointmentList"]>([]);
  const [query, setQuery] = useState("");

  const getData = useCallback(() => {
    fetch('./data.json')
      .then((res) => res.json())
      .then((data) => setAppointmentList(data))
      .catch((error) => console.log(`Error with data fetching${error}`))
  }, [])

  useEffect(() => {
    getData();
  }, [getData])

  const deleteAppointmenFunc = (appointmentId: string) => {
    setAppointmentList(appointmentList.filter(item => item.id !== appointmentId))
  }

  return (
    <div className="App container mx-auto mt-3 font-thin">
      <h1 className="text-5xl mb-3">
        <BiArchive className="inline-block text-red-400 align-top" />
        Your Appointments
      </h1>
      <Search query={query} onQueryChange={newQuery => setQuery(newQuery)} />
      <AddAppointment />
      <ul className="divide-y divide-gray-200">
        {appointmentList.map((appointment) => (
          <AppointmentInfo key={appointment.id} appointment={appointment}
            onDeleteAppointment={deleteAppointmenFunc} />
        ))}
      </ul>
    </div>
  );
};

export default App;
