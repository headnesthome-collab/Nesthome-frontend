import { useEffect, useState } from "react";
import { SEO } from "@/components/seo";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getLeads } from "@/lib/firebase";
import { format, subDays, startOfDay, endOfDay, eachDayOfInterval } from "date-fns";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from "recharts";

interface Lead {
  id: string;
  firebaseId?: string;
  name: string;
  mobile: string;
  city: string;
  plotSize?: string;
  budget?: string;
  projectType?: string;
  startMonth?: string;
  timeline?: string;
  notes?: string;
  submittedAt: string;
  status: string;
}

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8', '#82ca9d'];

export default function AdminAnalytics() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadStorageLeads = () => {
      try {
        const storedLeads = localStorage.getItem("nesthome_leads");
        if (storedLeads) {
          const parsedLeads = JSON.parse(storedLeads);
          setLeads(parsedLeads);
        }
      } catch (e) {
        console.error("Error loading leads from storage:", e);
      }
      setLoading(false);
    };

    loadStorageLeads();

    try {
      const unsubscribe = getLeads((firebaseLeads) => {
        if (firebaseLeads && firebaseLeads.length > 0) {
          setLeads(firebaseLeads);
        }
      });
      return () => {
        if (unsubscribe) unsubscribe();
      };
    } catch (error) {
      console.warn("Firebase not available:", error);
    }
  }, []);

  // Leads over time (last 30 days)
  const leadsOverTime = (() => {
    const days = eachDayOfInterval({
      start: subDays(new Date(), 29),
      end: new Date(),
    });

    return days.map((day) => {
      const dayStart = startOfDay(day);
      const dayEnd = endOfDay(day);
      const count = leads.filter((lead) => {
        const leadDate = new Date(lead.submittedAt);
        return leadDate >= dayStart && leadDate <= dayEnd;
      }).length;

      return {
        date: format(day, "MMM d"),
        leads: count,
      };
    });
  })();

  // Leads by city
  const leadsByCity = (() => {
    const cityCounts = leads.reduce((acc, lead) => {
      const city = lead.city || "Unknown";
      acc[city] = (acc[city] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    return Object.entries(cityCounts)
      .map(([name, value]) => ({ name, value }))
      .sort((a, b) => b.value - a.value)
      .slice(0, 10);
  })();

  // Leads by status
  const leadsByStatus = (() => {
    const statusCounts = leads.reduce((acc, lead) => {
      const status = lead.status || "New";
      acc[status] = (acc[status] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    return Object.entries(statusCounts).map(([name, value]) => ({ name, value }));
  })();

  // Monthly trend
  const monthlyTrend = (() => {
    const months: Record<string, number> = {};
    leads.forEach((lead) => {
      const month = format(new Date(lead.submittedAt), "MMM yyyy");
      months[month] = (months[month] || 0) + 1;
    });

    return Object.entries(months)
      .map(([name, value]) => ({ name, value }))
      .sort((a, b) => new Date(a.name).getTime() - new Date(b.name).getTime())
      .slice(-6);
  })();

  // Conversion funnel
  const conversionFunnel = (() => {
    const statusOrder = ["New", "Contacted", "Qualified", "Proposal", "Negotiation", "Won"];
    return statusOrder.map((status) => ({
      name: status,
      value: leads.filter((l) => (l.status || "New") === status).length,
    }));
  })();

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-muted-foreground">Loading analytics...</div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <SEO title="Analytics" description="Leads analytics and insights" />
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Analytics</h1>
        <p className="text-muted-foreground">
          Insights and trends from your leads data
        </p>
      </div>

      {/* Leads Over Time */}
      <Card>
        <CardHeader>
          <CardTitle>Leads Over Time (Last 30 Days)</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={leadsOverTime}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="leads" stroke="#8884d8" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <div className="grid gap-4 md:grid-cols-2">
        {/* Leads by City */}
        <Card>
          <CardHeader>
            <CardTitle>Leads by City</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={leadsByCity}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="value" fill="#8884d8" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Leads by Status */}
        <Card>
          <CardHeader>
            <CardTitle>Leads by Status</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={leadsByStatus}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {leadsByStatus.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Monthly Trend */}
      <Card>
        <CardHeader>
          <CardTitle>Monthly Trend (Last 6 Months)</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={monthlyTrend}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="value" fill="#00C49F" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Conversion Funnel */}
      <Card>
        <CardHeader>
          <CardTitle>Conversion Funnel</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={conversionFunnel} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis type="number" />
              <YAxis dataKey="name" type="category" width={100} />
              <Tooltip />
              <Bar dataKey="value" fill="#FF8042" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
}
