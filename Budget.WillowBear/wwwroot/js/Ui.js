import { Categories } from "./Categories.js";

class Ui {
    constructor() {
        this.categories = new Categories();
    }

    // Render the categories
    renderCategories() {
        let html = "";
        this.categories.categories.forEach((category) => {
            html += `<li class="list-group-item d-flex justify-content-between align-items-center">
                            ${category.name}
                            <span class="badge badge-primary badge-pill">${category.budgeted}</span>
                        </li>` ;
        });
        document.getElementById("categories").innerHTML = html;
    }
}