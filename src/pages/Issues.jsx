// src/pages/Issues.jsx
"use client"

import { useState } from "react"
import { Search, Info } from "lucide-react"
import Button from "../components/Button"
import Modal from "../components/Modal"

const Issues = () => {
  const [category, setCategory] = useState("")
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedIssue, setSelectedIssue] = useState(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  // This would come from an API in a real application
  const issues = [
    {
      issueId: "I001",
      issueName: "Street Light Not Working",
      issueStatus: "raised",
      raisedBy: "user1@example.com",
      description:
        "The street lights in Sector 45 are not working for the past week. This is causing safety concerns for residents during night time.",
      category: "Electricity",
      location: "Sector 45, Central Delhi",
      raisedOn: "2024-03-01",
    },
    {
      issueId: "I002",
      issueName: "Pothole on Main Road",
      issueStatus: "inReview",
      raisedBy: "user2@example.com",
      description: "Large pothole on the main road near the market area. Several vehicles have been damaged.",
      category: "Roads",
      location: "Market Road, Sector 12",
      raisedOn: "2024-03-05",
    },
    {
      issueId: "I003",
      issueName: "Water Supply Disruption",
      issueStatus: "accepted",
      raisedBy: "user3@example.com",
      description: "No water supply in our area for the last 2 days. Urgent resolution required.",
      category: "Water",
      location: "Residential Block A, Sector 18",
      raisedOn: "2024-03-08",
    },
    {
      issueId: "I004",
      issueName: "Garbage Collection Issue",
      issueStatus: "pending",
      raisedBy: "user4@example.com",
      description: "Garbage has not been collected for a week. The area is becoming unhygienic.",
      category: "Sanitation",
      location: "Commercial Area, Sector 22",
      raisedOn: "2024-03-10",
    },
    {
      issueId: "I005",
      issueName: "Traffic Signal Malfunction",
      issueStatus: "working",
      raisedBy: "user5@example.com",
      description: "Traffic signal at the main intersection is not functioning properly, causing traffic jams.",
      category: "Traffic",
      location: "Main Crossing, Sector 30",
      raisedOn: "2024-03-12",
    },
    {
      issueId: "I006",
      issueName: "Park Maintenance Required",
      issueStatus: "resolved",
      raisedBy: "user6@example.com",
      description: "The community park needs maintenance. Broken benches and overgrown grass.",
      category: "Parks",
      location: "Community Park, Sector 15",
      raisedOn: "2024-03-15",
      resolvedOn: "2024-03-25",
    },
  ]

  const categories = [...new Set(issues.map((issue) => issue.category))]

  const filteredIssues = issues.filter((issue) => {
    const matchesCategory = !category || issue.category === category
    const matchesSearch =
      !searchQuery ||
      issue.issueId.toLowerCase().includes(searchQuery.toLowerCase()) ||
      issue.issueName.toLowerCase().includes(searchQuery.toLowerCase())

    return matchesCategory && matchesSearch
  })

  const getStatusBadgeClass = (status) => {
    switch (status) {
      case "raised":
        return "bg-red-100 text-red-800"
      case "inReview":
        return "bg-yellow-100 text-yellow-800"
      case "accepted":
        return "bg-purple-100 text-purple-800"
      case "pending":
        return "bg-orange-100 text-orange-800"
      case "working":
        return "bg-blue-100 text-blue-800"
      case "resolved":
        return "bg-green-100 text-green-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getStatusLabel = (status) => {
    switch (status) {
      case "raised":
        return "Raised"
      case "inReview":
        return "In Review"
      case "accepted":
        return "Accepted"
      case "pending":
        return "Pending"
      case "working":
        return "Working"
      case "resolved":
        return "Resolved"
      default:
        return status
    }
  }

  const handleStatusChange = (issueId, newStatus) => {
    // In a real app, you would update this via API
    console.log(`Updating issue ${issueId} status to ${newStatus}`)
  }

  const handleViewDetails = (issue) => {
    setSelectedIssue(issue)
    setIsModalOpen(true)
  }

  return (
    <div className="p-2 md:p-6">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Issues</h1>

      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="w-full md:w-1/3">
          <select
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-sky-500"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="">All Categories</option>
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>
        <div className="relative w-full md:w-1/3">
          <input
            type="text"
            placeholder="Search issues..."
            className="pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-sky-500 w-full"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <Search className="absolute left-3 top-2.5 text-gray-400" size={18} />
        </div>
        <Button className="w-full md:w-auto">Search</Button>
      </div>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Issue ID
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Issue Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Raised By
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Category
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredIssues.map((issue) => (
                <tr key={issue.issueId} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{issue.issueId}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{issue.issueName}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <select
                      className={`px-2 py-1 text-sm rounded border-0 ${getStatusBadgeClass(issue.issueStatus)}`}
                      value={issue.issueStatus}
                      onChange={(e) => handleStatusChange(issue.issueId, e.target.value)}
                    >
                      <option value="raised">Raised</option>
                      <option value="inReview">In Review</option>
                      <option value="accepted">Accepted</option>
                      <option value="pending">Pending</option>
                      <option value="working">Working</option>
                      <option value="resolved">Resolved</option>
                    </select>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{issue.raisedBy}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{issue.category}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <div className="flex justify-end space-x-2">
                      <button onClick={() => handleViewDetails(issue)} className="text-sky-600 hover:text-sky-900">
                        <Info size={18} />
                      </button>
                      <Button size="sm">Save</Button>
                    </div>
                  </td>
                </tr>
              ))}
              {filteredIssues.length === 0 && (
                <tr>
                  <td colSpan="6" className="px-6 py-4 text-center text-sm text-gray-500">
                    No issues found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Issue Details">
        {selectedIssue && (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm font-medium text-gray-500">Issue ID</p>
                <p className="mt-1">{selectedIssue.issueId}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Status</p>
                <p className="mt-1">
                  <span className={`px-2 py-1 text-xs rounded-full ${getStatusBadgeClass(selectedIssue.issueStatus)}`}>
                    {getStatusLabel(selectedIssue.issueStatus)}
                  </span>
                </p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Category</p>
                <p className="mt-1">{selectedIssue.category}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Raised On</p>
                <p className="mt-1">{selectedIssue.raisedOn}</p>
              </div>
              <div className="col-span-2">
                <p className="text-sm font-medium text-gray-500">Raised By</p>
                <p className="mt-1">{selectedIssue.raisedBy}</p>
              </div>
              <div className="col-span-2">
                <p className="text-sm font-medium text-gray-500">Location</p>
                <p className="mt-1">{selectedIssue.location}</p>
              </div>
            </div>

            <div>
              <p className="text-sm font-medium text-gray-500">Description</p>
              <p className="mt-1">{selectedIssue.description}</p>
            </div>

            <div className="flex justify-end mt-6">
              <Button variant="secondary" onClick={() => setIsModalOpen(false)}>
                Close
              </Button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  )
}

export default Issues

