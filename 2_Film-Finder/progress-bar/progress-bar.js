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
//poner host es como poner progress-bar, para que ataque al elemento mismo que hace referencia al WC
templateElement.innerHTML = `
<style>
    :host {
        display: block;
        height: var(--progress-bar-height, 48px);
    }
    .progress-bar-wrapper {
        background-color: var(--progress-bar-background-color, gray);
        height: 100%;//tan altas como su padre
    }
    .progress-bar {
        background-color: var(--progress-bar-foreground-color, orange);
        height: 100%;
    }
</style>

<div class="progress-bar-wrapper">
  <div class="progress-bar"></div>
</div>
`;
class ProgressBar extends HTMLElement {
    progressValue = null;
    constructor() {
        super();
        //crea un shadowRoot para este WC y lo retorna
        this.attachShadow({ mode: 'open' });
        this.progressValue = Number(this.getAttribute('progress-value')) || 0;
    }


    static get observedAttributes() {
        return ["progress-value"];
    }

    connectedCallback() {
        const templateCloneElement = templateElement.content.cloneNode(true);
        const progressBarFilled = templateCloneElement.querySelector(".progress-bar");
        if (this.isProgressValueValid(this.progressValue)) {
            progressBarFilled.style.width = `${this.progressValue}%`;
        }

        this.shadowRoot.appendChild(templateCloneElement);
    }

    attributeChangedCallback(name, oldVal, newVal) {
        this.progressValue = newVal;

        if (this.isProgressValueValid(newVal)) {
            const progressBarElement = this.shadowRoot.querySelector('.progress-bar');
            if (progressBarElement) {
                progressBarElement.style.width = `${this.progressValue}%`
            }
        }

    }

    isProgressValueValid(progressValue) {
        const value = Number(progressValue);
        if (Number.isNaN(value)) {
            throw new Error('Valor no válido')
        }

        return true;
    }

}

customElements.define('progress-bar', ProgressBar);