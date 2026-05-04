import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'

try {
  const root = document.getElementById('root')
  if (!root) {
    throw new Error('Root element not found!')
  }
  
  ReactDOM.createRoot(root).render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  )
  console.log('✅ App rendered successfully')
} catch (error) {
  console.error('❌ Failed to render app:', error)
  const root = document.getElementById('root')
  if (root) {
    root.innerHTML = `
      <div style="padding: 40px; font-family: Arial; background: #fee; color: #c00; text-align: center;">
        <h1 style="font-size: 24px; margin-bottom: 20px;">⚠️ Error Loading Application</h1>
        <p style="font-size: 16px; margin-bottom: 10px;"><strong>Error:</strong> ${error.message}</p>
        <p style="font-size: 14px; color: #666;">Please check the browser console (F12) for more details.</p>
        <p style="font-size: 12px; color: #999; margin-top: 20px;">If the problem persists, try refreshing the page.</p>
      </div>
    `
  }
}


