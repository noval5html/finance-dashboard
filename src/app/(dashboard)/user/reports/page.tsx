import { redirect } from "next/navigation";

import { auth } from "@/lib/auth/auth";

export default async function ReportsPage() {
  const session = await auth.api.getSession({
    headers: {
      cookie: "",
    },
  });

  if (!session) {
    redirect("/sign-in");
  }

  return (
    <div className="container mx-auto py-8">
      <h1 className="mb-6 text-3xl font-bold">Financial Reports</h1>

      {/* Report Filters */}
      <div className="mb-6 rounded-lg bg-white p-4 shadow">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">
              Report Type
            </label>
            <select className="w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500">
              <option>Monthly Summary</option>
              <option>Yearly Summary</option>
              <option>Category Analysis</option>
              <option>Investment Performance</option>
            </select>
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">
              Period
            </label>
            <select className="w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500">
              <option>June 2023</option>
              <option>May 2023</option>
              <option>April 2023</option>
              <option>Last 3 Months</option>
              <option>Last 6 Months</option>
            </select>
          </div>
          <div className="flex items-end">
            <button className="w-full rounded-lg bg-green-500 px-4 py-2 text-white hover:bg-green-600">
              Generate Report
            </button>
          </div>
        </div>
      </div>

      {/* Report Visualization */}
      <div className="mb-6 rounded-lg bg-white p-6 shadow">
        <h2 className="mb-4 text-xl font-semibold">
          Income vs Expenses - June 2023
        </h2>
        <div className="flex h-64 items-end justify-between px-8">
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
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <div className="rounded-lg bg-white p-6 shadow">
          <h2 className="mb-4 text-xl font-semibold">Expense by Category</h2>
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

        <div className="rounded-lg bg-white p-6 shadow">
          <h2 className="mb-4 text-xl font-semibold">Export Options</h2>
          <div className="space-y-4">
            <button className="flex w-full items-center justify-between rounded-lg bg-gray-100 px-4 py-3 text-gray-800 hover:bg-gray-200">
              <span>Export as PDF</span>
              <span className="rounded-full bg-gray-200 px-3 py-1 text-sm">
                Download
              </span>
            </button>
            <button className="flex w-full items-center justify-between rounded-lg bg-gray-100 px-4 py-3 text-gray-800 hover:bg-gray-200">
              <span>Export as CSV</span>
              <span className="rounded-full bg-gray-200 px-3 py-1 text-sm">
                Download
              </span>
            </button>
            <button className="flex w-full items-center justify-between rounded-lg bg-gray-100 px-4 py-3 text-gray-800 hover:bg-gray-200">
              <span>Export as Excel</span>
              <span className="rounded-full bg-gray-200 px-3 py-1 text-sm">
                Download
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
