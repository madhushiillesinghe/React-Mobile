import ICustomer from "./ICustomer";
import IItem from "./IItem";

export default interface IOrder {
    id?: string;
    customer: ICustomer;
    items: IItem[];
    totalAmount: number;
    status: "pending" | "processing" | "shipped" | "delivered";
}
