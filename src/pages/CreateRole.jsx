// src/pages/CreateRole.jsx

import { Settings } from "lucide-react"

const CreateRole = () => {
  return (
    <div className="flex flex-col items-center justify-center h-full p-6 text-center">
      <Settings size={64} className="text-sky-500 mb-4" />
      <h1 className="text-2xl font-bold text-gray-800 mb-2">Create Role</h1>
      <p className="text-gray-600 max-w-md">This page will contain the create role functionality.</p>
    </div>
  )
}

export default CreateRole

