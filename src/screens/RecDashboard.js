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
import { FontAwesome5, AntDesign, EvilIcons, FontAwesome, Ionicons, Feather, Entypo, SimpleLineIcons } from "@expo/vector-icons";
import AsyncStorage from '@react-native-async-storage/async-storage'
import axios from 'axios';


export const RecDashboard = ({navigation}) => {
    const [requests,setRequests]=useState([])
    const [donation,setDonation]=useState([])

    const fetch_data = async () => {
        
        let my_token =  await AsyncStorage.getItem('token')
        const config = {
          headers: { Authorization: `Token ${my_token}` }
      };     

        const id = await AsyncStorage.getItem('user_id')
        console.log("this is ",id)
        
        axios.get(`https://687d-41-186-143-119.eu.ngrok.io/Requestbyuserid/${id}`,
        config).then(response => {
            setRequests(response.data);
        
        });

        axios.get(`https://687d-41-186-143-119.eu.ngrok.io/donationbyrecid/${id}`,
        config).then(response => {
            setDonation(response.data);
        
        });

      }

      useEffect(()=>{
          fetch_data();
      },[])
  return (
    <View>
        <StatusBar barStyle='dark-content' backgroundColor="red" hidden={false} translucent={true} />
        <View style={{ marginTop: 20, alignItems: "center", flexDirection: "row",backgroundColor:'red',paddingBottom:20 }}>
                    
                    
                    <View style={{ width: "90%",alignItems:"left",marginLeft:10}}>
                        <Text style={{ fontWeight: "bold", marginTop: 10, fontSize: 20,color:'white' }}>Dashboard</Text>
                    </View>
                    <TouchableOpacity style={{ width: "10%", marginTop: 10,marginLeft:-20 }}
                        onPress={() => navigation.navigate('Settings')}>
                           <FontAwesome name="user-circle-o" size={30} color="#fff" />
                    </TouchableOpacity>
        </View>

        <View style={{flexDirection:'row',justifyContent:'space-around'}}>

                <TouchableOpacity onPress={()=>{navigation.navigate('RecRequests')}}   style={{flexDirection:'row',width:'80%', height: 150, backgroundColor: '#E0E0E0',  position: 'relative', margin: 10,  borderRadius: 8 }}>
                    <View style={{padding:20,width:'70%'}}>
                        <Text>Requests</Text>
                        <Text style={{marginTop:25,fontSize:50,fontWeight: "bold"}}>{requests.length}</Text>
                    </View>
                    <View style={{padding:20,width:'30%',paddingTop:65}}>
                    <Ionicons name="git-pull-request-sharp" size={50} color="#7a7a7a" />
                    </View>
                </TouchableOpacity>
                
        </View>


       


        <View style={{flexDirection:'row',justifyContent:'space-around'}}>
            
            <TouchableOpacity onPress={()=> {navigation.navigate('RecDonation')}}  style={{flexDirection:'row',width:'80%', height: 150, backgroundColor: '#E0E0E0',  position: 'relative', margin: 10,  borderRadius: 8 }}>
                <View style={{padding:20,width:'70%'}}>
                    <Text>Donation History</Text>
                    <Text style={{marginTop:25,fontSize:50,fontWeight: "bold"}}>{donation.length}</Text>
                </View>
                <View style={{padding:20,width:'30%',paddingTop:65}}>
                <FontAwesome name="calendar" size={50} color="#7a7a7a" />
                </View>
            </TouchableOpacity>
            
    </View>
        
    </View>
  )
}
