"use client";
import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { setTokens, scheduleTokenRefresh } from "@/api-config/tokenManager";
import { LoginApi } from "@/services/login/authServices";
import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";
import React from "react";

const MainLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    const initialize = async () => {
      try {
        const response = await LoginApi.login({
          userName: "hruser",
          password: "hr123",
          refreshToken: ""
        });

        if (response.status === 200) {
          setTokens(
            response.result.tokenModel.token,
            response.result.tokenModel.refreshToken
          );
          scheduleTokenRefresh();
        } else {
          window.location.href = "/login";
        }
      } catch (error) {
        console.error("Login error:", error);
        window.location.href = "/login";
      }
    };

    initialize();
  }, []);

  return (
    <>
      <Toaster position="top-right" />
      <div className="flex h-screen overflow-hidden">
        <Sidebar sidebarOpen={sidebarOpen} />
        <div className="relative flex flex-1 flex-col overflow-y-auto overflow-x-hidden">
          <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
          <main>
            <div className="mx-auto max-w-screen-2xl p-4 md:p-6 2xl:p-10">
              <Outlet />
            </div>
          </main>
        </div>
      </div>
    </>
  );
};

export default MainLayout;