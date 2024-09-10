import { createUserWithEmailAndPassword} from "firebase/auth";
import React, { useState, useEffect } from "react";
import { auth, db } from "./firebase";
import { toast } from "react-toastify";



function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");
  const [register, setregister] = useState(false);
  

  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      setregister(true);
      toast.success("User registered successfully!", {
      position: "top-center", // Adjust position as needed
     autoClose: 5000, // Close automatically after 5 seconds
     hideProgressBar: false,
     closeOnClick: true,
     pauseOnFocusLoss: false,
     draggable: true,
     progress: undefined,
});

      // Don't store data until verification is confirmed (remains unchanged)
    } catch (error) {
      console.error("Error creating user:", error);
      toast.error(error.message);
    }
  };

  const handleStoreData = async () => {
    if (true) { // Only store data if email is verified
      try {
        
        const data = {
          email: auth.currentUser.email,
          firstname: fname,
          lastname: lname,
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
          console.log(result);
          toast.success("User data stored successfully!");
        } else {
          console.error("Error storing user data:", res.statusText);
          toast.error("Error storing user data!");
        }
      } catch (error) {
        console.error("Error storing user data in Firestore:", error);
        toast.error("Error storing user data!");
      }
    } 
  };

  if (register)
    handleStoreData();

  return (
    <form onSubmit={handleRegister}>
      <h3>Sign Up</h3>

      <div className="mb-3">
        <label>First name</label>
        <input
          type="text"
          className="form-control"
          placeholder="First name"
          onChange={(e) => setFname(e.target.value)}
          required
        />
      </div>

      <div className="mb-3">
        <label>Last name</label>
        <input
          type="text"
          className="form-control"
          placeholder="Last name"
          onChange={(e) => setLname(e.target.value)}
        />
      </div>

      <div className="mb-3">
        <label>Email address</label>
        <input
          type="email"
          className="form-control"
          placeholder="Enter email"
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>

      <div className="mb-3">
        <label>Password</label>
        <input
          type="password"
          className="form-control"
          placeholder="Enter password"
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>

      <div className="d-grid">
        <button type="submit" className="btn btn-primary">
          Sign Up
        </button>
      </div>
      <p className="forgot-password text-right">
        Already registered <a href="/login">Login</a>
      </p>
    </form>
  );
}

export default Register;
