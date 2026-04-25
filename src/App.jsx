import { useState } from "react"
import { BrowserRouter, Routes, Route, NavLink } from "react-router-dom"
import Dashboard from "./pages/Dashboard"
import ManageData from "./pages/ManageData"
import Analytics from "./pages/Analytics"
import { getOrders } from "./services/orderService"

function App() {
  const [orders, setOrders] = useState(getOrders())

  const navClass = ({ isActive }) =>
    isActive
      ? "block rounded-lg px-4 py-2 bg-blue-500 text-white font-medium"
      : "block rounded-lg px-4 py-2 text-gray-700 hover:bg-gray-200"

  return (
    <BrowserRouter>
      <div className="min-h-screen bg-gray-100 flex">
        <aside className="w-64 bg-white shadow-md p-5">
          <h2 className="text-2xl font-bold mb-8 text-gray-800">
            My Dashboard
          </h2>

          <nav className="space-y-3">
            <NavLink to="/" end className={navClass}>
              Daily Orders
            </NavLink>

            <NavLink to="/manage" className={navClass}>
              Manage Orders
            </NavLink>

            <NavLink to="/analytics" className={navClass}>
              Analytics
            </NavLink>
          </nav>
        </aside>

        <main className="flex-1 p-6">
          <Routes>
            <Route path="/" element={<Dashboard orders={orders} />} />
            <Route
              path="/manage"
              element={<ManageData orders={orders} setOrders={setOrders} />}
            />
            <Route path="/analytics" element={<Analytics orders={orders} />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  )
}

export default App