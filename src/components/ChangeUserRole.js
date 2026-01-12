import React, { useState } from 'react';
import { IoMdClose } from "react-icons/io";
import ROLE from '../common/role';
import SummaryApi from '../common';
import { toast } from 'react-toastify';

const ChangeUserRole = ({ name, email, role, userId, onClose, callFunc }) => {
    const [userDetails, setUserDetails] = useState({
        userId: userId,
        name: name,
        email: email,
        role: role,
        password: "",
    });

    const handleChange = (e) => {
        setUserDetails({ ...userDetails, [e.target.name]: e.target.value });
    };

    const updateUser = async () => {
        try {
            const response = await fetch(SummaryApi.updateUser.url, {
                method: SummaryApi.updateUser.method,
                credentials: "include",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(userDetails),
            });
            const data = await response.json();
            console.log(data);
            if (data.success) {
                toast.success("User updated successfully!");
                callFunc(); // Refresh users list
                onClose();
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            toast.error("Failed to update user.");
        }
    };

    const deleteUser = async () => {
        if (!window.confirm("Are you sure you want to delete this user?")) return;

        try {
            const response = await fetch(SummaryApi.deleteUser.url.replace(":id", userId), {
                method: SummaryApi.deleteUser.method,
                credentials: "include",
            });
            console.log(response);
            const data = await response.json();
            if (data.success) {
                toast.success("User deleted successfully!");
                callFunc(); // Refresh users list
                onClose();
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            toast.error("Failed to delete user.");
        }
    };

    return (
        <div className="fixed top-0 bottom-0 left-0 right-0 w-full h-full z-10 flex justify-center items-center bg-slate-200 bg-opacity-50">
            <div className="bg-white shadow-md p-6 w-full max-w-sm rounded-lg">
                <button className="block ml-auto text-gray-600 hover:text-black" onClick={onClose}>
                    <IoMdClose size={22} />
                </button>

                <h1 className="text-lg font-medium pb-4">Edit User</h1>

                {/* Name Field */}
                <div className="mb-3">
                    <label className="block text-sm font-medium">Name</label>
                    <input
                        type="text"
                        name="name"
                        value={userDetails.name}
                        onChange={handleChange}
                        className="p-2 border w-full rounded"
                    />
                </div>

                {/* Email Field */}
                <div className="mb-3">
                    <label className="block text-sm font-medium">Email</label>
                    <div className="p-2 border w-full rounded bg-gray-100 text-gray-600">
                        {userDetails.email}
                    </div>
                </div>

                {/* Password Field */}
                <div className="mb-3">
                    <label className="block text-sm font-medium">New Password</label>
                    <input
                        type="password"
                        name="password"
                        value={userDetails.password}
                        onChange={handleChange}
                        placeholder="Leave blank to keep current password"
                        className="p-2 border w-full rounded"
                    />
                </div>

                {/* Role Dropdown */}
                <div className="mb-3">
                    <label className="block text-sm font-medium">Role</label>
                    <select
                        name="role"
                        value={userDetails.role}
                        onChange={handleChange}
                        className="p-2 border w-full rounded"
                    >
                        {Object.values(ROLE).map((el) => (
                            <option value={el} key={el}>
                                {el}
                            </option>
                        ))}
                    </select>
                </div>

                {/* Buttons */}
                <div className="flex justify-between mt-4">
                    <button className="bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-500" onClick={onClose}>
                        Cancel
                    </button>
                    <button className="bg-black text-white px-4 py-2 rounded hover:bg-blue-600" onClick={updateUser}>
                        Save Changes
                    </button>
                </div>

                {/* Delete Button */}
                <button
                    className="bg-red-500 text-white px-4 py-2 mt-4 w-full rounded hover:bg-red-600"
                    onClick={deleteUser}
                >
                    Delete User
                </button>
            </div>
        </div>
    );
};

export default ChangeUserRole;
