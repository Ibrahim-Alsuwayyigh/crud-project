import { useState } from "react"

import {
  corporate,
  provider,
  daRequiredOptions,
  cities,
  pickupTimes,
  statusOptions,
} from "../data/formOptions"

import {
  daRequiredColors,
  corporateColors,
  cityColors,
  statusColors,
} from "../data/badgeColors"

import {
  createOrder,
  updateOrder,
  deleteOrder,
} from "../services/orderService"

function ManageData({ orders, setOrders, loadOrders }) {
  const emptyForm = {
    corporate: "Tawuniya",
    guid: "",
    daRequired: "Taqdeer",
    city: "Riyadh",
    provider: "",
    status: "Assigned",
   pickupDate: new Date().toISOString().split("T")[0],
    pickupTime: "08:00",
    customerName: "",
    customerPhone: "",
    createdBy: "Ali S",
  }

  const [formData, setFormData] = useState(emptyForm)
  const [editingId, setEditingId] = useState(null)

  const handleChange = (e) => {
    const { name, value } = e.target

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = async (e) => {
  e.preventDefault()

  if (editingId) {
    const result = await updateOrder(editingId, formData)
    console.log("Update result:", result)
    setEditingId(null)
  } else {
    const result = await createOrder(formData)
    console.log("Create result:", result)
  }

  await loadOrders()
  setFormData(emptyForm)
}

  const handleEdit = (order) => {
    setFormData({
      corporate: order.corporate,
      guid: order.guid,
      daRequired: order.daRequired,
      city: order.city,
      provider: order.provider,
      status: order.status,
      pickupDate: order.pickupDate,
      pickupTime: order.pickupTime,
      customerName: order.customerName,
      customerPhone: order.customerPhone,
      createdBy: order.createdBy,
    })

    setEditingId(order.id)
  }

  const handleDelete = async (id) => {
    const handleDelete = async (id) => {
  await deleteOrder(id)
  await loadOrders()
}

    if (success) {
      setOrders((prev) => prev.filter((order) => order.id !== id))
    }
  }

  return (
    <>
      <h1 className="text-3xl font-bold text-gray-800 mb-6">
        Manage Daily Orders
      </h1>

      <div className="bg-white rounded-2xl shadow p-6 mb-8">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">
          {editingId ? "Edit Order" : "Add New Order"}
        </h2>

        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 md:grid-cols-2 gap-4"
        >
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Corporate
            </label>
            <select
              name="corporate"
              value={formData.corporate}
              onChange={handleChange}
              className="w-full border rounded-lg px-3 py-2"
              required
            >
              {corporate.map((corp) => (
                <option key={corp} value={corp}>
                  {corp}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              GUID / Order ID
            </label>
            <input
              type="text"
              name="guid"
              value={formData.guid}
              onChange={handleChange}
              className="w-full border rounded-lg px-3 py-2"
              placeholder="Enter order ID"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              DA Required
            </label>
            <select
              name="daRequired"
              value={formData.daRequired}
              onChange={handleChange}
              className="w-full border rounded-lg px-3 py-2"
              required
            >
              {daRequiredOptions.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              City
            </label>
            <select
              name="city"
              value={formData.city}
              onChange={handleChange}
              className="w-full border rounded-lg px-3 py-2"
              required
            >
              {cities.map((city) => (
                <option key={city} value={city}>
                  {city}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Provider
            </label>
            <select
              name="provider"
              value={formData.provider}
              onChange={handleChange}
              className="w-full border rounded-lg px-3 py-2"
              required
            >
              <option value="">Select provider</option>
              {provider.map((person) => (
                <option key={person} value={person}>
                  {person}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Status
            </label>
            <select
              name="status"
              value={formData.status}
              onChange={handleChange}
              className="w-full border rounded-lg px-3 py-2"
              required
            >
              {statusOptions.map((status) => (
                <option key={status} value={status}>
                  {status}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Pickup Date
            </label>
            <input
              type="date"
              name="pickupDate"
              value={formData.pickupDate}
              onChange={handleChange}
              className="w-full border rounded-lg px-3 py-2"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Pickup Time
            </label>
            <select
              name="pickupTime"
              value={formData.pickupTime}
              onChange={handleChange}
              className="w-full border rounded-lg px-3 py-2"
              required
            >
              {pickupTimes.map((time) => (
                <option key={time} value={time}>
                  {time}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Customer Name
            </label>
            <input
              type="text"
              name="customerName"
              value={formData.customerName}
              onChange={handleChange}
              className="w-full border rounded-lg px-3 py-2"
              placeholder="Enter customer name"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Customer Phone
            </label>
            <input
              type="text"
              name="customerPhone"
              value={formData.customerPhone}
              onChange={handleChange}
              className="w-full border rounded-lg px-3 py-2"
              placeholder="Enter phone number"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Created By
            </label>
            <input
              type="text"
              name="createdBy"
              value={formData.createdBy}
              onChange={handleChange}
              className="w-full border rounded-lg px-3 py-2"
              required
            />
          </div>

          <div className="md:col-span-2 flex gap-3 pt-2">
            <button
              type="submit"
              className="bg-blue-500 text-white px-5 py-2 rounded-lg hover:bg-blue-600"
            >
              {editingId ? "Update Order" : "Save Order"}
            </button>

            <button
              type="button"
              onClick={() => {
                setFormData(emptyForm)
                setEditingId(null)
              }}
              className="bg-gray-200 text-gray-800 px-5 py-2 rounded-lg hover:bg-gray-300"
            >
              Clear
            </button>
          </div>
        </form>
      </div>

      <div className="bg-white rounded-2xl shadow p-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">
          Current Orders
        </h2>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b">
                <th className="py-3 px-4">Corporate</th>
                <th className="py-3 px-4">GUID</th>
                <th className="py-3 px-4">DA Required</th>
                <th className="py-3 px-4">City</th>
                <th className="py-3 px-4">Provider</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4">Pickup Date</th>
                <th className="py-3 px-4">Pickup Time</th>
                <th className="py-3 px-4">Customer</th>
                <th className="py-3 px-4">Phone</th>
                <th className="py-3 px-4">Created By</th>
                <th className="py-3 px-4">Actions</th>
              </tr>
            </thead>

            <tbody>
              {orders.map((order) => (
                <tr key={order.id} className="border-b">
                  <td className="py-3 px-4">
                    <span
                      className={`px-3 py-1 rounded-full text-sm font-medium ${
                        corporateColors[order.corporate] ||
                        "bg-gray-100 text-gray-700"
                      }`}
                    >
                      {order.corporate}
                    </span>
                  </td>

                  <td className="py-3 px-4">{order.guid}</td>

                  <td className="py-3 px-4">
                    <span
                      className={`px-3 py-1 rounded-full text-sm font-medium ${
                        daRequiredColors[order.daRequired] ||
                        "bg-gray-100 text-gray-700"
                      }`}
                    >
                      {order.daRequired}
                    </span>
                  </td>

                  <td className="py-3 px-4">
                    <span
                      className={`px-3 py-1 rounded-full text-sm font-medium ${
                        cityColors[order.city] || "bg-gray-100 text-gray-700"
                      }`}
                    >
                      {order.city}
                    </span>
                  </td>

                  <td className="py-3 px-4">{order.provider}</td>

                  <td className="py-3 px-4">
                    <span
                      className={`px-3 py-1 rounded-full text-sm font-medium ${
                        statusColors[order.status] ||
                        "bg-gray-100 text-gray-700"
                      }`}
                    >
                      {order.status}
                    </span>
                  </td>

                  <td className="py-3 px-4">{order.pickupDate}</td>
                  <td className="py-3 px-4">{order.pickupTime}</td>
                  <td className="py-3 px-4">{order.customerName}</td>
                  <td className="py-3 px-4">{order.customerPhone}</td>
                  <td className="py-3 px-4">{order.createdBy}</td>

                  <td className="py-3 px-4">
                    <div className="flex gap-2">
                      <button
                        className="bg-yellow-400 text-white px-3 py-1 rounded-lg hover:bg-yellow-500"
                        onClick={() => handleEdit(order)}
                      >
                        Edit
                      </button>

                      <button
                        className="bg-red-500 text-white px-3 py-1 rounded-lg hover:bg-red-600"
                        onClick={() => handleDelete(order.id)}
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  )
}

export default ManageData