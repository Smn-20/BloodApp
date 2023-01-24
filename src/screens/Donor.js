import React,{useState,useEffect} from 'react'
import {
    View,
    Text,
    Image,
    StyleSheet,
    TextInput,
    TouchableOpacity,
    ActivityIndicator,
    StatusBar,
    ScrollView

} from "react-native";
import { MaterialIcons, AntDesign, EvilIcons, FontAwesome, Ionicons, Feather, Entypo, SimpleLineIcons } from "@expo/vector-icons";
import AsyncStorage from '@react-native-async-storage/async-storage'
import axios from 'axios';

export const Donor = ({ navigation }) => {
    const [requests, setRequests] = useState([])

    const fetch_data = async () => {
        let my_token = await AsyncStorage.getItem('token')
        const config = {
            headers: { Authorization: `Token ${my_token}` }
        };

        const id = await AsyncStorage.getItem('user_id')
        console.log("this is ", id)
        axios.get(`https://8f90-41-186-143-119.eu.ngrok.io/donationbyuserid/${id}`,
            config).then(response => {
                setRequests(response.data);

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

            <ScrollView>
            {requests.length>0?(
                    requests.map(rec=>{return(
                <View  onPress={() => navigation.navigate('Donate')} style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
                    <View style={{ flexDirection: 'row', height: 130, backgroundColor: '#E0E0E0', position: 'relative', margin: 10, borderRadius: 8 }}>
                        <View style={{ padding: 20, width: '100%' }}>
                            <Text style={{ marginTop: 8, fontSize: 18, fontWeight: "bold" }}>{rec.request.user.FirstName}</Text>
                            <Text style={{ marginTop: 8, fontSize: 16, fontWeight: "bold" }}>Date: {rec.send_at}</Text>
                            <Text style={{ marginTop: 8, fontSize: 16,fontWeight: "bold" }}>Quantity: {rec.quantity} Ltr</Text>
                        </View>
                    </View>
                </View>
                )})
                ):(
                    <View style={{alignItems:'center',justifyContent:'center',marginTop:50}}>
                        <Text style={{fontSize:20}}>No donation</Text>
                    </View>
                )}
            </ScrollView>



        </View>
    )
}
