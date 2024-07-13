import { useEffect, useState } from "react";
import { Input } from "../../LandingSite/AuthPage/Input";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Permissions() {

  const [loading, setLoading] = useState(false);

  const registerPermission = async (e) => {
    e.preventDefault();
    setLoading(true);
    let student = JSON.parse(localStorage.getItem("student"));
    const permission = {
      student: student._id,
      title: title,
      description: desc,
      type: type,
    };

    const res = await fetch("http://localhost:3000/api/permission/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(permission),
    });

    const data = await res.json();

    if (data.success) {
      setRegPermissions([]);
      toast.success(
        "Permission Requested Successfully!", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      })
      setTitle("");
      setDesc("");
      setType("Technical");
    } else {
      toast.error(
        data.errors, {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      })
    }
    setLoading(false);
  };

  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [type, setType] = useState("Technical");

  const types = ["Technical", "Films", "Cultural", "Games"];

  function chngType(e) {
    setType(e.target.value);
  }

  function titleChange(e) {
    setTitle(e.target.value);
  }
  function descChange(e) {
    setDesc(e.target.value);
  }

  const permissionTitle = {
    name: "event title",
    placeholder: "Title",
    req: true,
    type: "text",
    value: title,
    onChange: titleChange,
  };
  const permissionType = {
    name: "society type",
    placeholder: "Type...",
    req: true,
    type: "text",
    value: type,
    onChange: chngType,
  };

  const [regPermissions, setRegPermissions] = useState([]);

  
  useEffect(()=> {
    const student = JSON.parse(localStorage.getItem("student"));
    const perm = { student: student._id };
    const fetchPermissions = async () => {
      const res = await fetch("http://localhost:3000/api/permission/student", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(perm),
      });
      const data = await res.json();
      let permissions = data.permissions;
      permissions = permissions.map((permission) => {
        var date = new Date(permission.date);
        permission.date = date.toLocaleDateString('en-US', { day: 'numeric', month: 'long', year: 'numeric' });
        return {
          title: permission.title,
          status: permission.status,
          date: permission.date,
          type: permission.type,
        };
      });
      setRegPermissions(data.permissions);
    }
    fetchPermissions();
  }, [regPermissions.length])


  return (
    <div className="w-full h-screen flex flex-col gap-10 items-center justify-center md:p-0 px-10 max-h-screen overflow-y-auto pt-80 md:pt-80 lg:p-0">
      <h1 className="text-white font-bold text-5xl mt-10">Permissions</h1>
      <div className="flex gap-5 flex-wrap items-center justify-center">
        <form
          method="POST"
          onSubmit={registerPermission}
          className="md:w-96 w-full py-5 pb-7 px-10 bg-black rounded-lg shadow-xl flex flex-col gap-5"
        >
          <div>
            <label
              htmlFor="description"
              className="block mb-2 text-sm font-medium text-white"
            >
              Event under which Society
            </label>
            <select
              className="border sm:text-sm rounded-lg block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500 outline-none"
              onChange={chngType}
            >
              {types.map((type) => (
                <option key={type}>{type}</option>
              ))}
            </select>
            {type.toLowerCase() === "technical" ||
            type.toLowerCase() === "films" ||
            type.toLowerCase() === "cultural" ? (
              <></>
            ) : (
              <div className="mt-5">
                <Input field={permissionType} />
              </div>
            )}
          </div>
          <Input field={permissionTitle} />
          <div>
            <label
              htmlFor="description"
              className="block mb-2 text-sm font-medium text-white"
            >
              Your event description
            </label>
            <textarea
              name="description"
              placeholder="Details of permission"
              className="border sm:text-sm rounded-lg block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500 outline-none"
              onChange={descChange}
              value={desc}
            ></textarea>
            <button
              type="submit"
              className="w-full text-black bg-white hover:bg-gray-400 focus:ring-4 focus:outline-none focus:ring-blue-800 text-lg rounded-lg px-5 py-2.5 mt-5 text-center"
              disabled={loading}
            >
              {loading ? 'Requesting permission...':'Request permission'}
            </button>
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
              theme="dark"
            />
          </div>
        </form>
        <div className="w-full md:w-80 max-w-md max-h-96 p-4 border rounded-lg shadow sm:p-8 bg-neutral-950 border-neutral-900 drop-shadow-xl overflow-y-auto">
          <div className="flex items-center justify-between mb-4">
            <h5 className="text-xl font-bold leading-none text-white">
              Requested Permissions
            </h5>
          </div>
          <div className="flow-root">
            <ul role="list" className="divide-y divide-gray-700 text-white ">
              {regPermissions.length === 0
                ? "No Permissions registered"
                : regPermissions.map((Permiss) => (
                    <li className="py-3 sm:py-4" key={Permiss.title}>
                      <div className="flex items-center space-x-4">
                        <div className="flex-shrink-0 text-white">
                          {Permiss.status.toLowerCase() === "pending" ? (
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                              strokeWidth={2}
                              stroke="currentColor"
                              className="w-7 h-7"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z"
                              />
                            </svg>
                          ) : (
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                              strokeWidth={1.5}
                              stroke="currentColor"
                              className="w-6 h-6"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M4.5 12.75l6 6 9-13.5"
                              />
                            </svg>
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium truncate text-white">
                            {Permiss.title}
                          </p>
                          <p className="text-sm truncate text-gray-400">
                            {Permiss.date}
                          </p>
                        </div>
                        <div className="flex flex-col items-center text-base font-semibold text-white">
                          {Permiss.type}
                        </div>
                      </div>
                    </li>
                  ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Permissions;
