import { Routes, Route } from "react-router-dom";

import AppLayout from "./layouts/AppLayout";

import DashboardPage from "./pages/DashboardPage";
import ComponentsPage from "./pages/ComponentsPage";
import AnimationsPage from "./pages/AnimationsPage";
import ReferencesPage from "./pages/ReferencesPage";
import NotesPage from "./pages/NotesPage";
import FavoritesPage from "./pages/FavoritesPage";
import ComponentDetailPage from "./pages/ComponentDetailPage";
import AddComponentPage from "./pages/AddComponentPage";
import EditComponentPage from "./pages/EditComponentPage";
import AnimationDetailPage from "./pages/AnimationDetailPage";
import AddAnimationPage from "./pages/AddAnimationPage";
import EditAnimationPage from "./pages/EditAnimationPage";
import NotFoundPage from "./pages/NotFoundPage";
function App() {
  return (
    <Routes>
      <Route element={<AppLayout />}>
        <Route index element={<DashboardPage />} />
        <Route path="/components" element={<ComponentsPage />} />
        <Route path="/components/new" element={<AddComponentPage />} />
        <Route path="/components/:slug/edit" element={<EditComponentPage />} />
        <Route path="/components/:slug" element={<ComponentDetailPage />} />
        <Route path="/animations" element={<AnimationsPage />} />
        <Route path="/animations/new" element={<AddAnimationPage />} />
        <Route path="/animations/:slug/edit" element={<EditAnimationPage />} />
        <Route path="/animations/:slug" element={<AnimationDetailPage />} />
        <Route path="/references" element={<ReferencesPage />} />
        <Route path="/notes" element={<NotesPage />} />
        <Route path="/favorites" element={<FavoritesPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
}

export default App;
