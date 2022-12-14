var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
// Category Class
class CategoryDataAccess {
    constructor() {
        //Initialise Properties
        this.categories = [];
        this.baseUrl = '/api/category';
    }
    initArray() {
        return __awaiter(this, void 0, void 0, function* () {
            yield (yield this.getAll()).forEach(x => this.categories.push(x));
            return this.categories;
        });
    }
    //Get all categories
    getAll() {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield fetch(this.baseUrl);
            const data = yield response.json();
            return data;
        });
    }
    //Get by Id
    getById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield fetch(`${this.baseUrl}/${id}`);
            const data = yield response.json();
            return data;
        });
    }
    //Get BY NAME
    getByName(name) {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield fetch(`${this.baseUrl}/${name}`);
            const data = yield response.json();
            return data;
        });
    }
    //Create Category
    create(category) {
        return __awaiter(this, void 0, void 0, function* () {
            if ((yield this.getAll()).find(x => x.name === category.name)) {
                alert("Category already exists");
            }
            else {
                const response = yield fetch(`${this.baseUrl}/create`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(category)
                });
                //check if response is ok
                if (response.ok) {
                    console.log("Category created");
                    yield this.getAll();
                }
            }
        });
    }
    //Update Category
    update(category) {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield fetch(`${this.baseUrl}/update/${category.id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(category)
            });
            // check if response is ok
            if (response.ok) {
                console.log("Category updated");
                yield this.getAll();
            }
        });
    }
    //Delete Category
    delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            //check if id is in categories
            if (!(yield this.getAll()).find(x => x.id === id)) {
                alert("Category does not exist");
            }
            else {
                const response = yield fetch(`${this.baseUrl}/delete/${id}`, {
                    method: 'DELETE'
                });
                // check if response is ok
                if (response.ok) {
                    console.log("Category deleted");
                    yield this.getAll();
                }
            }
        });
    }
}
class TransactionDataAccess {
    constructor() {
        this.transactions = [];
        this.baseUrl = '/api/transaction';
    }
    initArray() {
        return __awaiter(this, void 0, void 0, function* () {
            yield (yield this.getAll()).forEach(x => this.transactions.push(x));
            return this.transactions;
        });
    }
    getAll() {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield fetch(this.baseUrl);
            const data = yield response.json();
            this.transactions = data;
            return data;
        });
    }
    getById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield fetch(`${this.baseUrl}/${id}`);
            const data = yield response.json();
            if (response.ok) {
                console.log("Transaction found");
                return data;
            }
            else {
                console.log("Transaction not found");
                return null;
            }
        });
    }
    create(transaction) {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield fetch(`${this.baseUrl}/create`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(transaction)
            });
            if (response.ok) {
                console.log("Transaction created");
                yield this.getAll();
            }
            else {
                console.log("Transaction not created");
            }
        });
    }
    update(transaction) {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield fetch(`${this.baseUrl}/update/${transaction.id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(transaction)
            });
            ;
            if (response.ok) {
                console.log("Transaction updated");
                yield this.getAll();
            }
            else {
                console.log("Transaction not updated");
            }
        });
    }
    delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield fetch(`${this.baseUrl}/delete/${id}`, {
                method: 'DELETE'
            });
            if (response.ok) {
                console.log("Transaction deleted");
                yield this.getAll();
            }
            else {
                console.log("Transaction not deleted");
            }
        });
    }
    convertTransactionTypeToString(transactionType) {
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
    constructor() {
        this.transactionData = new TransactionDataAccess();
    }
    transactionTable(transactions, editId) {
        const tBody = document.getElementById('transactionList');
        const button = document.createElement('button');
        let editableElement = document.getElementById('editable');
        tBody.innerHTML = '';
        transactions.forEach((transaction) => {
            if (editId == transaction.id) {
                //TODO Implement Editable Row
            }
            else {
                let editButton = button.cloneNode(false);
                editButton.classList.add('btn', 'btn-primary', 'btn-sm');
                editButton.textContent = 'Edit';
                //TODO Implement Edit Functionality
                // editButton.setAttribute('onclick', `editTransaction(${transaction.id})`);
                let deleteButton = button.cloneNode(false);
                deleteButton.classList.add('btn', 'btn-danger', 'btn-sm');
                deleteButton.textContent = 'Delete';
                //TODO Implement Delete Functionality
                // deleteButton.setAttribute('onclick', `deleteTransaction(${transaction.id})`);
                const buttonDiv = document.createElement('div');
                buttonDiv.classList.add('functionButtons');
                buttonDiv.appendChild(editButton);
                buttonDiv.appendChild(deleteButton);
                buttonDiv.style.display = 'none';
                let tr = tBody.insertRow();
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
    categoryPillGenerator(category) {
        let pill = document.createElement('span');
        pill.classList.add('badge', 'rounded-pill', 'bg-primary');
        pill.appendChild(document.createTextNode(category.name));
        return pill;
    }
}
class UI {
    constructor() {
        this.elementGenerator = new ElementGenerator();
        this.category = new CategoryDataAccess();
        this.transaction = new TransactionDataAccess();
    }
    displayTransactions(data) {
        this.elementGenerator.transactionTable(data, 0);
    }
}
let ui = new UI();
console.log("working");
ui.transaction.initArray().then((data) => {
    ui.displayTransactions(data);
});
//# sourceMappingURL=app.js.map