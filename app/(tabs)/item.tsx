import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity } from 'react-native';
import {TextInput, Button, IconButton} from 'react-native-paper';
import IItem from '../../model/IItem';

const ItemForm = () => {
    const [items, setItems] = useState<IItem[]>([]);
    const [formData, setFormData] = useState<IItem>({
        ItemID: 0,
        Name: '',
        Quantity: 0,
        Price: 0,
    });
    const [isEdit, setIsEdit] = useState<boolean>(false);
    const [editCode, setEditCode] = useState<number | null>(null);

    useEffect(() => {
        // Fetch all items when the component is mounted
        fetchItems();
    }, []);

    // Fetch all items from the backend
    const fetchItems = async () => {
        try {
            const response = await fetch('http://192.168.1.106:5000/item');
            const data = await response.json();
            setItems(data);
        } catch (err) {
            console.log('Error fetching items', err);
        }
    };

    // Add or Update an item
    const handleAddOrUpdateItem = async () => {
        if (isEdit && editCode !== null) {
            // Update item
            try {
                const response = await fetch(`http://192.168.1.106:5000/item/update/${editCode}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(formData),
                });
                const updatedItem = await response.json();
                // Update item in the state
                setItems((prevItems) =>
                    prevItems.map((item) =>
                        item.ItemID === editCode ? updatedItem : item
                    )
                );
            } catch (err) {
                console.log('Error updating item', err);
            }
        } else {
            // Add new item
            try {
                const response = await fetch('http://192.168.1.106:5000/item/add', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(formData),
                });
                const addedItem = await response.json();
                // Add the new item to the state
                setItems((prevItems) => [...prevItems, addedItem]);
            } catch (err) {
                console.log('Error adding item', err);
            }
        }

        // Clear form and reset states
        setFormData({ Name: '', Quantity: 0, Price: 0, ItemID: 0 });
        setIsEdit(false);
        setEditCode(null);
    };

    // Delete an item
    const handleDeleteItem = async (id: number) => {
        try {
            await fetch(`http://192.168.1.106:5000/item/delete/${id}`, {
                method: 'DELETE',
            });
            // Remove the item from the state
            setItems(items.filter((item) => item.ItemID !== id));
        } catch (err) {
            console.log('Error deleting item', err);
        }
    };

    // Edit an item
    const handleEditItem = (item: IItem) => {
        setFormData(item);
        setIsEdit(true);
        setEditCode(item.ItemID);
    };

    return (
        <View style={{ padding: 20 }}>
            <Text style={{ fontSize: 24, marginBottom: 20 }}>
                {isEdit ? 'Edit Item' : 'Add Item'}
            </Text>
            <TextInput
                label="Description"
                value={formData.Name}
                onChangeText={(text) => setFormData({ ...formData, Name: text })}
                style={{ marginBottom: 10 }}
            />
            <TextInput
                label="Quantity"
                value={formData.Quantity.toString()}
                onChangeText={(text) => setFormData({ ...formData, Quantity: parseInt(text) })}
                keyboardType="numeric"
                style={{ marginBottom: 10 }}
            />
            <TextInput
                label="Unit Price"
                value={formData.Price.toString()}
                onChangeText={(text) => setFormData({ ...formData, Price: parseFloat(text) })}
                keyboardType="numeric"
                style={{ marginBottom: 10 }}
            />
            <Button
                mode="contained"
                onPress={handleAddOrUpdateItem}
                style={{ marginBottom: 20 }}
            >
                {isEdit ? 'Update Item' : 'Add Item'}
            </Button>

            <Text style={{ fontSize: 20, marginTop: 30 }}>Item List</Text>

            {/* Table Header */}
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 10, borderBottomWidth: 1 }}>
                <Text style={{ fontWeight: 'bold', fontSize: 16, flex: 1 }}>Code</Text>
                <Text style={{ fontWeight: 'bold', fontSize: 16, flex: 1 }}>Description</Text>
                <Text style={{ fontWeight: 'bold', fontSize: 16, flex: 1 }}>Quantity</Text>
                <Text style={{ fontWeight: 'bold', fontSize: 16, flex: 1 }}>Unit Price</Text>
                <Text style={{ fontWeight: 'bold', fontSize: 16 }}>Actions</Text>
            </View>

            <FlatList
                data={items}
                keyExtractor={(item) => item.ItemID.toString()}
                renderItem={({ item }) => (
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 10, borderBottomWidth: 1 }}>
                        <Text style={{ fontSize: 16, flex: 1 }}>{item.ItemID}</Text>
                        <Text style={{ fontSize: 16, flex: 1 }}>{item.Name}</Text>
                        <Text style={{ fontSize: 16, flex: 1 }}>{item.Quantity}</Text>
                        <Text style={{ fontSize: 16, flex: 1 }}>${item.Price}</Text>

                        <View style={{ flexDirection: 'row' }}>
                            <IconButton
                                icon="pencil"  // You can use any available icon name
                                color="blue"
                                size={20}
                                onPress={() => handleEditItem(item)}
                                style={{ marginRight: 10 }}
                            />
                            <IconButton
                                icon="delete"  // Use the delete icon
                                color="red"
                                size={20}
                                onPress={() => handleDeleteItem(item.ItemID || 0)}
                            />
                        </View>
                    </View>
                )}
            />
        </View>
    );
};

export default ItemForm;
