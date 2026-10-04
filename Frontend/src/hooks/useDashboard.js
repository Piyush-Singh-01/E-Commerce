import { useCallback, useState } from "react";
import { getDashboardData } from "../api/dashboardApi";
import { toast } from "react-toastify";

export const useDashboard = () => {
  const [dashboard, setDashboard] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchDashboard = useCallback(async () => {
    setLoading(true);

    try {
      const response = await getDashboardData();

      if (response.data?.success) {
        setDashboard(response.data.data);
      }

    } catch (error) {
      console.error("Dashboard error:", error);

      toast.error(error.response?.data?.message || "Failed to load dashboard");

    } finally {
      setLoading(false);
    }
  }, []);

  return {dashboard, loading, fetchDashboard};
};

