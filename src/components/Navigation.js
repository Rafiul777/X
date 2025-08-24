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
          <button class="nav-item ${this.currentView === 'photo' ? 'active' : ''}" data-view="photo">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <rect x="3" y="3" width="18" height="18" rx="2" ry="2"/>
              <circle cx="8.5" cy="8.5" r="1.5"/>
              <polyline points="21,15 16,10 5,21"/>
            </svg>
            Photo to PDF
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