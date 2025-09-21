import { auth } from "@/lib/auth/auth";
import { redirect } from "next/navigation";

export default async function AssetsPage() {
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
        <h1 className="text-3xl font-bold">Assets</h1>
        <button className="bg-purple-500 hover:bg-purple-600 text-white px-4 py-2 rounded-lg">
          Add Asset
        </button>
      </div>

      {/* Asset Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-semibold mb-2">Total Assets</h2>
          <p className="text-2xl font-bold text-purple-600">Rp 50,000,000</p>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-semibold mb-2">Liquid Assets</h2>
          <p className="text-2xl font-bold text-blue-600">Rp 12,500,000</p>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-semibold mb-2">Fixed Assets</h2>
          <p className="text-2xl font-bold text-green-600">Rp 37,500,000</p>
        </div>
      </div>

      {/* Assets List */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Asset</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Acquisition Date</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Current Value</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            <tr>
              <td className="px-6 py-4">Main House</td>
              <td className="px-6 py-4">Property</td>
              <td className="px-6 py-4">2020-05-15</td>
              <td className="px-6 py-4">Rp 30,000,000</td>
              <td className="px-6 py-4 whitespace-nowrap">
                <button className="text-blue-600 hover:text-blue-900 mr-3">Edit</button>
                <button className="text-red-600 hover:text-red-900">Delete</button>
              </td>
            </tr>
            <tr>
              <td className="px-6 py-4">Car</td>
              <td className="px-6 py-4">Vehicle</td>
              <td className="px-6 py-4">2021-08-20</td>
              <td className="px-6 py-4">Rp 7,500,000</td>
              <td className="px-6 py-4 whitespace-nowrap">
                <button className="text-blue-600 hover:text-blue-900 mr-3">Edit</button>
                <button className="text-red-600 hover:text-red-900">Delete</button>
              </td>
            </tr>
            <tr>
              <td className="px-6 py-4">Stock Portfolio</td>
              <td className="px-6 py-4">Investment</td>
              <td className="px-6 py-4">2022-01-10</td>
              <td className="px-6 py-4">Rp 5,000,000</td>
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