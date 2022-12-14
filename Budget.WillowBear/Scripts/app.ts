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

    async initArray(): Promise<ITransaction[]> {
        await (await this.getAll()).forEach(x => this.transactions.push(x));

        return this.transactions;

    }

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

    convertTransactionTypeToString(transactionType: number): string {
        switch (transactionType) {
            case 0:
                return "Income";
            case 1:
                return "Expense";
            default:
                return "Unknown";
        }
    }
}

class ElementGenerator {
    constructor() { }

    transactionData = new TransactionDataAccess();

    transactionTable(transactions: ITransaction[], editId: number) {
        const tBody = document.getElementById('transactionList') as HTMLTableSectionElement;
        const button = document.createElement('button') as HTMLButtonElement;
        let editableElement = document.getElementById('editable') as HTMLElement;

        tBody.innerHTML = '';

        transactions.forEach((transaction) => {
            if (editId == transaction.id) {
                //TODO Implement Editable Row
            } else {
                let editButton = button.cloneNode(false) as HTMLButtonElement;
                editButton.classList.add('btn', 'btn-primary', 'btn-sm');
                //TODO Implement Edit Functionality
                // editButton.setAttribute('onclick', `editTransaction(${transaction.id})`);

                let deleteButton = button.cloneNode(false) as HTMLButtonElement;
                deleteButton.classList.add('btn', 'btn-danger', 'btn-sm');
                //TODO Implement Delete Functionality
                // deleteButton.setAttribute('onclick', `deleteTransaction(${transaction.id})`);

                let tr = tBody.insertRow();

                let td1 = tr.insertCell(0);
                td1.appendChild(document.createTextNode(transaction.transactionDate.toString()));

                let td2 = tr.insertCell(1);
                td2.appendChild(document.createTextNode(this.transactionData.convertTransactionTypeToString(transaction.transactionType)));

                let td3 = tr.insertCell(2);
                td3.appendChild(document.createTextNode(transaction.amount.toLocaleString()));

                let td4 = tr.insertCell(3);
                td4.appendChild(this.categoryPillGenerator(transaction.category));
            }
        });
    }

    categoryPillGenerator(category: ICategory): HTMLSpanElement {
        let pill = document.createElement('span') as HTMLSpanElement;
        pill.classList.add('badge', 'rounded-pill', 'bg-primary');
        pill.appendChild(document.createTextNode(category.name));
        return pill;

    }

}



class UI {

    readonly elementGenerator: ElementGenerator;
    readonly category: CategoryDataAccess;
    readonly transaction: TransactionDataAccess;

    constructor() {
        this.elementGenerator = new ElementGenerator();
        this.category = new CategoryDataAccess();
        this.transaction = new TransactionDataAccess();
    }

    displayTransactions(data: ITransaction[]): void {

        this.elementGenerator.transactionTable(data, 0);
    }


}

let ui = new UI();

console.log("working");
ui.transaction.initArray().then((data) => {
    ui.displayTransactions(data);
});



