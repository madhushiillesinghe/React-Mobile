import React, { useEffect, useState } from "react";
import { ScrollView, Alert } from "react-native";
import { Text, Button, TextInput, Card, List, Divider, ActivityIndicator } from "react-native-paper";
import { Picker } from "@react-native-picker/picker";

const OrderScreen = () => {
    const [selectedCustomer, setSelectedCustomer] = useState<string>("");
    const [customerEmail, setCustomerEmail] = useState<string>("");
    const [selectedItem, setSelectedItem] = useState<string>("");
    const [unitPrice, setUnitPrice] = useState<string>("");
    const [quantity, setQuantity] = useState<string>("1");
    const [cart, setCart] = useState<Array<any>>([]);
    const [customers, setCustomers] = useState<Array<any>>([]);
    const [items, setItems] = useState<Array<any>>([]);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [customersRes, itemsRes] = await Promise.all([
                    fetch("http://192.168.1.106:5000/customer").then(res => res.json()),
                    fetch("http://192.168.1.106:5000/item").then(res => res.json())
                ]);
                setCustomers(customersRes);
                setItems(itemsRes);
            } catch (error) {
                Alert.alert("Error", "Failed to load data");
                console.error(error);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    const handleCustomerChange = (value: string) => {
        setSelectedCustomer(value);
        const customer = customers.find(c => c.CustomerID.toString() === value);
        setCustomerEmail(customer ? customer.Email : "");
    };

    const handleItemChange = (value: string) => {
        setSelectedItem(value);
        const item = items.find(i => i.ItemID.toString() === value);
        setUnitPrice(item ? item.Price.toString() : "");
    };

    const addToCart = () => {
        const item = items.find(i => i.ItemID.toString() === selectedItem);
        if (item) {
            setCart([...cart, { ...item, quantity: Number(quantity) }]);
            setSelectedItem("");
            setQuantity("1");
            setUnitPrice("");
        }
    };

    const placeOrder = async () => {
        if (cart.length === 0) {
            Alert.alert("Error", "Your cart is empty!");
            return;
        }

        const orderData = {
            customer: { CustomerID: selectedCustomer },
            orderDate: new Date(),
            orderDetails: cart.map(item => ({
                ItemID: item.ItemID,
                Quantity: item.quantity,
                Price: item.Price
            })),
        };

        try {
            const response = await fetch("http://192.168.1.106:5000/order/placeorder", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(orderData)
            });

            if (response.ok) {
                Alert.alert("Success", "Order placed successfully!");
                setCart([]); // Clear the cart after placing the order
            } else {
                throw new Error("Failed to place the order.");
            }
        } catch (error) {
            Alert.alert("Error", error.message || "An error occurred while placing the order.");
        }

    };

    if (loading) {
        return <ActivityIndicator animating={true} size="large" style={{ marginTop: 50 }} />;
    }

    return (
        <ScrollView contentContainerStyle={{ padding: 20 }}>
            <Text variant="titleLarge" style={{ textAlign: "center", marginBottom: 10 }}>
                Place Order
            </Text>

            {/* Select Customer */}
            <Text variant="labelLarge">Select Customer:</Text>
            <Card style={{ marginBottom: 10 }}>
                <Picker selectedValue={selectedCustomer} onValueChange={handleCustomerChange}>
                    <Picker.Item label="Select Customer" value="" />
                    {customers.map(c => (
                        <Picker.Item key={c.CustomerID} label={c.Name} value={c.CustomerID.toString()} />
                    ))}
                </Picker>
            </Card>

            {/* Customer Email */}
            <Text variant="labelLarge">Email:</Text>
            <TextInput
                mode="outlined"
                value={customerEmail}
                editable={false}
                style={{ marginBottom: 10 }}
            />

            {/* Select Item */}
            <Text variant="labelLarge">Select Item:</Text>
            <Card style={{ marginBottom: 10 }}>
                <Picker selectedValue={selectedItem} onValueChange={handleItemChange}>
                    <Picker.Item label="Select Item" value="" />
                    {items.map(i => (
                        <Picker.Item key={i.ItemID} label={`${i.Name} - $${i.Price}`} value={i.ItemID.toString()} />
                    ))}
                </Picker>
            </Card>

            {/* Unit Price */}
            <Text variant="labelLarge">Unit Price:</Text>
            <TextInput
                mode="outlined"
                value={unitPrice}
                editable={false}
                style={{ marginBottom: 10 }}
            />

            {/* Quantity Input */}
            <Text variant="labelLarge">Quantity:</Text>
            <TextInput
                mode="outlined"
                value={quantity}
                onChangeText={setQuantity}
                keyboardType="numeric"
                style={{ marginBottom: 10 }}
            />

            {/* Add to Cart Button */}
            <Button mode="contained" onPress={addToCart} style={{ marginBottom: 15 }}>
                Add to Cart
            </Button>

            {/* Cart List */}
            {cart.length > 0 && (
                <Card style={{ marginBottom: 20 }}>
                    <Card.Title title="Cart Items" />
                    {cart.map((item, index) => (
                        <List.Item
                            key={index}
                            title={`${item.Name} (x${item.quantity})`}
                            description={`$${item.Price} each`}
                        />
                    ))}
                    <Divider />
                    <Card.Actions>
                        <Button mode="contained" onPress={placeOrder}>Place Order</Button>
                    </Card.Actions>
                </Card>
            )}
        </ScrollView>
    );
};

export default OrderScreen;
