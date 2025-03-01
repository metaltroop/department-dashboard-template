// src/pages/Clashes.jsx

"use client"

import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { Search, LayoutGrid, List } from "lucide-react"
import Button from "../components/Button"

const Clashes = () => {
  const navigate = useNavigate()
  const [searchQuery, setSearchQuery] = useState("")
  const [filter, setFilter] = useState("all") // 'all', 'resolved', 'unresolved'
  const [viewMode, setViewMode] = useState("card") // 'card', 'table'

  // This would come from an API in a real application
  const clashes = [
    {
      clashId: "C001",
      involvedDepartments: { D01: false, D02: false, D03: false },
      departmentNames: { D01: "Roads Department", D02: "Electricity Department", D03: "Water Department" },
      proposedStartDate: { D01: "2024-04-01", D02: "2024-04-10", D03: "2024-04-15" },
      proposedEndDate: { D01: "2024-05-01", D02: "2024-05-10", D03: "2024-05-15" },
      proposedRoadmap: { D01: "Priority 1", D02: "Priority 2", D03: "Priority 3" },
      isResolved: false,
      location: "Sector 45, Central Delhi",
      description: "Multiple departments planning work in the same area during overlapping time periods.",
    },
    {
      clashId: "C002",
      involvedDepartments: { D01: true, D04: true },
      departmentNames: { D01: "Roads Department", D04: "Sewage Department" },
      proposedStartDate: { D01: "2024-03-15", D04: "2024-03-20" },
      proposedEndDate: { D01: "2024-04-15", D04: "2024-04-25" },
      proposedRoadmap: { D01: "Priority 1", D04: "Priority 2" },
      isResolved: true,
      location: "Sector 12, North Delhi",
      description: "Road repair and sewage work scheduled simultaneously.",
    },
    {
      clashId: "C003",
      involvedDepartments: { D02: false, D05: false },
      departmentNames: { D02: "Electricity Department", D05: "Telecom Department" },
      proposedStartDate: { D02: "2024-05-01", D05: "2024-05-05" },
      proposedEndDate: { D02: "2024-05-15", D05: "2024-05-20" },
      proposedRoadmap: { D02: "Priority 1", D05: "Priority 2" },
      isResolved: false,
      location: "Sector 18, South Delhi",
      description: "Electricity and telecom infrastructure upgrades planned for the same area.",
    },
    {
      clashId: "C004",
      involvedDepartments: { D03: true, D04: true, D06: true },
      departmentNames: { D03: "Water Department", D04: "Sewage Department", D06: "Parks Department" },
      proposedStartDate: { D03: "2024-06-01", D04: "2024-06-05", D06: "2024-06-10" },
      proposedEndDate: { D03: "2024-06-15", D04: "2024-06-20", D06: "2024-06-25" },
      proposedRoadmap: { D03: "Priority 1", D04: "Priority 2", D06: "Priority 3" },
      isResolved: true,
      location: "Sector 22, East Delhi",
      description: "Water, sewage, and park renovation work scheduled in close proximity.",
    },
  ]

  const filteredClashes = clashes.filter((clash) => {
    // Apply search filter
    const matchesSearch =
      clash.clashId.toLowerCase().includes(searchQuery.toLowerCase()) ||
      clash.location.toLowerCase().includes(searchQuery.toLowerCase())

    // Apply status filter
    const matchesFilter =
      filter === "all" || (filter === "resolved" && clash.isResolved) || (filter === "unresolved" && !clash.isResolved)

    return matchesSearch && matchesFilter
  })

  return (
    <div className="p-2 md:p-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-4 md:mb-0">Clashes</h1>
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative">
            <input
              type="text"
              placeholder="Search clashes..."
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-sky-500 w-full"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <Search className="absolute left-3 top-2.5 text-gray-400" size={18} />
          </div>
          <div className="flex space-x-2">
            <Button variant={filter === "all" ? "primary" : "secondary"} onClick={() => setFilter("all")}>
              All
            </Button>
            <Button variant={filter === "resolved" ? "primary" : "secondary"} onClick={() => setFilter("resolved")}>
              Resolved
            </Button>
            <Button variant={filter === "unresolved" ? "primary" : "secondary"} onClick={() => setFilter("unresolved")}>
              Unresolved
            </Button>
          </div>
          <div className="flex border border-gray-300 rounded-md overflow-hidden">
            <button
              className={`p-2 ${viewMode === "card" ? "bg-sky-100 text-sky-600" : "bg-white text-gray-600"}`}
              onClick={() => setViewMode("card")}
            >
              <LayoutGrid size={20} />
            </button>
            <button
              className={`p-2 ${viewMode === "table" ? "bg-sky-100 text-sky-600" : "bg-white text-gray-600"}`}
              onClick={() => setViewMode("table")}
            >
              <List size={20} />
            </button>
          </div>
        </div>
      </div>

      {viewMode === "card" ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredClashes.map((clash) => (
            <div
              key={clash.clashId}
              className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow cursor-pointer"
              onClick={() => navigate(`/clashes/${clash.clashId}`)}
            >
              <div className="p-4 border-b border-gray-200">
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-semibold text-gray-800">{clash.clashId}</h3>
                  <span
                    className={`px-2 py-1 text-xs rounded-full ${clash.isResolved ? "bg-green-100 text-green-800" : "bg-yellow-100 text-yellow-800"}`}
                  >
                    {clash.isResolved ? "Resolved" : "Unresolved"}
                  </span>
                </div>
                <p className="text-sm text-gray-600 mt-1">{clash.location}</p>
              </div>
              <div className="p-4">
                <p className="text-sm text-gray-700 mb-4 line-clamp-2">{clash.description}</p>
                <div className="text-sm text-gray-600">
                  <p className="font-medium">Departments Involved:</p>
                  <ul className="mt-1 space-y-1">
                    {Object.keys(clash.involvedDepartments).map((deptId) => (
                      <li key={deptId} className="flex items-center">
                        <span
                          className={`w-2 h-2 rounded-full mr-2 ${clash.involvedDepartments[deptId] ? "bg-green-500" : "bg-yellow-500"}`}
                        ></span>
                        {clash.departmentNames[deptId]}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
          {filteredClashes.length === 0 && (
            <div className="col-span-full text-center py-8 text-gray-500">No clashes found</div>
          )}
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Clash ID
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Location
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Departments
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredClashes.map((clash) => (
                  <tr
                    key={clash.clashId}
                    className="hover:bg-gray-50 cursor-pointer"
                    onClick={() => navigate(`/clashes/${clash.clashId}`)}
                  >
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{clash.clashId}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{clash.location}</td>
                    <td className="px-6 py-4 text-sm text-gray-500">
                      <div className="flex flex-wrap gap-1">
                        {Object.keys(clash.involvedDepartments).map((deptId) => (
                          <span
                            key={deptId}
                            className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-sky-100 text-sky-800"
                          >
                            {deptId}
                          </span>
                        ))}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`px-2 py-1 text-xs rounded-full ${clash.isResolved ? "bg-green-100 text-green-800" : "bg-yellow-100 text-yellow-800"}`}
                      >
                        {clash.isResolved ? "Resolved" : "Unresolved"}
                      </span>
                    </td>
                  </tr>
                ))}
                {filteredClashes.length === 0 && (
                  <tr>
                    <td colSpan="4" className="px-6 py-4 text-center text-sm text-gray-500">
                      No clashes found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  )
}

export default Clashes

