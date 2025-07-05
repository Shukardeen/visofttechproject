import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider} from "react-router-dom"
import './index.css'
import App from './App.jsx'
import { Home, Services, Projects, About, Contact, PageNotFound, ServiceDetail, ProjectDetail } from "./Pages/Pages.js"
import Admin from './Admin/Admin.jsx'
import { Provider } from "react-redux"
import { store } from "./Redux/store.js"
import { ProtectedRoute } from "./Components/Components.js"

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<App />}>
      <Route path='/' element={<Home />} />
      <Route path="/admin" element={<ProtectedRoute>
        <Admin />
      </ProtectedRoute>} />
      <Route path="/services" element={<Services />} />
      <Route path="/service/:slug" element={<ServiceDetail />} />
      <Route path="/projects" element={<Projects />} />
      <Route path="/project/:id" element={<ProjectDetail />} />
      <Route path="/about" element={<About />} />
      <Route path="/contact" element={<Contact />} />
      <Route path='/*' element={<PageNotFound />} />
    </Route>
  )
)

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <RouterProvider router={router}></RouterProvider>
    </Provider>
  </StrictMode>,
)
