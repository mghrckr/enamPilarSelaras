import { Routes, Route, Navigate } from "react-router-dom";
import { Dashboard, Auth } from "@/layouts";
import { Provider } from 'react-redux';
import store from '../src/store'

function App() {
  return (
    <Provider store={store}>
      <Routes>
        <Route path="*" element={<Navigate to="/dashboard/home" replace />} />
        <Route path="/auth/*" element={<Auth />} />
        <Route path="/dashboard/*" element={<Dashboard />} />
      </Routes>
    </Provider>
  );
}

export default App;
