import { auth } from "@/lib/auth/auth";
import { redirect } from "next/navigation";

export default async function ReportsPage() {
  const session = await auth.api.getSession({
    headers: {
      cookie: ""
    }
  });

  if (!session) {
    redirect("/sign-in");
  }

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-6">Financial Reports</h1>

      {/* Report Filters */}
      <div className="bg-white rounded-lg shadow p-4 mb-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Report Type</label>
            <select className="w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500">
              <option>Monthly Summary</option>
              <option>Yearly Summary</option>
              <option>Category Analysis</option>
              <option>Investment Performance</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Period</label>
            <select className="w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500">
              <option>June 2023</option>
              <option>May 2023</option>
              <option>April 2023</option>
              <option>Last 3 Months</option>
              <option>Last 6 Months</option>
            </select>
          </div>
          <div className="flex items-end">
            <button className="w-full bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg">
              Generate Report
            </button>
          </div>
        </div>
      </div>

      {/* Report Visualization */}
      <div className="bg-white rounded-lg shadow p-6 mb-6">
        <h2 className="text-xl font-semibold mb-4">Income vs Expenses - June 2023</h2>
        <div className="h-64 flex items-end justify-between px-8">
          {/* Chart visualization */}
          <div className="flex flex-col items-center">
            <div className="w-16 bg-green-500" style={{ height: "80%" }}></div>
            <span className="mt-2">Income</span>
            <span className="font-semibold">Rp 5M</span>
          </div>
          <div className="flex flex-col items-center">
            <div className="w-16 bg-red-500" style={{ height: "60%" }}></div>
            <span className="mt-2">Expenses</span>
            <span className="font-semibold">Rp 3.5M</span>
          </div>
          <div className="flex flex-col items-center">
            <div className="w-16 bg-blue-500" style={{ height: "20%" }}></div>
            <span className="mt-2">Savings</span>
            <span className="font-semibold">Rp 1.5M</span>
          </div>
        </div>
      </div>

      {/* Category Breakdown */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold mb-4">Expense by Category</h2>
          <ul className="space-y-3">
            <li className="flex justify-between">
              <span>Housing</span>
              <span>Rp 2,000,000 (40%)</span>
            </li>
            <li className="flex justify-between">
              <span>Food</span>
              <span>Rp 500,000 (10%)</span>
            </li>
            <li className="flex justify-between">
              <span>Transport</span>
              <span>Rp 300,000 (6%)</span>
            </li>
            <li className="flex justify-between">
              <span>Entertainment</span>
              <span>Rp 200,000 (4%)</span>
            </li>
            <li className="flex justify-between">
              <span>Other</span>
              <span>Rp 500,000 (10%)</span>
            </li>
          </ul>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold mb-4">Export Options</h2>
          <div className="space-y-4">
            <button className="w-full bg-gray-100 hover:bg-gray-200 text-gray-800 px-4 py-3 rounded-lg flex items-center justify-between">
              <span>Export as PDF</span>
              <span className="bg-gray-200 rounded-full px-3 py-1 text-sm">Download</span>
            </button>
            <button className="w-full bg-gray-100 hover:bg-gray-200 text-gray-800 px-4 py-3 rounded-lg flex items-center justify-between">
              <span>Export as CSV</span>
              <span className="bg-gray-200 rounded-full px-3 py-1 text-sm">Download</span>
            </button>
            <button className="w-full bg-gray-100 hover:bg-gray-200 text-gray-800 px-4 py-3 rounded-lg flex items-center justify-between">
              <span>Export as Excel</span>
              <span className="bg-gray-200 rounded-full px-3 py-1 text-sm">Download</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}