import React, { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function AdminDashboard() {
  const [permissions, setPermissions] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchStudentIds = async () => {
    try {
      const response = await fetch('http://localhost:3000/api/permission/students');
      const data = await response.json();
      if (response.ok) {
        localStorage.setItem('students', JSON.stringify(data));
      } else {
        console.error('Failed to fetch student IDs:', data.message);
      }
    } catch (error) {
      console.error('Error fetching student IDs:', error);
    }
  };

  const fetchPermissions = async () => {
    try {
      const studentsData = JSON.parse(localStorage.getItem('students'));
      if (!studentsData) {
        console.error('Student data not found in localStorage');
        return;
      }

      const response = await fetch('http://localhost:3000/api/permission/all', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const data = await response.json();
      if (Array.isArray(data) && data.length > 0) {
        setPermissions(data);
      } else {
        console.error('Failed to fetch permissions:', 'Empty permissions array');
      }     
    } catch (error) {
      console.error('Error fetching permissions:', error);
      toast.error('Error fetching permissions');
    } finally {
      setLoading(false);
    }
  };

  const updatePermissionStatus = async (permissionId, status) => {
    try {
      const response = await fetch('http://localhost:3000/api/permission/update', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ permissionId, status }),
      });

      const data = await response.json();
      if (data.success) {
        toast.success('Permission status updated successfully');
        // Update permissions state with updated status
        setPermissions(prevPermissions =>
          prevPermissions.map(permission =>
            permission._id === permissionId ? { ...permission, status } : permission
          )
        );
      } else {
        console.error('Failed to update permission status:', data.message);
        toast.error('Failed to update permission status');
      }
    } catch (error) {
      console.error('Error updating permission status:', error);
      toast.error('Error updating permission status');
    }
  };

  useEffect(() => {
    fetchStudentIds().then(fetchPermissions);
  }, []);

  if (loading) {
    return <div className="text-white">Loading...</div>;
  }

  // Categorize permissions by status
  const pendingPermissions = permissions.filter(permission => permission.status === 'pending');
  const approvedPermissions = permissions.filter(permission => permission.status === 'approved');
  const rejectedPermissions = permissions.filter(permission => permission.status === 'rejected');
  const holdPermissions = permissions.filter(permission => permission.status === 'hold');

  return (
    <div className="w-full h-screen flex flex-col gap-10 pt-20 items-center justify-center overflow-auto">
      <h1 className="text-white font-bold text-5xl mb-10">Admin Dashboard</h1>

      {/* Pending Permissions Box */}
      <div className="bg-neutral-950 px-10 py-5 rounded-xl shadow-xl w-full max-w-4xl mb-10">
        <span className="text-white font-bold text-xl">Pending Permissions</span>
        <ul role="list" className="divide-y divide-gray-700 text-white mt-5">
          {pendingPermissions.length === 0 ? (
            <p>No pending permissions found</p>
          ) : (
            pendingPermissions.map(permission => (
              <li
                key={permission._id}
                className="py-3 sm:py-4 px-5 rounded hover:bg-neutral-700 hover:scale-105 transition-all flex justify-between items-center"
              >
                <div>
                  <p className="text-sm font-medium">{permission.title}</p>
                  <p className="text-sm text-gray-400">{permission.description}</p>
                  <p className="text-sm text-gray-600">Date Applied: {new Date(permission.date).toISOString().split('T')[0]}</p>
                  <p className="text-sm text-gray-600">Student Roll Number: {permission.student.slice(-4)}</p>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => updatePermissionStatus(permission._id, 'approved')}
                    className="bg-green-500 text-white p-2 rounded-md"
                  >
                    Approve
                  </button>
                  <button
                    onClick={() => updatePermissionStatus(permission._id, 'rejected')}
                    className="bg-red-500 text-white p-2 rounded-md"
                  >
                    Reject
                  </button>
                  <button
                    onClick={() => updatePermissionStatus(permission._id, 'hold')}
                    className="bg-yellow-500 text-white p-2 rounded-md"
                  >
                    Hold
                  </button>
                </div>
              </li>
            ))
          )}
        </ul>
      </div>

      {/* Accepted, Rejected, Hold Sections */}
      <div className="flex justify-between w-full">
        {/* Accepted Permissions Box */}
        <div className="bg-neutral-950 px-10 py-5 rounded-xl shadow-xl w-full max-w-[calc(33%-20px)]">
          <span className="text-white font-bold text-xl">Accepted Permissions</span>
          <ul role="list" className="divide-y divide-gray-700 text-white mt-5">
            {approvedPermissions.map(permission => (
              <li
                key={permission._id}
                className="py-3 sm:py-4 px-5 rounded hover:bg-neutral-700 hover:scale-105 transition-all flex justify-between items-center"
              >
                <div>
                  <p className="text-sm font-medium">{permission.title}</p>
                  <p className="text-sm text-gray-300">{permission.description}</p>
                  <p className="text-sm text-gray-600">Date Applied: {new Date(permission.date).toISOString().split('T')[0]}</p>
                  <p className="text-sm text-gray-600">Student Roll Number: {permission.student.slice(-4)}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>

        {/* Rejected Permissions Box */}
        <div className="bg-neutral-950 px-10 py-5 rounded-xl shadow-xl w-full max-w-[calc(33%-20px)]">
          <span className="text-white font-bold text-xl">Rejected Permissions</span>
          <ul role="list" className="divide-y divide-gray-700 text-white mt-5">
            {rejectedPermissions.map(permission => (
              <li
                key={permission._id}
                className="py-3 sm:py-4 px-5 rounded hover:bg-neutral-700 hover:scale-105 transition-all flex justify-between items-center"
              >
                <div>
                  <p className="text-sm font-medium">{permission.title}</p>
                  <p className="text-sm text-gray-400">{permission.description}</p>
                  <p className="text-sm text-gray-600">Date Applied: {new Date(permission.date).toISOString().split('T')[0]}</p>
                  <p className="text-sm text-gray-600">Student Roll Number: {permission.student.slice(-4)}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>

        {/* Hold Permissions Box */}
        <div className="bg-neutral-950 px-10 py-5 rounded-xl shadow-xl w-full max-w-[calc(33%-20px)]">
          <span className="text-white font-bold text-xl">Hold Permissions</span>
          <ul role="list" className="divide-y divide-gray-700 text-white mt-5">
            {holdPermissions.map(permission => (
              <li
                key={permission._id}
                className="py-3 sm:py-4 px-5 rounded hover:bg-neutral-700 hover:scale-105 transition-all flex justify-between items-center"
              >
                <div>
                  <p className="text-sm font-medium">{permission.title}</p>
                  <p className="text-sm text-gray-400">{permission.description}</p>
                  <p className="text-sm text-gray-600">Date Applied: {new Date(permission.date).toISOString().split('T')[0]}</p>
                  <p className="text-sm text-gray-600">Student Roll Number: {permission.student.slice(-4)}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <ToastContainer />
    </div>
  );
}

export default AdminDashboard;
