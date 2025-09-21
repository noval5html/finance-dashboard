import { auth } from "@/lib/auth/auth";
import { redirect } from "next/navigation";

export default async function DashboardPage() {
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
      <h1 className="text-3xl font-bold mb-6">Financial Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Balance Summary Card */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold mb-4">Current Balance</h2>
          <p className="text-3xl font-bold text-green-600">Rp 12,500,000</p>
          <p className="text-gray-500 mt-2">Updated just now</p>
        </div>

        {/* Income vs Expenses Chart */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold mb-4">Income vs Expenses</h2>
          <div className="h-48 flex items-end justify-between">
            <div className="flex flex-col items-center">
              <div className="w-12 bg-green-500" style={{ height: "70%" }}></div>
              <span className="mt-2 text-sm">Income</span>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-12 bg-red-500" style={{ height: "45%" }}></div>
              <span className="mt-2 text-sm">Expenses</span>
            </div>
          </div>
        </div>

        {/* Recent Transactions */}
        <div className="bg-white rounded-lg shadow p-6 md:col-span-2 lg:col-span-1">
          <h2 className="text-xl font-semibold mb-4">Recent Transactions</h2>
          <ul className="space-y-3">
            <li className="flex justify-between">
              <span>Salary</span>
              <span className="text-green-600">+Rp 5,000,000</span>
            </li>
            <li className="flex justify-between">
              <span>Rent</span>
              <span className="text-red-600">-Rp 2,000,000</span>
            </li>
            <li className="flex justify-between">
              <span>Groceries</span>
              <span className="text-red-600">-Rp 500,000</span>
            </li>
            <li className="flex justify-between">
              <span>Investment</span>
              <span className="text-green-600">+Rp 1,000,000</span>
            </li>
          </ul>
        </div>
      </div>

      {/* Navigation to other sections */}
      <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <a href="/transactions" className="bg-blue-500 hover:bg-blue-600 text-white rounded-lg p-4 text-center transition">
          Transactions
        </a>
        <a href="/assets" className="bg-purple-500 hover:bg-purple-600 text-white rounded-lg p-4 text-center transition">
          Assets
        </a>
        <a href="/investments" className="bg-yellow-500 hover:bg-yellow-600 text-white rounded-lg p-4 text-center transition">
          Investments
        </a>
        <a href="/reports" className="bg-green-500 hover:bg-green-600 text-white rounded-lg p-4 text-center transition">
          Reports
        </a>
      </div>
    </div>
  );
}