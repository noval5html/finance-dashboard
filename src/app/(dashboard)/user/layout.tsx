import Link from "next/link";
import { redirect } from "next/navigation";

import { Button } from "@/components/ui/button";

import { auth } from "@/lib/auth/auth";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth.api.getSession({
    headers: {
      cookie: "",
    },
  });

  if (!session) {
    redirect("/sign-in");
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation Header */}
      <header className="bg-white shadow">
        <div className="container mx-auto px-4">
          <div className="flex h-16 items-center justify-between">
            <div className="flex items-center">
              <Link
                href="/dashboard"
                className="text-xl font-bold text-blue-600"
              >
                FinanceDash
              </Link>
              <nav className="ml-10 flex space-x-8">
                <Link
                  href="/dashboard"
                  className="inline-flex items-center px-1 pt-1 text-sm font-medium text-gray-900"
                >
                  Dashboard
                </Link>
                <Link
                  href="/transactions"
                  className="inline-flex items-center px-1 pt-1 text-sm font-medium text-gray-500 hover:text-gray-900"
                >
                  Transactions
                </Link>
                <Link
                  href="/assets"
                  className="inline-flex items-center px-1 pt-1 text-sm font-medium text-gray-500 hover:text-gray-900"
                >
                  Assets
                </Link>
                <Link
                  href="/investments"
                  className="inline-flex items-center px-1 pt-1 text-sm font-medium text-gray-500 hover:text-gray-900"
                >
                  Investments
                </Link>
                <Link
                  href="/reports"
                  className="inline-flex items-center px-1 pt-1 text-sm font-medium text-gray-500 hover:text-gray-900"
                >
                  Reports
                </Link>
              </nav>
            </div>
            <div className="flex items-center">
              <span className="mr-4 text-sm font-medium text-gray-700">
                Hi, {session.user.name}
              </span>
              <Button variant="outline" size="sm" asChild>
                <Link href="/api/auth/sign-out">Sign Out</Link>
              </Button>
            </div>
          </div>
        </div>
      </header>

      <main>{children}</main>
    </div>
  );
}
