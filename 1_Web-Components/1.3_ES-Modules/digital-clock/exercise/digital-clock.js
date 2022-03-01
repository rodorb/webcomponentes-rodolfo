/*
  1- Create a digital-clock component.
  2- Each second, we must calculate the time and update the component HTML
*/

class DigitalClock extends HTMLElement {
    interval = null;
    constructor() {
        super();
    }

    connectedCallback() {

        this.innerHTML = this.calculateCurrentTime();
        this.interval = window.setInterval(() => {

            this.innerHTML = this.calculateCurrentTime();
            console.log("Updated");
        }, 1000);
    }

    calculateCurrentTime() {
        const now = new Date();
        const hours = now.getHours();
        const minutes = now.getMinutes();
        let seconds = now.getSeconds();
        if (seconds < 10) {
            seconds = '0' + seconds;
        }
        return `<h1>${hours} : ${minutes} : ${seconds}</h1>`;
    }

    disconnectedCallback() {
        //hay que limpiar el setinterval ya que este método es de window
        //por lo que se seguirá ejecutando aunque este WC salga del DOM
        window.clearInterval(this.interval);
    }
}

customElements.define('digital-clock', DigitalClock);