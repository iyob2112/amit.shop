import React, { useEffect, useState } from "react";
import SummaryApi from "../../common";
import { toast } from "react-toastify";
import moment from "moment";
import { MdModeEdit } from "react-icons/md";
import ChangeUserRole from "../../components/ChangeUserRole";

const AllUsers = () => {
  const [allUsers, setAllUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedRole, setSelectedRole] = useState("");
  const [openUpdateRole, setOpenUpdateRole] = useState(false);
  const [updateUserDetails, setUpdateUserDetails] = useState({
    email: "",
    name: "",
    role: "",
    _id: "",
    password: "",
  });

  const fetchAllUsers = async () => {
    try {
      const fetchData = await fetch(SummaryApi.allUser.url, {
        method: SummaryApi.allUser.method,
        credentials: "include",
      });

      const dataResponse = await fetchData.json();

      if (dataResponse.success) {
        setAllUsers(dataResponse.data);
        setFilteredUsers(dataResponse.data);
      } else {
        toast.error(dataResponse.message);
      }
    } catch (error) {
      toast.error("Failed to fetch users.");
    }
  };

  useEffect(() => {
    let filtered = allUsers;

    if (searchTerm) {
      const lowerSearch = searchTerm.toLowerCase();

      filtered = filtered.filter(
        (user) =>
          (typeof user.name === "string" &&
            user.name.toLowerCase().includes(lowerSearch)) ||
          (typeof user.email === "string" &&
            user.email.toLowerCase().includes(lowerSearch))
      );
    }

    if (selectedRole) {
      filtered = filtered.filter((user) => user.role === selectedRole);
    }

    setFilteredUsers(filtered);
  }, [searchTerm, selectedRole, allUsers]);
  useEffect(() => {
    fetchAllUsers();
  }, []);

  return (
    <div className="bg-white pb-4 p-4">
      {/* Search & Role Filter */}
      <div className="flex flex-col md:flex-row gap-4 mb-4">
        <input
          type="text"
          placeholder="Search by name or email"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="p-2 border rounded w-full"
        />
        <select
          value={selectedRole}
          onChange={(e) => setSelectedRole(e.target.value)}
          className="p-2 border rounded w-full md:w-60"
        >
          <option value="">All Roles</option>
          <option value="ADMIN">Admin</option>
          <option value="SELLER">Seller</option>
          <option value="USER">User</option>
        </select>
      </div>

      {/* Table Desktop */}
      <div className="hidden md:block overflow-x-auto">
        <table className="w-full userTable">
          <thead>
            <tr className="bg-black text-white">
              <th>Sr.</th>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Created Date</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.map((el, index) => (
              <tr key={el._id}>
                <td>{index + 1}</td>
                <td>{el?.name}</td>
                <td>{el?.email}</td>
                <td>{el?.role}</td>
                <td>{moment(el?.createdAt).format("LL")}</td>
                <td>
                  <button
                    className="bg-green-100 p-2 rounded-full cursor-pointer hover:bg-green-500 hover:text-white"
                    onClick={() => {
                      setUpdateUserDetails(el);
                      setOpenUpdateRole(true);
                    }}
                  >
                    <MdModeEdit />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile View */}
      <div className="md:hidden flex flex-col gap-4">
        {filteredUsers.map((el, index) => (
          <div key={el._id} className="border p-3 rounded shadow-sm">
            <div className="flex justify-between font-semibold">
              <span>
                {index + 1}. {el?.name}
              </span>
              <button
                className="text-green-700 hover:text-green-900"
                onClick={() => {
                  setUpdateUserDetails(el);
                  setOpenUpdateRole(true);
                }}
              >
                <MdModeEdit size={20} />
              </button>
            </div>
            <p className="text-sm text-gray-600">{el?.email}</p>
            <div className="flex justify-between text-sm mt-2">
              <span className="font-medium">
                Role: <span className="capitalize">{el?.role}</span>
              </span>
              <span className="text-gray-500">
                {moment(el?.createdAt).format("ll")}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Modal */}
      {openUpdateRole && (
        <ChangeUserRole
          onClose={() => setOpenUpdateRole(false)}
          name={updateUserDetails.name}
          email={updateUserDetails.email}
          role={updateUserDetails.role}
          userId={updateUserDetails._id}
          password={updateUserDetails.password}
          callFunc={fetchAllUsers}
        />
      )}
    </div>
  );
};

export default AllUsers;
