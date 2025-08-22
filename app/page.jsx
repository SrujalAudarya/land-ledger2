"use client"

import { useState } from "react"
import Navigation from "../components/Navigation"
import Home from "../components/Home"
import Dashboard from "../components/Dashboard"
import Properties from "../components/Properties"
import RegisterProperty from "../components/RegisterProperty"
import Blockchain from "../components/Blockchain"

export default function LandLedgerApp() {
  const [currentPage, setCurrentPage] = useState("home")

  const renderPage = () => {
    switch (currentPage) {
      case "dashboard":
        return <Dashboard />
      case "properties":
        return <Properties />
      case "register":
        return <RegisterProperty />
      case "blockchain":
        return <Blockchain />
      default:
        return <Home setCurrentPage={setCurrentPage} />
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation currentPage={currentPage} setCurrentPage={setCurrentPage} />
      {renderPage()}
    </div>
  )
}
