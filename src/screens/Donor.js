import React,{useState,useEffect} from 'react'
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
import { MaterialIcons, AntDesign, EvilIcons, FontAwesome, Ionicons, Feather, Entypo, SimpleLineIcons } from "@expo/vector-icons";

export const Donor = ({ navigation }) => {
    const [users,setUsers]=useState([])
    const fetch_data = async () => {
        let my_token =  await AsyncStorage.getItem('token')
        const config = {
          headers: { Authorization: `Token ${my_token}` }
      };     
   
        axios.get('https://0315-41-186-143-119.eu.ngrok.io/Allusers/',
        config).then(response => {
          setUsers(response.data);
        
        });
      }

      useEffect(()=>{
        
          fetch_data();
      },[])
    return (
        <View>
            <StatusBar barStyle='dark-content' backgroundColor="red" hidden={false} translucent={true} />
            <View style={{ marginTop: 20, alignItems: "center", flexDirection: "row", backgroundColor: 'red', paddingBottom: 20 }}>
                <TouchableOpacity style={{ width: "15%", alignItems: "flex-end", marginTop: 10, marginLeft: -20 }}
                    onPress={() => navigation.goBack()}>
                    <Ionicons name="menu" size={30} color="#fff" />
                </TouchableOpacity>

                <View style={{ width: "75%", alignItems: "center" }}>
                    <Text style={{ fontWeight: "bold", marginTop: 10, fontSize: 20, color: 'white' }}>My Dashboard</Text>
                </View>
                <TouchableOpacity style={{ width: "10%", justifyContent: "flex-start", marginTop: 10 }}
                        onPress={() => navigation.navigate('Settings')}>
                           <FontAwesome name="user-circle-o" size={30} color="#fff" />
                    </TouchableOpacity>
            </View>

            <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>

                <TouchableOpacity onPress={() => { navigation.navigate('Recipients') }} style={{ flexDirection: 'row', width: '90%', height: 110, backgroundColor: '#E0E0E0', position: 'relative', margin: 10, borderRadius: 8 }}>
                    <View style={{ padding: 20, width: '70%' }}>
                        <Text>CHUK</Text>
                        <Text style={{ marginTop: 10, }}>2023-12-01</Text>
                        <Text style={{ marginTop: 10, fontSize: 20, fontWeight: "bold" }}>1LTR</Text>
                    </View>
                </TouchableOpacity>

            </View>

            <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>

                <TouchableOpacity onPress={() => { navigation.navigate('Recipients') }} style={{ flexDirection: 'row', width: '90%', height: 110, backgroundColor: '#E0E0E0', position: 'relative', margin: 10, borderRadius: 8 }}>
                    <View style={{ padding: 20, width: '70%' }}>
                        <Text>King Faisal Hospistal</Text>
                        <Text style={{ marginTop: 10, }}>2023-12-01</Text>
                        <Text style={{ marginTop: 10, fontSize: 20, fontWeight: "bold" }}>1LTR</Text>
                    </View>
                </TouchableOpacity>

            </View>

        </View>
    )
}
