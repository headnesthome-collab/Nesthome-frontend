import { useEffect, useState } from "react";
import { SEO } from "@/components/seo";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getLeads } from "@/lib/firebase";
import { apiUrl } from "@/lib/api-config";
import { useAdmin } from "@/contexts/admin-context";
import { Users, TrendingUp, Clock, MapPin, Calendar } from "lucide-react";
import { format, subDays } from "date-fns";

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

export default function AdminDashboard() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);
  const { sessionId, isAuthenticated } = useAdmin();

  // Fetch leads from backend API (Firebase + Google Sheets)
  const fetchLeadsFromBackend = async () => {
    if (!isAuthenticated || !sessionId) {
      console.warn("Not authenticated, skipping backend fetch");
      return;
    }

    try {
      const response = await fetch(apiUrl("api/leads"), {
        headers: {
          "x-session-id": sessionId,
        },
      });

      if (response.ok) {
        const result = await response.json();
        if (result.success && result.leads) {
          // Map backend leads to frontend format
          const mappedLeads = result.leads.map((lead: any) => ({
            id: lead.id,
            firebaseId: lead.id,
            name: lead.name,
            mobile: lead.mobile,
            city: lead.city,
            timeline: lead.timeline,
            startMonth: lead.timeline,
            submittedAt: lead.submittedAt,
            status: lead.status || "New",
          }));
          setLeads(mappedLeads);
          console.log(`✅ Loaded ${mappedLeads.length} leads from backend`);
        }
      } else {
        console.warn("Failed to fetch leads from backend:", response.status);
      }
    } catch (error) {
      console.error("Error fetching leads from backend:", error);
    }
  };

  useEffect(() => {
    const loadLeads = async () => {
      setLoading(true);
      let backendLeadsLoaded = false;
      
      // First, try to fetch from backend API (Firebase + Google Sheets)
      if (isAuthenticated && sessionId) {
        await fetchLeadsFromBackend();
        backendLeadsLoaded = true;
      }

      // Fallback: Load from localStorage if backend didn't load anything
      if (!backendLeadsLoaded) {
        try {
          const storedLeads = localStorage.getItem("nesthome_leads");
          if (storedLeads) {
            const parsedLeads = JSON.parse(storedLeads);
            setLeads(parsedLeads);
          }
        } catch (e) {
          console.error("Error loading leads from storage:", e);
        }
      }

      // Also subscribe to Firebase for real-time updates
      try {
        const unsubscribe = getLeads((firebaseLeads) => {
          if (firebaseLeads && firebaseLeads.length > 0) {
            // Merge with existing leads
            setLeads((prevLeads) => {
              const leadsMap = new Map(prevLeads.map((l) => [l.id, l]));
              firebaseLeads.forEach((lead) => {
                leadsMap.set(lead.id, lead);
              });
              return Array.from(leadsMap.values());
            });
          }
        });
        setLoading(false);
        return () => {
          if (unsubscribe) unsubscribe();
        };
      } catch (error) {
        console.warn("Firebase not available:", error);
        setLoading(false);
      }
    };

    loadLeads();

    // Refresh from backend every 30 seconds if authenticated
    let refreshInterval: NodeJS.Timeout | null = null;
    if (isAuthenticated && sessionId) {
      refreshInterval = setInterval(fetchLeadsFromBackend, 30000);
    }

    return () => {
      if (refreshInterval) clearInterval(refreshInterval);
    };
  }, [isAuthenticated, sessionId]);

  // Calculate statistics
  const totalLeads = leads.length;
  const today = new Date();
  const todayLeads = leads.filter((lead) => {
    const leadDate = new Date(lead.submittedAt);
    return leadDate.toDateString() === today.toDateString();
  }).length;

  const thisWeekLeads = leads.filter((lead) => {
    const leadDate = new Date(lead.submittedAt);
    return leadDate >= subDays(today, 7);
  }).length;

  const thisMonthLeads = leads.filter((lead) => {
    const leadDate = new Date(lead.submittedAt);
    return leadDate >= subDays(today, 30);
  }).length;

  // Status breakdown
  const statusCounts = leads.reduce((acc, lead) => {
    const status = lead.status || "New";
    acc[status] = (acc[status] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  // City breakdown
  const cityCounts = leads.reduce((acc, lead) => {
    const city = lead.city || "Unknown";
    acc[city] = (acc[city] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const topCities = Object.entries(cityCounts)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 5);

  // Recent leads
  const recentLeads = [...leads]
    .sort((a, b) => new Date(b.submittedAt).getTime() - new Date(a.submittedAt).getTime())
    .slice(0, 5);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-muted-foreground">Loading dashboard...</div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <SEO title="Admin Dashboard" description="Nesthome Admin Dashboard" />
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground">
          Overview of your leads and business metrics
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Leads</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalLeads}</div>
            <p className="text-xs text-muted-foreground">
              All time inquiries
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Today</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{todayLeads}</div>
            <p className="text-xs text-muted-foreground">
              New leads today
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">This Week</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{thisWeekLeads}</div>
            <p className="text-xs text-muted-foreground">
              +{thisWeekLeads - thisMonthLeads + thisWeekLeads} from last week
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">This Month</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{thisMonthLeads}</div>
            <p className="text-xs text-muted-foreground">
              Leads in last 30 days
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Status and City Breakdown */}
      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Lead Status</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {Object.entries(statusCounts).map(([status, count]) => (
                <div key={status} className="flex items-center justify-between">
                  <span className="text-sm font-medium">{status}</span>
                  <span className="text-sm text-muted-foreground">{count}</span>
                </div>
              ))}
              {Object.keys(statusCounts).length === 0 && (
                <p className="text-sm text-muted-foreground">No status data</p>
              )}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Top Cities</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {topCities.map(([city, count]) => (
                <div key={city} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm font-medium">{city}</span>
                  </div>
                  <span className="text-sm text-muted-foreground">{count}</span>
                </div>
              ))}
              {topCities.length === 0 && (
                <p className="text-sm text-muted-foreground">No city data</p>
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Leads */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Leads</CardTitle>
        </CardHeader>
        <CardContent>
          {recentLeads.length === 0 ? (
            <p className="text-center text-muted-foreground py-8">No leads yet</p>
          ) : (
            <div className="space-y-4">
              {recentLeads.map((lead) => (
                <div
                  key={lead.id}
                  className="flex items-center justify-between border-b pb-4 last:border-0 last:pb-0"
                >
                  <div className="space-y-1">
                    <p className="text-sm font-medium">{lead.name}</p>
                    <div className="flex items-center gap-4 text-xs text-muted-foreground">
                      <span>{lead.mobile}</span>
                      <span>{lead.city}</span>
                      <span>{format(new Date(lead.submittedAt), "MMM d, yyyy")}</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="text-xs font-medium bg-secondary px-2 py-1 rounded">
                      {lead.status || "New"}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
