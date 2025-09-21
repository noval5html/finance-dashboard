import { redirect } from "next/navigation";

import { auth } from "@/lib/auth/auth";

export default async function DashboardPage() {
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
      <h1 className="mb-6 text-3xl font-bold">Financial Dashboard</h1>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {/* Balance Summary Card */}
        <div className="rounded-lg bg-white p-6 shadow">
          <h2 className="mb-4 text-xl font-semibold">Current Balance</h2>
          <p className="text-3xl font-bold text-green-600">Rp 12,500,000</p>
          <p className="mt-2 text-gray-500">Updated just now</p>
        </div>

        {/* Income vs Expenses Chart */}
        <div className="rounded-lg bg-white p-6 shadow">
          <h2 className="mb-4 text-xl font-semibold">Income vs Expenses</h2>
          <div className="flex h-48 items-end justify-between">
            <div className="flex flex-col items-center">
              <div
                className="w-12 bg-green-500"
                style={{ height: "70%" }}
              ></div>
              <span className="mt-2 text-sm">Income</span>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-12 bg-red-500" style={{ height: "45%" }}></div>
              <span className="mt-2 text-sm">Expenses</span>
            </div>
          </div>
        </div>

        {/* Recent Transactions */}
        <div className="rounded-lg bg-white p-6 shadow md:col-span-2 lg:col-span-1">
          <h2 className="mb-4 text-xl font-semibold">Recent Transactions</h2>
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
      <div className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
        <a
          href="/transactions"
          className="rounded-lg bg-blue-500 p-4 text-center text-white transition hover:bg-blue-600"
        >
          Transactions
        </a>
        <a
          href="/assets"
          className="rounded-lg bg-purple-500 p-4 text-center text-white transition hover:bg-purple-600"
        >
          Assets
        </a>
        <a
          href="/investments"
          className="rounded-lg bg-yellow-500 p-4 text-center text-white transition hover:bg-yellow-600"
        >
          Investments
        </a>
        <a
          href="/reports"
          className="rounded-lg bg-green-500 p-4 text-center text-white transition hover:bg-green-600"
        >
          Reports
        </a>
      </div>
    </div>
  );
}
