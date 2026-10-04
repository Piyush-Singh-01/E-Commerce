import { useCallback, useState } from "react";
import { toast } from "react-toastify";

import { getAllUsers } from "../api/useApi";

export const useUser = () => {

  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);

  const [pagination, setPagination] = useState({
    currentPage: 1,
    limit: 10,
    totalUsers: 0,
    totalPages: 0
  });

  const fetchUsers = useCallback(async (page = 1, limit = 10, search = "") => {

    setLoading(true);

    try {

      const response = await getAllUsers(page, limit, search);

      console.log(response);

      if (response.data?.success) {

        setUsers(response.data.users);

        setPagination(response.data.pagination);
      }

    } catch (error) {

      console.error("Error fetching users:", error);

      toast.error( error.response?.data?.message || "Failed to load users");

    } finally {

      setLoading(false);

    }

  }, []);

  return { users, loading, pagination, fetchUsers};
};