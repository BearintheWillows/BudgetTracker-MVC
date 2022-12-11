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
