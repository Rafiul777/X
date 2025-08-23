import { jsPDF } from 'jspdf'
import html2canvas from 'html2canvas'

export class PDFCreator {
  constructor() {
    this.uploadedPhotos = []
  }

  render(view) {
    switch (view) {
      case 'text':
        return this.renderTextToPDF()
      case 'form':
        return this.renderFormToPDF()
      case 'invoice':
        return this.renderInvoiceToPDF()
      case 'resume':
        return this.renderResumeToPDF()
      case 'photo':
        return this.renderPhotoToPDF()
      default:
        return this.renderTextToPDF()
    }
  }

  renderTextToPDF() {
    return `
      <div class="creator-header">
        <h2>Text to PDF</h2>
        <p>Convert your text content into a professional PDF document</p>
      </div>
      <div class="creator-content">
        <div class="input-section">
          <div class="form-group">
            <label for="pdf-title">Document Title</label>
            <input type="text" id="pdf-title" placeholder="Enter document title" value="My Document">
          </div>
          <div class="form-group">
            <label for="pdf-content">Content</label>
            <textarea id="pdf-content" rows="15" placeholder="Enter your text content here...">Welcome to PDF Creator Pro!

This is a sample document that demonstrates the text-to-PDF conversion feature. You can replace this content with your own text.

Key Features:
• Professional formatting
• Custom titles
• Clean typography
• Instant preview

Simply edit this text and click "Generate PDF" to create your document.</textarea>
          </div>
        </div>
        <div class="preview-section">
          <h3>Preview</h3>
          <div class="pdf-preview">
            <div class="preview-content" id="text-preview">
              <h1>My Document</h1>
              <div class="preview-text">
                Welcome to PDF Creator Pro!<br><br>
                This is a sample document that demonstrates the text-to-PDF conversion feature. You can replace this content with your own text.<br><br>
                <strong>Key Features:</strong><br>
                • Professional formatting<br>
                • Custom titles<br>
                • Clean typography<br>
                • Instant preview<br><br>
                Simply edit this text and click "Generate PDF" to create your document.
              </div>
            </div>
          </div>
        </div>
      </div>
    `
  }

  renderFormToPDF() {
    return `
      <div class="creator-header">
        <h2>Form to PDF</h2>
        <p>Create structured PDF documents from form data</p>
      </div>
      <div class="creator-content">
        <div class="input-section">
          <div class="form-section">
            <h3>Personal Information</h3>
            <div class="form-row">
              <div class="form-group">
                <label for="first-name">First Name</label>
                <input type="text" id="first-name" placeholder="John" value="John">
              </div>
              <div class="form-group">
                <label for="last-name">Last Name</label>
                <input type="text" id="last-name" placeholder="Doe" value="Doe">
              </div>
            </div>
            <div class="form-row">
              <div class="form-group">
                <label for="email">Email</label>
                <input type="email" id="email" placeholder="john@example.com" value="john@example.com">
              </div>
              <div class="form-group">
                <label for="phone">Phone</label>
                <input type="tel" id="phone" placeholder="+1 (555) 123-4567" value="+1 (555) 123-4567">
              </div>
            </div>
          </div>
          
          <div class="form-section">
            <h3>Address</h3>
            <div class="form-group">
              <label for="address">Street Address</label>
              <input type="text" id="address" placeholder="123 Main Street" value="123 Main Street">
            </div>
            <div class="form-row">
              <div class="form-group">
                <label for="city">City</label>
                <input type="text" id="city" placeholder="New York" value="New York">
              </div>
              <div class="form-group">
                <label for="state">State</label>
                <input type="text" id="state" placeholder="NY" value="NY">
              </div>
              <div class="form-group">
                <label for="zip">ZIP Code</label>
                <input type="text" id="zip" placeholder="10001" value="10001">
              </div>
            </div>
          </div>

          <div class="form-section">
            <h3>Additional Information</h3>
            <div class="form-group">
              <label for="comments">Comments</label>
              <textarea id="comments" rows="4" placeholder="Additional notes...">This is a sample form submission that demonstrates the form-to-PDF conversion feature.</textarea>
            </div>
          </div>
        </div>
        <div class="preview-section">
          <h3>Preview</h3>
          <div class="pdf-preview">
            <div class="preview-content form-preview-content" id="form-preview">
              <h1>Form Submission</h1>
              <div class="preview-field"><strong>Name:</strong> John Doe</div>
              <div class="preview-field"><strong>Email:</strong> john@example.com</div>
              <div class="preview-field"><strong>Phone:</strong> +1 (555) 123-4567</div>
              <div class="preview-field"><strong>Address:</strong> 123 Main Street, New York, NY 10001</div>
              <div class="preview-field"><strong>Comments:</strong> This is a sample form submission that demonstrates the form-to-PDF conversion feature.</div>
            </div>
          </div>
        </div>
      </div>
    `
  }

  renderInvoiceToPDF() {
    return `
      <div class="creator-header">
        <h2>Invoice Generator</h2>
        <p>Create professional invoices with automatic calculations</p>
      </div>
      <div class="creator-content">
        <div class="input-section">
          <div class="form-section">
            <h3>Invoice Details</h3>
            <div class="form-row">
              <div class="form-group">
                <label for="invoice-number">Invoice Number</label>
                <input type="text" id="invoice-number" placeholder="INV-001" value="INV-001">
              </div>
              <div class="form-group">
                <label for="invoice-date">Date</label>
                <input type="date" id="invoice-date" value="${new Date().toISOString().split('T')[0]}">
              </div>
              <div class="form-group">
                <label for="due-date">Due Date</label>
                <input type="date" id="due-date" value="${new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]}">
              </div>
            </div>
          </div>

          <div class="form-section">
            <h3>From (Your Information)</h3>
            <div class="form-row">
              <div class="form-group flex-2">
                <label for="from-name">Company/Name</label>
                <input type="text" id="from-name" placeholder="Your Company Name" value="Acme Corporation">
              </div>
            </div>
            <div class="form-group">
              <label for="from-address">Address</label>
              <textarea id="from-address" rows="3" placeholder="Your address">123 Business Ave
Suite 100
New York, NY 10001</textarea>
            </div>
          </div>

          <div class="form-section">
            <h3>To (Client Information)</h3>
            <div class="form-row">
              <div class="form-group flex-2">
                <label for="to-name">Client Name</label>
                <input type="text" id="to-name" placeholder="Client Company Name" value="Client Company Inc.">
              </div>
            </div>
            <div class="form-group">
              <label for="to-address">Address</label>
              <textarea id="to-address" rows="3" placeholder="Client address">456 Client Street
Floor 5
Los Angeles, CA 90001</textarea>
            </div>
          </div>

          <div class="form-section">
            <h3>Invoice Items</h3>
            <div id="invoice-items">
              <div class="invoice-item">
                <button type="button" class="btn btn-danger remove-item">×</button>
                <div class="form-row">
                  <div class="form-group flex-2">
                    <label>Description</label>
                    <input type="text" class="item-description" placeholder="Service or product description" value="Web Development Services">
                  </div>
                  <div class="form-group">
                    <label>Quantity</label>
                    <input type="number" class="item-quantity" placeholder="1" value="40" min="1">
                  </div>
                  <div class="form-group">
                    <label>Rate ($)</label>
                    <input type="number" class="item-rate" placeholder="0.00" value="75.00" min="0" step="0.01">
                  </div>
                </div>
              </div>
            </div>
            <button type="button" class="btn btn-secondary" id="add-invoice-item">Add Item</button>
          </div>
        </div>
        <div class="preview-section">
          <h3>Preview</h3>
          <div class="pdf-preview">
            <div class="preview-content invoice-preview-content" id="invoice-preview">
              <div class="invoice-header">
                <h1>INVOICE</h1>
                <div class="invoice-info">
                  <div><strong>Invoice #:</strong> INV-001</div>
                  <div><strong>Date:</strong> ${new Date().toLocaleDateString()}</div>
                  <div><strong>Due:</strong> ${new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toLocaleDateString()}</div>
                </div>
              </div>
              <div class="invoice-parties">
                <div class="invoice-from">
                  <h3>From:</h3>
                  <div>Acme Corporation</div>
                  <div>123 Business Ave<br>Suite 100<br>New York, NY 10001</div>
                </div>
                <div class="invoice-to">
                  <h3>To:</h3>
                  <div>Client Company Inc.</div>
                  <div>456 Client Street<br>Floor 5<br>Los Angeles, CA 90001</div>
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
                  <tbody>
                    <tr>
                      <td>Web Development Services</td>
                      <td>40</td>
                      <td>$75.00</td>
                      <td>$3,000.00</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div class="invoice-total">
                <strong>Total: $3,000.00</strong>
              </div>
            </div>
          </div>
        </div>
      </div>
    `
  }

  renderResumeToPDF() {
    return `
      <div class="creator-header">
        <h2>Resume Builder</h2>
        <p>Create a professional resume with a clean, modern design</p>
      </div>
      <div class="creator-content">
        <div class="input-section">
          <div class="form-section">
            <h3>Personal Information</h3>
            <div class="form-row">
              <div class="form-group">
                <label for="resume-name">Full Name</label>
                <input type="text" id="resume-name" placeholder="John Doe" value="John Doe">
              </div>
              <div class="form-group">
                <label for="resume-title">Professional Title</label>
                <input type="text" id="resume-title" placeholder="Software Developer" value="Senior Software Developer">
              </div>
            </div>
            <div class="form-row">
              <div class="form-group">
                <label for="resume-email">Email</label>
                <input type="email" id="resume-email" placeholder="john@example.com" value="john.doe@email.com">
              </div>
              <div class="form-group">
                <label for="resume-phone">Phone</label>
                <input type="tel" id="resume-phone" placeholder="+1 (555) 123-4567" value="+1 (555) 123-4567">
              </div>
            </div>
            <div class="form-group">
              <label for="resume-location">Location</label>
              <input type="text" id="resume-location" placeholder="New York, NY" value="New York, NY">
            </div>
          </div>

          <div class="form-section">
            <h3>Professional Summary</h3>
            <div class="form-group">
              <label for="resume-summary">Summary</label>
              <textarea id="resume-summary" rows="4" placeholder="Brief professional summary...">Experienced software developer with 8+ years of expertise in full-stack development, specializing in React, Node.js, and cloud technologies. Proven track record of delivering scalable solutions and leading development teams.</textarea>
            </div>
          </div>

          <div class="form-section">
            <h3>Work Experience</h3>
            <div id="experience-items">
              <div class="experience-item">
                <div class="form-row">
                  <div class="form-group flex-2">
                    <label>Job Title</label>
                    <input type="text" class="exp-title" placeholder="Software Developer" value="Senior Software Developer">
                  </div>
                  <div class="form-group flex-2">
                    <label>Company</label>
                    <input type="text" class="exp-company" placeholder="Company Name" value="Tech Solutions Inc.">
                  </div>
                </div>
                <div class="form-row">
                  <div class="form-group">
                    <label>Start Date</label>
                    <input type="month" class="exp-start" value="2020-01">
                  </div>
                  <div class="form-group">
                    <label>End Date</label>
                    <input type="month" class="exp-end" value="2024-01">
                  </div>
                </div>
                <div class="form-group">
                  <label>Description</label>
                  <textarea class="exp-description" rows="3" placeholder="Job responsibilities and achievements...">Led development of customer-facing web applications using React and Node.js. Improved application performance by 40% and mentored junior developers.</textarea>
                </div>
                <button type="button" class="btn btn-danger remove-experience">Remove Experience</button>
              </div>
            </div>
            <button type="button" class="btn btn-secondary" id="add-experience">Add Experience</button>
          </div>

          <div class="form-section">
            <h3>Skills</h3>
            <div class="form-group">
              <label for="resume-skills">Skills (comma-separated)</label>
              <textarea id="resume-skills" rows="3" placeholder="JavaScript, React, Node.js, Python...">JavaScript, React, Node.js, Python, AWS, Docker, MongoDB, PostgreSQL, Git, Agile Development</textarea>
            </div>
          </div>

          <div class="form-section">
            <h3>Education</h3>
            <div class="form-row">
              <div class="form-group flex-2">
                <label for="education-degree">Degree</label>
                <input type="text" id="education-degree" placeholder="Bachelor of Science" value="Bachelor of Science in Computer Science">
              </div>
              <div class="form-group">
                <label for="education-year">Year</label>
                <input type="number" id="education-year" placeholder="2020" value="2016">
              </div>
            </div>
            <div class="form-group">
              <label for="education-school">School</label>
              <input type="text" id="education-school" placeholder="University Name" value="State University">
            </div>
          </div>
        </div>
        <div class="preview-section">
          <h3>Preview</h3>
          <div class="pdf-preview">
            <div class="preview-content resume-preview-content" id="resume-preview">
              <div class="resume-header">
                <h1>John Doe</h1>
                <h2>Senior Software Developer</h2>
                <div class="resume-contact">
                  john.doe@email.com • +1 (555) 123-4567 • New York, NY
                </div>
              </div>
              
              <div class="resume-section">
                <h3>Professional Summary</h3>
                <p>Experienced software developer with 8+ years of expertise in full-stack development, specializing in React, Node.js, and cloud technologies. Proven track record of delivering scalable solutions and leading development teams.</p>
              </div>

              <div class="resume-section">
                <h3>Work Experience</h3>
                <div class="experience-entry">
                  <div class="exp-header">
                    <div>
                      <strong>Senior Software Developer</strong> at Tech Solutions Inc.
                    </div>
                    <div class="exp-duration">Jan 2020 - Jan 2024</div>
                  </div>
                  <p>Led development of customer-facing web applications using React and Node.js. Improved application performance by 40% and mentored junior developers.</p>
                </div>
              </div>

              <div class="resume-section">
                <h3>Skills</h3>
                <p>JavaScript, React, Node.js, Python, AWS, Docker, MongoDB, PostgreSQL, Git, Agile Development</p>
              </div>

              <div class="resume-section">
                <h3>Education</h3>
                <div><strong>Bachelor of Science in Computer Science</strong> - State University (2016)</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    `
  }

  renderPhotoToPDF() {
    return `
      <div class="creator-header">
        <h2>Photo to PDF</h2>
        <p>Convert your photos into a professional PDF document</p>
      </div>
      <div class="creator-content">
        <div class="input-section">
          <div class="form-section">
            <h3>Upload Photos</h3>
            <div class="upload-area" id="photo-upload-area">
              <input type="file" id="photo-input" class="file-input" multiple accept="image/*">
              <div class="upload-content">
                <svg class="upload-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <rect x="3" y="3" width="18" height="18" rx="2" ry="2"/>
                  <circle cx="8.5" cy="8.5" r="1.5"/>
                  <polyline points="21,15 16,10 5,21"/>
                </svg>
                <p><strong>Click to upload photos</strong> or drag and drop</p>
                <p class="upload-hint">Supports JPG, PNG, GIF, WebP</p>
              </div>
            </div>
            <div class="photo-list" id="photo-list"></div>
          </div>

          <div class="form-section">
            <h3>Layout Options</h3>
            <div class="form-group">
              <label for="photo-layout">Layout</label>
              <select id="photo-layout">
                <option value="single">Single Photo per Page</option>
                <option value="grid-2x2">2x2 Grid (4 photos per page)</option>
                <option value="grid-3x3">3x3 Grid (9 photos per page)</option>
                <option value="collage">Auto-fit Collage</option>
              </select>
            </div>
            <div class="form-group">
              <label for="image-quality">Image Quality</label>
              <select id="image-quality">
                <option value="high">High Quality</option>
                <option value="medium" selected>Medium Quality</option>
                <option value="low">Low Quality (Smaller file)</option>
              </select>
            </div>
            <div class="form-group">
              <label for="photo-title">Document Title</label>
              <input type="text" id="photo-title" placeholder="My Photo Collection" value="My Photo Collection">
            </div>
            <div class="form-group">
              <label>
                <input type="checkbox" id="include-filenames" checked>
                Include photo filenames as captions
              </label>
            </div>
          </div>
        </div>
        <div class="preview-section">
          <h3>Preview</h3>
          <div class="pdf-preview">
            <div class="preview-content photo-preview-content" id="photo-preview">
              <h1>My Photo Collection</h1>
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

    // Add generate PDF button
    const actionsContainer = document.querySelector('.creator-actions')
    if (actionsContainer) {
      actionsContainer.innerHTML = `
        <button class="btn btn-primary" id="generate-pdf">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
            <polyline points="14,2 14,8 20,8"/>
            <line x1="16" y1="13" x2="8" y2="13"/>
            <line x1="16" y1="17" x2="8" y2="17"/>
          </svg>
          Generate PDF
        </button>
      `

      document.getElementById('generate-pdf').addEventListener('click', () => {
        this.generatePDF(view)
      })
    }
  }

  attachTextEventListeners() {
    const titleInput = document.getElementById('pdf-title')
    const contentInput = document.getElementById('pdf-content')
    const preview = document.getElementById('text-preview')

    const updatePreview = () => {
      const title = titleInput.value || 'Untitled Document'
      const content = contentInput.value.replace(/\n/g, '<br>')
      
      preview.innerHTML = `
        <h1>${title}</h1>
        <div class="preview-text">${content}</div>
      `
    }

    titleInput.addEventListener('input', updatePreview)
    contentInput.addEventListener('input', updatePreview)
  }

  attachFormEventListeners() {
    const inputs = document.querySelectorAll('#first-name, #last-name, #email, #phone, #address, #city, #state, #zip, #comments')
    const preview = document.getElementById('form-preview')

    const updatePreview = () => {
      const firstName = document.getElementById('first-name').value
      const lastName = document.getElementById('last-name').value
      const email = document.getElementById('email').value
      const phone = document.getElementById('phone').value
      const address = document.getElementById('address').value
      const city = document.getElementById('city').value
      const state = document.getElementById('state').value
      const zip = document.getElementById('zip').value
      const comments = document.getElementById('comments').value

      preview.innerHTML = `
        <h1>Form Submission</h1>
        <div class="preview-field"><strong>Name:</strong> ${firstName} ${lastName}</div>
        <div class="preview-field"><strong>Email:</strong> ${email}</div>
        <div class="preview-field"><strong>Phone:</strong> ${phone}</div>
        <div class="preview-field"><strong>Address:</strong> ${address}, ${city}, ${state} ${zip}</div>
        <div class="preview-field"><strong>Comments:</strong> ${comments}</div>
      `
    }

    inputs.forEach(input => {
      input.addEventListener('input', updatePreview)
    })
  }

  attachInvoiceEventListeners() {
    // Add item functionality
    document.getElementById('add-invoice-item').addEventListener('click', () => {
      this.addInvoiceItem()
    })

    // Remove item functionality
    document.addEventListener('click', (e) => {
      if (e.target.classList.contains('remove-item')) {
        e.target.parentElement.remove()
        this.updateInvoicePreview()
      }
    })

    // Update preview on input changes
    document.addEventListener('input', (e) => {
      if (e.target.closest('.input-section')) {
        this.updateInvoicePreview()
      }
    })

    this.updateInvoicePreview()
  }

  addInvoiceItem() {
    const itemsContainer = document.getElementById('invoice-items')
    const newItem = document.createElement('div')
    newItem.className = 'invoice-item'
    newItem.innerHTML = `
      <button type="button" class="btn btn-danger remove-item">×</button>
      <div class="form-row">
        <div class="form-group flex-2">
          <label>Description</label>
          <input type="text" class="item-description" placeholder="Service or product description">
        </div>
        <div class="form-group">
          <label>Quantity</label>
          <input type="number" class="item-quantity" placeholder="1" value="1" min="1">
        </div>
        <div class="form-group">
          <label>Rate ($)</label>
          <input type="number" class="item-rate" placeholder="0.00" value="0.00" min="0" step="0.01">
        </div>
      </div>
    `
    itemsContainer.appendChild(newItem)
  }

  updateInvoicePreview() {
    const preview = document.getElementById('invoice-preview')
    const invoiceNumber = document.getElementById('invoice-number').value
    const invoiceDate = document.getElementById('invoice-date').value
    const dueDate = document.getElementById('due-date').value
    const fromName = document.getElementById('from-name').value
    const fromAddress = document.getElementById('from-address').value
    const toName = document.getElementById('to-name').value
    const toAddress = document.getElementById('to-address').value

    const items = Array.from(document.querySelectorAll('.invoice-item')).map(item => {
      const description = item.querySelector('.item-description').value
      const quantity = parseFloat(item.querySelector('.item-quantity').value) || 0
      const rate = parseFloat(item.querySelector('.item-rate').value) || 0
      const amount = quantity * rate
      return { description, quantity, rate, amount }
    })

    const total = items.reduce((sum, item) => sum + item.amount, 0)

    const itemsHTML = items.map(item => `
      <tr>
        <td>${item.description}</td>
        <td>${item.quantity}</td>
        <td>$${item.rate.toFixed(2)}</td>
        <td>$${item.amount.toFixed(2)}</td>
      </tr>
    `).join('')

    preview.innerHTML = `
      <div class="invoice-header">
        <h1>INVOICE</h1>
        <div class="invoice-info">
          <div><strong>Invoice #:</strong> ${invoiceNumber}</div>
          <div><strong>Date:</strong> ${new Date(invoiceDate).toLocaleDateString()}</div>
          <div><strong>Due:</strong> ${new Date(dueDate).toLocaleDateString()}</div>
        </div>
      </div>
      <div class="invoice-parties">
        <div class="invoice-from">
          <h3>From:</h3>
          <div>${fromName}</div>
          <div>${fromAddress.replace(/\n/g, '<br>')}</div>
        </div>
        <div class="invoice-to">
          <h3>To:</h3>
          <div>${toName}</div>
          <div>${toAddress.replace(/\n/g, '<br>')}</div>
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
          <tbody>
            ${itemsHTML}
          </tbody>
        </table>
      </div>
      <div class="invoice-total">
        <strong>Total: $${total.toFixed(2)}</strong>
      </div>
    `
  }

  attachResumeEventListeners() {
    // Add experience functionality
    document.getElementById('add-experience').addEventListener('click', () => {
      this.addExperience()
    })

    // Remove experience functionality
    document.addEventListener('click', (e) => {
      if (e.target.classList.contains('remove-experience')) {
        e.target.parentElement.remove()
        this.updateResumePreview()
      }
    })

    // Update preview on input changes
    document.addEventListener('input', (e) => {
      if (e.target.closest('.input-section')) {
        this.updateResumePreview()
      }
    })

    this.updateResumePreview()
  }

  addExperience() {
    const experienceContainer = document.getElementById('experience-items')
    const newExperience = document.createElement('div')
    newExperience.className = 'experience-item'
    newExperience.innerHTML = `
      <div class="form-row">
        <div class="form-group flex-2">
          <label>Job Title</label>
          <input type="text" class="exp-title" placeholder="Software Developer">
        </div>
        <div class="form-group flex-2">
          <label>Company</label>
          <input type="text" class="exp-company" placeholder="Company Name">
        </div>
      </div>
      <div class="form-row">
        <div class="form-group">
          <label>Start Date</label>
          <input type="month" class="exp-start">
        </div>
        <div class="form-group">
          <label>End Date</label>
          <input type="month" class="exp-end">
        </div>
      </div>
      <div class="form-group">
        <label>Description</label>
        <textarea class="exp-description" rows="3" placeholder="Job responsibilities and achievements..."></textarea>
      </div>
      <button type="button" class="btn btn-danger remove-experience">Remove Experience</button>
    `
    experienceContainer.appendChild(newExperience)
  }

  updateResumePreview() {
    const preview = document.getElementById('resume-preview')
    const name = document.getElementById('resume-name').value
    const title = document.getElementById('resume-title').value
    const email = document.getElementById('resume-email').value
    const phone = document.getElementById('resume-phone').value
    const location = document.getElementById('resume-location').value
    const summary = document.getElementById('resume-summary').value
    const skills = document.getElementById('resume-skills').value
    const degree = document.getElementById('education-degree').value
    const year = document.getElementById('education-year').value
    const school = document.getElementById('education-school').value

    const experiences = Array.from(document.querySelectorAll('.experience-item')).map(item => {
      const jobTitle = item.querySelector('.exp-title').value
      const company = item.querySelector('.exp-company').value
      const startDate = item.querySelector('.exp-start').value
      const endDate = item.querySelector('.exp-end').value
      const description = item.querySelector('.exp-description').value
      
      const formatDate = (dateStr) => {
        if (!dateStr) return ''
        const date = new Date(dateStr + '-01')
        return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short' })
      }

      return {
        jobTitle,
        company,
        startDate: formatDate(startDate),
        endDate: formatDate(endDate),
        description
      }
    }).filter(exp => exp.jobTitle || exp.company)

    const experiencesHTML = experiences.map(exp => `
      <div class="experience-entry">
        <div class="exp-header">
          <div>
            <strong>${exp.jobTitle}</strong> at ${exp.company}
          </div>
          <div class="exp-duration">${exp.startDate} - ${exp.endDate}</div>
        </div>
        <p>${exp.description}</p>
      </div>
    `).join('')

    preview.innerHTML = `
      <div class="resume-header">
        <h1>${name}</h1>
        <h2>${title}</h2>
        <div class="resume-contact">
          ${email} • ${phone} • ${location}
        </div>
      </div>
      
      <div class="resume-section">
        <h3>Professional Summary</h3>
        <p>${summary}</p>
      </div>

      <div class="resume-section">
        <h3>Work Experience</h3>
        ${experiencesHTML}
      </div>

      <div class="resume-section">
        <h3>Skills</h3>
        <p>${skills}</p>
      </div>

      <div class="resume-section">
        <h3>Education</h3>
        <div><strong>${degree}</strong> - ${school} (${year})</div>
      </div>
    `
  }

  attachPhotoEventListeners() {
    const uploadArea = document.getElementById('photo-upload-area')
    const fileInput = document.getElementById('photo-input')
    const photoList = document.getElementById('photo-list')
    const layoutSelect = document.getElementById('photo-layout')
    const titleInput = document.getElementById('photo-title')
    const includeFilenames = document.getElementById('include-filenames')

    // File upload handling
    uploadArea.addEventListener('click', () => fileInput.click())
    
    uploadArea.addEventListener('dragover', (e) => {
      e.preventDefault()
      uploadArea.classList.add('drag-over')
    })
    
    uploadArea.addEventListener('dragleave', () => {
      uploadArea.classList.remove('drag-over')
    })
    
    uploadArea.addEventListener('drop', (e) => {
      e.preventDefault()
      uploadArea.classList.remove('drag-over')
      const files = Array.from(e.dataTransfer.files).filter(file => file.type.startsWith('image/'))
      this.handlePhotoUpload(files)
    })

    fileInput.addEventListener('change', (e) => {
      const files = Array.from(e.target.files)
      this.handlePhotoUpload(files)
    })

    // Preview updates
    layoutSelect.addEventListener('change', () => this.updatePhotoPreview())
    titleInput.addEventListener('input', () => this.updatePhotoPreview())
    includeFilenames.addEventListener('change', () => this.updatePhotoPreview())

    this.updatePhotoPreview()
  }

  handlePhotoUpload(files) {
    files.forEach(file => {
      if (file.type.startsWith('image/')) {
        const reader = new FileReader()
        reader.onload = (e) => {
          const photo = {
            file: file,
            name: file.name,
            size: this.formatFileSize(file.size),
            dataUrl: e.target.result
          }
          this.uploadedPhotos.push(photo)
          this.renderPhotoList()
          this.updatePhotoPreview()
        }
        reader.readAsDataURL(file)
      }
    })
  }

  formatFileSize(bytes) {
    if (bytes === 0) return '0 Bytes'
    const k = 1024
    const sizes = ['Bytes', 'KB', 'MB', 'GB']
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
  }

  renderPhotoList() {
    const photoList = document.getElementById('photo-list')
    if (this.uploadedPhotos.length === 0) {
      photoList.innerHTML = ''
      return
    }

    photoList.innerHTML = this.uploadedPhotos.map((photo, index) => `
      <div class="uploaded-photo-item">
        <img src="${photo.dataUrl}" alt="${photo.name}" class="photo-thumbnail">
        <div class="photo-info">
          <div class="photo-name">${photo.name}</div>
          <div class="photo-size">${photo.size}</div>
        </div>
        <button class="btn btn-danger remove-photo" data-index="${index}">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>
      </div>
    `).join('')

    // Add remove functionality
    photoList.addEventListener('click', (e) => {
      if (e.target.closest('.remove-photo')) {
        const index = parseInt(e.target.closest('.remove-photo').dataset.index)
        this.uploadedPhotos.splice(index, 1)
        this.renderPhotoList()
        this.updatePhotoPreview()
      }
    })
  }

  updatePhotoPreview() {
    const preview = document.getElementById('photo-preview')
    const title = document.getElementById('photo-title').value || 'My Photo Collection'
    const layout = document.getElementById('photo-layout').value
    const includeFilenames = document.getElementById('include-filenames').checked

    if (this.uploadedPhotos.length === 0) {
      preview.innerHTML = `
        <h1>${title}</h1>
        <div class="preview-placeholder">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <rect x="3" y="3" width="18" height="18" rx="2" ry="2"/>
            <circle cx="8.5" cy="8.5" r="1.5"/>
            <polyline points="21,15 16,10 5,21"/>
          </svg>
          <p>Upload photos to see preview</p>
        </div>
      `
      return
    }

    const photosToShow = layout === 'single' ? this.uploadedPhotos.slice(0, 1) :
                       layout === 'grid-2x2' ? this.uploadedPhotos.slice(0, 4) :
                       layout === 'grid-3x3' ? this.uploadedPhotos.slice(0, 9) :
                       this.uploadedPhotos.slice(0, 6)

    const photosHTML = photosToShow.map(photo => `
      <div class="photo-item">
        <img src="${photo.dataUrl}" alt="${photo.name}" class="preview-photo">
        ${includeFilenames ? `<p class="photo-caption">${photo.name}</p>` : ''}
      </div>
    `).join('')

    const morePhotosText = this.uploadedPhotos.length > photosToShow.length ? 
      `<div class="more-photos">+ ${this.uploadedPhotos.length - photosToShow.length} more photos</div>` : ''

    preview.innerHTML = `
      <h1>${title}</h1>
      <div class="photo-grid ${layout}">
        ${photosHTML}
        ${morePhotosText}
      </div>
    `
  }

  async generatePDF(view) {
    const button = document.getElementById('generate-pdf')
    const originalText = button.innerHTML
    
    button.disabled = true
    button.innerHTML = `
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="animation: spin 1s linear infinite;">
        <path d="M21 12a9 9 0 11-6.219-8.56"/>
      </svg>
      Generating...
    `

    try {
      if (view === 'photo') {
        await this.generatePhotoPDF()
      } else {
        await this.generateRegularPDF(view)
      }
    } catch (error) {
      console.error('Error generating PDF:', error)
      alert('Error generating PDF. Please try again.')
    } finally {
      button.disabled = false
      button.innerHTML = originalText
    }
  }

  async generatePhotoPDF() {
    if (this.uploadedPhotos.length === 0) {
      alert('Please upload at least one photo.')
      return
    }

    const pdf = new jsPDF()
    const title = document.getElementById('photo-title').value || 'My Photo Collection'
    const layout = document.getElementById('photo-layout').value
    const quality = document.getElementById('image-quality').value
    const includeFilenames = document.getElementById('include-filenames').checked

    // Quality settings
    const qualityMap = { high: 0.95, medium: 0.8, low: 0.6 }
    const imageQuality = qualityMap[quality]

    let currentPage = 1
    let photosProcessed = 0

    for (let i = 0; i < this.uploadedPhotos.length; i += this.getPhotosPerPage(layout)) {
      if (currentPage > 1) {
        pdf.addPage()
      }

      // Add title on first page
      if (currentPage === 1) {
        pdf.setFontSize(20)
        pdf.text(title, 20, 20)
      }

      const photosForPage = this.uploadedPhotos.slice(i, i + this.getPhotosPerPage(layout))
      await this.addPhotosToPage(pdf, photosForPage, layout, includeFilenames, imageQuality, currentPage === 1 ? 40 : 20)
      
      currentPage++
      photosProcessed += photosForPage.length
    }

    pdf.save(`${title.replace(/[^a-z0-9]/gi, '_').toLowerCase()}.pdf`)
  }

  getPhotosPerPage(layout) {
    switch (layout) {
      case 'single': return 1
      case 'grid-2x2': return 4
      case 'grid-3x3': return 9
      case 'collage': return 6
      default: return 1
    }
  }

  async addPhotosToPage(pdf, photos, layout, includeFilenames, quality, startY) {
    const pageWidth = pdf.internal.pageSize.getWidth()
    const pageHeight = pdf.internal.pageSize.getHeight()
    const margin = 20

    switch (layout) {
      case 'single':
        await this.addSinglePhoto(pdf, photos[0], margin, startY, pageWidth - 2 * margin, pageHeight - startY - margin, includeFilenames, quality)
        break
      case 'grid-2x2':
        await this.addGridPhotos(pdf, photos, 2, 2, margin, startY, pageWidth - 2 * margin, pageHeight - startY - margin, includeFilenames, quality)
        break
      case 'grid-3x3':
        await this.addGridPhotos(pdf, photos, 3, 3, margin, startY, pageWidth - 2 * margin, pageHeight - startY - margin, includeFilenames, quality)
        break
      case 'collage':
        await this.addCollagePhotos(pdf, photos, margin, startY, pageWidth - 2 * margin, pageHeight - startY - margin, includeFilenames, quality)
        break
    }
  }

  async addSinglePhoto(pdf, photo, x, y, maxWidth, maxHeight, includeFilenames, quality) {
    const img = new Image()
    img.src = photo.dataUrl
    
    return new Promise((resolve) => {
      img.onload = () => {
        const aspectRatio = img.width / img.height
        let width = maxWidth
        let height = width / aspectRatio
        
        if (height > maxHeight - (includeFilenames ? 20 : 0)) {
          height = maxHeight - (includeFilenames ? 20 : 0)
          width = height * aspectRatio
        }
        
        const centerX = x + (maxWidth - width) / 2
        
        pdf.addImage(photo.dataUrl, 'JPEG', centerX, y, width, height, undefined, 'FAST')
        
        if (includeFilenames) {
          pdf.setFontSize(10)
          pdf.text(photo.name, centerX + width / 2, y + height + 15, { align: 'center' })
        }
        
        resolve()
      }
    })
  }

  async addGridPhotos(pdf, photos, cols, rows, x, y, totalWidth, totalHeight, includeFilenames, quality) {
    const cellWidth = totalWidth / cols
    const cellHeight = totalHeight / rows
    const padding = 5

    for (let i = 0; i < photos.length && i < cols * rows; i++) {
      const row = Math.floor(i / cols)
      const col = i % cols
      const cellX = x + col * cellWidth + padding
      const cellY = y + row * cellHeight + padding
      const availableWidth = cellWidth - 2 * padding
      const availableHeight = cellHeight - 2 * padding - (includeFilenames ? 15 : 0)

      await this.addSinglePhoto(pdf, photos[i], cellX, cellY, availableWidth, availableHeight, includeFilenames, quality)
    }
  }

  async addCollagePhotos(pdf, photos, x, y, totalWidth, totalHeight, includeFilenames, quality) {
    // Simple collage layout - 2 columns, 3 rows
    await this.addGridPhotos(pdf, photos, 2, 3, x, y, totalWidth, totalHeight, includeFilenames, quality)
  }

  async generateRegularPDF(view) {
    const previewElement = document.querySelector('.preview-content')
    
    const canvas = await html2canvas(previewElement, {
      scale: 2,
      useCORS: true,
      allowTaint: true,
      backgroundColor: '#ffffff'
    })

    const imgData = canvas.toDataURL('image/png')
    const pdf = new jsPDF()
    
    const imgWidth = 210
    const pageHeight = 295
    const imgHeight = (canvas.height * imgWidth) / canvas.width
    let heightLeft = imgHeight

    let position = 0

    pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight)
    heightLeft -= pageHeight

    while (heightLeft >= 0) {
      position = heightLeft - imgHeight
      pdf.addPage()
      pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight)
      heightLeft -= pageHeight
    }

    const filename = this.getFilename(view)
    pdf.save(filename)
  }

  getFilename(view) {
    const timestamp = new Date().toISOString().slice(0, 10)
    switch (view) {
      case 'text':
        return `document_${timestamp}.pdf`
      case 'form':
        return `form_${timestamp}.pdf`
      case 'invoice':
        return `invoice_${timestamp}.pdf`
      case 'resume':
        return `resume_${timestamp}.pdf`
      case 'photo':
        return `photos_${timestamp}.pdf`
      default:
        return `document_${timestamp}.pdf`
    }
  }
}