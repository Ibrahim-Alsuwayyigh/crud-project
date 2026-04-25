export const getDailyStats = (orders) => {
  const totalOrders = orders.length

  const assigned = orders.filter((o) => o.status === "Assigned").length
  const completed = orders.filter((o) => o.status === "Completed").length
  const cancelled = orders.filter((o) => o.status === "Cancelled").length
  const taqdeer = orders.filter((o) => o.daRequired === "Taqdeer").length

  const percent = (value) =>
    totalOrders === 0 ? 0 : Math.round((value / totalOrders) * 100)

  return {
    totalOrders,
    assignedRate: percent(assigned),
    completionRate: percent(completed),
    cancelledRate: percent(cancelled),
    taqdeerRate: percent(taqdeer),
  }
}

export const getMonthlyStats = () => {
  return {
    totalOrders: 420,
    assignedRate: 68,
    completionRate: 72,
    cancelledRate: 6,
    taqdeerRate: 54,
  }
}