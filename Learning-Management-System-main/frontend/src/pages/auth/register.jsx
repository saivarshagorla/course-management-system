import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../../Components/common/Navbar";
import { authService } from "../../api/auth.service";
import {
  User,
  Mail,
  Phone,
  Lock,
  Calendar,
  MapPin,
  Briefcase,
  UserPlus,
} from "lucide-react";
import { InputField } from "../../Components/common/InputFeild";

function RegistrationForm() {
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    mobileNumber: "",
    password: "",
    dob: "",
    gender: "",
    location: "",
    profession: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      const result = await authService.register(formData);

      if (result.success) {
        navigate("/login", {
          state: { message: "Registration successful! Please sign in." },
        });
      } else {
        setError(result.error || "Registration failed. Please try again.");
      }
    } catch (error) {
      setError("Network error. Backend may not be running.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <Navbar />

      <div className="flex items-center justify-center py-8 px-4">
        <div className="max-w-4xl w-full space-y-4">
          {/* Header */}
          <div className="text-center">
            <div className="mx-auto h-14 w-14 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center mb-4 shadow-lg">
              <UserPlus className="h-8 w-8 text-white" />
            </div>
            <h2 className="text-4xl font-bold text-gray-900 mb-2">
              Create Your Account
            </h2>
            <p className="text-gray-600">
              Join Course Management System and start learning
            </p>
          </div>

          {/* Form Card */}
          <div className="bg-white shadow-2xl rounded-2xl p-8 border border-gray-100">
            <form onSubmit={handleSubmit} className="space-y-8">

              {/* BASIC INFO */}
              <div className="space-y-6">
                <h3 className="text-lg font-semibold border-b pb-2">
                  Basic Information
                </h3>

                <div className="grid lg:grid-cols-2 gap-6">
                  <InputField
                    id="username"
                    name="username"
                    value={formData.username}
                    onChange={handleChange}
                    icon={<User className="h-5 w-5 text-gray-400" />}
                    label="Full Name"
                    required
                    placeholder="Enter your full name"
                  />

                  <InputField
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    icon={<Mail className="h-5 w-5 text-gray-400" />}
                    label="Email Address"
                    required
                    placeholder="Enter your email"
                  />

                  <InputField
                    id="mobileNumber"
                    name="mobileNumber"
                    type="tel"
                    value={formData.mobileNumber}
                    onChange={handleChange}
                    icon={<Phone className="h-5 w-5 text-gray-400" />}
                    label="Phone Number"
                    required
                    placeholder="Enter your phone number"
                  />

                  <InputField
                    id="password"
                    name="password"
                    type="password"
                    value={formData.password}
                    onChange={handleChange}
                    icon={<Lock className="h-5 w-5 text-gray-400" />}
                    label="Password"
                    required
                    placeholder="Create password"
                  />
                </div>
              </div>

              {/* PERSONAL INFO */}
              <div className="space-y-6">
                <h3 className="text-lg font-semibold border-b pb-2">
                  Personal Details
                </h3>

                <div className="grid lg:grid-cols-2 gap-6">
                  <InputField
                    id="dob"
                    name="dob"
                    type="date"
                    value={formData.dob}
                    onChange={handleChange}
                    icon={<Calendar className="h-5 w-5 text-gray-400" />}
                    label="Date of Birth"
                  />

                  <div className="space-y-2">
                    <label className="block font-semibold">Gender</label>
                    <select
                      name="gender"
                      value={formData.gender}
                      onChange={handleChange}
                      className="w-full px-3 py-3 border rounded-lg"
                    >
                      <option value="">Select Gender</option>
                      <option>Male</option>
                      <option>Female</option>
                      <option>Other</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* PROFESSIONAL INFO */}
              <div className="space-y-6">
                <h3 className="text-lg font-semibold border-b pb-2">
                  Professional Details
                </h3>

                <div className="grid lg:grid-cols-2 gap-6">
                  <InputField
                    id="location"
                    name="location"
                    value={formData.location}
                    onChange={handleChange}
                    icon={<MapPin className="h-5 w-5 text-gray-400" />}
                    label="Location"
                    placeholder="Enter your location"
                  />

                  <InputField
                    id="profession"
                    name="profession"
                    value={formData.profession}
                    onChange={handleChange}
                    icon={<Briefcase className="h-5 w-5 text-gray-400" />}
                    label="Profession"
                    placeholder="Enter your profession"
                  />
                </div>
              </div>

              {/* ERROR */}
              {error && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                  <p className="text-red-800 text-sm font-medium">{error}</p>
                </div>
              )}

              {/* BUTTON */}
              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-4 rounded-lg font-semibold text-lg bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:from-blue-700 hover:to-purple-700"
              >
                {isLoading ? "Creating Account..." : "Create Account"}
              </button>
            </form>

            {/* LOGIN LINK */}
            <div className="mt-6 text-center">
              <p>
                Already have an account?{" "}
                <Link to="/login" className="text-blue-600 font-semibold">
                  Sign in here
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RegistrationForm;