import React, { useState, useEffect } from 'react';
import { View, FlatList, TouchableOpacity } from 'react-native';
import {Text, TextInput, Button, Card, IconButton} from 'react-native-paper';
import ICustomer from "../../model/ICustomer";

const CustomerForm = () => {
    const [customers, setCustomers] = useState<ICustomer[]>([]);
    const [formData, setFormData] = useState<ICustomer>({
        CustomerID: 0,
        Name: '',
        Address: '',
        Email: ''
    });
    const [isEdit, setIsEdit] = useState<boolean>(false);
    const [editId, setEditId] = useState<number | null>(null);

    useEffect(() => {
        fetchCustomers();
    }, []);

    const fetchCustomers = async () => {
        try {
            const response = await fetch("http://192.168.1.106:5000/customer");
            const data = await response.json();
            setCustomers(data);
        } catch (error) {
            console.error('Error fetching customers:', error);
        }
    };

    const handleInputChange = (name: string, value: string) => {
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleAddOrUpdateCustomer = async () => {
        if (isEdit && editId !== null) {
            try {
                const response = await fetch(`http://192.168.1.106:5000/customer/update/${editId}`, {
                    method: 'PUT',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(formData),
                });
                const updatedCustomer = await response.json();
                setCustomers((prevCustomers) =>
                    prevCustomers.map((customer) =>
                        customer.CustomerID === editId ? updatedCustomer : customer
                    )
                );
            } catch (error) {
                console.error('Error updating customer:', error);
            }
        } else {
            try {
                const response = await fetch('http://192.168.1.106:5000/customer/add', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(formData),
                });
                const newCustomer = await response.json();
                setCustomers([...customers, newCustomer]);
            } catch (error) {
                console.error('Error adding customer:', error);
            }
        }

        setFormData({ CustomerID: 0, Name: '', Address: '', Email: '' });
        setIsEdit(false);
        setEditId(null);
    };

    const handleDeleteCustomer = async (id: number) => {
        try {
            await fetch(`http://192.168.1.106:5000/customer/delete/${id}`, {
                method: 'DELETE',
            });
            setCustomers(customers.filter((customer) => customer.CustomerID !== id));
        } catch (error) {
            console.error('Error deleting customer:', error);
        }
    };

    const handleEditCustomer = (customer: ICustomer) => {
        setFormData(customer);
        setIsEdit(true);
        setEditId(customer.CustomerID || null);
    };

    return (
        <View style={{ padding: 20 }}>
            <Text variant="headlineLarge" style={{ marginBottom: 20 }}>
                {isEdit ? 'Edit Customer' : 'Add Customer'}
            </Text>

            {/* Name Input */}
            <View style={{ marginBottom: 20 }}>
                <Text variant="bodyLarge">Name</Text>
                <TextInput
                    label="Name"
                    value={formData.Name}
                    onChangeText={(text) => handleInputChange('Name', text)}
                />
            </View>

            {/* Address Input */}
            <View style={{ marginBottom: 20 }}>
                <Text variant="bodyLarge">Address</Text>
                <TextInput
                    label="Address"
                    value={formData.Address}
                    onChangeText={(text) => handleInputChange('Address', text)}
                />
            </View>

            {/* Email Input */}
            <View style={{ marginBottom: 20 }}>
                <Text variant="bodyLarge">Email</Text>
                <TextInput
                    label="Email"
                    value={formData.Email}
                    onChangeText={(text) => handleInputChange('Email', text)}
                />
            </View>

            {/* Add/Update Button */}
            <Button mode="contained" onPress={handleAddOrUpdateCustomer} style={{ marginBottom: 20 }}>
                {isEdit ? 'Update Customer' : 'Add Customer'}
            </Button>

            {/* Customer List */}
            <Text variant="headlineSmall" style={{ marginBottom: 10 }}>
                Customer List
            </Text>

            {/* Table Header */}
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 10, borderBottomWidth: 1 }}>
                <Text style={{ fontWeight: 'bold', fontSize: 16, flex: 1 }}>Name</Text>
                <Text style={{ fontWeight: 'bold', fontSize: 16, flex: 1 }}>Email</Text>
                <Text style={{ fontWeight: 'bold', fontSize: 16, flex: 1 }}>Address</Text>
                <Text style={{ fontWeight: 'bold', fontSize: 16 }}>Actions</Text>
            </View>

            <FlatList
                data={customers}
                keyExtractor={(item) => item.CustomerID?.toString() || '0'}
                renderItem={({ item }) => (
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 10, borderBottomWidth: 1 }}>
                        <Text style={{ fontSize: 16, flex: 1 }}>{item.Name}</Text>
                        <Text style={{ fontSize: 16, flex: 1 }}>{item.Email}</Text>
                        <Text style={{ fontSize: 16, flex: 1 }}>{item.Address}</Text>

                        <View style={{ flexDirection: 'row' }}>
                            <IconButton
                                icon="pencil"  // You can use any available icon name
                                color="blue"
                                size={20}
                                onPress={() => handleEditCustomer(item)}
                                style={{ marginRight: 10 }}
                            />
                            <IconButton
                                icon="delete"  // Use the delete icon
                                color="red"
                                size={20}
                                onPress={() => handleDeleteCustomer(item.CustomerID || 0)}
                            />
                        </View>

                    </View>
                )}
            />
        </View>
    );
};

export default CustomerForm;
