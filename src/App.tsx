import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import MainRules from './pages/MainRules';
import JobRules from './pages/JobRules';
import RobberyRules from './pages/RobberyRules';
import GangRules from './pages/GangRules';
import AdminLogin from './pages/AdminLogin';
import AdminPanel from './pages/AdminPanel';
import '@fontsource/vazirmatn';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/admin" element={<AdminLogin />} />
        <Route path="/admin/panel" element={<AdminPanel />} />

        <Route path="*" element={<Layout />}>
          <Route index element={<MainRules />} />
          <Route path="job-rules" element={<JobRules />} />
          <Route path="robbery-rules" element={<RobberyRules />} />
          <Route path="gang-rules" element={<GangRules />} />
          <Route path="*" element={<MainRules />} /> {/* Catch-all for other routes */}
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
