import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import ProtectedRoute from "./auth/ProtectedRoute";
import AddEmployee from "./components/AddEmployee";
import AddLead from "./components/AddLead";
import AddWork from "./components/AddWork";
import AssignWork from "./components/AssignWork";
import EmployeeDetail from "./components/EmployeeDetail";
import Employees from "./components/Employees";
import Register from "./pages/Register";
import UpdateEmployee from "./components/UpdateEmployee";
import UpdateLead from "./components/UpdateLead"
import UpdateWork from "./components/UpdateWork"

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register/>}/>

        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/employees"
          element={
            <ProtectedRoute>
              <Employees />
            </ProtectedRoute>
          }
        />

        <Route
          path="/add-employee"
          element={
            <ProtectedRoute>
              <AddEmployee />
            </ProtectedRoute>
          }
        />

        <Route 
          path="/add-lead" 
          element={<ProtectedRoute>
            <AddLead />
            </ProtectedRoute>} 
        />

        <Route
          path="/add-work"
          element={<ProtectedRoute>
            <AddWork/>
          </ProtectedRoute>}
        />

        <Route
          path="/assign-work"
          element={<ProtectedRoute>
            <AssignWork/>
          </ProtectedRoute>}
        />

        <Route
          path="/employee-detail/:id"
          element={<ProtectedRoute>
            <EmployeeDetail/>
          </ProtectedRoute>}
        />

        <Route
          path="/update-employee/:id"
          element={<ProtectedRoute>
            <UpdateEmployee/>
          </ProtectedRoute>}
        />

        <Route
          path="/update-lead/:id"
          element={<ProtectedRoute>
            <UpdateLead/>
          </ProtectedRoute>}
        />

        <Route
          path="/update-work/:id"
          element={<ProtectedRoute>
            <UpdateWork/>
          </ProtectedRoute>}
        />


      </Routes>
    </BrowserRouter>
  );
}
