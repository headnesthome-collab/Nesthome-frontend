import { useEffect, useState, useMemo } from "react";
import { SEO } from "@/components/seo";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Trash2, RefreshCw, Search, Download, Edit, Eye, ExternalLink } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { getLeads, deleteLead, updateLeadStatus } from "@/lib/firebase";
import { apiUrl } from "@/lib/api-config";
import { format } from "date-fns";

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

export default function AdminLeads() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [cityFilter, setCityFilter] = useState<string>("all");
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);
  const [isSyncing, setIsSyncing] = useState(false);
  const { toast } = useToast();

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

    // Poll localStorage every 2 seconds for new leads
    const pollInterval = setInterval(loadStorageLeads, 2000);

    // Also subscribe to Firebase
    try {
      const unsubscribe = getLeads((firebaseLeads) => {
        if (firebaseLeads && firebaseLeads.length > 0) {
          setLeads(firebaseLeads);
        }
      });
      return () => {
        clearInterval(pollInterval);
        if (unsubscribe) unsubscribe();
      };
    } catch (error) {
      console.warn("Firebase not available:", error);
      return () => clearInterval(pollInterval);
    }
  }, []);

  // Filter and search leads
  const filteredLeads = useMemo(() => {
    return leads.filter((lead) => {
      const matchesSearch =
        lead.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        lead.mobile.includes(searchQuery) ||
        lead.city.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesStatus = statusFilter === "all" || lead.status === statusFilter;
      const matchesCity = cityFilter === "all" || lead.city === cityFilter;

      return matchesSearch && matchesStatus && matchesCity;
    });
  }, [leads, searchQuery, statusFilter, cityFilter]);

  // Get unique cities and statuses
  const uniqueCities = useMemo(() => {
    const cities = new Set(leads.map((lead) => lead.city).filter(Boolean));
    return Array.from(cities).sort();
  }, [leads]);

  const uniqueStatuses = useMemo(() => {
    const statuses = new Set(leads.map((lead) => lead.status || "New").filter(Boolean));
    return Array.from(statuses).sort();
  }, [leads]);

  const handleDelete = async (lead: Lead) => {
    if (!confirm(`Are you sure you want to delete lead from ${lead.name}?`)) {
      return;
    }

    const updatedLeads = leads.filter((l) => l.id !== lead.id);
    setLeads(updatedLeads);

    try {
      localStorage.setItem("nesthome_leads", JSON.stringify(updatedLeads));
    } catch (e) {
      console.error("Could not save to localStorage:", e);
    }

    // Delete from Firebase if available
    if (lead.firebaseId) {
      try {
        await deleteLead(lead.firebaseId);
      } catch (error) {
        console.warn("Could not delete from Firebase:", error);
      }
    }

    toast({ title: "Lead Deleted" });
  };

  const handleStatusUpdate = async (lead: Lead, newStatus: string) => {
    const updatedLeads = leads.map((l) =>
      l.id === lead.id ? { ...l, status: newStatus } : l
    );
    setLeads(updatedLeads);

    try {
      localStorage.setItem("nesthome_leads", JSON.stringify(updatedLeads));
    } catch (e) {
      console.error("Could not save to localStorage:", e);
    }

    // Update Firebase if available
    if (lead.firebaseId) {
      try {
        await updateLeadStatus(lead.firebaseId, newStatus);
      } catch (error) {
        console.warn("Could not update Firebase:", error);
      }
    }

    toast({ title: "Status Updated" });
  };

  const syncAllToGoogleSheets = async () => {
    if (leads.length === 0) {
      toast({ title: "No leads to sync" });
      return;
    }

    setIsSyncing(true);
    try {
      // Map leads to the format expected by the server (LeadData interface)
      const formattedLeads = leads.map((lead) => ({
        id: lead.id,
        name: lead.name,
        mobile: lead.mobile,
        city: lead.city,
        timeline: lead.timeline || lead.startMonth || "Not specified",
        submittedAt: lead.submittedAt,
        status: lead.status || "New",
      }));

      const syncUrl = apiUrl("api/sync-all-leads");
      console.log("Syncing leads to:", syncUrl, "Total leads:", formattedLeads.length);

      const response = await fetch(syncUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ leads: formattedLeads }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error("Sync error response:", response.status, response.statusText, errorText);
        
        if (response.status === 404) {
          throw new Error(
            "API endpoint not found. Make sure you're running 'npm run dev' (not 'npm run dev:client'). " +
            "The server should be running on port 5000."
          );
        }
        
        throw new Error(`Server returned ${response.status}: ${errorText || response.statusText}`);
      }

      const result = await response.json();

      if (result.success) {
        toast({
          title: "Sync Complete!",
          description: `${result.synced} of ${result.total} leads synced to Google Sheets`,
        });
      } else {
        toast({
          title: "Sync Failed",
          description: result.error || "Unknown error occurred",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error("Sync error:", error);
      const errorMessage = error instanceof Error ? error.message : "Could not connect to server";
      toast({
        title: "Sync Failed",
        description: errorMessage,
        variant: "destructive",
      });
    } finally {
      setIsSyncing(false);
    }
  };

  const downloadCSV = () => {
    if (filteredLeads.length === 0) {
      toast({ title: "No leads to download" });
      return;
    }

    const headers = [
      "Date",
      "Name",
      "Mobile",
      "City",
      "Plot Size",
      "Budget",
      "Project Type",
      "Timeline",
      "Notes",
      "Status",
    ];
    const rows = filteredLeads.map((lead) => [
      format(new Date(lead.submittedAt), "yyyy-MM-dd HH:mm:ss"),
      lead.name,
      lead.mobile,
      lead.city,
      lead.plotSize || "",
      lead.budget || "",
      lead.projectType || "",
      lead.timeline || lead.startMonth || "",
      lead.notes || "",
      lead.status,
    ]);

    const csvContent = [
      headers.join(","),
      ...rows.map((row) => row.map((cell) => `"${cell}"`).join(",")),
    ].join("\n");

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    const url = URL.createObjectURL(blob);
    link.setAttribute("href", url);
    link.setAttribute(
      "download",
      `nesthome-leads-${format(new Date(), "yyyy-MM-dd")}.csv`
    );
    link.style.visibility = "hidden";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    toast({
      title: "Downloaded!",
      description: `${filteredLeads.length} leads exported to CSV`,
    });
  };

  const openViewDialog = (lead: Lead) => {
    setSelectedLead(lead);
    setIsViewDialogOpen(true);
  };

  const openEditDialog = (lead: Lead) => {
    setSelectedLead(lead);
    setIsEditDialogOpen(true);
  };

  const handleSaveEdit = () => {
    if (!selectedLead) return;

    const updatedLeads = leads.map((l) =>
      l.id === selectedLead.id ? selectedLead : l
    );
    setLeads(updatedLeads);

    try {
      localStorage.setItem("nesthome_leads", JSON.stringify(updatedLeads));
      toast({ title: "Lead Updated" });
      setIsEditDialogOpen(false);
      setSelectedLead(null);
    } catch (e) {
      console.error("Could not save:", e);
      toast({ title: "Error saving", variant: "destructive" });
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-muted-foreground">Loading leads...</div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <SEO title="Lead Management" description="Manage and track all leads" />
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Lead Management</h1>
          <p className="text-muted-foreground">
            Manage and track all your leads ({filteredLeads.length} of {leads.length})
          </p>
        </div>
        <div className="flex gap-2">
          <Button
            size="sm"
            variant="secondary"
            className="bg-green-600 hover:bg-green-700 text-white"
            onClick={async () => {
              try {
                const res = await fetch(apiUrl("api/spreadsheet-url"));
                const data = await res.json();
                if (data.url) {
                  window.open(data.url, "_blank");
                  toast({ title: "Opening Google Sheets" });
                } else {
                  toast({ title: "Submit a lead first to create the spreadsheet" });
                }
              } catch (e) {
                toast({ title: "Could not open Google Sheets" });
              }
            }}
          >
            <ExternalLink className="w-4 h-4 mr-1" />
            View Sheets
          </Button>
          <Button
            size="sm"
            variant="secondary"
            className="bg-blue-600 hover:bg-blue-700 text-white"
            onClick={syncAllToGoogleSheets}
            disabled={isSyncing}
          >
            {isSyncing ? (
              <>
                <RefreshCw className="w-4 h-4 mr-1 animate-spin" />
                Syncing...
              </>
            ) : (
              <>
                <RefreshCw className="w-4 h-4 mr-1" />
                Sync to Sheets
              </>
            )}
          </Button>
          <Button size="sm" onClick={downloadCSV}>
            <Download className="w-4 h-4 mr-1" />
            Export CSV
          </Button>
        </div>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="pt-6">
          <div className="grid gap-4 md:grid-cols-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search by name, mobile, or city..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Statuses</SelectItem>
                {uniqueStatuses.map((status) => (
                  <SelectItem key={status} value={status}>
                    {status}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={cityFilter} onValueChange={setCityFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Filter by city" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Cities</SelectItem>
                {uniqueCities.map((city) => (
                  <SelectItem key={city} value={city}>
                    {city}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Leads Table */}
      <Card>
        <CardHeader>
          <CardTitle>Leads ({filteredLeads.length})</CardTitle>
        </CardHeader>
        <CardContent>
          {filteredLeads.length === 0 ? (
            <p className="text-center text-muted-foreground py-8">
              No leads found. {searchQuery || statusFilter !== "all" || cityFilter !== "all" ? "Try adjusting your filters." : ""}
            </p>
          ) : (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Date</TableHead>
                    <TableHead>Name</TableHead>
                    <TableHead>Contact</TableHead>
                    <TableHead>City</TableHead>
                    <TableHead>Details</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredLeads.map((lead) => (
                    <TableRow key={lead.id}>
                      <TableCell className="whitespace-nowrap">
                        <div>{format(new Date(lead.submittedAt), "MMM d, yyyy")}</div>
                        <div className="text-xs text-muted-foreground">
                          {format(new Date(lead.submittedAt), "h:mm a")}
                        </div>
                      </TableCell>
                      <TableCell className="font-medium">{lead.name}</TableCell>
                      <TableCell>
                        <div>{lead.mobile}</div>
                        <a
                          href={`https://wa.me/91${lead.mobile.replace(/\D/g, "")}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-xs text-blue-600 hover:underline"
                        >
                          WhatsApp
                        </a>
                      </TableCell>
                      <TableCell>{lead.city}</TableCell>
                      <TableCell>
                        <div className="text-sm space-y-1">
                          {lead.plotSize && <div>Plot: {lead.plotSize} sq.ft</div>}
                          {lead.budget && <div>Budget: {lead.budget}</div>}
                          {lead.projectType && <div>Type: {lead.projectType}</div>}
                          {lead.timeline && <div>Timeline: {lead.timeline}</div>}
                        </div>
                      </TableCell>
                      <TableCell>
                        <Select
                          value={lead.status || "New"}
                          onValueChange={(value) => handleStatusUpdate(lead, value)}
                        >
                          <SelectTrigger className="w-32">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="New">New</SelectItem>
                            <SelectItem value="Contacted">Contacted</SelectItem>
                            <SelectItem value="Qualified">Qualified</SelectItem>
                            <SelectItem value="Proposal">Proposal</SelectItem>
                            <SelectItem value="Negotiation">Negotiation</SelectItem>
                            <SelectItem value="Won">Won</SelectItem>
                            <SelectItem value="Lost">Lost</SelectItem>
                          </SelectContent>
                        </Select>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex items-center justify-end gap-2">
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => openViewDialog(lead)}
                          >
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => openEditDialog(lead)}
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => handleDelete(lead)}
                          >
                            <Trash2 className="h-4 w-4 text-red-500" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>

      {/* View Dialog */}
      <Dialog open={isViewDialogOpen} onOpenChange={setIsViewDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Lead Details</DialogTitle>
            <DialogDescription>View complete information about this lead</DialogDescription>
          </DialogHeader>
          {selectedLead && (
            <div className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <Label>Name</Label>
                  <p className="text-sm font-medium">{selectedLead.name}</p>
                </div>
                <div>
                  <Label>Mobile</Label>
                  <p className="text-sm font-medium">{selectedLead.mobile}</p>
                </div>
                <div>
                  <Label>City</Label>
                  <p className="text-sm font-medium">{selectedLead.city}</p>
                </div>
                <div>
                  <Label>Status</Label>
                  <Badge>{selectedLead.status || "New"}</Badge>
                </div>
                {selectedLead.plotSize && (
                  <div>
                    <Label>Plot Size</Label>
                    <p className="text-sm font-medium">{selectedLead.plotSize} sq.ft</p>
                  </div>
                )}
                {selectedLead.budget && (
                  <div>
                    <Label>Budget</Label>
                    <p className="text-sm font-medium">{selectedLead.budget}</p>
                  </div>
                )}
                {selectedLead.projectType && (
                  <div>
                    <Label>Project Type</Label>
                    <p className="text-sm font-medium">{selectedLead.projectType}</p>
                  </div>
                )}
                {selectedLead.timeline && (
                  <div>
                    <Label>Timeline</Label>
                    <p className="text-sm font-medium">{selectedLead.timeline}</p>
                  </div>
                )}
                <div>
                  <Label>Submitted At</Label>
                  <p className="text-sm font-medium">
                    {format(new Date(selectedLead.submittedAt), "PPpp")}
                  </p>
                </div>
              </div>
              {selectedLead.notes && (
                <div>
                  <Label>Notes</Label>
                  <p className="text-sm">{selectedLead.notes}</p>
                </div>
              )}
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Edit Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Edit Lead</DialogTitle>
            <DialogDescription>Update lead information</DialogDescription>
          </DialogHeader>
          {selectedLead && (
            <div className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <Label>Name</Label>
                  <Input
                    value={selectedLead.name}
                    onChange={(e) =>
                      setSelectedLead({ ...selectedLead, name: e.target.value })
                    }
                  />
                </div>
                <div>
                  <Label>Mobile</Label>
                  <Input
                    value={selectedLead.mobile}
                    onChange={(e) =>
                      setSelectedLead({ ...selectedLead, mobile: e.target.value })
                    }
                  />
                </div>
                <div>
                  <Label>City</Label>
                  <Input
                    value={selectedLead.city}
                    onChange={(e) =>
                      setSelectedLead({ ...selectedLead, city: e.target.value })
                    }
                  />
                </div>
                <div>
                  <Label>Status</Label>
                  <Select
                    value={selectedLead.status || "New"}
                    onValueChange={(value) =>
                      setSelectedLead({ ...selectedLead, status: value })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="New">New</SelectItem>
                      <SelectItem value="Contacted">Contacted</SelectItem>
                      <SelectItem value="Qualified">Qualified</SelectItem>
                      <SelectItem value="Proposal">Proposal</SelectItem>
                      <SelectItem value="Negotiation">Negotiation</SelectItem>
                      <SelectItem value="Won">Won</SelectItem>
                      <SelectItem value="Lost">Lost</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                {selectedLead.plotSize !== undefined && (
                  <div>
                    <Label>Plot Size</Label>
                    <Input
                      value={selectedLead.plotSize}
                      onChange={(e) =>
                        setSelectedLead({ ...selectedLead, plotSize: e.target.value })
                      }
                    />
                  </div>
                )}
                {selectedLead.budget !== undefined && (
                  <div>
                    <Label>Budget</Label>
                    <Input
                      value={selectedLead.budget}
                      onChange={(e) =>
                        setSelectedLead({ ...selectedLead, budget: e.target.value })
                      }
                    />
                  </div>
                )}
              </div>
              <div>
                <Label>Notes</Label>
                <Textarea
                  value={selectedLead.notes || ""}
                  onChange={(e) =>
                    setSelectedLead({ ...selectedLead, notes: e.target.value })
                  }
                  rows={4}
                />
              </div>
              <div className="flex justify-end gap-2">
                <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={handleSaveEdit}>Save Changes</Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
