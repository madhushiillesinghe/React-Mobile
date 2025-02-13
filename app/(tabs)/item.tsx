// ItemForm.tsx
import React, { useState } from 'react';
import { View, Text, TextInput, Button, FlatList, TouchableOpacity } from 'react-native';
import IItem from '../../model/IItem';

const ItemForm = () => {
    const [items, setItems] = useState<IItem[]>([]);
    const [formData, setFormData] = useState<IItem>({
        description: '',
        quantity: '',
        unitPrice: 0,
    });
    const [isEdit, setIsEdit] = useState<boolean>(false);
    const [editCode, setEditCode] = useState<number | null>(null);

    const handleInputChange = (name: string, value: string) => {
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleAddOrUpdateItem = () => {
        if (isEdit && editCode !== null) {
            // Update item
            setItems((prevItems) =>
                prevItems.map((item) =>
                    item.code === editCode ? { ...item, ...formData } : item
                )
            );
        } else {
            // Add new item
            setItems([
                ...items,
                { ...formData, code: Date.now() }, // Generate a unique code using Date.now()
            ]);
        }
        // Clear the form and reset states
        setFormData({ description: '', quantity: '', unitPrice: 0 });
        setIsEdit(false);
        setEditCode(null);
    };

    const handleDeleteItem = (code: number) => {
        setItems(items.filter((item) => item.code !== code));
    };

    const handleEditItem = (item: IItem) => {
        setFormData(item);
        setIsEdit(true);
        setEditCode(item.code || null);
    };

    return (
        <View style={{ padding: 20 }}>
            <Text style={{ fontSize: 24, marginBottom: 20 }}>
                {isEdit ? 'Edit Item' : 'Add Item'}
            </Text>
            <TextInput
                style={{ height: 40, borderColor: 'gray', borderWidth: 1, marginBottom: 10, paddingLeft: 8 }}
                placeholder="Description"
                value={formData.description}
                onChangeText={(text) => handleInputChange('description', text)}
            />
            <TextInput
                style={{ height: 40, borderColor: 'gray', borderWidth: 1, marginBottom: 10, paddingLeft: 8 }}
                placeholder="Quantity"
                value={formData.quantity}
                onChangeText={(text) => handleInputChange('quantity', text)}
            />
            <TextInput
                style={{ height: 40, borderColor: 'gray', borderWidth: 1, marginBottom: 10, paddingLeft: 8 }}
                placeholder="Unit Price"
                value={formData.unitPrice.toString()}
                keyboardType="numeric"
                onChangeText={(text) => handleInputChange('unitPrice', text)}
            />
            <Button
                title={isEdit ? 'Update Item' : 'Add Item'}
                onPress={handleAddOrUpdateItem}
            />

            <Text style={{ fontSize: 20, marginTop: 30 }}>Item List</Text>

            {/* Table Header */}
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 10, borderBottomWidth: 1 }}>
                <Text style={{ fontWeight: 'bold', fontSize: 16, flex: 1 }}>Description</Text>
                <Text style={{ fontWeight: 'bold', fontSize: 16, flex: 1 }}>Quantity</Text>
                <Text style={{ fontWeight: 'bold', fontSize: 16, flex: 1 }}>Unit Price</Text>
                <Text style={{ fontWeight: 'bold', fontSize: 16 }}>Actions</Text>
            </View>

            <FlatList
                data={items}
                keyExtractor={(item) => item.code?.toString() || '0'}
                renderItem={({ item }) => (
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 10, borderBottomWidth: 1 }}>
                        <Text style={{ fontSize: 16, flex: 1 }}>{item.description}</Text>
                        <Text style={{ fontSize: 16, flex: 1 }}>{item.quantity}</Text>
                        <Text style={{ fontSize: 16, flex: 1 }}>${item.unitPrice}</Text>

                        <View style={{ flexDirection: 'row' }}>
                            <TouchableOpacity onPress={() => handleEditItem(item)}>
                                <Text style={{ color: 'blue', marginRight: 10 }}>Edit</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => handleDeleteItem(item.code || 0)}>
                                <Text style={{ color: 'red' }}>Delete</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                )}
            />
        </View>
    );
};

export default ItemForm;
