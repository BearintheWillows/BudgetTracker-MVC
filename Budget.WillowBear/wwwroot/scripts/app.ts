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

    constructor() { }


    //Initialise Properties
    categories: ICategory[] = [];
    readonly baseUrl: string = '/api/category';

    async initArray(): Promise<ICategory[]> {
        await (await this.getAll()).forEach(x => this.categories.push(x));

        return this.categories;

    }

    //Get all categories
    async getAll(): Promise<ICategory[]> {
        const response = await fetch(this.baseUrl);
        const data = await response.json();
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

class TransactionDataAccess {
    constructor() {

    }

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



class UI {

    readonly category: CategoryDataAccess;
    readonly transaction: TransactionDataAccess;

    constructor() {
        this.category = new CategoryDataAccess();
        this.transaction = new TransactionDataAccess();
    }

    displayCategories(data: ICategory[]): void {

        let tbody = document.getElementById('catList') as HTMLTableSectionElement;

        tbody.innerHTML = '';

        data.forEach((category) => {
            let tr = tbody.insertRow();

            let td1 = tr.insertCell(0);
            let textDiv = document.createElement('div');
            textDiv.appendChild(document.createTextNode(category.name));
            td1.appendChild(textDiv);

            let td2 = tr.insertCell(1);
            let textDiv2 = document.createElement('div');
            textDiv2.appendChild(document.createTextNode(category.description));
            td2.appendChild(textDiv2);

        }
        );
    }
}

let ui = new UI();

ui.category.initArray().then((data) => {
    ui.displayCategories(data);
});



