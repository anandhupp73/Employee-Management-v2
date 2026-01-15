import { useEffect, useState } from "react";
import { getEmployees, deleteEmployee } from "../api/employees";
import Navbar from "../components/Navbar";

export default function Employees() {
  const [employees, setEmployees] = useState([]);

  const load = () =>
    getEmployees().then((res) => setEmployees(res.data));

  useEffect(() => {
    load();
  }, []);

  return (
    <>
      <Navbar />
      <div className="p-6">
        <h2 className="text-xl font-bold mb-4">
          Employees
        </h2>

        {employees.map((e) => (
          <div
            key={e.emp_id}
            className="flex justify-between border p-2 mb-2"
          >
            <span>{e.emp_name}</span>
            <button
              className="text-red-500"
              onClick={() =>
                deleteEmployee(e.emp_id).then(load)
              }
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </>
  );
}
