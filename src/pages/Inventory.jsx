// src/pages/Inventory.jsx
import { Package } from "lucide-react"

const Inventory = () => {
  return (
    <div className="flex flex-col items-center justify-center h-full p-6 text-center">
      <Package size={64} className="text-sky-500 mb-4" />
      <h1 className="text-2xl font-bold text-gray-800 mb-2">Inventory Management</h1>
      <p className="text-gray-600 max-w-md">This page will contain the inventory management functionality.</p>
    </div>
  )
}

export default Inventory

