import React, { useCallback, useEffect, useState } from "react";
import { BiArchive } from "react-icons/bi";
import "./styles/App.css";
import Search from "./components/Search";
import AddAppointment from "./components/AddAppointment";
import AppointmentInfo from "./components/AppointmentInfo";
import Appointment from "./models/Appointment";

interface AppointmentDataTypes {
  appointmentList: Appointment[],
  setAppointmentList: React.Dispatch<React.SetStateAction<Appointment[]>>
}
interface SearchQueryTypes {
  query: string,
  setQuery: React.Dispatch<React.SetStateAction<string>>
}
const App: React.FC = () => {
  const [appointmentList, setAppointmentList] = useState<AppointmentDataTypes["appointmentList"]>([]);
  const [query, setQuery] = useState<SearchQueryTypes>("");
  const [sortBy, setSortBy] = useState<string>("petName");
  const [orderBy, setOrderBy] = useState<string>("asc");

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
  const filterResults = appointmentList.filter((item) => {
    return (
      item.petName.toLowerCase().includes(query?.toLowerCase()) ||
      item.ownerName.toLowerCase().includes(query?.toLowerCase()) ||
      item.aptNotes.toLowerCase().includes(query?.toLowerCase())
    )
  }).sort((a: string, b: string): number => {
    let order = (orderBy === 'asc') ? 1 : -1;
    return (
      a[sortBy].toLowerCase() < b[sortBy].toLowerCase() ? -1 * order : 1 * order
    )
  })

  return (
    <div className="App container mx-auto mt-3 font-thin">
      <h1 className="text-5xl mb-3">
        <BiArchive className="inline-block text-red-400 align-top" />
        Your Appointments
      </h1>
      <Search query={query} onQueryChange={(newQuery) => setQuery(newQuery)} />
      <AddAppointment 
      onSendAppointment={appointment => setAppointmentList([...appointmentList, appointment])}
      lastId={appointmentList.reduce((max, item) => Number(item.id) > max ? Number(item.id) : max, 0)}
      />
      <ul className="divide-y divide-gray-200">
        {filterResults.map((appointment) => (
          <AppointmentInfo key={appointment.id} appointment={appointment}
            onDeleteAppointment={deleteAppointmenFunc} />
        ))}
      </ul>
    </div>
  );
};

export default App;
