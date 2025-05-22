"use client";
import { startTokenRefreshInterval } from "@/api-config/tokenManager";
import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";
import { LoginApi } from "@/services/login/authServices";
import React, { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import { Toaster } from "react-hot-toast";

const MainLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  useEffect(() => {
    const loginAndStartTokenRefresh = async () => {
      try {
        const response = await LoginApi.login({
          userName: "hruser",
          password: "hr123",
          refreshToken: ""
        });

        if (response.status === 200) {
          const token = response.result.tokenModel.token;
          const refreshToken = response.result.tokenModel.refreshToken;

          window.localStorage.setItem("accessToken", token);
          window.localStorage.setItem("refreshToken", refreshToken);

          console.log("Tokens stored:", { token, refreshToken });

          startTokenRefreshInterval();
        } else {
          console.error("Login failed:", response);
        }
      } catch (err) {
        console.error("Login error:", err);
      }
    };

    loginAndStartTokenRefresh();
  }, []);
  return (
    <>
      <Toaster position="top-right" containerClassName="mt-4" />
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
