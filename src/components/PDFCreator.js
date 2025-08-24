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
      case 'photo':
        this.attachPhotoEventListeners()
        break
    }

    // Add generate PDF button
    this.addGeneratePDFButton(view)
  }

  addGeneratePDFButton(view) {
    // Remove existing actions container if it exists
    const existingActions = document.querySelector('.creator-actions')
    if (existingActions) {
      existingActions.remove()
    }

    // Add actions container after content
    const content = document.querySelector('.content')
    if (content) {
      const actionsHTML = `
        <div class="creator-actions">
          <button class="btn btn-primary" id="generate-pdf">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
              <polyline points="14,2 14,8 20,8"/>
              <line x1="16" y1="13" x2="8" y2="13"/>
              <line x1="16" y1="17" x2="8" y2="17"/>
            </svg>
            Generate PDF
          </button>
        </div>
      `
      content.insertAdjacentHTML('afterend', actionsHTML)

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
      case 'photo':
        return `photos_${timestamp}.pdf`
      default:
        return `document_${timestamp}.pdf`
    }
  }
}