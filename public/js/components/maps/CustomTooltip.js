class CustomTooltip {
  constructor() {
    this.tooltip = null;
    this.createTooltip();
  }
  createTooltip() {
    this.tooltip = document.createElement('div');
    this.tooltip.className = 'custom-tooltip';
    document.body.appendChild(this.tooltip);
  }
  show(content, x, y, title = null) {
    if (title) {
      this.tooltip.innerHTML = `
                <div class="tooltip-title">${title}</div>
                <div class="tooltip-content">${content}</div>
            `;
    } else {
      this.tooltip.innerHTML = `<div class="tooltip-content">${content}</div>`;
    }
    const rect = this.tooltip.getBoundingClientRect();
    const windowWidth = window.innerWidth;
    const windowHeight = window.innerHeight;
    let left = x + 10;
    let top = y - rect.height - 10;
    if (left + rect.width > windowWidth) {
      left = x - rect.width - 10;
    }
    if (top < 0) {
      top = y + 10;
      this.tooltip.classList.add('bottom');
    } else {
      this.tooltip.classList.remove('bottom');
    }
    this.tooltip.style.left = `${left}px`;
    this.tooltip.style.top = `${top}px`;
    this.tooltip.classList.add('show');
  }
  hide() {
    this.tooltip.classList.remove('show');
  }
  destroy() {
    if (this.tooltip && this.tooltip.parentNode) {
      this.tooltip.parentNode.removeChild(this.tooltip);
    }
  }
}
export default CustomTooltip;