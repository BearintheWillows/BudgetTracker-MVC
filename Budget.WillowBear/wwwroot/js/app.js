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
}
class UI {
    constructor() {
        this.category = new CategoryDataAccess();
        this.transaction = new TransactionDataAccess();
    }
    displayCategories(data) {
        let tbody = document.getElementById('catList');
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
        });
    }
}
let ui = new UI();
console.log("working");
ui.category.initArray().then((data) => {
    ui.displayCategories(data);
});
//# sourceMappingURL=app.js.map