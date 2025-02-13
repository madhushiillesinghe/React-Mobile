import React from 'react';
import { Tabs } from 'expo-router';
import { Appbar } from 'react-native-paper';
// @ts-ignore
import { MaterialCommunityIcons } from 'react-native-vector-icons';

function TabLayout() {
    return (
        <Tabs>
            {/* Home Tab */}
            <Tabs.Screen
                name="index"
                options={{
                    headerTitle: 'Home',
                    title: 'Home',
                    header: () => (
                        <Appbar.Header>
                            <Appbar.Content title="Home" />
                        </Appbar.Header>
                    ),
                    tabBarIcon: ({ color }) => (
                        <MaterialCommunityIcons name="home" size={24} color={color} />
                    ),
                }}
            />
            {/* Customer Tab */}
            <Tabs.Screen
                name="customer"
                options={{
                    headerTitle: 'Customer',
                    title: 'Customer',
                    header: () => (
                        <Appbar.Header>
                            <Appbar.Content title="Customer" />
                        </Appbar.Header>
                    ),
                    tabBarIcon: ({ color }) => (
                        <MaterialCommunityIcons name="account-group" size={24} color={color} />
                    ),
                }}
            />
            {/* Item Tab */}
            <Tabs.Screen
                name="item"
                options={{
                    headerTitle: 'Item',
                    title: 'Item',
                    header: () => (
                        <Appbar.Header>
                            <Appbar.Content title="Item" />
                        </Appbar.Header>
                    ),
                    tabBarIcon: ({ color }) => (
                        <MaterialCommunityIcons name="basket" size={24} color={color} />
                    ),
                }}
            />
            {/* Order Tab */}
            <Tabs.Screen
                name="order"
                options={{
                    headerTitle: 'Order',
                    title: 'Order',
                    header: () => (
                        <Appbar.Header>
                            <Appbar.Content title="Order" />
                        </Appbar.Header>
                    ),
                    tabBarIcon: ({ color }) => (
                        <MaterialCommunityIcons name="cart" size={24} color={color} />
                    ),
                }}
            />
        </Tabs>
    );
}

export default TabLayout;
