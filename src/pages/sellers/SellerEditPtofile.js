import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { setUserDetails } from "../../store/userSlice"; // Redux action to update user details
import SummaryApi from "../../common"; // Your API configurations
import loginIcons from '../../assest/signin.gif'
import imageTobase64 from "../../helpers/imageTobase64";
import PhoneInput from 'react-phone-number-input';
import 'react-phone-number-input/style.css'; // Styles for phone number input

const SellerEditProfile = () => {
  const user = useSelector((state) => state.user.user); // Get user from Redux
  const dispatch = useDispatch();

  // State to manage form data
  const [formData, setFormData] = useState({
    name: user?.name || "",
    email: user?.email || "",
    password: "", // Password will be updated here
    profilePic: "",
    location: user?.location || "", // New location field
    phoneNumber: user?.phoneNumber || "", // New phone number field
  });

  const [isEditing, setIsEditing] = useState(false);

  // Handle input changes for all fields
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle file input change for profile image
  const handleUploadPic = async (e) => {
    const file = e.target.files[0];
    const imagePic = await imageTobase64(file);

    setFormData((prev) => {
      return {
        ...prev,
        profilePic: imagePic,
      };
    });
  };

  // Function to get user's current location
  const getLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const { latitude, longitude } = position.coords;
        console.log("Latitude:", latitude, "Longitude:", longitude);

        // Use a reverse geocoding API to convert lat/long to a readable address
        fetch(
          `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=YOUR_GOOGLE_MAPS_API_KEY`
        )
          .then((response) => response.json())
          .then((data) => {
            if (data.status === "OK") {
              const address = data.results[0].formatted_address;
              setFormData((prev) => ({
                ...prev,
                location: address, // Set the detected location
              }));
            }
          })
          .catch((error) => {
            console.error("Error fetching location:", error);
          });
      });
    } else {
      toast.error("Geolocation is not supported by this browser.");
    }
  };

  useEffect(() => {
    // Auto-detect user's location when component mounts
    if (!user?.location) {
      getLocation();
    }
  }, [user]);

  // Handle saving updated data (name, email, password, profile image, location)
  const handleSave = async () => {
    const formDataToSend = new FormData();
    formDataToSend.append("name", formData.name);
    formDataToSend.append("email", formData.email);
    formDataToSend.append("password", formData.password);
    formDataToSend.append("location", formData.location); // Add location to form data
    formDataToSend.append("phoneNumber", formData.phoneNumber); // Add phone number to form data

    try {
      const response = await fetch(SummaryApi.update_user.url, {
        method: SummaryApi.update_user.method,
        body: formDataToSend,
        credentials: "include",
      });

      const data = await response.json();

      if (data.success) {
        toast.success("Profile updated successfully!");
        dispatch(setUserDetails(data.updatedUser)); // Update Redux store with new user data
        setIsEditing(false); // Exit edit mode after successful update
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.error("Error updating profile:", error);
      toast.error("Something went wrong!");
    }
  };

  if (!user) return <p className="text-red-500">User not found. Please log in.</p>;

  return (
    <div className="max-w-4xl mx-auto p-6 my-20 bg-white shadow-lg rounded-lg">
      <div className="border-b pb-4 mb-4">
        <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold mb-4">Profile</h2>
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded-md"
            onClick={() => setIsEditing(!isEditing)} // Toggle edit mode
          >
            {isEditing ? "Save" : "Edit"}
          </button>
        </div>

        <div className="mt-4 space-y-2 flex flex-col">
          {/* Profile Image */}
          <div className="flex items-center mx-auto relative rounded-full">
            <img
              src={formData?.profilePic || user?.profilePic || loginIcons}
              alt={user?.name}
              className="w-20 h-20 rounded-full"
            />
            {isEditing && (
              <div className="w-20 h-20 mx-auto absolute rounded-full">
                <form>
                  <label>
                    <div className="text-xs bg-opacity-80 bg-slate-200 pb-4 pt-2 cursor-pointer text-center absolute rounded-b-full bottom-0 w-full">
                      Upload Photo
                    </div>
                    <input type="file" className="hidden" onChange={handleUploadPic} />
                  </label>
                </form>
              </div>
            )}
          </div>

          {/* Name Input */}
          <label className="block text-gray-600">Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            disabled={!isEditing}
            className="w-full p-2 border rounded-md"
          />

          {/* Email Input */}
          <label className="block text-gray-600">Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            disabled={!isEditing}
            className="w-full p-2 border rounded-md"
          />

          {/* Location Input */}
          <label className="block text-gray-600">Location</label>
          <input
            type="text"
            name="location"
            value={formData.location}
            onChange={handleChange}
            disabled={!isEditing}
            className="w-full p-2 border rounded-md"
          />

          {/* Phone Number Input */}
          <label className="block text-gray-600">Phone Number</label>
          <PhoneInput
            international
            defaultCountry="US"
            value={formData.phoneNumber}
            onChange={(value) => setFormData({ ...formData, phoneNumber: value })}
            disabled={!isEditing}
            className="w-full p-2 border rounded-md"
          />

          {/* Password Input (Editable Only When Editing) */}
          {isEditing && (
            <>
              <label className="block text-gray-600">New Password</label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Enter new password"
                className="w-full p-2 border rounded-md"
              />
            </>
          )}
        </div>
      </div>

      {isEditing && (
        <button
          className="bg-green-500 text-white px-4 py-2 rounded-md"
          onClick={handleSave} // Trigger the save function
        >
          Update Profile
        </button>
      )}
    </div>
  );
};

export default SellerEditProfile;