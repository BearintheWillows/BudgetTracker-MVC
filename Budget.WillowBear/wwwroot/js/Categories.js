import { CategoryApi as api } from "./Api.js";
export class Categories {
    constructor() {
        this.api = new api();
        this.categories = [];
    }

    // Get all categories from the API
    // Update the categories array
    async getCategories() {
        this.api.getCategories()
            .then(data => {
                console.log("categories = " + data.toString());
                //TDOD: This is not working

            });

        console.log("categories = " + this.categories);
    }

    // Gwt a single category from the API
    getCategory(id) {
        api.getCategory(id).then((data) => {
            this.categories = data;
        });
    }


}
