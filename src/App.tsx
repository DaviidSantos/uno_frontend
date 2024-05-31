import { Outlet } from "react-router-dom"
import Navbar from "./pages/components/Navbar"
import { Toaster } from "./components/ui/toaster"

function App() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <Outlet />
      <Toaster />
    </div>
  )
}

export default App
