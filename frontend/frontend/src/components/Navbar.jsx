import { useContext } from "react";
import { AuthContext } from "../auth/AuthContext";

export default function Navbar() {
  const { logout } = useContext(AuthContext);

  return (
    <div className="flex justify-between p-4 bg-gray-800 text-white">
      <h1 className="font-bold">Employee Manager</h1>
      <button
        onClick={logout}
        className="bg-red-500 px-4 py-1 rounded"
      >
        Logout
      </button>
    </div>
  );
}
