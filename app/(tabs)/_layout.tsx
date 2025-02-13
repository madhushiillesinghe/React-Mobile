import {Tabs} from "expo-router";

function TabLayout() {
    return (
        <Tabs>
            <Tabs.Screen name='index' options={{headerTitle:'Home', title:'Home'}}/>
            <Tabs.Screen name='customer' options={{headerTitle:'Customer', title:'Customer'}} />
            <Tabs.Screen name='item' options={{headerTitle:'Item', title:'Item'}} />
        </Tabs>
    );
}
export default TabLayout;