export class TransactionApi {
    constructor() {
        this.TransactionsUrl = "api/Transaction";
    }

    // Transaction API Methods //

    // Get all transactions
    //
    async getTransactions() {
        const response = await fetch(this.TransactionsUrl);
        const data = await response.json();
        return data;
    }

    // Get a single transaction
    //
    async getTransaction(id) {
        const response = await fetch(`${this.TransactionsUrl}/${id}`);
        const data = await response.json();
        return data;
    }

    // Create a new transaction
    //
    async createTransaction(transaction) {
        const response = await fetch(`${this.TransactionsUrl}/${create}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(transaction)
        });
        const data = await response.json();
        return data;
    }

    // Update an existing transaction
    //
    async updateTransaction(id, transaction) {
        const response = await fetch(`${this.TransactionsUrl}/update/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(transaction)
        });
        const data = await response.json();
        return data;
    }

    // Delete a transaction
    //
    async deleteTransaction(id) {
        const response = await fetch(`${this.TransactionsUrl}/delete/${id}`, {
            method: 'DELETE'
        });
        const data = await response.json();
        return data;
    }

}

export class CategoryApi {
    constructor() {
        this.CategoriesUrl = "api/Category";
    }


    // Category API Methods //

    // Get all categories
    //
    async getCategories() {
        const response = await fetch(this.CategoriesUrl);
        const data = await response.json();
        return data;
    }

    // Get a single category
    //
    async getCategory(id) {
        const response = await fetch(`${this.CategoriesUrl}/${id}`);
        const data = await response.json();
        return data;
    }

    // Create a new category
    //
    async createCategory(category) {
        const response = await fetch(`${this.CategoriesUrl}/create`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(category)
        });
        const data = await response.json();
        return data;
    }

    // Update an existing category
    //
    async updateCategory(id, category) {
        const response = await fetch(`${this.CategoriesUrl}/update/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(category)
        });
        const data = await response.json();
        return data;
    }

    // Delete a category
    //
    async deleteCategory(id) {
        const response = await fetch(`${this.CategoriesUrl}/delete/${id}`, {
            method: 'DELETE'
        });
        const data = await response.json();
        return data;
    }
}
