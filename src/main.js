import './style.css'
import { PDFCreator } from './components/PDFCreator.js'
import { Navigation } from './components/Navigation.js'

class App {
  constructor() {
    this.currentView = 'text'
    this.pdfCreator = new PDFCreator()
    this.navigation = new Navigation(this.handleViewChange.bind(this))
    this.init()
  }

  init() {
    this.render()
    this.setupEventListeners()
  }

  handleViewChange(view) {
    this.currentView = view
    this.render()
  }

  render() {
    const app = document.querySelector('#app')
    app.innerHTML = `
      <div class="app">
        <header class="header">
          <div class="container">
            <h1 class="logo">
              <svg class="logo-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
                <polyline points="14,2 14,8 20,8"/>
                <line x1="16" y1="13" x2="8" y2="13"/>
                <line x1="16" y1="17" x2="8" y2="17"/>
                <polyline points="10,9 9,9 8,9"/>
              </svg>
              PDF Creator Pro
            </h1>
            <p class="tagline">Create professional PDFs instantly</p>
          </div>
        </header>

        <main class="main">
          <div class="container">
            ${this.navigation.render()}
            <div class="content">
              ${this.pdfCreator.render(this.currentView)}
            </div>
          </div>
        </main>

        <footer class="footer">
          <div class="container">
            <p>&copy; 2025 PDF Creator Pro. Create beautiful PDFs with ease.</p>
          </div>
        </footer>
      </div>
    `

    this.navigation.attachEventListeners()
    this.pdfCreator.attachEventListeners(this.currentView)
  }

  setupEventListeners() {
    // Handle responsive navigation
    document.addEventListener('click', (e) => {
      if (e.target.matches('.nav-toggle')) {
        const nav = document.querySelector('.nav')
        nav.classList.toggle('nav-open')
      }
    })
  }
}

// Initialize the app
new App()