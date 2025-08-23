import jsPDF from 'jspdf'
import html2canvas from 'html2canvas'

export class PDFCreator {
  constructor() {
    this.pdf = null
  }

  render(view) {
    switch (view) {
      case 'text':
        return this.renderTextToPDF()
      case 'form':
        return this.renderFormToPDF()
      case 'invoice':
        return this.renderInvoiceGenerator()
      case 'resume':
        return this.renderResumeBuilder()
      case 'photo':
        return this.renderPhotoToPDF()
      default:
        return this.renderTextToPDF()
    }
  }

  renderTextToPDF() {
    return `
      <div class="pdf-creator">
        <div class="creator-header">
          <h2>Text to PDF Converter</h2>
          <p>Convert your text content into a professional PDF document</p>
        </div>
        
        <div class="creator-content">
          <div class="input-section">
            <div class="form-group">
              <label for="pdf-title">Document Title</label>
              <input type="text" id="pdf-title" placeholder="Enter document title..." value="My Document">
            </div>
            
            <div class="form-group">
              <label for="pdf-content">Content</label>
              <textarea id="pdf-content" placeholder="Enter your text content here..." rows="12">Welcome to PDF Creator Pro!

This is a sample document that demonstrates the text-to-PDF conversion feature.

Key Features:
• Easy text input
• Professional formatting
• Instant PDF generation
• Download ready files

You can replace this text with your own content and generate a beautiful PDF document instantly.

Thank you for using PDF Creator Pro!</textarea>
            </div>
            
            <div class="form-row">
              <div class="form-group">
                <label for="font-size">Font Size</label>
                <select id="font-size">
                  <option value="10">10pt</option>
                  <option value="12" selected>12pt</option>
                  <option value="14">14pt</option>
                  <option value="16">16pt</option>
                  <option value="18">18pt</option>
                </select>
              </div>
              
              <div class="form-group">
                <label for="line-height">Line Height</label>
                <select id="line-height">
                  <option value="1.2">1.2</option>
                  <option value="1.5" selected>1.5</option>
                  <option value="1.8">1.8</option>
                  <option value="2.0">2.0</option>
                </select>
              </div>
            </div>
          </div>
          
          <div class="preview-section">
            <h3>Preview</h3>
            <div class="pdf-preview" id="text-preview">
              <div class="preview-content">
                <h1>My Document</h1>
                <div class="preview-text">
                  Welcome to PDF Creator Pro!<br><br>
                  This is a sample document that demonstrates the text-to-PDF conversion feature.<br><br>
                  Key Features:<br>
                  • Easy text input<br>
                  • Professional formatting<br>
                  • Instant PDF generation<br>
                  • Download ready files<br><br>
                  You can replace this text with your own content and generate a beautiful PDF document instantly.<br><br>
                  Thank you for using PDF Creator Pro!
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div class="creator-actions">
          <button class="btn btn-primary" id="generate-text-pdf">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
              <polyline points="7,10 12,15 17,10"/>
              <line x1="12" y1="15" x2="12" y2="3"/>
            </svg>
            Generate PDF
          </button>
          <button class="btn btn-secondary" id="clear-text">Clear All</button>
        </div>
      </div>
    `
  }

  renderFormToPDF() {
    return `
      <div class="pdf-creator">
        <div class="creator-header">
          <h2>Form to PDF Generator</h2>
          <p>Create structured PDF documents from form data</p>
        </div>
        
        <div class="creator-content">
          <div class="input-section">
            <div class="form-group">
              <label for="form-title">Form Title</label>
              <input type="text" id="form-title" placeholder="Enter form title..." value="Contact Information Form">
            </div>
            
            <div class="form-row">
              <div class="form-group">
                <label for="first-name">First Name</label>
                <input type="text" id="first-name" placeholder="John">
              </div>
              <div class="form-group">
                <label for="last-name">Last Name</label>
                <input type="text" id="last-name" placeholder="Doe">
              </div>
            </div>
            
            <div class="form-group">
              <label for="email">Email Address</label>
              <input type="email" id="email" placeholder="john.doe@example.com">
            </div>
            
            <div class="form-row">
              <div class="form-group">
                <label for="phone">Phone Number</label>
                <input type="tel" id="phone" placeholder="+1 (555) 123-4567">
              </div>
              <div class="form-group">
                <label for="date">Date</label>
                <input type="date" id="date">
              </div>
            </div>
            
            <div class="form-group">
              <label for="address">Address</label>
              <textarea id="address" rows="3" placeholder="123 Main Street, City, State, ZIP"></textarea>
            </div>
            
            <div class="form-group">
              <label for="comments">Additional Comments</label>
              <textarea id="comments" rows="4" placeholder="Enter any additional information..."></textarea>
            </div>
          </div>
          
          <div class="preview-section">
            <h3>Form Preview</h3>
            <div class="pdf-preview" id="form-preview">
              <div class="preview-content">
                <h1>Contact Information Form</h1>
                <div class="form-preview-content">
                  <div class="preview-field">
                    <strong>Name:</strong> <span id="preview-name">John Doe</span>
                  </div>
                  <div class="preview-field">
                    <strong>Email:</strong> <span id="preview-email">john.doe@example.com</span>
                  </div>
                  <div class="preview-field">
                    <strong>Phone:</strong> <span id="preview-phone">+1 (555) 123-4567</span>
                  </div>
                  <div class="preview-field">
                    <strong>Date:</strong> <span id="preview-date">2025-01-01</span>
                  </div>
                  <div class="preview-field">
                    <strong>Address:</strong> <span id="preview-address">123 Main Street, City, State, ZIP</span>
                  </div>
                  <div class="preview-field">
                    <strong>Comments:</strong> <span id="preview-comments">Enter any additional information...</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div class="creator-actions">
          <button class="btn btn-primary" id="generate-form-pdf">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
              <polyline points="7,10 12,15 17,10"/>
              <line x1="12" y1="15" x2="12" y2="3"/>
            </svg>
            Generate PDF
          </button>
          <button class="btn btn-secondary" id="clear-form">Clear Form</button>
        </div>
      </div>
    `
  }

  renderInvoiceGenerator() {
    return `
      <div class="pdf-creator">
        <div class="creator-header">
          <h2>Invoice Generator</h2>
          <p>Create professional invoices in PDF format</p>
        </div>
        
        <div class="creator-content">
          <div class="input-section">
            <div class="form-row">
              <div class="form-group">
                <label for="invoice-number">Invoice Number</label>
                <input type="text" id="invoice-number" value="INV-001">
              </div>
              <div class="form-group">
                <label for="invoice-date">Invoice Date</label>
                <input type="date" id="invoice-date">
              </div>
            </div>
            
            <div class="form-section">
              <h3>From (Your Information)</h3>
              <div class="form-group">
                <label for="from-name">Company/Name</label>
                <input type="text" id="from-name" placeholder="Your Company Name">
              </div>
              <div class="form-group">
                <label for="from-address">Address</label>
                <textarea id="from-address" rows="3" placeholder="Your company address"></textarea>
              </div>
            </div>
            
            <div class="form-section">
              <h3>To (Client Information)</h3>
              <div class="form-group">
                <label for="to-name">Client Name</label>
                <input type="text" id="to-name" placeholder="Client Company Name">
              </div>
              <div class="form-group">
                <label for="to-address">Client Address</label>
                <textarea id="to-address" rows="3" placeholder="Client address"></textarea>
              </div>
            </div>
            
            <div class="form-section">
              <h3>Invoice Items</h3>
              <div id="invoice-items">
                <div class="invoice-item">
                  <div class="form-row">
                    <div class="form-group flex-2">
                      <label>Description</label>
                      <input type="text" class="item-description" placeholder="Service or product description">
                    </div>
                    <div class="form-group">
                      <label>Quantity</label>
                      <input type="number" class="item-quantity" value="1" min="1">
                    </div>
                    <div class="form-group">
                      <label>Rate ($)</label>
                      <input type="number" class="item-rate" value="0" min="0" step="0.01">
                    </div>
                    <div class="form-group">
                      <label>Amount ($)</label>
                      <input type="number" class="item-amount" value="0" readonly>
                    </div>
                  </div>
                </div>
              </div>
              <button type="button" class="btn btn-secondary" id="add-item">Add Item</button>
            </div>
          </div>
          
          <div class="preview-section">
            <h3>Invoice Preview</h3>
            <div class="pdf-preview" id="invoice-preview">
              <div class="preview-content invoice-preview-content">
                <div class="invoice-header">
                  <h1>INVOICE</h1>
                  <div class="invoice-info">
                    <div><strong>Invoice #:</strong> <span id="preview-invoice-number">INV-001</span></div>
                    <div><strong>Date:</strong> <span id="preview-invoice-date">2025-01-01</span></div>
                  </div>
                </div>
                
                <div class="invoice-parties">
                  <div class="invoice-from">
                    <h3>From:</h3>
                    <div id="preview-from-info">Your Company Name<br>Your company address</div>
                  </div>
                  <div class="invoice-to">
                    <h3>To:</h3>
                    <div id="preview-to-info">Client Company Name<br>Client address</div>
                  </div>
                </div>
                
                <div class="invoice-items-preview">
                  <table>
                    <thead>
                      <tr>
                        <th>Description</th>
                        <th>Qty</th>
                        <th>Rate</th>
                        <th>Amount</th>
                      </tr>
                    </thead>
                    <tbody id="preview-items">
                      <tr>
                        <td>Sample Service</td>
                        <td>1</td>
                        <td>$0.00</td>
                        <td>$0.00</td>
                      </tr>
                    </tbody>
                  </table>
                  
                  <div class="invoice-total">
                    <div><strong>Total: $<span id="preview-total">0.00</span></strong></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div class="creator-actions">
          <button class="btn btn-primary" id="generate-invoice-pdf">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
              <polyline points="7,10 12,15 17,10"/>
              <line x1="12" y1="15" x2="12" y2="3"/>
            </svg>
            Generate Invoice PDF
          </button>
          <button class="btn btn-secondary" id="clear-invoice">Clear Invoice</button>
        </div>
      </div>
    `
  }

  renderResumeBuilder() {
    return `
      <div class="pdf-creator">
        <div class="creator-header">
          <h2>Resume Builder</h2>
          <p>Create a professional resume in PDF format</p>
        </div>
        
        <div class="creator-content">
          <div class="input-section">
            <div class="form-section">
              <h3>Personal Information</h3>
              <div class="form-row">
                <div class="form-group">
                  <label for="resume-name">Full Name</label>
                  <input type="text" id="resume-name" placeholder="John Doe">
                </div>
                <div class="form-group">
                  <label for="resume-title">Professional Title</label>
                  <input type="text" id="resume-title" placeholder="Software Developer">
                </div>
              </div>
              
              <div class="form-row">
                <div class="form-group">
                  <label for="resume-email">Email</label>
                  <input type="email" id="resume-email" placeholder="john@example.com">
                </div>
                <div class="form-group">
                  <label for="resume-phone">Phone</label>
                  <input type="tel" id="resume-phone" placeholder="+1 (555) 123-4567">
                </div>
              </div>
              
              <div class="form-group">
                <label for="resume-summary">Professional Summary</label>
                <textarea id="resume-summary" rows="4" placeholder="Brief professional summary..."></textarea>
              </div>
            </div>
            
            <div class="form-section">
              <h3>Experience</h3>
              <div id="experience-items">
                <div class="experience-item">
                  <div class="form-group">
                    <label>Job Title</label>
                    <input type="text" class="exp-title" placeholder="Software Developer">
                  </div>
                  <div class="form-row">
                    <div class="form-group">
                      <label>Company</label>
                      <input type="text" class="exp-company" placeholder="Tech Company Inc.">
                    </div>
                    <div class="form-group">
                      <label>Duration</label>
                      <input type="text" class="exp-duration" placeholder="2020 - Present">
                    </div>
                  </div>
                  <div class="form-group">
                    <label>Description</label>
                    <textarea class="exp-description" rows="3" placeholder="Job responsibilities and achievements..."></textarea>
                  </div>
                </div>
              </div>
              <button type="button" class="btn btn-secondary" id="add-experience">Add Experience</button>
            </div>
            
            <div class="form-section">
              <h3>Skills</h3>
              <div class="form-group">
                <label for="resume-skills">Skills (comma-separated)</label>
                <textarea id="resume-skills" rows="3" placeholder="JavaScript, React, Node.js, Python, SQL"></textarea>
              </div>
            </div>
          </div>
          
          <div class="preview-section">
            <h3>Resume Preview</h3>
            <div class="pdf-preview" id="resume-preview">
              <div class="preview-content resume-preview-content">
                <div class="resume-header">
                  <h1 id="preview-resume-name">John Doe</h1>
                  <h2 id="preview-resume-title">Software Developer</h2>
                  <div class="resume-contact">
                    <span id="preview-resume-email">john@example.com</span> | 
                    <span id="preview-resume-phone">+1 (555) 123-4567</span>
                  </div>
                </div>
                
                <div class="resume-section">
                  <h3>Professional Summary</h3>
                  <p id="preview-resume-summary">Brief professional summary...</p>
                </div>
                
                <div class="resume-section">
                  <h3>Experience</h3>
                  <div id="preview-experience">
                    <div class="experience-entry">
                      <div class="exp-header">
                        <strong>Software Developer</strong> at <strong>Tech Company Inc.</strong>
                        <span class="exp-duration">2020 - Present</span>
                      </div>
                      <p>Job responsibilities and achievements...</p>
                    </div>
                  </div>
                </div>
                
                <div class="resume-section">
                  <h3>Skills</h3>
                  <div id="preview-skills">JavaScript, React, Node.js, Python, SQL</div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div class="creator-actions">
          <button class="btn btn-primary" id="generate-resume-pdf">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
              <polyline points="7,10 12,15 17,10"/>
              <line x1="12" y1="15" x2="12" y2="3"/>
            </svg>
            Generate Resume PDF
          </button>
          <button class="btn btn-secondary" id="clear-resume">Clear Resume</button>
        </div>
      </div>
    `
  }

  renderPhotoToPDF() {
    return `
      <div class="pdf-creator">
        <div class="creator-header">
          <h2>Photo to PDF Converter</h2>
          <p>Upload images and convert them into a professional PDF document</p>
        </div>
        
        <div class="creator-content">
          <div class="input-section">
            <div class="form-group">
              <label for="pdf-photo-title">Document Title</label>
              <input type="text" id="pdf-photo-title" placeholder="Enter document title..." value="Photo Collection">
            </div>
            
            <div class="form-group">
              <label for="photo-upload">Upload Photos</label>
              <input type="file" id="photo-upload" accept="image/*" multiple class="file-input">
              <div class="upload-area" id="upload-area">
                <div class="upload-content">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="upload-icon">
                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                    <polyline points="17,8 12,3 7,8"/>
                    <line x1="12" y1="3" x2="12" y2="15"/>
                  </svg>
                  <p>Click to upload photos or drag and drop</p>
                  <p class="upload-hint">Supports JPG, PNG, GIF, WebP</p>
                </div>
              </div>
            </div>
            
            <div class="form-row">
              <div class="form-group">
                <label for="photo-layout">Layout</label>
                <select id="photo-layout">
                  <option value="single">One photo per page</option>
                  <option value="grid-2x2">2x2 Grid (4 photos per page)</option>
                  <option value="grid-3x3">3x3 Grid (9 photos per page)</option>
                  <option value="collage">Auto-fit collage</option>
                </select>
              </div>
              
              <div class="form-group">
                <label for="photo-quality">Image Quality</label>
                <select id="photo-quality">
                  <option value="high">High Quality</option>
                  <option value="medium" selected>Medium Quality</option>
                  <option value="low">Low Quality (smaller file)</option>
                </select>
              </div>
            </div>
            
            <div class="form-group">
              <label>
                <input type="checkbox" id="include-filenames"> Include filenames as captions
              </label>
            </div>
            
            <div id="photo-list" class="photo-list"></div>
          </div>
          
          <div class="preview-section">
            <h3>Preview</h3>
            <div class="pdf-preview" id="photo-preview">
              <div class="preview-content">
                <h1>Photo Collection</h1>
                <div class="photo-preview-content">
                  <div class="preview-placeholder">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                      <rect x="3" y="3" width="18" height="18" rx="2" ry="2"/>
                      <circle cx="8.5" cy="8.5" r="1.5"/>
                      <polyline points="21,15 16,10 5,21"/>
                    </svg>
                    <p>Upload photos to see preview</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div class="creator-actions">
          <button class="btn btn-primary" id="generate-photo-pdf" disabled>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
              <polyline points="7,10 12,15 17,10"/>
              <line x1="12" y1="15" x2="12" y2="3"/>
            </svg>
            Generate PDF
          </button>
          <button class="btn btn-secondary" id="clear-photos">Clear All Photos</button>
        </div>
      </div>
    `
  }

  attachEventListeners(view) {
    switch (view) {
      case 'text':
        this.attachTextEventListeners()
        break
      case 'form':
        this.attachFormEventListeners()
        break
      case 'invoice':
        this.attachInvoiceEventListeners()
        break
      case 'resume':
        this.attachResumeEventListeners()
        break
      case 'photo':
        this.attachPhotoEventListeners()
        break
    }
  }

  attachTextEventListeners() {
    const titleInput = document.getElementById('pdf-title')
    const contentInput = document.getElementById('pdf-content')
    const fontSizeSelect = document.getElementById('font-size')
    const lineHeightSelect = document.getElementById('line-height')
    const generateBtn = document.getElementById('generate-text-pdf')
    const clearBtn = document.getElementById('clear-text')

    const updatePreview = () => {
      const preview = document.getElementById('text-preview')
      const title = titleInput.value || 'Untitled Document'
      const content = contentInput.value || 'No content'
      const fontSize = fontSizeSelect.value
      const lineHeight = lineHeightSelect.value

      preview.innerHTML = `
        <div class="preview-content">
          <h1>${title}</h1>
          <div class="preview-text" style="font-size: ${fontSize}px; line-height: ${lineHeight};">
            ${content.replace(/\n/g, '<br>')}
          </div>
        </div>
      `
    }

    titleInput?.addEventListener('input', updatePreview)
    contentInput?.addEventListener('input', updatePreview)
    fontSizeSelect?.addEventListener('change', updatePreview)
    lineHeightSelect?.addEventListener('change', updatePreview)

    generateBtn?.addEventListener('click', () => {
      this.generateTextPDF()
    })

    clearBtn?.addEventListener('click', () => {
      titleInput.value = ''
      contentInput.value = ''
      updatePreview()
    })

    updatePreview()
  }

  attachFormEventListeners() {
    const inputs = [
      'form-title', 'first-name', 'last-name', 'email', 
      'phone', 'date', 'address', 'comments'
    ]

    const updatePreview = () => {
      const title = document.getElementById('form-title')?.value || 'Form'
      const firstName = document.getElementById('first-name')?.value || ''
      const lastName = document.getElementById('last-name')?.value || ''
      const email = document.getElementById('email')?.value || ''
      const phone = document.getElementById('phone')?.value || ''
      const date = document.getElementById('date')?.value || ''
      const address = document.getElementById('address')?.value || ''
      const comments = document.getElementById('comments')?.value || ''

      document.querySelector('#form-preview h1').textContent = title
      document.getElementById('preview-name').textContent = `${firstName} ${lastName}`.trim() || 'Not provided'
      document.getElementById('preview-email').textContent = email || 'Not provided'
      document.getElementById('preview-phone').textContent = phone || 'Not provided'
      document.getElementById('preview-date').textContent = date || 'Not provided'
      document.getElementById('preview-address').textContent = address || 'Not provided'
      document.getElementById('preview-comments').textContent = comments || 'Not provided'
    }

    inputs.forEach(id => {
      const element = document.getElementById(id)
      element?.addEventListener('input', updatePreview)
    })

    document.getElementById('generate-form-pdf')?.addEventListener('click', () => {
      this.generateFormPDF()
    })

    document.getElementById('clear-form')?.addEventListener('click', () => {
      inputs.forEach(id => {
        const element = document.getElementById(id)
        if (element) element.value = ''
      })
      updatePreview()
    })

    // Set current date
    const dateInput = document.getElementById('date')
    if (dateInput) {
      dateInput.value = new Date().toISOString().split('T')[0]
    }

    updatePreview()
  }

  attachInvoiceEventListeners() {
    const updatePreview = () => {
      const invoiceNumber = document.getElementById('invoice-number')?.value || 'INV-001'
      const invoiceDate = document.getElementById('invoice-date')?.value || new Date().toISOString().split('T')[0]
      const fromName = document.getElementById('from-name')?.value || 'Your Company'
      const fromAddress = document.getElementById('from-address')?.value || 'Your Address'
      const toName = document.getElementById('to-name')?.value || 'Client Name'
      const toAddress = document.getElementById('to-address')?.value || 'Client Address'

      document.getElementById('preview-invoice-number').textContent = invoiceNumber
      document.getElementById('preview-invoice-date').textContent = invoiceDate
      document.getElementById('preview-from-info').innerHTML = `${fromName}<br>${fromAddress.replace(/\n/g, '<br>')}`
      document.getElementById('preview-to-info').innerHTML = `${toName}<br>${toAddress.replace(/\n/g, '<br>')}`

      this.updateInvoiceItems()
    }

    const updateInvoiceItems = () => {
      const items = document.querySelectorAll('.invoice-item')
      const previewItems = document.getElementById('preview-items')
      let total = 0

      previewItems.innerHTML = ''

      items.forEach(item => {
        const description = item.querySelector('.item-description')?.value || 'Item'
        const quantity = parseFloat(item.querySelector('.item-quantity')?.value) || 0
        const rate = parseFloat(item.querySelector('.item-rate')?.value) || 0
        const amount = quantity * rate

        total += amount

        const row = document.createElement('tr')
        row.innerHTML = `
          <td>${description}</td>
          <td>${quantity}</td>
          <td>$${rate.toFixed(2)}</td>
          <td>$${amount.toFixed(2)}</td>
        `
        previewItems.appendChild(row)
      })

      document.getElementById('preview-total').textContent = total.toFixed(2)
    }

    this.updateInvoiceItems = updateInvoiceItems

    // Add event listeners for existing inputs
    const inputs = ['invoice-number', 'invoice-date', 'from-name', 'from-address', 'to-name', 'to-address']
    inputs.forEach(id => {
      document.getElementById(id)?.addEventListener('input', updatePreview)
    })

    // Add item functionality
    document.getElementById('add-item')?.addEventListener('click', () => {
      const itemsContainer = document.getElementById('invoice-items')
      const newItem = document.createElement('div')
      newItem.className = 'invoice-item'
      newItem.innerHTML = `
        <div class="form-row">
          <div class="form-group flex-2">
            <label>Description</label>
            <input type="text" class="item-description" placeholder="Service or product description">
          </div>
          <div class="form-group">
            <label>Quantity</label>
            <input type="number" class="item-quantity" value="1" min="1">
          </div>
          <div class="form-group">
            <label>Rate ($)</label>
            <input type="number" class="item-rate" value="0" min="0" step="0.01">
          </div>
          <div class="form-group">
            <label>Amount ($)</label>
            <input type="number" class="item-amount" value="0" readonly>
          </div>
          <button type="button" class="btn btn-danger remove-item">Remove</button>
        </div>
      `
      itemsContainer.appendChild(newItem)

      // Add event listeners to new item
      this.attachItemEventListeners(newItem)
    })

    // Attach event listeners to existing items
    document.querySelectorAll('.invoice-item').forEach(item => {
      this.attachItemEventListeners(item)
    })

    document.getElementById('generate-invoice-pdf')?.addEventListener('click', () => {
      this.generateInvoicePDF()
    })

    document.getElementById('clear-invoice')?.addEventListener('click', () => {
      inputs.forEach(id => {
        const element = document.getElementById(id)
        if (element) element.value = ''
      })
      // Reset to one item
      const itemsContainer = document.getElementById('invoice-items')
      itemsContainer.innerHTML = `
        <div class="invoice-item">
          <div class="form-row">
            <div class="form-group flex-2">
              <label>Description</label>
              <input type="text" class="item-description" placeholder="Service or product description">
            </div>
            <div class="form-group">
              <label>Quantity</label>
              <input type="number" class="item-quantity" value="1" min="1">
            </div>
            <div class="form-group">
              <label>Rate ($)</label>
              <input type="number" class="item-rate" value="0" min="0" step="0.01">
            </div>
            <div class="form-group">
              <label>Amount ($)</label>
              <input type="number" class="item-amount" value="0" readonly>
            </div>
          </div>
        </div>
      `
      document.querySelectorAll('.invoice-item').forEach(item => {
        this.attachItemEventListeners(item)
      })
      updatePreview()
    })

    // Set current date
    const dateInput = document.getElementById('invoice-date')
    if (dateInput) {
      dateInput.value = new Date().toISOString().split('T')[0]
    }

    updatePreview()
  }

  attachItemEventListeners(item) {
    const quantityInput = item.querySelector('.item-quantity')
    const rateInput = item.querySelector('.item-rate')
    const amountInput = item.querySelector('.item-amount')
    const removeBtn = item.querySelector('.remove-item')

    const updateAmount = () => {
      const quantity = parseFloat(quantityInput?.value) || 0
      const rate = parseFloat(rateInput?.value) || 0
      const amount = quantity * rate
      if (amountInput) amountInput.value = amount.toFixed(2)
      this.updateInvoiceItems()
    }

    quantityInput?.addEventListener('input', updateAmount)
    rateInput?.addEventListener('input', updateAmount)
    item.querySelector('.item-description')?.addEventListener('input', () => this.updateInvoiceItems())

    removeBtn?.addEventListener('click', () => {
      if (document.querySelectorAll('.invoice-item').length > 1) {
        item.remove()
        this.updateInvoiceItems()
      }
    })

    updateAmount()
  }

  attachResumeEventListeners() {
    const updatePreview = () => {
      const name = document.getElementById('resume-name')?.value || 'Your Name'
      const title = document.getElementById('resume-title')?.value || 'Professional Title'
      const email = document.getElementById('resume-email')?.value || 'email@example.com'
      const phone = document.getElementById('resume-phone')?.value || 'Phone Number'
      const summary = document.getElementById('resume-summary')?.value || 'Professional summary...'
      const skills = document.getElementById('resume-skills')?.value || 'Your skills...'

      document.getElementById('preview-resume-name').textContent = name
      document.getElementById('preview-resume-title').textContent = title
      document.getElementById('preview-resume-email').textContent = email
      document.getElementById('preview-resume-phone').textContent = phone
      document.getElementById('preview-resume-summary').textContent = summary
      document.getElementById('preview-skills').textContent = skills

      this.updateExperiencePreview()
    }

    const updateExperiencePreview = () => {
      const experiences = document.querySelectorAll('.experience-item')
      const previewContainer = document.getElementById('preview-experience')
      
      previewContainer.innerHTML = ''

      experiences.forEach(exp => {
        const title = exp.querySelector('.exp-title')?.value || 'Job Title'
        const company = exp.querySelector('.exp-company')?.value || 'Company'
        const duration = exp.querySelector('.exp-duration')?.value || 'Duration'
        const description = exp.querySelector('.exp-description')?.value || 'Job description...'

        const expDiv = document.createElement('div')
        expDiv.className = 'experience-entry'
        expDiv.innerHTML = `
          <div class="exp-header">
            <strong>${title}</strong> at <strong>${company}</strong>
            <span class="exp-duration">${duration}</span>
          </div>
          <p>${description}</p>
        `
        previewContainer.appendChild(expDiv)
      })
    }

    this.updateExperiencePreview = updateExperiencePreview

    // Add event listeners for basic inputs
    const inputs = ['resume-name', 'resume-title', 'resume-email', 'resume-phone', 'resume-summary', 'resume-skills']
    inputs.forEach(id => {
      document.getElementById(id)?.addEventListener('input', updatePreview)
    })

    // Add experience functionality
    document.getElementById('add-experience')?.addEventListener('click', () => {
      const container = document.getElementById('experience-items')
      const newExp = document.createElement('div')
      newExp.className = 'experience-item'
      newExp.innerHTML = `
        <div class="form-group">
          <label>Job Title</label>
          <input type="text" class="exp-title" placeholder="Software Developer">
        </div>
        <div class="form-row">
          <div class="form-group">
            <label>Company</label>
            <input type="text" class="exp-company" placeholder="Tech Company Inc.">
          </div>
          <div class="form-group">
            <label>Duration</label>
            <input type="text" class="exp-duration" placeholder="2020 - Present">
          </div>
        </div>
        <div class="form-group">
          <label>Description</label>
          <textarea class="exp-description" rows="3" placeholder="Job responsibilities and achievements..."></textarea>
        </div>
        <button type="button" class="btn btn-danger remove-experience">Remove Experience</button>
      `
      container.appendChild(newExp)

      this.attachExperienceEventListeners(newExp)
    })

    // Attach event listeners to existing experiences
    document.querySelectorAll('.experience-item').forEach(exp => {
      this.attachExperienceEventListeners(exp)
    })

    document.getElementById('generate-resume-pdf')?.addEventListener('click', () => {
      this.generateResumePDF()
    })

    document.getElementById('clear-resume')?.addEventListener('click', () => {
      inputs.forEach(id => {
        const element = document.getElementById(id)
        if (element) element.value = ''
      })
      // Reset to one experience
      const container = document.getElementById('experience-items')
      container.innerHTML = `
        <div class="experience-item">
          <div class="form-group">
            <label>Job Title</label>
            <input type="text" class="exp-title" placeholder="Software Developer">
          </div>
          <div class="form-row">
            <div class="form-group">
              <label>Company</label>
              <input type="text" class="exp-company" placeholder="Tech Company Inc.">
            </div>
            <div class="form-group">
              <label>Duration</label>
              <input type="text" class="exp-duration" placeholder="2020 - Present">
            </div>
          </div>
          <div class="form-group">
            <label>Description</label>
            <textarea class="exp-description" rows="3" placeholder="Job responsibilities and achievements..."></textarea>
          </div>
        </div>
      `
      document.querySelectorAll('.experience-item').forEach(exp => {
        this.attachExperienceEventListeners(exp)
      })
      updatePreview()
    })

    updatePreview()
  }

  attachExperienceEventListeners(exp) {
    const inputs = exp.querySelectorAll('input, textarea')
    inputs.forEach(input => {
      input.addEventListener('input', () => this.updateExperiencePreview())
    })

    const removeBtn = exp.querySelector('.remove-experience')
    removeBtn?.addEventListener('click', () => {
      if (document.querySelectorAll('.experience-item').length > 1) {
        exp.remove()
        this.updateExperiencePreview()
      }
    })
  }

  generateTextPDF() {
    const title = document.getElementById('pdf-title')?.value || 'Document'
    const content = document.getElementById('pdf-content')?.value || 'No content'
    const fontSize = parseInt(document.getElementById('font-size')?.value) || 12
    const lineHeight = parseFloat(document.getElementById('line-height')?.value) || 1.5

    const pdf = new jsPDF()
    
    // Add title
    pdf.setFontSize(18)
    pdf.setFont(undefined, 'bold')
    pdf.text(title, 20, 30)
    
    // Add content
    pdf.setFontSize(fontSize)
    pdf.setFont(undefined, 'normal')
    
    const lines = pdf.splitTextToSize(content, 170)
    let yPosition = 50
    
    lines.forEach(line => {
      if (yPosition > 280) {
        pdf.addPage()
        yPosition = 20
      }
      pdf.text(line, 20, yPosition)
      yPosition += fontSize * lineHeight
    })
    
    pdf.save(`${title.replace(/[^a-z0-9]/gi, '_').toLowerCase()}.pdf`)
  }

  generateFormPDF() {
    const title = document.getElementById('form-title')?.value || 'Form'
    const firstName = document.getElementById('first-name')?.value || ''
    const lastName = document.getElementById('last-name')?.value || ''
    const email = document.getElementById('email')?.value || ''
    const phone = document.getElementById('phone')?.value || ''
    const date = document.getElementById('date')?.value || ''
    const address = document.getElementById('address')?.value || ''
    const comments = document.getElementById('comments')?.value || ''

    const pdf = new jsPDF()
    
    // Title
    pdf.setFontSize(18)
    pdf.setFont(undefined, 'bold')
    pdf.text(title, 20, 30)
    
    let yPos = 50
    pdf.setFontSize(12)
    pdf.setFont(undefined, 'normal')
    
    const addField = (label, value) => {
      pdf.setFont(undefined, 'bold')
      pdf.text(`${label}:`, 20, yPos)
      pdf.setFont(undefined, 'normal')
      pdf.text(value || 'Not provided', 60, yPos)
      yPos += 15
    }
    
    addField('Name', `${firstName} ${lastName}`.trim())
    addField('Email', email)
    addField('Phone', phone)
    addField('Date', date)
    addField('Address', address)
    
    if (comments) {
      pdf.setFont(undefined, 'bold')
      pdf.text('Comments:', 20, yPos)
      yPos += 10
      pdf.setFont(undefined, 'normal')
      const commentLines = pdf.splitTextToSize(comments, 170)
      commentLines.forEach(line => {
        pdf.text(line, 20, yPos)
        yPos += 10
      })
    }
    
    pdf.save(`${title.replace(/[^a-z0-9]/gi, '_').toLowerCase()}.pdf`)
  }

  generateInvoicePDF() {
    const invoiceNumber = document.getElementById('invoice-number')?.value || 'INV-001'
    const invoiceDate = document.getElementById('invoice-date')?.value || new Date().toISOString().split('T')[0]
    const fromName = document.getElementById('from-name')?.value || 'Your Company'
    const fromAddress = document.getElementById('from-address')?.value || 'Your Address'
    const toName = document.getElementById('to-name')?.value || 'Client Name'
    const toAddress = document.getElementById('to-address')?.value || 'Client Address'

    const pdf = new jsPDF()
    
    // Header
    pdf.setFontSize(24)
    pdf.setFont(undefined, 'bold')
    pdf.text('INVOICE', 20, 30)
    
    pdf.setFontSize(12)
    pdf.setFont(undefined, 'normal')
    pdf.text(`Invoice #: ${invoiceNumber}`, 20, 45)
    pdf.text(`Date: ${invoiceDate}`, 20, 55)
    
    // From/To sections
    pdf.setFont(undefined, 'bold')
    pdf.text('From:', 20, 75)
    pdf.setFont(undefined, 'normal')
    const fromLines = pdf.splitTextToSize(`${fromName}\n${fromAddress}`, 80)
    let yPos = 85
    fromLines.forEach(line => {
      pdf.text(line, 20, yPos)
      yPos += 10
    })
    
    pdf.setFont(undefined, 'bold')
    pdf.text('To:', 110, 75)
    pdf.setFont(undefined, 'normal')
    const toLines = pdf.splitTextToSize(`${toName}\n${toAddress}`, 80)
    yPos = 85
    toLines.forEach(line => {
      pdf.text(line, 110, yPos)
      yPos += 10
    })
    
    // Items table
    yPos = Math.max(yPos, 120)
    pdf.setFont(undefined, 'bold')
    pdf.text('Description', 20, yPos)
    pdf.text('Qty', 120, yPos)
    pdf.text('Rate', 140, yPos)
    pdf.text('Amount', 170, yPos)
    
    yPos += 10
    pdf.line(20, yPos, 190, yPos)
    yPos += 10
    
    let total = 0
    const items = document.querySelectorAll('.invoice-item')
    
    pdf.setFont(undefined, 'normal')
    items.forEach(item => {
      const description = item.querySelector('.item-description')?.value || 'Item'
      const quantity = parseFloat(item.querySelector('.item-quantity')?.value) || 0
      const rate = parseFloat(item.querySelector('.item-rate')?.value) || 0
      const amount = quantity * rate
      
      total += amount
      
      pdf.text(description, 20, yPos)
      pdf.text(quantity.toString(), 120, yPos)
      pdf.text(`$${rate.toFixed(2)}`, 140, yPos)
      pdf.text(`$${amount.toFixed(2)}`, 170, yPos)
      yPos += 15
    })
    
    // Total
    yPos += 10
    pdf.line(140, yPos, 190, yPos)
    yPos += 10
    pdf.setFont(undefined, 'bold')
    pdf.text(`Total: $${total.toFixed(2)}`, 140, yPos)
    
    pdf.save(`invoice_${invoiceNumber}.pdf`)
  }

  generateResumePDF() {
    const name = document.getElementById('resume-name')?.value || 'Your Name'
    const title = document.getElementById('resume-title')?.value || 'Professional Title'
    const email = document.getElementById('resume-email')?.value || 'email@example.com'
    const phone = document.getElementById('resume-phone')?.value || 'Phone Number'
    const summary = document.getElementById('resume-summary')?.value || 'Professional summary...'
    const skills = document.getElementById('resume-skills')?.value || 'Your skills...'

    const pdf = new jsPDF()
    
    // Header
    pdf.setFontSize(20)
    pdf.setFont(undefined, 'bold')
    pdf.text(name, 20, 30)
    
    pdf.setFontSize(14)
    pdf.setFont(undefined, 'normal')
    pdf.text(title, 20, 40)
    
    pdf.setFontSize(10)
    pdf.text(`${email} | ${phone}`, 20, 50)
    
    let yPos = 70
    
    // Summary
    pdf.setFontSize(14)
    pdf.setFont(undefined, 'bold')
    pdf.text('Professional Summary', 20, yPos)
    yPos += 10
    
    pdf.setFontSize(10)
    pdf.setFont(undefined, 'normal')
    const summaryLines = pdf.splitTextToSize(summary, 170)
    summaryLines.forEach(line => {
      pdf.text(line, 20, yPos)
      yPos += 8
    })
    
    yPos += 10
    
    // Experience
    pdf.setFontSize(14)
    pdf.setFont(undefined, 'bold')
    pdf.text('Experience', 20, yPos)
    yPos += 10
    
    const experiences = document.querySelectorAll('.experience-item')
    experiences.forEach(exp => {
      const jobTitle = exp.querySelector('.exp-title')?.value || 'Job Title'
      const company = exp.querySelector('.exp-company')?.value || 'Company'
      const duration = exp.querySelector('.exp-duration')?.value || 'Duration'
      const description = exp.querySelector('.exp-description')?.value || 'Job description...'
      
      pdf.setFontSize(12)
      pdf.setFont(undefined, 'bold')
      pdf.text(`${jobTitle} at ${company}`, 20, yPos)
      
      pdf.setFontSize(10)
      pdf.setFont(undefined, 'italic')
      pdf.text(duration, 20, yPos + 8)
      
      pdf.setFont(undefined, 'normal')
      const descLines = pdf.splitTextToSize(description, 170)
      yPos += 16
      descLines.forEach(line => {
        if (yPos > 280) {
          pdf.addPage()
          yPos = 20
        }
        pdf.text(line, 20, yPos)
        yPos += 8
      })
      
      yPos += 10
    })
    
    // Skills
    if (yPos > 250) {
      pdf.addPage()
      yPos = 20
    }
    
    pdf.setFontSize(14)
    pdf.setFont(undefined, 'bold')
    pdf.text('Skills', 20, yPos)
    yPos += 10
    
    pdf.setFontSize(10)
    pdf.setFont(undefined, 'normal')
    const skillsLines = pdf.splitTextToSize(skills, 170)
    skillsLines.forEach(line => {
      pdf.text(line, 20, yPos)
      yPos += 8
    })
    
    pdf.save(`${name.replace(/[^a-z0-9]/gi, '_').toLowerCase()}_resume.pdf`)
  }

  generatePhotoPDF() {
    const title = document.getElementById('pdf-photo-title')?.value || 'Photo Collection'
    const layout = document.getElementById('photo-layout')?.value || 'single'
    const quality = document.getElementById('photo-quality')?.value || 'medium'
    const includeFilenames = document.getElementById('include-filenames')?.checked || false

    if (this.uploadedPhotos.length === 0) {
      alert('Please upload at least one photo')
      return
    }
    const pdf = new jsPDF()
    let currentPage = 1
    
    // Quality settings
    const qualityMap = {
      high: 1.0,
      medium: 0.7,
      low: 0.4
    }
    const imageQuality = qualityMap[quality]
    
    // Page dimensions
    const pageWidth = pdf.internal.pageSize.getWidth()
    const pageHeight = pdf.internal.pageSize.getHeight()
    const margin = 20
    const usableWidth = pageWidth - (margin * 2)
    const usableHeight = pageHeight - (margin * 2)
    
    // Title on first page
    pdf.setFontSize(18)
    pdf.setFont(undefined, 'bold')
    pdf.text(title, margin, margin + 15)
    
    let yPosition = margin + 40
    let photosProcessed = 0
    
    const processPhotos = () => {
      if (layout === 'single') {
        // One photo per page
        this.uploadedPhotos.forEach((photo, index) => {
          if (index > 0) {
            pdf.addPage()
            yPosition = margin
          }
          
          const img = new Image()
          img.onload = () => {
            const imgWidth = img.width
            const imgHeight = img.height
            const aspectRatio = imgWidth / imgHeight
            
            let displayWidth = usableWidth
            let displayHeight = displayWidth / aspectRatio
            
            if (displayHeight > usableHeight - (includeFilenames ? 30 : 0)) {
              displayHeight = usableHeight - (includeFilenames ? 30 : 0)
              displayWidth = displayHeight * aspectRatio
            }
            
            const xPos = margin + (usableWidth - displayWidth) / 2
            
            pdf.addImage(photo.dataUrl, 'JPEG', xPos, yPosition, displayWidth, displayHeight, undefined, 'MEDIUM')
            
            if (includeFilenames) {
              pdf.setFontSize(10)
              pdf.setFont(undefined, 'normal')
              pdf.text(photo.name, margin, yPosition + displayHeight + 15)
            }
            
            photosProcessed++
            if (photosProcessed === this.uploadedPhotos.length) {
              pdf.save(`${title.replace(/[^a-z0-9]/gi, '_').toLowerCase()}.pdf`)
            }
          }
          img.src = photo.dataUrl
        })
      } else if (layout === 'grid-2x2') {
        // 2x2 grid - 4 photos per page
        const photosPerPage = 4
        const cols = 2
        const rows = 2
        const photoWidth = (usableWidth - 10) / cols
        const photoHeight = (usableHeight - 40 - 10) / rows
        
        for (let i = 0; i < this.uploadedPhotos.length; i += photosPerPage) {
          if (i > 0) {
            pdf.addPage()
            yPosition = margin + 40
          }
          
          const pagePhotos = this.uploadedPhotos.slice(i, i + photosPerPage)
          pagePhotos.forEach((photo, index) => {
            const col = index % cols
            const row = Math.floor(index / cols)
            const xPos = margin + col * (photoWidth + 5)
            const yPos = yPosition + row * (photoHeight + 5)
            
            pdf.addImage(photo.dataUrl, 'JPEG', xPos, yPos, photoWidth, photoHeight, undefined, 'MEDIUM')
            
            if (includeFilenames) {
              pdf.setFontSize(8)
              pdf.setFont(undefined, 'normal')
              const textWidth = pdf.getTextWidth(photo.name)
              if (textWidth > photoWidth) {
                const truncated = photo.name.substring(0, Math.floor(photo.name.length * photoWidth / textWidth)) + '...'
                pdf.text(truncated, xPos, yPos + photoHeight + 10)
              } else {
                pdf.text(photo.name, xPos, yPos + photoHeight + 10)
              }
            }
          })
        }
        
        pdf.save(`${title.replace(/[^a-z0-9]/gi, '_').toLowerCase()}.pdf`)
      } else if (layout === 'grid-3x3') {
        // 3x3 grid - 9 photos per page
        const photosPerPage = 9
        const cols = 3
        const rows = 3
        const photoWidth = (usableWidth - 20) / cols
        const photoHeight = (usableHeight - 40 - 20) / rows
        
        for (let i = 0; i < this.uploadedPhotos.length; i += photosPerPage) {
          if (i > 0) {
            pdf.addPage()
            yPosition = margin + 40
          }
          
          const pagePhotos = this.uploadedPhotos.slice(i, i + photosPerPage)
          pagePhotos.forEach((photo, index) => {
            const col = index % cols
            const row = Math.floor(index / cols)
            const xPos = margin + col * (photoWidth + 5)
            const yPos = yPosition + row * (photoHeight + 5)
            
            pdf.addImage(photo.dataUrl, 'JPEG', xPos, yPos, photoWidth, photoHeight, undefined, 'MEDIUM')
            
            if (includeFilenames) {
              pdf.setFontSize(6)
              pdf.setFont(undefined, 'normal')
              const textWidth = pdf.getTextWidth(photo.name)
              if (textWidth > photoWidth) {
                const truncated = photo.name.substring(0, Math.floor(photo.name.length * photoWidth / textWidth)) + '...'
                pdf.text(truncated, xPos, yPos + photoHeight + 8)
              } else {
                pdf.text(photo.name, xPos, yPos + photoHeight + 8)
              }
            }
          })
        }
        
        pdf.save(`${title.replace(/[^a-z0-9]/gi, '_').toLowerCase()}.pdf`)
      } else {
        // Collage layout - auto-fit
        const photosPerPage = 6
        
        for (let i = 0; i < this.uploadedPhotos.length; i += photosPerPage) {
          if (i > 0) {
            pdf.addPage()
            yPosition = margin + 40
          }
          
          const pagePhotos = this.uploadedPhotos.slice(i, i + photosPerPage)
          const photoWidth = usableWidth / 3
          const photoHeight = (usableHeight - 40) / 2
          
          pagePhotos.forEach((photo, index) => {
            const col = index % 3
            const row = Math.floor(index / 3)
            const xPos = margin + col * photoWidth
            const yPos = yPosition + row * photoHeight
            
            pdf.addImage(photo.dataUrl, 'JPEG', xPos, yPos, photoWidth - 5, photoHeight - 5, undefined, 'MEDIUM')
            
            if (includeFilenames) {
              pdf.setFontSize(8)
              pdf.setFont(undefined, 'normal')
              const textWidth = pdf.getTextWidth(photo.name)
              if (textWidth > photoWidth - 5) {
                const truncated = photo.name.substring(0, Math.floor(photo.name.length * (photoWidth - 5) / textWidth)) + '...'
                pdf.text(truncated, xPos, yPos + photoHeight - 15)
              } else {
                pdf.text(photo.name, xPos, yPos + photoHeight - 15)
              }
            }
          })
        }
        
        pdf.save(`${title.replace(/[^a-z0-9]/gi, '_').toLowerCase()}.pdf`)
      }
    }
    
    processPhotos()
  }
}