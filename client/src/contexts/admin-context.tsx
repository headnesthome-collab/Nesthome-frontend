import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { useToast } from "@/hooks/use-toast";
import { apiUrl } from "@/lib/api-config";

interface AdminContextType {
  isAuthenticated: boolean;
  login: (password: string) => Promise<boolean>;
  logout: () => Promise<void>;
  changePassword: (currentPassword: string, newPassword: string) => Promise<boolean>;
  sessionId: string | null;
}

const AdminContext = createContext<AdminContextType | undefined>(undefined);

export function AdminProvider({ children }: { children: ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [sessionId, setSessionId] = useState<string | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    // Check if user is already authenticated
    const storedSessionId = sessionStorage.getItem("admin_session_id");
    if (storedSessionId) {
      // Verify session with backend
      verifySession(storedSessionId);
    }
  }, []);

  const verifySession = async (session: string) => {
    try {
      const response = await fetch(apiUrl("api/admin/verify"), {
        headers: {
          "x-session-id": session,
        },
      });

      if (response.ok) {
        setIsAuthenticated(true);
        setSessionId(session);
      } else {
        // Session invalid, clear it
        sessionStorage.removeItem("admin_session_id");
        setIsAuthenticated(false);
        setSessionId(null);
      }
    } catch (error) {
      console.error("Session verification failed:", error);
      sessionStorage.removeItem("admin_session_id");
      setIsAuthenticated(false);
      setSessionId(null);
    }
  };

  const login = async (password: string): Promise<boolean> => {
    try {
      const response = await fetch(apiUrl("api/admin/login"), {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });

      const result = await response.json();

      if (result.success && result.sessionId) {
        setIsAuthenticated(true);
        setSessionId(result.sessionId);
        sessionStorage.setItem("admin_session_id", result.sessionId);
        toast({ title: "Welcome Admin" });
        return true;
      } else {
        toast({
          title: "Login Failed",
          description: result.error || "Invalid password",
          variant: "destructive",
        });
        return false;
      }
    } catch (error) {
      console.error("Login error:", error);
      toast({
        title: "Login Failed",
        description: "Could not connect to server",
        variant: "destructive",
      });
      return false;
    }
  };

  const logout = async (): Promise<void> => {
    try {
      if (sessionId) {
        await fetch(apiUrl("api/admin/logout"), {
          method: "POST",
          headers: {
            "x-session-id": sessionId,
          },
        });
      }
    } catch (error) {
      console.error("Logout error:", error);
    } finally {
      setIsAuthenticated(false);
      setSessionId(null);
      sessionStorage.removeItem("admin_session_id");
      toast({ title: "Logged out successfully" });
    }
  };

  const changePassword = async (
    currentPassword: string,
    newPassword: string
  ): Promise<boolean> => {
    try {
      if (!sessionId) {
        toast({
          title: "Not Authenticated",
          description: "Please login first",
          variant: "destructive",
        });
        return false;
      }

      const response = await fetch(apiUrl("api/admin/change-password"), {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-session-id": sessionId,
        },
        body: JSON.stringify({
          currentPassword,
          newPassword,
        }),
      });

      const result = await response.json();

      if (result.success) {
        toast({ title: "Password updated successfully" });
        return true;
      } else {
        toast({
          title: "Password Update Failed",
          description: result.error || "Failed to update password",
          variant: "destructive",
        });
        return false;
      }
    } catch (error) {
      console.error("Change password error:", error);
      toast({
        title: "Password Update Failed",
        description: "Could not connect to server",
        variant: "destructive",
      });
      return false;
    }
  };

  return (
    <AdminContext.Provider
      value={{ isAuthenticated, login, logout, changePassword, sessionId }}
    >
      {children}
    </AdminContext.Provider>
  );
}

export function useAdmin() {
  const context = useContext(AdminContext);
  if (context === undefined) {
    throw new Error("useAdmin must be used within an AdminProvider");
  }
  return context;
}
