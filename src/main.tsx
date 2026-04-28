import React from 'react'
import ReactDOM from 'react-dom/client'
import { RouterProvider, createHashRouter } from 'react-router-dom'
import './styles.css'

import { CalculatorPage } from './routes/calculator'

const router = createHashRouter([
  {
    path: '/',
    element: <CalculatorPage />,
  },
])

const rootEl = document.getElementById('rg-calculator-root')

if (rootEl) {
  ReactDOM.createRoot(rootEl).render(
    <React.StrictMode>
      <RouterProvider router={router} />
    </React.StrictMode>
  )
}
