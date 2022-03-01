//Necesito que todo el contenido de ambos webcomponents, no solo necesito importar la clase
import "./add-element-component/add-element-component.js";
import "./item-component/item-component.js";
const templateElement = document.createElement('template');

templateElement.innerHTML = `
<style>
    :host {
            --item-component-background-color: lightgray;
            --item-component-border-color: gray;
            --add-element-component-input-border-color: lightgray;
            --add-element-component-button-background-color: gray;
    }
</style>
<div class="items-list-component-wrapper">
    <add-element-component value="Añadir elemento" button-label="Añadir item"></add-element-component>
</div>
`

class ItemsListComponent extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: "open" })
    }

    connectedCallback() {
        const templateCloneElement = templateElement.content.cloneNode(true);
        const addElementComponent = templateCloneElement.querySelector('add-element-component');
        addElementComponent.addEventListener('add-element', ($event) => {
            const toDoMessage = $event.detail;
            const itemComponent = document.createElement('item-component');
            if (toDoMessage) {
                //Ya que se crea antes el componente, al setear el atributo despues
                //el componente hijo tiene que observar los cambios en sus propiedades
                //y darle el valor a la propuedad cuando haya cambiado
                //1º entraría en el attributeChangedCallback
                itemComponent.setAttribute('value', toDoMessage);
            }
            this.shadowRoot.appendChild(itemComponent);
        });
        //2º entraría en connectedCallback
        this.shadowRoot.appendChild(templateCloneElement);
    }
}

customElements.define('items-list-component', ItemsListComponent);