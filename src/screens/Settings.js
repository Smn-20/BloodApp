import React, { useEffect, useState } from 'react'
import {
    View,
    Text,
    StyleSheet,
    Image,
    TouchableOpacity,
    StatusBar,
    ImageBackground,
    ScrollView,
    TextInput,
} from "react-native";
import { MaterialCommunityIcons, FontAwesome5, FontAwesome, Feather, Ionicons, Entypo, AntDesign, MaterialIcons } from "@expo/vector-icons";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AuthContext } from '../context/Context';



const Settings = ({ navigation }) => {

    const format = (amount) => {
        return Number(amount)
            .toFixed(2)
            .replace(/\d(?=(\d{3})+\.)/g, '$&,')

    };
    const context = React.useContext(AuthContext)
    return (
        <>
            <StatusBar backgroundColor="#00bcd4" translucent={false} hidden={false} barStyle="dark-content" />
            <View style={{ marginTop: 20, alignItems: "center", flexDirection: "row", backgroundColor: 'red', paddingBottom: 20 }}>
                <TouchableOpacity onPress={() => { navigation.goBack()}} style={{ width: "15%", alignItems: "flex-end", marginTop: 10, marginLeft: -20 }}
                    >
                    <Ionicons name="arrow-back" size={30} color="#fff" />
                </TouchableOpacity>

                <View style={{ width: "85%",alignItems:"center"}}>
                        <Text style={{ fontWeight: "bold", marginTop: 10, fontSize: 20,color:'white' }}>Settings</Text>
                    </View>
                  
            </View>


            <ScrollView>
                {/* <TouchableOpacity style={styles.container} onPress={() => navigation.navigate("Guide")}>
                    <View style={{ flexDirection: "row", width: "100%", marginTop: 5 }}>

                        <View style={{ width: "15%", alignItems: "center", marginTop: 10 }}>
                        <AntDesign name="profile" size={30} color="#adb5bd" />
                        </View>

                        <View style={{ width: "75%", marginLeft: -15, marginTop: 5 }}>
                            <Text style={styles.Title}>Umwirondoro</Text>
                        </View>

                        <View style={{ width: "10%", alignItems: "center", marginTop: 10 }}>
                            <MaterialIcons name="keyboard-arrow-right" size={30} color="#adb5bd" />
                        </View>

                    </View>
                </TouchableOpacity> */}
                <TouchableOpacity style={styles.container} onPress={() => navigation.navigate("Chat")}>
                    <View style={{ flexDirection: "row", width: "100%", marginTop: 5 }}>

                        <View style={{ width: "15%", alignItems: "center", marginTop: 10 }}>
                            <Entypo name="pencil" size={30} color="#adb5bd" />
                        </View>

                        <TouchableOpacity onPress={() => navigation.navigate("Chat")} style={{ width: "75%", marginLeft: -15, marginTop: 5 }}>
                            <Text style={styles.Title}>Update personal info</Text>
                        </TouchableOpacity>

                        <View style={{ width: "10%", alignItems: "center", marginTop: 10 }}>
                            <MaterialIcons name="keyboard-arrow-right" size={30} color="#adb5bd" />
                        </View>

                    </View>
                </TouchableOpacity>

                <TouchableOpacity style={styles.container} >
                    <View style={{ flexDirection: "row", width: "100%", marginTop: 5 }}>

                        <View style={{ width: "15%", alignItems: "center", marginTop: 10 }}>
                            <MaterialCommunityIcons name="onepassword" size={30} color="#adb5bd" />
                        </View>

                        <TouchableOpacity onPress={() => navigation.navigate("ChangePassword")} style={{ width: "75%", marginLeft: -15, marginTop: 5 }}>
                            <Text style={styles.Title}>Change Password</Text>
                        </TouchableOpacity>

                        <View style={{ width: "10%", alignItems: "center", marginTop: 10 }}>
                            <MaterialIcons name="keyboard-arrow-right" size={30} color="#adb5bd" />
                        </View>

                    </View>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.container, { marginBottom: 50 }]}
                    onPress={() => context.signOut()}
                >
                    <View style={{ flexDirection: "row", width: "100%", marginTop: 5 }}>

                        <View style={{ width: "15%", alignItems: "center", marginTop: 10 }}>
                            <AntDesign name="logout" size={30} color="red" />
                        </View>

                        <View style={{ width: "85%", marginLeft: -15, marginTop: 5 }}>
                            <Text style={styles.Title}>Logout</Text>
                        </View>

                    </View>
                </TouchableOpacity>

            </ScrollView>



            {/* <View style={{ width: "100%", textAlign: "center", alignContent: "center", alignItems: "center", marginBottom: 15 }}>
                <Text style={styles.Title}>Version 1.0</Text>
            </View>
            <View style={{ backgroundColor: "#219ebc", height: 90, flexDirection: "row", alignItems: "center", borderTopRightRadius: 10, borderTopLeftRadius: 10, shadowColor: '#999', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 2, shadowRadius: 5, elevation: 5, }}>



                <TouchableOpacity style={{ marginLeft: "0%", width: "30%", justifyContent: "center", alignItems: "center" }}
                    onPress={() => navigation.navigate("Home")}>

                    <Entypo name="home" size={30} color="#fff" />
                </TouchableOpacity>


                <TouchableOpacity style={{ marginLeft: "0%", justifyContent: "center", alignItems: "center", width: "40%" }}
                    onPress={() => navigation.navigate("Report")}
                >

                    <MaterialIcons name="table-chart" size={30} color="#fff" />
                </TouchableOpacity>


                <TouchableOpacity style={{ marginLeft: "0%", justifyContent: "center", alignItems: "center", width: "30%" }}
                    onPress={() => navigation.navigate("Settings")}
                >

                    <Ionicons name="settings" size={30} color="#023047" />
                </TouchableOpacity>
            </View> */}
        </>
    );
};


export default Settings;

const styles = StyleSheet.create({

    container: {
        backgroundColor: "#e0e0e0",
        height: 70,
        width: "92%",
        marginHorizontal: 15,
        marginTop: 25,
        borderRadius: 20,

    },
    Title: {

        fontSize: 16,
        fontWeight: "bold",
        marginHorizontal: 15,
        marginTop: 10,
        color: "#05375a"
    },
    Texties: {

        fontSize: 12,
        fontWeight: "normal",
        marginHorizontal: 15,
        color: "#f4a261",
        marginTop: 1,

    },
    shadow: {
        shadowColor: "#707070",
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.3,
        shadowRadius: 4.65,

        elevation: 8,
    },
    Tab: {
        flexDirection: "row",
        marginHorizontal: 10,
        marginLeft: 12,
        height: 50,
        flex: 1,
        alignContent: "center",
        alignItems: "center",
        shadowColor: "#707070",
        // shadowOffset: {
        //     width: 0,
        //     height: 5,
        // },
        // shadowOpacity: 0.5,
        // shadowRadius: 4.65,

        // elevation: 8,
    },
    textInput: {

        borderRadius: 10,
        alignSelf: 'center',
        height: 55,
        width: "90%",
        marginTop: 10,
        textAlign: "left",
        padding: 10,
        flex: 1,
        borderBottomWidth: 1
    }

})