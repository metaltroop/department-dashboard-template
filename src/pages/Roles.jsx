// src/pages/Roles.jsx
import { Shield } from "lucide-react"

const Roles = () => {
  return (
    <div className="flex flex-col items-center justify-center h-full p-6 text-center">
      <Shield size={64} className="text-sky-500 mb-4" />
      <h1 className="text-2xl font-bold text-gray-800 mb-2">Roles Management</h1>
      <p className="text-gray-600 max-w-md">This page will contain the roles management functionality.</p>
    </div>
  )
}

export default Roles

