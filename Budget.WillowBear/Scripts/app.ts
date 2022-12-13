// Interface to match the Transaction model
interface ITransaction {
    id: number;
    transactionDate: Date;
    amount: number;
    notes: string;
    categoryId: number;
    category: ICategory | null;
    transactionType: number;
}

interface ICategory {
    id: number;
    name: string;
    description: string;
}

// Category Class
class CategoryDataAccess {

    constructor() {
    }

    //Initialise Properties
    categories: ICategory[] = [];
    readonly baseUrl: string = '/api/category';

    //Get all categories
    async getAll(): Promise<ICategory[]> {
        const response = await fetch(this.baseUrl);
        const data = await response.json();
        this.categories = data;
        return data;
    }

    //Get by Id
    async getById(id: number): Promise<ICategory> {
        const response = await fetch(`${this.baseUrl}/${id}`);
        const data = await response.json();
        return data;
    }

    //Get BY NAME
    async getByName(name: string): Promise<ICategory> {
        const response = await fetch(`${this.baseUrl}/${name}`);
        const data = await response.json();
        return data;
    }

    //Create Category
    async create(category: ICategory): Promise<void> {
        if ((await this.getAll()).find(x => x.name === category.name)) {
            alert("Category already exists");
        } else {
            const response = await fetch(`${this.baseUrl}/create`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(category)
            });
            //check if response is ok
            if (response.ok) {
                console.log("Category created");
                await this.getAll();
            }
        }
    }

    //Update Category
    async update(category: ICategory): Promise<void> {
        const response = await fetch(`${this.baseUrl}/update/${category.id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(category)
        });

        // check if response is ok
        if (response.ok) {
            console.log("Category updated");
            await this.getAll();
        }
    }

    //Delete Category
    async delete(id: number): Promise<void> {

        //check if id is in categories
        if (!(await this.getAll()).find(x => x.id === id)) {
            alert("Category does not exist");
        } else {
            const response = await fetch(`${this.baseUrl}/delete/${id}`, {
                method: 'DELETE'
            });

            // check if response is ok
            if (response.ok) {
                console.log("Category deleted");
                await this.getAll();
            }
        }
    }
}

class Transaction {
    constructor() { }

    transactions: ITransaction[] = [];
    readonly baseUrl: string = '/api/transaction';

    async getAll(): Promise<ITransaction[]> {
        const response = await fetch(this.baseUrl);
        const data = await response.json();
        this.transactions = data;
        return data;
    }

    async getById(id: number): Promise<ITransaction> {
        const response = await fetch(`${this.baseUrl}/${id}`);
        const data = await response.json();

        if (response.ok) {
            console.log("Transaction found");
            return data
        } else {
            console.log("Transaction not found");
            return null;
        }
    }

    async create(transaction: ITransaction): Promise<void> {
        const response = await fetch(`${this.baseUrl}/create`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(transaction)
        });

        if (response.ok) {
            console.log("Transaction created");
            await this.getAll();
        } else {
            console.log("Transaction not created");
        }
    }

    async update(transaction: ITransaction): Promise<void> {

        const response = await fetch(`${this.baseUrl}/update/${transaction.id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(transaction)
        });;

        if (response.ok) {
            console.log("Transaction updated");
            await this.getAll();
        } else {
            console.log("Transaction not updated");
        }
    }

    async delete(id: number): Promise<void> {
        const response = await fetch(`${this.baseUrl}/delete/${id}`, {
            method: 'DELETE'
        });

        if (response.ok) {
            console.log("Transaction deleted");
            await this.getAll();
        } else {
            console.log("Transaction not deleted");
        }
    }
}

