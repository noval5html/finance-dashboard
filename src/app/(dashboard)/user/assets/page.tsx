import { redirect } from "next/navigation";

import { auth } from "@/lib/auth/auth";

export default async function AssetsPage() {
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
        <h1 className="text-3xl font-bold">Assets</h1>
        <button className="rounded-lg bg-purple-500 px-4 py-2 text-white hover:bg-purple-600">
          Add Asset
        </button>
      </div>

      {/* Asset Summary */}
      <div className="mb-6 grid grid-cols-1 gap-6 md:grid-cols-3">
        <div className="rounded-lg bg-white p-6 shadow">
          <h2 className="mb-2 text-lg font-semibold">Total Assets</h2>
          <p className="text-2xl font-bold text-purple-600">Rp 50,000,000</p>
        </div>
        <div className="rounded-lg bg-white p-6 shadow">
          <h2 className="mb-2 text-lg font-semibold">Liquid Assets</h2>
          <p className="text-2xl font-bold text-blue-600">Rp 12,500,000</p>
        </div>
        <div className="rounded-lg bg-white p-6 shadow">
          <h2 className="mb-2 text-lg font-semibold">Fixed Assets</h2>
          <p className="text-2xl font-bold text-green-600">Rp 37,500,000</p>
        </div>
      </div>

      {/* Assets List */}
      <div className="overflow-hidden rounded-lg bg-white shadow">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase">
                Asset
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase">
                Type
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase">
                Acquisition Date
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
              <td className="px-6 py-4">Main House</td>
              <td className="px-6 py-4">Property</td>
              <td className="px-6 py-4">2020-05-15</td>
              <td className="px-6 py-4">Rp 30,000,000</td>
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
              <td className="px-6 py-4">Car</td>
              <td className="px-6 py-4">Vehicle</td>
              <td className="px-6 py-4">2021-08-20</td>
              <td className="px-6 py-4">Rp 7,500,000</td>
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
              <td className="px-6 py-4">Stock Portfolio</td>
              <td className="px-6 py-4">Investment</td>
              <td className="px-6 py-4">2022-01-10</td>
              <td className="px-6 py-4">Rp 5,000,000</td>
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
