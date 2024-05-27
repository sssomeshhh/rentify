import { Route, Routes } from "react-router-dom";
import Home from "./Home";
import Login from "./Login";
import Register from "./Register";
import PropertyList from "./PropertyList";
import PropertyAdd from "./PropertyAdd";
import PropertyDetail from "./PropertyDetail";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/property/list" element={<PropertyList />} />
      <Route path="/property/add" element={<PropertyAdd />} />
      <Route path="/property/detail/:id" element={<PropertyDetail />} />
    </Routes>
  );
}

export default App;
