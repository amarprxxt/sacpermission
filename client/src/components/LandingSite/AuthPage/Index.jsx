import { Outlet } from "react-router-dom";

export default function AuthPage() {
  return (
    <>
      <section className="bg-black">
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-[73vh] lg:py-0">
          <a
            href="/"
            className="flex items-center mb-6 text-2xl font-semibold text-white"
          >
            &nbsp;
            Student Activity Center Permission DashBoard
          </a>
          <Outlet />
        </div>
      </section>
    </>
  );
}
