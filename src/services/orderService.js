import { sampleOrders } from "../data/sampleOrders"

export const getOrders = () => {
  return sampleOrders
}

export const createOrder = (orders, newOrder) => {
  return [
    ...orders,
    {
      id: Date.now(),
      ...newOrder,
    },
  ]
}

export const updateOrder = (orders, editingId, updatedOrder) => {
  return orders.map((order) =>
    order.id === editingId ? { ...order, ...updatedOrder } : order
  )
}

export const deleteOrder = (orders, id) => {
  return orders.filter((order) => order.id !== id)
}