import { useEffect, useState } from "react";
import "./App.css";
function App() {
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const API_URL = "http://localhost:8000/api/store_info";

  const fetchUsers = async () => {
    try {
      const res = await fetch(API_URL);
      const usersData = await res.json();
      setUsers(usersData);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchUsers();
  }, []);
  function handleSearch(e){
    setSearchTerm(e.target.value.toLowerCase());
  };
  const filteredUsers = users.filter((user) =>
    user.email.toLowerCase().includes(searchTerm)
  );

  return (
    <div className="w-1/2  m-auto flex flex-col">
      <br />
      <input type="text" placeholder="Search Users by their E-mail address"  id="my_input"  className="h-16 p-3 text-xl border border-black rounded-2xl font-bold"onChange={(e) =>handleSearch(e)} />
      <br />
      <table className="border p-2 text-lg border-black rounded-3xl">
        <thead className="border p-2 text-lg border-black">
          <th className="border p-2 text-lg border-black underline font-extrabold">id</th>
          <th className="border p-2 text-lg border-black underline font-extrabold">Name</th>
          <th className="border p-2 text-lg border-black underline font-extrabold"> Phone</th>
          <th className="border p-2 text-lg border-black underline font-extrabold">Email</th>
          <th className="border p-2 text-lg border-black underline font-extrabold">Date of Birth</th>
        </thead>
        {filteredUsers.length > 0 ? ( 
          filteredUsers.map((user) => (
            <tbody className="border p-2 text-lg border-black">
              <td className="border p-2 text-lg border-black">{user.id}</td>
              <td className="border p-2 text-lg border-black">{user.name}</td>
              <td className="border p-2 text-lg border-black">{user.phone}</td>
              <td className="border p-2 text-lg border-black">{user.email}</td>
              <td className="border p-2 text-lg border-black">{user.dob}</td>
            </tbody>
          ))): <p className="text-center font-extrabold">No User Found</p>
        }
        
      </table>
    </div>
  );
}

export default App;
