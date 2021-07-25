export class Component {

    static createRootElement(tagName, attributes, textContent, innerHTML) {
        const rootElement = document.createElement(tagName);

        // Populate attributes
        for (const attribute of attributes) {
            rootElement.setAttribute(attribute.name, attribute.value);
        }

        // Populate text if there are any
        if (textContent) {
            rootElement.textContent = textContent;
        }

        // Populate innerHTML if there are any
        if (innerHTML) {
            rootElement.innerHTML = innerHTML;
        }

        return rootElement;
    }

    static removeAllChildElements(rootElement) {
        rootElement.removeChild(rootElement.firstElementChild);
    }
}
