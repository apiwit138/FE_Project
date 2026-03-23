"use client";

import { useState } from "react";
import { register } from "@/libs/api";

export default function RegisterPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [telephoneNumber, setTelephoneNumber] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    // 🔥 validation ก่อนยิง API
    if (!name || !email || !password || !telephoneNumber) {
      setError("Please fill all fields");
      return;
    }

    try {
      await register({
        name,
        email,
        password,
        telephoneNumber, // ✅ เพิ่มตรงนี้
      });

      alert("Register success!");
      setError("");

      // reset form
      setName("");
      setEmail("");
      setPassword("");
      setTelephoneNumber("");
    } catch (err: any) {
      setError(err.message);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-xl shadow-md w-80"
      >
        <h1 className="text-xl font-bold mb-4 text-center">
          Register
        </h1>

        {/* Name */}
        <input
          type="text"
          placeholder="Name"
          className="w-full mb-3 p-2 border rounded"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        {/* Email */}
        <input
          type="email"
          placeholder="Email"
          className="w-full mb-3 p-2 border rounded"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        {/* Password */}
        <input
          type="password"
          placeholder="Password"
          className="w-full mb-3 p-2 border rounded"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        {/* 🔥 Telephone Number (เพิ่มใหม่) */}
        <input
          type="text"
          placeholder="Telephone Number"
          className="w-full mb-4 p-2 border rounded"
          value={telephoneNumber}
          onChange={(e) => setTelephoneNumber(e.target.value)}
        />

        {/* 🔥 Error message */}
        {error && (
          <p className="text-red-500 text-sm mb-2 text-center">
            {error}
          </p>
        )}

        {/* 🔥 ปุ่ม Register */}
        <button
          type="submit"
          className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
        >
          Register
        </button>
      </form>
    </div>
  );
}