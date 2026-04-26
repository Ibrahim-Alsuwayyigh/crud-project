import { supabase } from "../lib/supabaseClient"

const mapFormToDb = (order) => ({
  corporate: order.corporate,
  guid: order.guid,
  da_required: order.daRequired,
  city: order.city,
  provider: order.provider,
  status: order.status,
  pickup_datetime: `${order.pickupDate} ${order.pickupTime}:00`,
  customer_name: order.customerName,
  phone: order.customerPhone,
  created_by: order.createdBy,
})

const mapDbToApp = (order) => ({
  id: order.id,
  corporate: order.corporate,
  guid: order.guid,
  daRequired: order.da_required,
  city: order.city,
  provider: order.provider,
  status: order.status,
  pickupDate: order.pickup_datetime?.split("T")[0] || order.pickup_datetime?.split(" ")[0],
  pickupTime:
    order.pickup_datetime?.split("T")[1]?.slice(0, 5) ||
    order.pickup_datetime?.split(" ")[1]?.slice(0, 5),
  customerName: order.customer_name,
  customerPhone: order.phone,
  createdBy: order.created_by,
})

export const getOrders = async () => {
  const { data, error } = await supabase
    .from("orders")
    .select("*")

  if (error) {
    console.error("Error fetching orders:", error)
    return []
  }

  return data.map(mapDbToApp)
}

export const createOrder = async (newOrder) => {
  const { data, error } = await supabase
    .from("orders")
    .insert([mapFormToDb(newOrder)])
    .select()
    .single()

  if (error) {
    console.error("Error creating order:", JSON.stringify(error, null, 2))
    return null
  }

  return mapDbToApp(data)
}
export const updateOrder = async (id, updatedOrder) => {
  const { data, error } = await supabase
    .from("orders")
    .update(mapFormToDb(updatedOrder))
    .eq("id", id)
    .select()
    .single()

  if (error) {
    console.error("Error updating order:", error)
    return null
  }

  return mapDbToApp(data)
}

export const deleteOrder = async (id) => {
  const { error } = await supabase
    .from("orders")
    .delete()
    .eq("id", id)

  if (error) {
    console.error("Error deleting order:", error)
    return false
  }

  return true
}