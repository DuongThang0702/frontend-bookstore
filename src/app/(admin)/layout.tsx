"use client";

import { AppDispatch, RootState } from "@/redux/store";
import path from "@/utils/path";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { SidebarAdmin } from "@/components";
import { ToastContainer } from "react-toastify";
import { useEffect } from "react";
import { getCategoriesBook } from "@/redux/book/asyncAction";
export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const dispatch = useDispatch<AppDispatch>();
  useEffect(() => {
    dispatch(getCategoriesBook());
  }, []);
  const router = useRouter();
  const { isLoggedIn, current } = useSelector((state: RootState) => state.user);
  const { modelChildren, isShowModel } = useSelector(
    (state: RootState) => state.app
  );
  if (!isLoggedIn || !current || current.role !== "admin")
    return router.push(`/${path.LOGIN}`);

  return (
    <>
      <div className="flex relative min-h-screen">
        {isShowModel && (
          <div className="absolute top-0 bottom-0 right-0 left-0 z-50">
            {modelChildren}
          </div>
        )}
        <div className="absolute bottom-0 top-0">
          <SidebarAdmin />
        </div>
        <div className="w-[30rem]"></div>
        <div className="flex-auto ml-8">{children}</div>
        <div className="z-50">
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
            className={"z-50"}
          />
        </div>
      </div>
    </>
  );
}
