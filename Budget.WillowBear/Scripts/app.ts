// Interface to match the Transaction model
interface ITransaction {
    id: number;
    transactionDate: Date;
    amount: number;
    notes: string;
    categoryId: number;
    category: ICategory;
    transactionType: number;
}

interface ICategory {
    id: number;
    name: string;
    description: string;
}

// Category Class
class CategoryDataAccess {
    readonly baseUrl: string = '/api/category';
    //Get all categories
    async getAll(): Promise<ICategory[]> {
        const response = await fetch(this.baseUrl);
        const data = await response.json();
        return data;
    }

    //Get by Id
    async getById(id: number): Promise<ICategory> {
        const response = await fetch(`${this.baseUrl}/id/${id}`);
        const data = await response.json();
        return data;
    }
}

class Transaction {
    //TODO: Implement Transaction class
}




let categoryDataAccess = new CategoryDataAccess();

categoryDataAccess.getAll().then((categories) => {
    console.log(categories);
});

categoryDataAccess.getById(3).then((category) => {
    console.log(category);
});