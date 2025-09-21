import { auth } from "@/lib/auth/auth";
import { redirect } from "next/navigation";

export default async function InvestmentsPage() {
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
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Investments</h1>
        <button className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded-lg">
          Add Investment
        </button>
      </div>

      {/* Investment Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-semibold mb-2">Total Investments</h2>
          <p className="text-2xl font-bold text-yellow-600">Rp 15,000,000</p>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-semibold mb-2">Total Return</h2>
          <p className="text-2xl font-bold text-green-600">+Rp 2,500,000</p>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-semibold mb-2">Return Rate</h2>
          <p className="text-2xl font-bold text-blue-600">20%</p>
        </div>
      </div>

      {/* Investments List */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Investment</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Purchase Date</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Current Value</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            <tr>
              <td className="px-6 py-4">Tech Stocks</td>
              <td className="px-6 py-4">Stock</td>
              <td className="px-6 py-4">2022-03-15</td>
              <td className="px-6 py-4">Rp 5,000,000</td>
              <td className="px-6 py-4">Rp 7,000,000</td>
              <td className="px-6 py-4 whitespace-nowrap">
                <button className="text-blue-600 hover:text-blue-900 mr-3">Edit</button>
                <button className="text-red-600 hover:text-red-900">Delete</button>
              </td>
            </tr>
            <tr>
              <td className="px-6 py-4">Mutual Fund</td>
              <td className="px-6 py-4">Mutual Fund</td>
              <td className="px-6 py-4">2021-07-20</td>
              <td className="px-6 py-4">Rp 3,000,000</td>
              <td className="px-6 py-4">Rp 3,500,000</td>
              <td className="px-6 py-4 whitespace-nowrap">
                <button className="text-blue-600 hover:text-blue-900 mr-3">Edit</button>
                <button className="text-red-600 hover:text-red-900">Delete</button>
              </td>
            </tr>
            <tr>
              <td className="px-6 py-4">Crypto Portfolio</td>
              <td className="px-6 py-4">Crypto</td>
              <td className="px-6 py-4">2023-01-10</td>
              <td className="px-6 py-4">Rp 2,000,000</td>
              <td className="px-6 py-4">Rp 1,500,000</td>
              <td className="px-6 py-4 whitespace-nowrap">
                <button className="text-blue-600 hover:text-blue-900 mr-3">Edit</button>
                <button className="text-red-600 hover:text-red-900">Delete</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}