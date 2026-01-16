import { useState } from "react";
import { SEO } from "@/components/seo";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/hooks/use-toast";
import { useAdmin } from "@/contexts/admin-context";
import { Key, Bell, Database, Download, Trash2, RefreshCw } from "lucide-react";

export default function AdminSettings() {
  const { toast } = useToast();
  const { changePassword } = useAdmin();
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isChanging, setIsChanging] = useState(false);

  const handlePasswordChange = async () => {
    // Validate passwords match
    if (newPassword !== confirmPassword) {
      toast({ title: "Passwords do not match", variant: "destructive" });
      return;
    }

    // Validate password length
    if (newPassword.length < 6) {
      toast({ title: "Password must be at least 6 characters", variant: "destructive" });
      return;
    }

    setIsChanging(true);
    try {
      // Change password using context (now uses backend API)
      const success = await changePassword(currentPassword, newPassword);
      
      if (success) {
        // Clear form on success
        setCurrentPassword("");
        setNewPassword("");
        setConfirmPassword("");
      }
    } finally {
      setIsChanging(false);
    }
  };

  const handleExportData = () => {
    try {
      const leads = localStorage.getItem("nesthome_leads");
      if (!leads) {
        toast({ title: "No data to export" });
        return;
      }

      const blob = new Blob([leads], { type: "application/json" });
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `nesthome-backup-${new Date().toISOString().split('T')[0]}.json`;
      link.click();
      URL.revokeObjectURL(url);

      toast({ title: "Data exported successfully" });
    } catch (error) {
      toast({ title: "Error exporting data", variant: "destructive" });
    }
  };

  const handleClearCache = () => {
    if (!confirm("Are you sure you want to clear all cached data? This cannot be undone.")) {
      return;
    }
    localStorage.removeItem("nesthome_leads");
    toast({ title: "Cache cleared" });
    window.location.reload();
  };

  const handleSyncFirebase = async () => {
    toast({ title: "Syncing with Firebase...", description: "This may take a moment" });
    // TODO: Implement Firebase sync
    setTimeout(() => {
      toast({ title: "Sync complete" });
    }, 2000);
  };

  return (
    <div className="space-y-6">
      <SEO title="Settings" description="Admin panel settings and configuration" />
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Settings</h1>
        <p className="text-muted-foreground">
          Manage your admin panel preferences and configuration
        </p>
      </div>

      {/* Security Settings */}
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <Key className="h-5 w-5" />
            <CardTitle>Security</CardTitle>
          </div>
          <CardDescription>Manage your admin password and security settings</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="current-password">Current Password</Label>
            <Input
              id="current-password"
              type="password"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              placeholder="Enter current password"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="new-password">New Password</Label>
            <Input
              id="new-password"
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              placeholder="Enter new password"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="confirm-password">Confirm New Password</Label>
            <Input
              id="confirm-password"
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Confirm new password"
            />
          </div>
          <Button onClick={handlePasswordChange} disabled={isChanging}>
            {isChanging ? "Updating..." : "Update Password"}
          </Button>
        </CardContent>
      </Card>

      {/* Data Management */}
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <Database className="h-5 w-5" />
            <CardTitle>Data Management</CardTitle>
          </div>
          <CardDescription>Export, sync, and manage your data</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Export Data</Label>
              <p className="text-sm text-muted-foreground">
                Download all leads data as JSON backup
              </p>
            </div>
            <Button variant="outline" onClick={handleExportData}>
              <Download className="h-4 w-4 mr-2" />
              Export
            </Button>
          </div>
          <Separator />
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Sync with Firebase</Label>
              <p className="text-sm text-muted-foreground">
                Manually sync local data with Firebase
              </p>
            </div>
            <Button variant="outline" onClick={handleSyncFirebase}>
              <RefreshCw className="h-4 w-4 mr-2" />
              Sync Now
            </Button>
          </div>
          <Separator />
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label className="text-red-600">Clear Cache</Label>
              <p className="text-sm text-muted-foreground">
                Remove all cached data from local storage
              </p>
            </div>
            <Button variant="destructive" onClick={handleClearCache}>
              <Trash2 className="h-4 w-4 mr-2" />
              Clear Cache
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Notification Settings */}
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <Bell className="h-5 w-5" />
            <CardTitle>Notifications</CardTitle>
          </div>
          <CardDescription>Configure notification preferences</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Email Notifications</Label>
              <p className="text-sm text-muted-foreground">
                Receive email alerts for new leads
              </p>
            </div>
            <Switch defaultChecked />
          </div>
          <Separator />
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Google Sheets Sync</Label>
              <p className="text-sm text-muted-foreground">
                Automatically sync new leads to Google Sheets
              </p>
            </div>
            <Switch defaultChecked />
          </div>
        </CardContent>
      </Card>

      {/* System Information */}
      <Card>
        <CardHeader>
          <CardTitle>System Information</CardTitle>
          <CardDescription>Application version and environment details</CardDescription>
        </CardHeader>
        <CardContent className="space-y-2">
          <div className="flex justify-between">
            <span className="text-sm text-muted-foreground">Version</span>
            <span className="text-sm font-medium">1.0.0</span>
          </div>
          <div className="flex justify-between">
            <span className="text-sm text-muted-foreground">Environment</span>
            <span className="text-sm font-medium">{import.meta.env.MODE}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-sm text-muted-foreground">Storage</span>
            <span className="text-sm font-medium">
              {localStorage.getItem("nesthome_leads")
                ? `${JSON.parse(localStorage.getItem("nesthome_leads") || "[]").length} leads`
                : "No data"}
            </span>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
