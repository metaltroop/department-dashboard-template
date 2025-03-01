// src/pages/ClashDetails.jsx
"use client"

import { useState } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { ArrowLeft, Send, Check } from "lucide-react"
import Button from "../components/Button"
import Modal from "../components/Modal"

const ClashDetails = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false)

  // This would come from an API in a real application
  const clash = {
    clashId: "C001",
    involvedDepartments: { D01: false, D02: false, D03: false },
    departmentNames: { D01: "Roads Department", D02: "Electricity Department", D03: "Water Department" },
    proposedStartDate: { D01: "2024-04-01", D02: "2024-04-10", D03: "2024-04-15" },
    proposedEndDate: { D01: "2024-05-01", D02: "2024-05-10", D03: "2024-05-15" },
    proposedRoadmap: { D01: "Priority 1", D02: "Priority 2", D03: "Priority 3" },
    isResolved: false,
    location: "Sector 45, Central Delhi",
    description: "Multiple departments planning work in the same area during overlapping time periods.",
    messages: [
      { id: 1, sender: "D01", text: "We need to start road repairs by April 1st.", timestamp: "2024-03-10T10:30:00" },
      {
        id: 2,
        sender: "D02",
        text: "We have scheduled electrical work starting April 10th.",
        timestamp: "2024-03-10T11:15:00",
      },
      {
        id: 3,
        sender: "D03",
        text: "Our water pipeline replacement is set to begin April 15th.",
        timestamp: "2024-03-10T14:20:00",
      },
      { id: 4, sender: "D01", text: "Can any department adjust their timeline?", timestamp: "2024-03-11T09:45:00" },
      {
        id: 5,
        sender: "D02",
        text: "We could potentially delay by 2 weeks if necessary.",
        timestamp: "2024-03-11T13:10:00",
      },
    ],
  }

  const [newMessage, setNewMessage] = useState("")

  const handleSendMessage = (e) => {
    e.preventDefault()
    if (!newMessage.trim()) return

    // In a real app, you would send this to an API
    console.log("Sending message:", newMessage)

    // Clear the input
    setNewMessage("")
  }

  const handleAccept = () => {
    // In a real app, you would update the clash status via API
    console.log("Accepting proposed roadmap")
    setIsConfirmModalOpen(false)

    // Navigate back to clashes page
    navigate("/clashes")
  }

  return (
    <div className="p-2 md:p-6">
      <div className="flex items-center mb-6">
        <button
          onClick={() => navigate("/clashes")}
          className="p-2 mr-2 rounded-md text-gray-600 hover:bg-sky-100 hover:text-sky-600"
        >
          <ArrowLeft size={20} />
        </button>
        <h1 className="text-2xl font-bold text-gray-800">Clash {id}</h1>
        <span
          className={`ml-4 px-2 py-1 text-xs rounded-full ${clash.isResolved ? "bg-green-100 text-green-800" : "bg-yellow-100 text-yellow-800"}`}
        >
          {clash.isResolved ? "Resolved" : "Unresolved"}
        </span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg shadow-md p-6 mb-6">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">Chat</h2>
            <div className="space-y-4 mb-4 max-h-96 overflow-y-auto">
              {clash.messages.map((message) => {
                const isCurrentDept = message.sender === "D01" // Assuming current user is from D01
                return (
                  <div key={message.id} className={`flex ${isCurrentDept ? "justify-end" : "justify-start"}`}>
                    <div
                      className={`max-w-[80%] rounded-lg px-4 py-2 ${
                        isCurrentDept ? "bg-sky-500 text-white" : "bg-gray-100 text-gray-800"
                      }`}
                    >
                      <div className="flex items-center mb-1">
                        <span className="font-medium text-sm">
                          {clash.departmentNames[message.sender] || message.sender}
                        </span>
                        <span className="text-xs ml-2 opacity-75">
                          {new Date(message.timestamp).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                        </span>
                      </div>
                      <p>{message.text}</p>
                    </div>
                  </div>
                )
              })}
            </div>
            <form onSubmit={handleSendMessage} className="flex gap-2">
              <input
                type="text"
                placeholder="Type your message..."
                className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-sky-500"
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
              />
              <Button type="submit">
                <Send size={18} className="mr-2" />
                Send
              </Button>
            </form>
          </div>
        </div>

        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg shadow-md p-6 mb-6">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">Proposed Roadmap</h2>
            <div className="space-y-4">
              {Object.keys(clash.proposedRoadmap).map((deptId) => (
                <div key={deptId} className="p-3 border border-gray-200 rounded-md">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-medium">{clash.departmentNames[deptId]}</span>
                    <span className="text-sm text-sky-600">{clash.proposedRoadmap[deptId]}</span>
                  </div>
                  <div className="text-sm text-gray-600">
                    <div className="flex justify-between">
                      <span>Start:</span>
                      <span>{clash.proposedStartDate[deptId]}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>End:</span>
                      <span>{clash.proposedEndDate[deptId]}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            {!clash.isResolved && (
              <Button className="w-full mt-4" onClick={() => setIsConfirmModalOpen(true)}>
                Accept Roadmap
              </Button>
            )}
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">Departments Involved</h2>
            <div className="space-y-2">
              {Object.keys(clash.involvedDepartments).map((deptId) => (
                <div key={deptId} className="flex items-center justify-between p-2 border-b border-gray-100">
                  <span>{clash.departmentNames[deptId]}</span>
                  <span
                    className={`px-2 py-0.5 text-xs rounded-full ${
                      clash.involvedDepartments[deptId]
                        ? "bg-green-100 text-green-800"
                        : "bg-yellow-100 text-yellow-800"
                    }`}
                  >
                    {clash.involvedDepartments[deptId] ? "Accepted" : "Pending"}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <Modal isOpen={isConfirmModalOpen} onClose={() => setIsConfirmModalOpen(false)} title="Confirm Action">
        <div className="text-center">
          <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-sky-100 mb-4">
            <Check className="h-6 w-6 text-sky-600" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">Are You Sure?</h3>
          <p className="text-sm text-gray-500 mb-6">
            This action cannot be reversed. Once accepted, the roadmap will be finalized.
          </p>
          <div className="flex justify-center space-x-4">
            <Button variant="secondary" onClick={() => setIsConfirmModalOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleAccept}>Accept</Button>
          </div>
        </div>
      </Modal>
    </div>
  )
}

export default ClashDetails

