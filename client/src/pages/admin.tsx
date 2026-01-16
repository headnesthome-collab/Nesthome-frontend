import { useLocation } from "wouter";
import { AdminProvider, useAdmin } from "@/contexts/admin-context";
import { AdminLayout } from "@/components/admin/admin-layout";
import { AdminLogin } from "@/components/admin/admin-login";
import AdminDashboard from "@/pages/admin/dashboard";
import AdminLeads from "@/pages/admin/leads";
import AdminAnalytics from "@/pages/admin/analytics";
import AdminSettings from "@/pages/admin/settings";

function AdminRoutes() {
  const { isAuthenticated } = useAdmin();
  const [location] = useLocation();

  if (!isAuthenticated) {
    return <AdminLogin />;
    }

  const renderContent = () => {
    if (location === "/admin/leads") {
      return <AdminLeads />;
    }
    if (location === "/admin/analytics") {
      return <AdminAnalytics />;
    }
    if (location === "/admin/settings") {
      return <AdminSettings />;
    }
    return <AdminDashboard />;
  };

  return <AdminLayout>{renderContent()}</AdminLayout>;
}

export default function Admin() {
  return (
    <AdminProvider>
      <AdminRoutes />
    </AdminProvider>
  );
}
