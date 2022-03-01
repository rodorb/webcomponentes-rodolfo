/*
  1- Create a digital-clock component using shadow DOM.
  2- Each second, we must calculate the time and update the component HTML
  3- Maybe we should use custom-properties...
*/
/*
  1- Create a digital-clock component.
  2- Each second, we must calculate the time and update the component HTML
*/
const templateElement = document.createElement('template');
templateElement.innerHTML = `
<style>
  h1 {
    color: var(--digital-clock-color, blue);
    border: solid 3px black;
    padding: 6px;
  }
</style>

<div class="digital-clock-wrapper">
  <h1 class="digital-clock-time">
  </h1>
</div>
`;
class DigitalClock extends HTMLElement {
    interval = null;
    constructor() {
        super();
        //crea un shadowRoot para este WC y lo retorna
        this.attachShadow({ mode: 'open' });
    }

    connectedCallback() {
        const templateCloneElement = templateElement.content.cloneNode(true);

        document.documentElement.style.setProperty('--digital-clock-color', this.getAttribute('clock-color'));
        const currentTime = this.calculateCurrentTime();
        templateCloneElement.querySelector('h1').textContent = currentTime;
        this.shadowRoot.appendChild(templateCloneElement);

        //al crear un shadowRoot para este WC, ya no puedo usar directamente innerHTML
        //sobre el WC, lo tengo que hacer sobre su shadowRoot
        this.interval = window.setInterval(() => {
            this.updateTime();
        }, 1000);
    }

    updateTime() {
        const currentTime = this.calculateCurrentTime();
        this.shadowRoot.querySelector('h1').textContent = currentTime;
    }

    calculateCurrentTime() {
        const now = new Date();
        const hours = now.getHours();
        let minutes = now.getMinutes();
        let seconds = now.getSeconds();
        if (seconds < 10) {
            seconds = '0' + seconds;
        }
        if (minutes < 10) {
            minutes = '0' + minutes;
        }
        return `${hours} : ${minutes} : ${seconds}`;
    }

    disconnectedCallback() {
        //hay que limpiar el setinterval ya que este método es de window
        //por lo que se seguirá ejecutando aunque este WC salga del DOM
        window.clearInterval(this.interval);
    }
}

customElements.define('digital-clock', DigitalClock);