import { auth } from "@/lib/auth/auth";
import { redirect } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth.api.getSession({
    headers: {
      cookie: ""
    }
  });

  if (!session) {
    redirect("/sign-in");
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation Header */}
      <header className="bg-white shadow">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <Link href="/dashboard" className="text-xl font-bold text-blue-600">
                FinanceDash
              </Link>
              <nav className="ml-10 flex space-x-8">
                <Link href="/dashboard" className="text-gray-900 inline-flex items-center px-1 pt-1 text-sm font-medium">
                  Dashboard
                </Link>
                <Link href="/transactions" className="text-gray-500 hover:text-gray-900 inline-flex items-center px-1 pt-1 text-sm font-medium">
                  Transactions
                </Link>
                <Link href="/assets" className="text-gray-500 hover:text-gray-900 inline-flex items-center px-1 pt-1 text-sm font-medium">
                  Assets
                </Link>
                <Link href="/investments" className="text-gray-500 hover:text-gray-900 inline-flex items-center px-1 pt-1 text-sm font-medium">
                  Investments
                </Link>
                <Link href="/reports" className="text-gray-500 hover:text-gray-900 inline-flex items-center px-1 pt-1 text-sm font-medium">
                  Reports
                </Link>
              </nav>
            </div>
            <div className="flex items-center">
              <span className="text-sm font-medium text-gray-700 mr-4">
                Hi, {session.user.name}
              </span>
              <Button variant="outline" size="sm" asChild>
                <Link href="/api/auth/sign-out">Sign Out</Link>
              </Button>
            </div>
          </div>
        </div>
      </header>

      <main>
        {children}
      </main>
    </div>
  );
}