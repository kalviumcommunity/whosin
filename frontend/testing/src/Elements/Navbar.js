import React from 'react'
import './css/navbar.css'

function Navbar() {
  return (
    <header>
        <nav id="sidebarMenu" className="collapse d-lg-block sidebar collapse bg-white">
    <div className="position-sticky">
      <div className="list-group list-group-flush mx-3 mt-3">
        <a href="/" className="list-group-item list-group-item-action py-2 ripple" aria-current="true">
          <i className="fas fa-tachometer-alt fa-fw me-3"></i><span>All Sessions</span>
        </a>
        <a href="/create" className="list-group-item list-group-item-action py-2 ripple">
          <i className="fas fa-chart-area fa-fw me-3"></i><span>Create Sessions</span>
        </a>
      </div>
    </div>
  </nav>
    </header>
  )
}

export default Navbar