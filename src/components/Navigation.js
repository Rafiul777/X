export class Navigation {
  constructor(onViewChange) {
    this.onViewChange = onViewChange
    this.currentView = 'text'
  }

  render() {
    return `
      <nav class="nav">
        <button class="nav-toggle">
          <span></span>
          <span></span>
          <span></span>
        </button>
        <div class="nav-items">
          <button class="nav-item ${this.currentView === 'text' ? 'active' : ''}" data-view="text">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
              <polyline points="14,2 14,8 20,8"/>
              <line x1="16" y1="13" x2="8" y2="13"/>
              <line x1="16" y1="17" x2="8" y2="17"/>
            </svg>
            Text to PDF
          </button>
          <button class="nav-item ${this.currentView === 'form' ? 'active' : ''}" data-view="form">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
              <polyline points="14,2 14,8 20,8"/>
              <rect x="8" y="12" width="8" height="2"/>
              <rect x="8" y="16" width="6" height="2"/>
            </svg>
            Form to PDF
          </button>
          <button class="nav-item ${this.currentView === 'invoice' ? 'active' : ''}" data-view="invoice">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
              <polyline points="14,2 14,8 20,8"/>
              <line x1="12" y1="18" x2="12" y2="12"/>
              <line x1="9" y1="15" x2="15" y2="15"/>
            </svg>
            Invoice Generator
          </button>
          <button class="nav-item ${this.currentView === 'resume' ? 'active' : ''}" data-view="resume">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"/>
              <rect x="8" y="2" width="8" height="4" rx="1" ry="1"/>
            </svg>
            Resume Builder
          </button>
        </div>
      </nav>
    `
  }

  attachEventListeners() {
    const navItems = document.querySelectorAll('.nav-item')
    navItems.forEach(item => {
      item.addEventListener('click', (e) => {
        const view = e.currentTarget.dataset.view
        this.currentView = view
        this.onViewChange(view)
      })
    })
  }
}