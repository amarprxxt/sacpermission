
import { Link } from "react-router-dom";
import nitr from '../../../assets/nitr.svg';


function Land() {
  return (
    <main className="flex flex-col lg:flex-row-reverse justify-center align-center  text-white text-center">
      <div className="w-[70%] pl-40 animate-pulse lg:w-[30%] lg:p-0">
        <img src={nitr} alt="Description" className="w-full px-10 py-20 h-auto" />
      </div>
      <div className="md:pt-[8%]">
        <h1 className="font-bold text-6xl">
          SAC <span className="text-blue-700">Permission</span> Dashboard
        </h1>
        <p className="py-10 text-2xl">
          Request Permission for events, Book locations and Manage Mess
        </p>
        <div className="py-20">
          <Link
            to="/auth/login"
            className="bg-blue-500 py-3 px-40 hover:bg-blue-700 transition rounded text-2xl"
          >
            Login
          </Link>
          <p className="mt-6 mb-3">OR</p>
          <Link
            to="/auth/request"
            className="text-xl hover:underline hover:text-blue-500"
          >
            Request Registration
          </Link>
        </div>
      </div>
    </main>
  );
}
export { Land };
