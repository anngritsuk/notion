import { Footer } from "./Footer";
import { Header } from "./Header";
import { Outlet } from "react-router-dom";
export const Layout = () => {
  return (
    <div className="w-2/3 mx-auto  flex flex-col min-h-[100vh]">
      <Header />
      <main className="p-4 flex-grow">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};
