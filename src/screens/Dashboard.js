import React, { useState, useEffect } from 'react'
import {
    View,
    Text,
    Image,
    StyleSheet,
    TextInput,
    TouchableOpacity,
    ActivityIndicator,
    StatusBar

} from "react-native";
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage'
import { MaterialIcons, AntDesign, EvilIcons, FontAwesome, Ionicons, Feather, Entypo, SimpleLineIcons } from "@expo/vector-icons";

export const Dashboard = ({ navigation }) => {
    const [users, setUsers] = useState([])
    const [requests, setRequests] = useState([])
    const [donations, setDonations] = useState([])
    const fetch_data = async () => {
        let my_token = await AsyncStorage.getItem('token')
        const config = {
            headers: { Authorization: `Token ${my_token}` }
        };

        axios.get('https://687d-41-186-143-119.eu.ngrok.io/Allusers/',
            config).then(response => {
                setUsers(response.data);

            });

        axios.get('https://687d-41-186-143-119.eu.ngrok.io/Allrequest/',
            config).then(response => {
                setRequests(response.data);

            });

            axios.get(`https://687d-41-186-143-119.eu.ngrok.io/Alldonation/`,
            config).then(response => {
                setDonations(response.data);
            
            });
    }

    useEffect(() => {
        fetch_data();
    }, [])

    return (
        <View>
            <StatusBar barStyle='dark-content' backgroundColor="red" hidden={false} translucent={true} />
            <View style={{ marginTop: 20, alignItems: "center", flexDirection: "row", backgroundColor: 'red', paddingBottom: 20 }}>


                <View style={{ width: "90%", alignItems: "left", marginLeft: 10 }}>
                    <Text style={{ fontWeight: "bold", marginTop: 10, fontSize: 20, color: 'white' }}>Dashboard</Text>
                </View>
                <TouchableOpacity style={{ width: "10%", marginTop: 10, marginLeft: -20 }}
                    onPress={() => navigation.navigate('Settings')}>
                    <FontAwesome name="user-circle-o" size={30} color="#fff" />
                </TouchableOpacity>
            </View>

            <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>

                <TouchableOpacity onPress={() => { navigation.navigate('Recipients') }} style={{ flexDirection: 'row', width: '80%', height: 120, backgroundColor: '#E0E0E0', position: 'relative', margin: 10, borderRadius: 8 }}>
                    <View style={{ padding: 20, width: '70%' }}>
                        <Text>Registered Hospistals</Text>
                        <Text style={{ marginTop: 10, fontSize: 50, fontWeight: "bold" }}>{users.filter(element => element.typee == 'Recipient').length}</Text>
                    </View>
                    <View style={{ padding: 20, width: '30%', paddingTop: 45 }}>
                        <FontAwesome name="building" size={50} color="#7a7a7a" />
                    </View>
                </TouchableOpacity>

            </View>


            <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>

                <TouchableOpacity onPress={() => { navigation.navigate('Donors') }} style={{ flexDirection: 'row', width: '80%', height: 120, backgroundColor: '#E0E0E0', position: 'relative', margin: 10, borderRadius: 8 }}>
                    <View style={{ padding: 20, width: '70%' }}>
                        <Text>Registered Donors</Text>
                        <Text style={{ marginTop: 10, fontSize: 50, fontWeight: "bold" }}>{users.filter(element => element.typee == 'Donor').length}</Text>
                    </View>
                    <View style={{ padding: 20, width: '30%', paddingTop: 45 }}>
                        <FontAwesome name="user" size={50} color="#7a7a7a" />
                    </View>
                </TouchableOpacity>

            </View>


            <TouchableOpacity onPress={() => { navigation.navigate('Requests') }} style={{ flexDirection: 'row', justifyContent: 'space-around' }}>

                <View style={{ flexDirection: 'row', width: '80%', height: 120, backgroundColor: '#E0E0E0', position: 'relative', margin: 10, borderRadius: 8 }}>
                    <View style={{ padding: 20, width: '70%' }}>
                        <Text>Requests</Text>
                        <Text style={{ marginTop: 10, fontSize: 50, fontWeight: "bold" }}>{requests.length}</Text>
                    </View>
                    <View style={{ padding: 20, width: '30%', paddingTop: 45 }}>
                        <Ionicons name="git-pull-request-sharp" size={50} color="#7a7a7a" />
                    </View>
                </View>

            </TouchableOpacity>


            <TouchableOpacity onPress={() => { navigation.navigate('DonationHistory') }} style={{ flexDirection: 'row', justifyContent: 'space-around' }}>

                <View style={{ flexDirection: 'row', width: '80%', height: 120, backgroundColor: '#E0E0E0', position: 'relative', margin: 10, borderRadius: 8 }}>
                    <View style={{ padding: 20, width: '70%' }}>
                        <Text>Donation History</Text>
                        <Text style={{ marginTop: 10, fontSize: 50, fontWeight: "bold" }}>{donations.length}</Text>
                    </View>
                    <View style={{ padding: 20, width: '30%', paddingTop: 45 }}>
                        <FontAwesome name="calendar" size={50} color="#7a7a7a" />
                    </View>
                </View>

            </TouchableOpacity>

        </View>
    )
}
