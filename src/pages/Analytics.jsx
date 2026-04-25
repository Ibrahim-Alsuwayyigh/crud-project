import { getDailyStats, getMonthlyStats } from "../services/statsService"

function Analytics({ orders })  {
 const dailyStats = getDailyStats(orders)
const monthlyStats = getMonthlyStats()
  const comparisonRows = [
    {
      metric: "Total Orders",
      daily: dailyStats.totalOrders,
      monthly: monthlyStats.totalOrders,
      suffix: "",
    },
    {
      metric: "Assigned Rate",
      daily: dailyStats.assignedRate,
      monthly: monthlyStats.assignedRate,
      suffix: "%",
    },
    {
      metric: "Taqdeer Rate",
      daily: dailyStats.taqdeerRate,
      monthly: monthlyStats.taqdeerRate,
      suffix: "%",
    },
    {
      metric: "Completion Rate",
      daily: dailyStats.completionRate,
      monthly: monthlyStats.completionRate,
      suffix: "%",
    },
    {
      metric: "Cancelled Rate",
      daily: dailyStats.cancelledRate,
      monthly: monthlyStats.cancelledRate,
      suffix: "%",
    },
  ]

  return (
    <>
      <h1 className="text-3xl font-bold text-gray-800 mb-6">
        Analytics
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-2xl shadow p-5">
          <h3 className="text-gray-500 text-sm">Daily Orders</h3>
          <p className="text-2xl font-bold text-gray-800 mt-2">
            {dailyStats.totalOrders}
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow p-5">
          <h3 className="text-gray-500 text-sm">Monthly Orders</h3>
          <p className="text-2xl font-bold text-gray-800 mt-2">
            {monthlyStats.totalOrders}
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow p-5">
          <h3 className="text-gray-500 text-sm">Daily Completion</h3>
          <p className="text-2xl font-bold text-green-600 mt-2">
            {dailyStats.completionRate}%
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow p-5">
          <h3 className="text-gray-500 text-sm">Monthly Completion</h3>
          <p className="text-2xl font-bold text-green-600 mt-2">
            {monthlyStats.completionRate}%
          </p>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow p-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">
          Daily vs Monthly Comparison
        </h2>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b">
                <th className="py-3 px-4">Metric</th>
                <th className="py-3 px-4">Daily</th>
                <th className="py-3 px-4">Monthly</th>
                <th className="py-3 px-4">Difference</th>
              </tr>
            </thead>

            <tbody>
              {comparisonRows.map((row) => {
                const difference = row.daily - row.monthly

                return (
                  <tr key={row.metric} className="border-b">
                    <td className="py-3 px-4 font-medium">
                      {row.metric}
                    </td>

                    <td className="py-3 px-4">
                      {row.daily}
                      {row.suffix}
                    </td>

                    <td className="py-3 px-4">
                      {row.monthly}
                      {row.suffix}
                    </td>

                    <td
                      className={`py-3 px-4 font-medium ${
                        difference >= 0 ? "text-green-600" : "text-red-600"
                      }`}
                    >
                      {difference > 0 ? "+" : ""}
                      {difference}
                      {row.suffix}
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </div>
    </>
  )
}

export default Analytics