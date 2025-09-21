import { redirect } from "next/navigation";

import { auth } from "@/lib/auth/auth";

export default async function InvestmentsPage() {
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
        <h1 className="text-3xl font-bold">Investments</h1>
        <button className="rounded-lg bg-yellow-500 px-4 py-2 text-white hover:bg-yellow-600">
          Add Investment
        </button>
      </div>

      {/* Investment Summary */}
      <div className="mb-6 grid grid-cols-1 gap-6 md:grid-cols-3">
        <div className="rounded-lg bg-white p-6 shadow">
          <h2 className="mb-2 text-lg font-semibold">Total Investments</h2>
          <p className="text-2xl font-bold text-yellow-600">Rp 15,000,000</p>
        </div>
        <div className="rounded-lg bg-white p-6 shadow">
          <h2 className="mb-2 text-lg font-semibold">Total Return</h2>
          <p className="text-2xl font-bold text-green-600">+Rp 2,500,000</p>
        </div>
        <div className="rounded-lg bg-white p-6 shadow">
          <h2 className="mb-2 text-lg font-semibold">Return Rate</h2>
          <p className="text-2xl font-bold text-blue-600">20%</p>
        </div>
      </div>

      {/* Investments List */}
      <div className="overflow-hidden rounded-lg bg-white shadow">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase">
                Investment
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase">
                Type
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase">
                Purchase Date
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase">
                Amount
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase">
                Current Value
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 bg-white">
            <tr>
              <td className="px-6 py-4">Tech Stocks</td>
              <td className="px-6 py-4">Stock</td>
              <td className="px-6 py-4">2022-03-15</td>
              <td className="px-6 py-4">Rp 5,000,000</td>
              <td className="px-6 py-4">Rp 7,000,000</td>
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
              <td className="px-6 py-4">Mutual Fund</td>
              <td className="px-6 py-4">Mutual Fund</td>
              <td className="px-6 py-4">2021-07-20</td>
              <td className="px-6 py-4">Rp 3,000,000</td>
              <td className="px-6 py-4">Rp 3,500,000</td>
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
              <td className="px-6 py-4">Crypto Portfolio</td>
              <td className="px-6 py-4">Crypto</td>
              <td className="px-6 py-4">2023-01-10</td>
              <td className="px-6 py-4">Rp 2,000,000</td>
              <td className="px-6 py-4">Rp 1,500,000</td>
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
    </div>
  );
}
