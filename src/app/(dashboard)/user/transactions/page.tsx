import { redirect } from "next/navigation";

import { auth } from "@/lib/auth/auth";

export default async function TransactionsPage() {
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
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-3xl font-bold">Transactions</h1>
        <button className="rounded-lg bg-blue-500 px-4 py-2 text-white hover:bg-blue-600">
          Add Transaction
        </button>
      </div>

      {/* Filters */}
      <div className="mb-6 rounded-lg bg-white p-4 shadow">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">
              Type
            </label>
            <select className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500">
              <option>All</option>
              <option>Income</option>
              <option>Expense</option>
            </select>
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">
              Category
            </label>
            <select className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500">
              <option>All</option>
              <option>Food</option>
              <option>Transport</option>
              <option>Entertainment</option>
              <option>Salary</option>
            </select>
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">
              From Date
            </label>
            <input
              type="date"
              className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">
              To Date
            </label>
            <input
              type="date"
              className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </div>
        </div>
      </div>

      {/* Transactions Table */}
      <div className="overflow-hidden rounded-lg bg-white shadow">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase">
                Date
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase">
                Description
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase">
                Category
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase">
                Amount
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 bg-white">
            <tr>
              <td className="px-6 py-4 whitespace-nowrap">2023-06-15</td>
              <td className="px-6 py-4">Salary Deposit</td>
              <td className="px-6 py-4">Income</td>
              <td className="px-6 py-4 text-green-600">+Rp 5,000,000</td>
              <td className="px-6 py-4 whitespace-nowrap">
                <button className="mr-3 text-blue-600 hover:text-blue-900">
                  Edit
                </button>
                <button className="text-red-600 hover:text-red-900">
                  Delete
                </button>
              </td>
            </tr>
            <tr>
              <td className="px-6 py-4 whitespace-nowrap">2023-06-10</td>
              <td className="px-6 py-4">Monthly Rent</td>
              <td className="px-6 py-4">Housing</td>
              <td className="px-6 py-4 text-red-600">-Rp 2,000,000</td>
              <td className="px-6 py-4 whitespace-nowrap">
                <button className="mr-3 text-blue-600 hover:text-blue-900">
                  Edit
                </button>
                <button className="text-red-600 hover:text-red-900">
                  Delete
                </button>
              </td>
            </tr>
            <tr>
              <td className="px-6 py-4 whitespace-nowrap">2023-06-05</td>
              <td className="px-6 py-4">Grocery Shopping</td>
              <td className="px-6 py-4">Food</td>
              <td className="px-6 py-4 text-red-600">-Rp 500,000</td>
              <td className="px-6 py-4 whitespace-nowrap">
                <button className="mr-3 text-blue-600 hover:text-blue-900">
                  Edit
                </button>
                <button className="text-red-600 hover:text-red-900">
                  Delete
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="mt-6 flex items-center justify-between">
        <div className="text-sm text-gray-700">Showing 1 to 3 of 3 results</div>
        <div className="flex space-x-2">
          <button className="rounded-md bg-gray-200 px-3 py-1 hover:bg-gray-300">
            Previous
          </button>
          <button className="rounded-md bg-blue-500 px-3 py-1 text-white hover:bg-blue-600">
            Next
          </button>
        </div>
      </div>
    </div>
  );
}
