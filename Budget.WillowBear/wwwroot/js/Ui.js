import { Categories } from "./Categories.js";

class Ui {
    constructor() {
        this.categories = new Categories();
    }

    // Render the categories
    renderCategoriesTable() {
        let categories = this.categories.getCategories();


        const table = document.getElementById("categories");
        // Clear the table
        table.innerHTML = "";

        // Add the table headers
        table.innerHTML += `
            <tr>
                <th>Name</th>
                <th>Description</th>
            <tr>
        `;

        console.log("ui.categories = " + this.categories.categories);
        // Add the table rows
        categories.forEach(category => {
            let tr = table.insertRow();

            let td1 = tr.insertCell(0);
            td1.appendChild(document.createTextNode(category.name));

            let td2 = tr.insertCell(1);
            td2.appendChild(document.createTextNode(category.description));
        });

    }
}

const ui = new Ui();

ui.renderCategoriesTable();