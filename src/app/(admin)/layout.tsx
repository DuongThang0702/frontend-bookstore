"use client";

import { RootState } from "@/redux/store";
import path from "@/utils/path";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import { SidebarAdmin } from "@/components";
import { ToastContainer } from "react-toastify";
import { useState } from "react";
export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const { isLoggedIn, current } = useSelector((state: RootState) => state.user);
  if (!isLoggedIn || !current || current.role !== "admin")
    return router.push(`/${path.LOGIN}`);
  const { modelChildren, isShowModel } = useSelector(
    (state: RootState) => state.app
  );
  const [isShowLoading, setIsShowLoading] = useState<boolean>(false);
  if (isShowModel) setIsShowLoading(isShowModel);
  return (
    <>
      <div className="flex relative min-h-screen">
        {isShowModel && isShowLoading && (
          <div className="absolute top-0 bottom-0 right-0 left-0 z-50">
            {modelChildren}
          </div>
        )}
        <div className="absolute bottom-0 top-0">
          <SidebarAdmin />
        </div>
        <div className="w-[30rem]"></div>
        <div className="flex-auto ml-8">{children}</div>
        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="colored"
        />
      </div>
    </>
  );
}
