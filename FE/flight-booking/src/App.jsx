import { BrowserRouter as Router } from "react-router-dom";
import './assets/global.css';
import { Toaster } from 'react-hot-toast';
import AppRoutes from "./routes";
function App() {
  return (
    <Router>
        <AppRoutes />
      <Toaster />
    </Router>
  );
}

export default App;
