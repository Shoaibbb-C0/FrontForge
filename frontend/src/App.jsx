import { Routes, Route } from "react-router-dom";

import AppLayout from "./layouts/AppLayout";

import DashboardPage from "./pages/DashboardPage";
import ComponentsPage from "./pages/ComponentsPage";
import AnimationsPage from "./pages/AnimationsPage";
import ReferencesPage from "./pages/ReferencesPage";
import NotesPage from "./pages/NotesPage";
import ProjectsPage from "./pages/ProjectsPage";
import FavoritesPage from "./pages/FavoritesPage";
import ComponentDetailPage from "./pages/ComponentDetailPage";
import AddComponentPage from "./pages/AddComponentPage";
function App() {
  return (
    <Routes>
      <Route element={<AppLayout />}>
        <Route index element={<DashboardPage />} />
        <Route path="/components" element={<ComponentsPage />} />
        <Route path="/components/new" element={<AddComponentPage />} />
        <Route path="/components/:slug" element={<ComponentDetailPage />} />
        <Route path="/animations" element={<AnimationsPage />} />
        <Route path="/references" element={<ReferencesPage />} />
        <Route path="/notes" element={<NotesPage />} />
        <Route path="/projects" element={<ProjectsPage />} />
        <Route path="/favorites" element={<FavoritesPage />} />
        <Route path="/components" element={<ComponentDetailPage />} />
      </Route>
    </Routes>
  );
}

export default App;
