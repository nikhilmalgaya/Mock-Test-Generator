import { createUserWithEmailAndPassword } from "firebase/auth";
import React, { useState } from "react";
import { auth } from "./firebase";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

function Register() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    firstname: "",
    lastname: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, formData.email, formData.password);
      const user = userCredential.user;
      
      toast.success("User registered successfully with Firebase!");
      await handleStoreData(user.email);
      
      // Redirect to login page after successful registration and data storage
      navigate("/login");
    } catch (error) {
      console.error("Error creating user:", error);
      toast.error(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleStoreData = async (email) => {
    try {
      const data = {
        email,
        firstname: formData.firstname,
        lastname: formData.lastname,
        photo: "",
      };

      const res = await fetch('http://localhost:3000/user/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (res.ok) {
        const result = await res.json();
        console.log(result);
        toast.success("User data stored successfully!");
      } else {
        const errorData = await res.json();
        console.error("Error storing user data:", errorData);
        toast.error(errorData.message || "Error storing user data!");
        // If there's an error storing data, we might want to delete the Firebase user
        // This is optional and depends on your specific requirements
        // await user.delete();
        throw new Error("Failed to store user data");
      }
    } catch (error) {
      console.error("Error storing user data:", error);
      toast.error("Error storing user data!");
      throw error; // Re-throw the error to be caught in handleRegister
    }
  };

  return (
    <form onSubmit={handleRegister}>
      <h3>Sign Up</h3>

      <div className="mb-3">
        <label>First name</label>
        <input
          type="text"
          className="form-control"
          placeholder="First name"
          name="firstname"
          value={formData.firstname}
          onChange={handleChange}
          required
        />
      </div>

      <div className="mb-3">
        <label>Last name</label>
        <input
          type="text"
          className="form-control"
          placeholder="Last name"
          name="lastname"
          value={formData.lastname}
          onChange={handleChange}
        />
      </div>

      <div className="mb-3">
        <label>Email address</label>
        <input
          type="email"
          className="form-control"
          placeholder="Enter email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
        />
      </div>

      <div className="mb-3">
        <label>Password</label>
        <input
          type="password"
          className="form-control"
          placeholder="Enter password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          required
        />
      </div>

      <div className="d-grid">
        <button type="submit" className="btn btn-primary" disabled={isLoading}>
          {isLoading ? 'Signing Up...' : 'Sign Up'}
        </button>
      </div>
      <p className="forgot-password text-right">
        Already registered <a href="/login">Login</a>
      </p>
    </form>
  );
}

export default Register;
