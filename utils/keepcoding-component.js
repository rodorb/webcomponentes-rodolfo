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

</style>

<div class="keepcoding-component-wrapper">
    <span>keepcoding component boilerplate </span>
</div>
`;
class KeepCodingComponent extends HTMLElement {
    interval = null;
    constructor() {
        super();
        //crea un shadowRoot para este WC y lo retorna
        this.attachShadow({ mode: 'open' });
    }

    connectedCallback() {
        const templateCloneElement = templateElement.content.cloneNode(true);
        this.shadowRoot.appendChild(templateCloneElement);
    }

}

customElements.define('keepcoding-component', KeepCodingComponent);