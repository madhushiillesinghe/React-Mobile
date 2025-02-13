// CustomerForm.tsx
import React, { useState } from 'react';
import { View, Text, TextInput, Button, FlatList, TouchableOpacity } from 'react-native';
import ICustomer from "../../model/IItem";

const CustomerForm = () => {
    const [customers, setCustomers] = useState<ICustomer[]>([]);
    const [formData, setFormData] = useState<ICustomer>({
        name: '',
        address: '',
        email: '',
    });
    const [isEdit, setIsEdit] = useState<boolean>(false);
    const [editId, setEditId] = useState<number | null>(null);

    const handleInputChange = (name: string, value: string) => {
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleAddOrUpdateCustomer = () => {
        if (isEdit && editId !== null) {
            // Update customer
            setCustomers((prevCustomers) =>
                prevCustomers.map((customer) =>
                    customer.id === editId ? { ...customer, ...formData } : customer
                )
            );
        } else {
            // Add new customer
            setCustomers([
                ...customers,
                { ...formData, id: Date.now() }, // Generate a unique ID using Date.now()
            ]);
        }
        // Clear the form and reset states
        setFormData({ name: '', address: '', email: '' });
        setIsEdit(false);
        setEditId(null);
    };

    const handleDeleteCustomer = (id: number) => {
        setCustomers(customers.filter((customer) => customer.id !== id));
    };

    const handleEditCustomer = (customer: ICustomer) => {
        setFormData(customer);
        setIsEdit(true);
        setEditId(customer.id || null);
    };

    return (
        <View style={{ padding: 20 }}>
            <Text style={{ fontSize: 24, marginBottom: 20 }}>
                {isEdit ? 'Edit Customer' : 'Add Customer'}
            </Text>
            <TextInput
                style={{ height: 40, borderColor: 'gray', borderWidth: 1, marginBottom: 10, paddingLeft: 8 }}
                placeholder="Name"
                value={formData.name}
                onChangeText={(text) => handleInputChange('name', text)}
            />
            <TextInput
                style={{ height: 40, borderColor: 'gray', borderWidth: 1, marginBottom: 10, paddingLeft: 8 }}
                placeholder="Address"
                value={formData.address}
                onChangeText={(text) => handleInputChange('address', text)}
            />
            <TextInput
                style={{ height: 40, borderColor: 'gray', borderWidth: 1, marginBottom: 10, paddingLeft: 8 }}
                placeholder="Email"
                value={formData.email}
                onChangeText={(text) => handleInputChange('email', text)}
            />
            <Button
                title={isEdit ? 'Update Customer' : 'Add Customer'}
                onPress={handleAddOrUpdateCustomer}
            />

            <Text style={{ fontSize: 20, marginTop: 30 }}>Customer List</Text>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 10, borderBottomWidth: 1 }}>
                <Text style={{ fontWeight: 'bold', fontSize: 16, flex: 1 }}>Name</Text>
                <Text style={{ fontWeight: 'bold', fontSize: 16, flex: 1 }}>Address</Text>
                <Text style={{ fontWeight: 'bold', fontSize: 16, flex: 1 }}>Email</Text>
                <Text style={{ fontWeight: 'bold', fontSize: 16 }}>Actions</Text>
            </View>
            <FlatList
                data={customers}
                keyExtractor={(item) => item.id?.toString() || '0'}
                renderItem={({ item }) => (
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 10 }}>
                        <Text style={{ fontSize: 16 }}>{item.name}</Text>
                        <Text style={{ fontSize: 16 }}>{item.address}</Text>
                        <Text style={{ fontSize: 16 }}>{item.email}</Text>

                        <View style={{ flexDirection: 'row' }}>
                            <TouchableOpacity onPress={() => handleEditCustomer(item)}>
                                <Text style={{ color: 'blue', marginRight: 10 }}>Edit</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => handleDeleteCustomer(item.id || 0)}>
                                <Text style={{ color: 'red' }}>Delete</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                )}
            />
        </View>
    );
};

export default CustomerForm;
