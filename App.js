import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, Image, Alert } from 'react-native';
import { NavigationContainer, NavigationRouteContext, StackActions } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import {
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem
} from '@react-navigation/drawer';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Notes from './components/Notes'
import NewNote from './components/NewNote'
import BigNote from './components/BigNote'
import AddCategory from './components/AddCategory'
import { Ionicons } from '@expo/vector-icons';

const Drawer = createDrawerNavigator();
const Stack = createNativeStackNavigator();

const DrawerNav = () => {
  return (
    <Drawer.Navigator screenOptions={{
      drawerStyle: {
        backgroundColor: '#212121',
      },
      drawerLabelStyle: {
        color: "white"
      },
      drawerActiveBackgroundColor: '#673AB7'

    }} drawerContent={(props) => <CustomDrawerContent {...props} />}>
      <Drawer.Screen name="notes" component={Notes} options={{
        title: "Notatki",
        headerStyle: { backgroundColor: '#673AB7' },
        headerTintColor: 'white',
        headerTitleStyle: {
          color: 'white',
        },
        drawerIcon: () => (<View style={{ backgroundColor: '#FFC107', width: 50, height: 50, borderRadius: 25 }}><Ionicons name="reader-outline" style={{ fontSize: 32, lineHeight: 50, textAlign: 'center' }} color="black" /></View>)
      }} />
      <Drawer.Screen name="newnote" component={NewNote} options={{
        title: "Dodaj notatkę",
        drawerLabel: "Dodaj notatkę",
        headerStyle: { backgroundColor: '#673AB7' },
        headerTintColor: 'white',
        headerTitleStyle: {
          color: 'white',
        },
        drawerIcon: () => (<View style={{ backgroundColor: '#40b7ad', width: 50, height: 50, borderRadius: 25 }}><Ionicons name="pencil-outline" style={{ fontSize: 32, lineHeight: 50, textAlign: 'center' }} color="black" /></View>)

      }} />
      <Drawer.Screen name="addcategory" component={AddCategory} options={{
        title: "Dodaj kategorię",
        drawerLabel: "Dodaj kategorię",
        headerStyle: { backgroundColor: '#673AB7' },
        headerTintColor: 'white',
        headerTitleStyle: {
          color: 'white',
        },
        drawerIcon: () => (<View style={{ backgroundColor: '#5C65A6', width: 50, height: 50, borderRadius: 25 }}><Ionicons name="folder-open-outline" style={{ fontSize: 32, lineHeight: 50, textAlign: 'center' }} color="black" /></View>)

      }} />
    </Drawer.Navigator>
  )
}

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="drawer" component={DrawerNav} options={{
          title: "Notatka",
          headerStyle: { backgroundColor: '#673AB7' },
          headerTintColor: 'white',
          headerTitleStyle: {
            color: 'white',
          },
          headerShadowVisible: false,
          headerShown: false
        }} />
        <Stack.Screen name="bignote" component={BigNote} options={{
          title: "Notatka",
          headerStyle: { backgroundColor: '#673AB7' },
          headerTintColor: 'white',
          headerTitleStyle: {
            color: 'white',
          },
          headerShadowVisible: false
        }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

function CustomDrawerContent(props) {
  return (
    <DrawerContentScrollView {...props}>
      <Image source={require('./images/note.png')} style={{ width: 250, height: 250, alignSelf: 'center' }} />

      <DrawerItemList {...props} />

      <DrawerItem
        label="Info"
        labelStyle={{ color: 'white' }}
        icon={() => <View style={{ backgroundColor: '#f05e4f', width: 50, height: 50, borderRadius: 25 }}><Ionicons name="information-outline" style={{ fontSize: 32, lineHeight: 50, textAlign: 'center' }} color="black" /></View>}
        onPress={() => Alert.alert("Info", "NoteApp v 2.0.0", [{ text: "Cancel", style: "cancel" }, { text: "OK", style: "default" }], { cancelable: true })}
      />

    </DrawerContentScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
