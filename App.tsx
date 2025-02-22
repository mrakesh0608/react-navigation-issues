import "react-native-gesture-handler";

import { Button, Text, View } from "react-native";

import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer, useNavigation } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { useWindowDimensions } from "react-native";
import { useMemo } from "react";

const Stack = createStackNavigator();

function HomeScreen() {
	const navigation = useNavigation();

	return (
		<View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
			<Text>Home Screen</Text>
			<Button title="Go to Manage Bookings" onPress={() => navigation.navigate("ManageBookings" as never)} />
		</View>
	);
}

function TabScreen() {
	return (
		<View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
			<Text>Tab Screen</Text>
		</View>
	);
}

const Tab = createMaterialTopTabNavigator();

const NO_OF_TABS = 2;

export function ManageBookings() {
	const windowDimensions = useWindowDimensions();

	const { width, start } = useMemo(() => {
		const SINGLE_TAB_WIDTH = windowDimensions.width / NO_OF_TABS;

		return {
			width: SINGLE_TAB_WIDTH * 0.5,
			start: SINGLE_TAB_WIDTH * 0.25,
		};
	}, [windowDimensions.width]);

	return (
		<Tab.Navigator
			screenOptions={{
				tabBarLabelStyle: {
					textTransform: "capitalize",
					fontWeight: "400",
					fontSize: 16,
					color: "white",
				},
				tabBarStyle: {
					backgroundColor: "blue",
					borderBottomLeftRadius: 25,
					borderBottomRightRadius: 25,
				},
				tabBarIndicatorStyle: {
					borderColor: "white",
					borderBottomWidth: 8,
					width,
					start,
					justifyContent: "center",
					borderTopLeftRadius: 25,
					borderTopRightRadius: 25,
					alignSelf: "center",
				},
			}}
			backBehavior="none"
		>
			<Tab.Screen name="Pending" component={TabScreen} />
			<Tab.Screen name="Completed" component={TabScreen} />
		</Tab.Navigator>
	);
}

export default function App() {
	return (
		<NavigationContainer>
			<StatusBar style="light" />
			<Stack.Navigator
				screenOptions={{
					headerTitleStyle: { color: "white" },
					headerTintColor: "white",
					headerTitleAlign: "center",
					headerStyle: {
						backgroundColor: "blue",
					},
				}}
			>
				<Stack.Screen name="Home" component={HomeScreen} />
				<Stack.Screen
					name="ManageBookings"
					component={ManageBookings}
					options={{
						title: "Manage Bookings",
					}}
				/>
			</Stack.Navigator>
		</NavigationContainer>
	);
}
