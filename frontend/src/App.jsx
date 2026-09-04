import { Routes, Route } from "react-router-dom";

import AppLayout from "./layouts/AppLayout";

import DashboardPage from "./pages/DashboardPage";
import ComponentsPage from "./pages/ComponentsPage";
import AnimationsPage from "./pages/AnimationsPage";
import ReferencesPage from "./pages/ReferencesPage";
import NotesPage from "./pages/NotesPage";
import ProjectsPage from "./pages/ProjectsPage";
import FavoritesPage from "./pages/FavoritesPage";

function App() {
  return (
    <Routes>
      <Route element={<AppLayout />}>
        <Route index element={<DashboardPage />} />
        <Route path="/components" element={<ComponentsPage />} />
        <Route path="/animations" element={<AnimationsPage />} />
        <Route path="/references" element={<ReferencesPage />} />
        <Route path="/notes" element={<NotesPage />} />
        <Route path="/projects" element={<ProjectsPage />} />
        <Route path="/favorites" element={<FavoritesPage />} />
      </Route>
    </Routes>
  );
}

export default App;