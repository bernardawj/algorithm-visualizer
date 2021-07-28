import { Component } from "../component.js";
import { ElementAttribute } from "../element-attribute.js";
import { AlertAttribute } from "./alert-attribute.js";
import { alertType } from "./alert-type.js";

export class Alert extends Component {

    constructor() {
        super();

        // Settings
        this.alertDuration = 5000; // In milliseconds

        // DOM elements
        this.alertWrapper = document.getElementById("alert");
        this.alertList = this.alertWrapper.firstElementChild;
    }

    addAlert(alert) {
        // Check if passed parameter is an instance of AlertAttribute
        if (!(alert instanceof AlertAttribute)) {
            throw new Error("Passed parameter is not an instance of AlertAttribute");
        }

        let className = this.populateClassName(alert);

        // Invalid alert type
        if (!className) {
            return;
        }

        this.appendAlertElement(className, alert);
    }

    populateClassName(alert) {
        switch (alert.type) {
            case alertType.INFO:
                return "alert__list-item--info";
            case alertType.SUCCESS:
                return "alert__list-item--success";
            case alertType.DANGER:
                return "alert__list-item--danger";
        }
    }

    appendAlertElement(className, alert) {
        if (this.alertList.childElementCount > 0) {
            this.alertList.firstElementChild.remove();
        }

        const liAttributes = [
            new ElementAttribute("id", "alert__list-item"),
            new ElementAttribute("class", className),
            new ElementAttribute("style", `animation: alertFadeOut ${ this.alertDuration / 1000 }s ease-in-out 0s 1 normal forwards`)
        ];
        const li = Alert.createRootElement("li", liAttributes, alert.message);
        this.alertList.append(li);
        this.alertWrapper.style.display = "block";

        setTimeout(() => {
            li.remove();
        }, this.alertDuration);
    }
}
