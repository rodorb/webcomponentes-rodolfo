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
    :root {
        --item-component-background-color: lightgray;
        --item-component-border-color: gray;
        --add-element-component-input-border-color: lightgray;
        --add-element-component-button-background-color: blue;
    }
    div.item-component-wrapper{
        background-color: var(--item-component-background-color);
        border-color: var(--item-component-border-color);
        border: solid 3px;
        display: flex;
        padding: 8px;
    }

    span {
        flex-grow: 1;
    }
</style>

<div class="item-component-wrapper">
    <span></span>
    <button>X</button>
</div>
`;
class ItemComponent extends HTMLElement {
    value = null;
    constructor() {
        super();
        //crea un shadowRoot para este WC y lo retorna
        this.attachShadow({ mode: 'open' });
        this.value = this.getAttribute('value') || null;
    }
    static get observedAttributes() {
        return ['value'];
    }
    connectedCallback() {
        const templateCloneElement = templateElement.content.cloneNode(true);
        if (this.value) {
            templateCloneElement.querySelector('span').textContent = this.value;
        }
        const deleteButtonElement = templateCloneElement.querySelector('button');
        deleteButtonElement.addEventListener('click', () => {
            const event = new CustomEvent('delete-item');
            this.dispatchEvent(event);
            this.remove();
        });
        this.shadowRoot.appendChild(templateCloneElement);
    }

    attributeChangedCallback(name, oldVal, newVal) {
        if (name === 'value' && newVal) {
            this.value = this.getAttribute('value');
        }
    }
}

customElements.define('item-component', ItemComponent);