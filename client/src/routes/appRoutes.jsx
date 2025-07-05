import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { lazy, Suspense } from "react";
import Register from "../pages/Register";
const Signin = lazy(() => import("../pages/Signin"));
const Dashboard = lazy(() => import("../pages/DashBoard"));
const ProtectedRoute = lazy(() => import("../features/ProtectedRoute"));
const Layout = lazy(() => import("../layout/Layout"));
const NotesList = lazy(() => import("../pages/NotesList"));
const NewNote = lazy(() => import("../pages/NewNote"));

function AppRoutes() {
  return (
    <BrowserRouter>
      <Suspense
        fallback={
          <div className="text-center p-6 text-[#4DA8DA] font-bold">
            🔄 Loading Page...
          </div>
        }
      >
        <Routes>
          <Route path="/login" element={<Signin />} />
          <Route path="/register" element={<Register />} />

          <Route element={<ProtectedRoute />}>
            <Route path="/" element={<Layout />}>
              <Route path="dashboard" element={<Dashboard />} />
              <Route path="notes" element={<NotesList />} />
              <Route path="addNote" element={<NewNote />} />
            </Route>
          </Route>

          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}

export default AppRoutes;
