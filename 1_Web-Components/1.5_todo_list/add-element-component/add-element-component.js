const templateElement = document.createElement('template');

templateElement.innerHTML = `
<style>
    .add-element-component-wrapper {
        display: flex;
        margin-bottom: 2rem;
    }

    input {
        flex-grow: 1;
        border-color: var(--add-element-component-input-border-color);
    }

    button {
        background-color: var(--add-element-component-button-background-color);
    }
</style>

<div class="add-element-component-wrapper">
    <input type="text">
    <button disabled></button>
</div>
`

class AddElementComponent extends HTMLElement {
    value = null;
    buttonLabel = null;
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this.value = this.getAttribute('value');
        this.buttonLabel = this.getAttribute('button-label') || 'Añadir';
    }

    connectedCallback() {
        const templateCloneElement = templateElement.content.cloneNode(true);

        this.intializeAddElementButton(templateCloneElement);
        this.intializeAddElementInput(templateCloneElement);

        this.shadowRoot.appendChild(templateCloneElement);

    }

    intializeAddElementInput(templateCloneElement) {
        const inputElement = templateCloneElement.querySelector('input');

        inputElement.setAttribute('placeholder', this.value);
        inputElement.addEventListener('input', () => {
            const value = inputElement.value;
            const button = this.shadowRoot.querySelector('button');
            if (value) {
                button.removeAttribute("disabled");
            } else {
                button.setAttribute("disabled", 'true');
            }
        });
    }

    intializeAddElementButton(templateCloneElement) {
        const buttonElement = templateCloneElement.querySelector('button');
        buttonElement.textContent = this.buttonLabel;
        buttonElement.addEventListener('click', () => {
            const inputValue = this.shadowRoot.querySelector('input').value;
            const event = new CustomEvent('add-element', {
                detail: inputValue
            });
            this.dispatchEvent(event);
        });
    }
}


customElements.define('add-element-component', AddElementComponent);