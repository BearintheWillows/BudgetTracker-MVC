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

interface IPaginationResult<T> {
    data: T[];
    pageNumber: number;
    pageSize: number;
    firstPage: string;
    lastPage: string;
    totalPages: number;
    totalRecords: number;
    nextPage: string;
    previousPage: string;
    succeeded: boolean;
    message: string;
    errors: string[];
}

// Category Class
class CategoryDataAccess {

    constructor() { }


    //Initialise Properties
    categories: ICategory[] = [];
    readonly baseUrl: string = '/api/category';

    async initArray(): Promise<ICategory[]> {
        await (await this.getAll(`${this.baseUrl}?pageNuber=1&pageSize=10`)).forEach(x => this.categories.push(x));

        return this.categories;

    }

    //Get all categories
    async getAll(uri: string): Promise<ICategory[]> {
        const response = await fetch(uri);
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
        if ((await this.getAll(this.baseUrl)).find(x => x.name === category.name)) { // TODO Fix URL
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
                await this.getAll(this.baseUrl); //TODO Fix URL
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
            await this.getAll(this.baseUrl); //TODO Fix URL
        }
    }

    //Delete Category
    async delete(id: number): Promise<void> {

        //check if id is in categories
        if (!(await this.getAll(this.baseUrl)).find(x => x.id === id)) { //TODO Fix URL
            alert("Category does not exist");
        } else {
            const response = await fetch(`${this.baseUrl}/delete/${id}`, {
                method: 'DELETE'
            });

            // check if response is ok
            if (response.ok) {
                console.log("Category deleted");
                await this.getAll(this.baseUrl); //TODO Fix URL
            }
        }
    }
}

class TransactionDataAccess {
    constructor() {

    }

    paginationResult: IPaginationResult<ITransaction>;
    paginationData: ITransaction[];
    readonly baseUrl: string = '/api/transaction?pageNumber=1&pageSize=2';

    async initArray(): Promise<IPaginationResult<ITransaction>> {
        var data = await this.getAll(this.baseUrl);
        this.paginationData = data.data
        console.log("pagination" + this.paginationData);
        return this.paginationResult;

    }

    async getAll(uri: string): Promise<IPaginationResult<ITransaction>> {
        const response = await fetch(uri);
        const data = await response.json();
        console.log(data);
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
            await this.getAll(this.baseUrl); //TODO Fix URL
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
            await this.getAll(this.baseUrl); //TODO Fix URL
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
            await this.getAll(this.baseUrl);//TODO Fix URL
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
                editButton.textContent = 'Edit';
                //TODO Implement Edit Functionality
                // editButton.setAttribute('onclick', `editTransaction(${transaction.id})`);

                let deleteButton = button.cloneNode(false) as HTMLButtonElement;
                deleteButton.classList.add('btn', 'btn-danger', 'btn-sm');
                deleteButton.textContent = 'Delete';
                //TODO Implement Delete Functionality
                // deleteButton.setAttribute('onclick', `deleteTransaction(${transaction.id})`);

                const buttonDiv = document.createElement('div') as HTMLDivElement;
                buttonDiv.classList.add('functionButtons')
                buttonDiv.appendChild(editButton);
                buttonDiv.appendChild(deleteButton);
                buttonDiv.style.visibility = 'hidden';


                let tr = tBody.insertRow();

                tr.addEventListener('mouseover', () => {
                    buttonDiv.style.visibility = 'visible';
                });

                tr.addEventListener('mouseout', () => {
                    buttonDiv.style.visibility = 'hidden';
                });

                let td1 = tr.insertCell(0);
                td1.appendChild(document.createTextNode(transaction.transactionDate.toString()));

                let td2 = tr.insertCell(1);
                td2.appendChild(document.createTextNode(this.transactionData.convertTransactionTypeToString(transaction.transactionType)));

                let td3 = tr.insertCell(2);
                td3.appendChild(document.createTextNode(transaction.amount.toLocaleString()));

                let td4 = tr.insertCell(3);
                td4.appendChild(this.categoryPillGenerator(transaction.category));

                tr.appendChild(buttonDiv);
            }
        });
    }

    paginationGenerator(paginationResult: IPaginationResult<ITransaction>, data: ITransaction[]): void {
        console.log(paginationResult);
        console.log(data);
        let pagination = document.getElementById('pagination') as HTMLDivElement;
        pagination.innerHTML = '';

        const button = document.createElement('button') as HTMLButtonElement;

        let previousButton = button.cloneNode(false) as HTMLButtonElement;
        previousButton.classList.add('btn', 'btn-primary', 'btn-sm');
        previousButton.textContent = 'Previous';
        previousButton.setAttribute('onclick', `previousPage(${paginationResult.previousPage})`);

        let nextButton = button.cloneNode(false) as HTMLButtonElement;
        nextButton.classList.add('btn', 'btn-primary', 'btn-sm');
        nextButton.textContent = 'Next';
        nextButton.setAttribute('onclick', `nextPage(${paginationResult.nextPage})`);

        let firstButton = button.cloneNode(false) as HTMLButtonElement;
        firstButton.classList.add('btn', 'btn-primary', 'btn-sm');
        firstButton.textContent = 'First';
        firstButton.setAttribute('onclick', `firstPage(${paginationResult.firstPage})`);

        let lastButton = button.cloneNode(false) as HTMLButtonElement;
        lastButton.classList.add('btn', 'btn-primary', 'btn-sm');
        lastButton.textContent = 'Last';
        lastButton.addEventListener('click', () => {
            this.lastPage(`${paginationResult.lastPage}`);
        });

        let pageButton = button.cloneNode(false) as HTMLButtonElement;
        pageButton.classList.add('btn', 'btn-primary', 'btn-sm');

        let pageButtonDiv = document.createElement('div') as HTMLDivElement;
        pageButtonDiv.classList.add('pageButtons');

        for (let i = 0; i < 3; i++) {
            let pageButtonClone = pageButton.cloneNode(false) as HTMLButtonElement;
            pageButtonClone.textContent = (i + 1).toString();
            pageButtonClone.setAttribute('onclick', `page(${i + 1})`);
            pageButtonDiv.appendChild(pageButtonClone);
        }

        pagination.appendChild(firstButton);
        pagination.appendChild(previousButton);
        pagination.appendChild(pageButtonDiv);
        pagination.appendChild(nextButton);
        pagination.appendChild(lastButton);

        this.transactionTable(data, 0);
    }

    async lastPage(uri: string): Promise<void> {
        await this.transactionData.getAll(uri).then((result) => {
            this.paginationGenerator(result, result.data);
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

    async displayTransactions(): Promise<void> {

        var result = await this.transaction.getAll(this.transaction.baseUrl); //TODO FIX THIS
        this.elementGenerator.paginationGenerator(result, result.data);


    }
}

let ui = new UI();

console.log("working");
ui.transaction.initArray().then((data) => {
    ui.displayTransactions();
});




