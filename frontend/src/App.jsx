import { Header, Footer, ScrollToTop } from "./Components/Components.js"
import { Outlet } from "react-router-dom"
import { Toaster } from 'react-hot-toast';
import AOS from 'aos';
import './App.css'
import { useEffect } from "react";

function App() {

  useEffect(() => {
    AOS.init({
      duration: 1000
    })
  }, []);
  
  return (
    <div className="min-h-screen flex flex-col">
      <ScrollToTop />
      <Header />
      <main className="flex-grow">
        <Outlet />
      </main>
      <Footer />

      <Toaster
        position="top-center"
        reverseOrder={false}
      />
    </div>
  )
}

export default App 
