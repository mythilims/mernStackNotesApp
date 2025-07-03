import { BrowserRouter, Routes, Route } from "react-router-dom";
import Signin from "../pages/Signin";
import Dashboard from "../pages/DashBoard";
import ProtectedRoute from "../features/ProtectedRoute";
import Layout from "../layout/Layout";
import NotesList from "../pages/NotesList";
import NewNote from "../pages/NewNote";

function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Signin />} />

        <Route element={<ProtectedRoute />}>
          <Route path="/" element={<Layout />}>
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="notes" element={<NotesList />} />
            <Route path="addNote" element={<NewNote />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default AppRoutes;
