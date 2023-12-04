// Create a template
const template = document.createElement('template')
// Set the content of the template
template.innerHTML = `
<style>
  .text-content {
    font-family: Nova Square, 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;
    font-size: 75px;
  }

</style>
<div class="ticker-container">
  <h1 class="text-content"></h1>
</div>
`

class TickerTape extends HTMLElement {
  constructor() {
    super();

    // clone template, start shadow root and append node
    const tempNode = template.content.cloneNode(true)
    this._shadowRoot = this.attachShadow({ mode: 'open' });
    this._shadowRoot.appendChild(tempNode)

    // Grab element for content
    this._tickerEl = this._shadowRoot.querySelector(".text-content")
    this._currentText = this.innerHTML

    // Get text in tag
    this._tickerEl.innerHTML = this._currentText
  }

  connectedCallback() {
    this._addtimer()
  }

  disconnectedCallback() {
    this._clearTimer()
  }

  _update(value) {
    this._tickerEl.innerHTML = value
  }

  _addtimer() {
    setInterval(() => {
      const firstLetter = this._tickerEl.innerHTML.charAt(0)
      const updatedString = this._tickerEl.innerHTML.slice(1) + firstLetter
      this._update(updatedString)
    }, 300)
  }

  _clearTimer() {
    console.log('clear')
    clearInterval()
  }
}

// Define the custom element
customElements.define('ticker-tape', TickerTape);
