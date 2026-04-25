import { useState } from "react"
import { getOrders } from "../services/orderService"
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
} from "recharts"
function Dashboard({ orders }) {
  const [cityFilter, setCityFilter] = useState("")
  const [statusFilter, setStatusFilter] = useState("")
  const [daFilter, setDaFilter] = useState("")
  const [providerFilter, setProviderFilter] = useState("")

  

const filteredOrders = orders.filter((order) =>  {
    return (
      (cityFilter === "" || order.city === cityFilter) &&
      (statusFilter === "" || order.status === statusFilter) &&
      (daFilter === "" || order.daRequired === daFilter) &&
      (providerFilter === "" || order.provider === providerFilter)
    )
  })
      const statusChartData = Object.entries(
  filteredOrders.reduce((acc, order) => {
    acc[order.status] = (acc[order.status] || 0) + 1
    return acc
  }, {})
).map(([name, value]) => ({ name, value }))

const daChartData = Object.entries(
  filteredOrders.reduce((acc, order) => {
    acc[order.daRequired] = (acc[order.daRequired] || 0) + 1
    return acc
  }, {})
).map(([name, value]) => ({ name, value }))

const providerChartData = Object.entries(
  filteredOrders.reduce((acc, order) => {
    acc[order.provider] = (acc[order.provider] || 0) + 1
    return acc
  }, {})
).map(([name, orders]) => ({ name, orders }))
  const STATUS_COLORS = {
  Assigned: "#3B82F6",
  Pending: "#F59E0B",
  Completed: "#10B981",
  Cancelled: "#EF4444",
}

const DA_COLORS = {
  Taqdeer: "#8B5CF6",
  "No Taqdeer": "#6B7280",
}
const totalOrders = filteredOrders.length

const assignedCount = filteredOrders.filter(
  (order) => order.status === "Assigned"
).length

const completedCount = filteredOrders.filter(
  (order) => order.status === "Completed"
).length

const cancelledCount = filteredOrders.filter(
  (order) => order.status === "Cancelled"
).length

const taqdeerCount = filteredOrders.filter(
  (order) => order.daRequired === "Taqdeer"
).length

const getPercentage = (count) => {
  if (totalOrders === 0) return 0
  return Math.round((count / totalOrders) * 100)
}
return (
    <>
      <h1 className="text-3xl font-bold text-gray-800 mb-6">
        Daily Orders Overview
      </h1>

      {/* STATS CARDS */}
     <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
  <div className="bg-white rounded-2xl shadow p-5">
    <h3 className="text-gray-500 text-sm">Total Orders</h3>
    <p className="text-2xl font-bold text-gray-800 mt-2">
      {totalOrders}
    </p>
  </div>

  <div className="bg-white rounded-2xl shadow p-5">
    <h3 className="text-gray-500 text-sm">Assigned Rate</h3>
    <p className="text-2xl font-bold text-blue-600 mt-2">
      {getPercentage(assignedCount)}%
    </p>
  </div>

  <div className="bg-white rounded-2xl shadow p-5">
    <h3 className="text-gray-500 text-sm">Taqdeer Rate</h3>
    <p className="text-2xl font-bold text-purple-600 mt-2">
      {getPercentage(taqdeerCount)}%
    </p>
  </div>

  <div className="bg-white rounded-2xl shadow p-5">
    <h3 className="text-gray-500 text-sm">Completion Rate</h3>
    <p className="text-2xl font-bold text-green-600 mt-2">
      {getPercentage(completedCount)}%
    </p>
  </div>
</div>

      {/* FILTER PANEL */}
      <div className="bg-white rounded-2xl shadow p-5 mb-8">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">
          Filters
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">

          <select
            value={cityFilter}
            onChange={(e) => setCityFilter(e.target.value)}
            className="border rounded-lg px-3 py-2"
          >
            <option value="">All Cities</option>
            <option value="Riyadh">Riyadh</option>
            <option value="Qatif">Qatif</option>
            <option value="Jubail">Jubail</option>
            <option value="Dhahran">Dhahran</option>
            <option value="Khobar">Khobar</option>
            <option value="Jeddah">Jeddah</option>
          </select>

          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="border rounded-lg px-3 py-2"
          >
            <option value="">All Status</option>
            <option value="Assigned">Assigned</option>
            <option value="Pending">Pending</option>
            <option value="Completed">Completed</option>
          </select>

          <select
            value={daFilter}
            onChange={(e) => setDaFilter(e.target.value)}
            className="border rounded-lg px-3 py-2"
          >
            <option value="">All DA Types</option>
            <option value="Taqdeer">Taqdeer</option>
            <option value="No Taqdeer">No Taqdeer</option>
          </select>

          <select
            value={providerFilter}
            onChange={(e) => setProviderFilter(e.target.value)}
            className="border rounded-lg px-3 py-2"
          >
            
            <option value="">All Providers</option>
            <button
  type="button"
  onClick={() => {
    setCityFilter("")
    setStatusFilter("")
    setDaFilter("")
    setProviderFilter("")
  }}
  className="bg-gray-200 text-gray-800 px-4 py-2 rounded-lg hover:bg-gray-300"
>
  Clear Filters
</button>
            {[...new Set(orders.map((o) => o.provider))].map(
              (provider) => (
                <option key={provider} value={provider}>
                  {provider}
                </option>
              )
            )}

          </select>
          <button
  type="button"
  onClick={() => {
    setCityFilter("")
    setStatusFilter("")
    setDaFilter("")
    setProviderFilter("")
  }}
  className="bg-gray-200 text-gray-800 px-4 py-2 rounded-lg hover:bg-gray-300"
>
  Clear Filters
</button>

        </div>
      </div>
<div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
  <div className="bg-white rounded-2xl shadow p-5">
    <h2 className="text-xl font-semibold text-gray-800 mb-4">
      Orders by Status
    </h2>

    <div className="h-72">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={statusChartData}
            dataKey="value"
            nameKey="name"
            outerRadius={90}
            label
          >
            {statusChartData.map((entry, index) => (
              <Cell
                key={index}
                fill={STATUS_COLORS[entry.name] || "#CBD5E1"}
              />
            ))}
          </Pie>
          <Tooltip />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  </div>

  <div className="bg-white rounded-2xl shadow p-5">
    <h2 className="text-xl font-semibold text-gray-800 mb-4">
      Taqdeer vs No Taqdeer
    </h2>

    <div className="h-72">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={daChartData}
            dataKey="value"
            nameKey="name"
            outerRadius={90}
            label
          >
            {daChartData.map((entry, index) => (
              <Cell
                key={index}
                fill={DA_COLORS[entry.name] || "#CBD5E1"}
              />
            ))}
          </Pie>
          <Tooltip />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  </div>
</div>

<div className="bg-white rounded-2xl shadow p-5 mb-8">
  <h2 className="text-xl font-semibold text-gray-800 mb-4">
    Orders by Provider
  </h2>

  <div className="h-80">
    <ResponsiveContainer width="100%" height="100%">
      <BarChart data={providerChartData}>
        <XAxis dataKey="name" />
        <YAxis allowDecimals={false} />
        <Tooltip />
        <Legend />
        <Bar
          dataKey="orders"
          fill="#3B82F6"
          radius={[6, 6, 0, 0]}
        />
      </BarChart>
    </ResponsiveContainer>
  </div>
</div>

      {/* TABLE */}
      <div className="bg-white rounded-2xl shadow p-5">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">
          Daily Orders
        </h2>

        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b">
              <th className="py-3 px-4">Corporate</th>
              <th className="py-3 px-4">GUID</th>
              <th className="py-3 px-4">City</th>
              <th className="py-3 px-4">Status</th>
              <th className="py-3 px-4">Pickup Time</th>
              <th className="py-3 px-4">Provider</th>
            </tr>
          </thead>

          <tbody>
            {filteredOrders.map((order) => (
              <tr key={order.id} className="border-b">
                <td className="py-3 px-4">{order.corporate}</td>
                <td className="py-3 px-4">{order.guid}</td>
                <td className="py-3 px-4">{order.city}</td>
                <td className="py-3 px-4">{order.status}</td>
                <td className="py-3 px-4">{order.pickupTime}</td>
                <td className="py-3 px-4">{order.provider}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  )
}

export default Dashboard