import React, { useState } from 'react';
import { View, Text, Button, FlatList, TextInput, TouchableOpacity } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import IOrder from "../../model/IOrder";
import ICustomer from "../../model/ICustomer";
import IItem from "../../model/IItem";

const Order = () => {
    const [orders, setOrders] = useState<IOrder[]>([]);
    const [selectedCustomer, setSelectedCustomer] = useState<string>('');
    const [selectedItem, setSelectedItem] = useState<string>('');
    const [quantity, setQuantity] = useState<string>('1');
    const [cart, setCart] = useState<IItem[]>([]);
    const [editIndex, setEditIndex] = useState<number | null>(null);

    const customers: ICustomer[] = [
        { id: 1, name: 'John Doe', address: '123 Main St', email: 'john@example.com' },
        { id: 2, name: 'Jane Smith', address: '456 Elm St', email: 'jane@example.com' },
    ];

    const items: IItem[] = [
        { code: 1, description: 'Apple', unitPrice: 2, quantity: 0 },
        { code: 2, description: 'Banana', unitPrice: 1, quantity: 0 },
        { code: 3, description: 'Orange', unitPrice: 3, quantity: 0 },
    ];

    const addToCart = () => {
        if (!selectedItem || quantity === '' || Number(quantity) <= 0) return;
        const item = items.find(i => i.code?.toString() === selectedItem);
        if (item) {
            if (editIndex !== null) {
                const updatedCart = [...cart];
                updatedCart[editIndex] = { ...item, quantity: Number(quantity) };
                setCart(updatedCart);
                setEditIndex(null);
            } else {
                setCart([...cart, { ...item, quantity: Number(quantity) }]);
            }
            setSelectedItem('');
            setQuantity('1');
        }
    };

    const handlePlaceOrder = () => {
        if (!selectedCustomer || cart.length === 0) return;
        const newOrder: IOrder = {
            id: Date.now(),
            customerId: selectedCustomer,
            items: cart,
        };
        setOrders([...orders, newOrder]);
        setCart([]);
        setSelectedCustomer('');
    };


    const getTotalPrice = () => {
        return cart.reduce((total, item) => total + item.unitPrice * item.quantity, 0);
    };

    const handleEditItem = (index: number) => {
        setEditIndex(index);
        setSelectedItem(cart[index].code?.toString() || '');
        setQuantity(cart[index].quantity.toString());
    };

    const handleDeleteItem = (index: number) => {
        const updatedCart = cart.filter((_, i) => i !== index);
        setCart(updatedCart);
    };

    return (
        <View style={{ padding: 20 }}>
            <Text style={{ fontSize: 24, fontWeight: 'bold' }}>Place Order</Text>

            {/* Customer Selection */}
            <Text style={{ fontSize: 18, marginTop: 10 }}>Select Customer:</Text>
            <Picker selectedValue={selectedCustomer} onValueChange={setSelectedCustomer}>
                <Picker.Item label="Select Customer" value="" />
                {customers.map((customer) => (
                    <Picker.Item key={customer.id} label={customer.name} value={customer.email.toString()} />
                ))}
            </Picker>

            {/* Item Selection */}
            <Text style={{ fontSize: 18, marginTop: 10 }}>Select Item:</Text>
            <Picker selectedValue={selectedItem} onValueChange={setSelectedItem}>
                <Picker.Item label="Select Item" value="" />
                {items.map((item) => (
                    <Picker.Item key={item.code} label={`${item.description} - $${item.unitPrice}`} value={item.code?.toString()} />
                ))}
            </Picker>

            {/* Quantity Input */}
            <Text style={{ fontSize: 18, marginTop: 10 }}>Quantity:</Text>
            <TextInput
                value={quantity}
                onChangeText={setQuantity}
                keyboardType="numeric"
                style={{ borderWidth: 1, padding: 5, marginBottom: 10 }}
            />

            {/* Add to Cart Button */}
            <Button title="Add to Cart" onPress={addToCart} />

            {/* Cart Items Table */}
            <Text style={{ fontSize: 20, marginTop: 20, fontWeight: 'bold' }}>Cart Items</Text>
            <FlatList
                data={cart}
                keyExtractor={(item) => item.code?.toString() || '0'}
                ListHeaderComponent={
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 5 }}>
                        <Text style={{ fontWeight: 'bold' }}>Item Description</Text>
                        <Text style={{ fontWeight: 'bold' }}>Quantity</Text>
                        <Text style={{ fontWeight: 'bold' }}>Action</Text>
                    </View>
                }
                renderItem={({ item, index }) => (
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 5 }}>
                        <Text>{item.description} (x{item.quantity})</Text>
                        <Text>{item.quantity}</Text>
                        <View style={{ flexDirection: 'row' }}>
                            <TouchableOpacity onPress={() => handleEditItem(index)}>
                                <Text style={{ color: 'blue', marginRight: 10 }}>Edit</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => handleDeleteItem(index)}>
                                <Text style={{ color: 'red' }}>Delete</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                )}
            />

            {/* Place Order Button */}
            <Button title="Place Order" onPress={handlePlaceOrder} />

            {/* Total Price Display */}
            <Text style={{ fontSize: 18, marginTop: 10, fontWeight: 'bold' }}>
                Total Price: ${getTotalPrice()}
            </Text>
        </View>
    );
};

export default Order;
