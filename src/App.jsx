// src/App.jsx
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Layout from "./components/Layout"
import Dashboard from "./pages/Dashboard"
import Tenders from "./pages/Tenders"
import CreateTender from "./pages/CreateTender"
import TenderDetails from "./pages/TenderDetails"
import Clashes from "./pages/Clashes"
import ClashDetails from "./pages/ClashDetails"
import Issues from "./pages/Issues"
import Inventory from "./pages/Inventory"
import Users from "./pages/Users"
import CreateUser from "./pages/CreateUser"
import Roles from "./pages/Roles"
import CreateRole from "./pages/CreateRole"
import Features from "./pages/Features"
import InventoryRequests from "./pages/inventoryRequests"
import InventoryAsk from "./pages/InventoryAsk"

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Dashboard />} />
          <Route path="tenders" element={<Tenders />} />
          <Route path="tenders/create" element={<CreateTender />} />
          <Route path="tenders/:id" element={<TenderDetails />} />
          <Route path="clashes" element={<Clashes />} />
          <Route path="clashes/:id" element={<ClashDetails />} />
          <Route path="issues" element={<Issues />} />
          <Route path="inventory" element={<Inventory />} />
          <Route path="inventory/requests" element={<InventoryRequests />} />
          <Route path="inventory/request/:id" element={<InventoryRequests />} />
          <Route path="inventory/ask" element={<InventoryAsk />} />
          <Route path="users" element={<Users />} />
          <Route path="users/create" element={<CreateUser />} />
          <Route path="roles" element={<Roles />} />
          <Route path="roles/create" element={<CreateRole />} />
          <Route path="features" element={<Features />} />
        </Route>
      </Routes>
    </Router>
  )
}

export default App

