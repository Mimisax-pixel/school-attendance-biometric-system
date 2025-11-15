import React, { useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";
import axios from "axios";
import { useApi } from "../providers/ApiProvider";
import { getCookie } from "../api/axiosInstance";

const ProtectedRoute = () => {
  const [isAuth, setIsAuth] = useState(null); // null = loading
  const [loading, setLoading] = useState(true);
  const { baseUrl } = useApi();

  
  let token = getCookie("token");

  

  useEffect(() => {
    const checkAuth = async () => {
      try {

        const res = await axios.get(`${baseUrl}/auth/verify`, {
          headers: {
            Authorization: "Bearer " + token,
          },
        });
        if (res.status === 200) {
          setIsAuth(true);
        } else {
          setIsAuth(false);
        }
      } catch (err) {
        setIsAuth(false);
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, []);

  if (loading) return <div>Loading...</div>; // optional spinner

  return isAuth ? <Outlet /> : <Navigate to="/" replace />;
};

export default ProtectedRoute;
