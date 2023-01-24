import React, { useState, useEffect } from 'react'
import {
    View,
    Text,
    Image,
    StyleSheet,
    TextInput,
    TouchableOpacity,
    ActivityIndicator,
    StatusBar,
    ScrollView,
    TextInputMask,
    KeyboardAvoidingView,


} from "react-native";
import Icon from '@expo/vector-icons/Entypo';
import axios from 'axios';
import { Picker } from '@react-native-picker/picker';
import { MaterialIcons, AntDesign, EvilIcons, FontAwesome, Ionicons, Feather, Entypo, SimpleLineIcons } from "@expo/vector-icons";
import AsyncStorage from '@react-native-async-storage/async-storage'


const RecRequests = ({ navigation }) => {

    const [requests,setRequests]=useState([])

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
      }

      useEffect(()=>{
          fetch_data();
      },[])


    return (
        // onPress={() => navigation.goBack()}
        <>


            <StatusBar barStyle='dark-content' backgroundColor="#000000" hidden={false} translucent={true} />

            <View style={{ marginTop: 20, alignItems: "center", flexDirection: "row", backgroundColor: 'red', paddingBottom: 20 }}>
                <TouchableOpacity style={{ width: "15%", alignItems: "flex-end", marginTop: 10, marginLeft: -20 }}
                    onPress={() => navigation.goBack()}>
                    <Ionicons name="arrow-back" size={30} color="#fff" />
                </TouchableOpacity>

                <View style={{ width: "75%", alignItems: "center" }}>
                    <Text style={{ fontWeight: "bold", marginTop: 10, fontSize: 20, color: 'white' }}>Requests
                    </Text>
                </View>

                <TouchableOpacity style={{ width: "10%", justifyContent: "flex-start", marginTop: 10 }}
                        onPress={() => navigation.navigate('SendRequest')}>
                            <Icon name="plus" size={30} color="#fff" />
                    </TouchableOpacity>
            </View>

            <ScrollView>
            {requests.length>0?(
                    requests.map(request=>{return(
                <View  onPress={() => navigation.navigate('Donate')} style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
                    <View style={{ flexDirection: 'row', height: 130, backgroundColor: '#E0E0E0', position: 'relative', margin: 10, borderRadius: 8 }}>
                        <View style={{ padding: 20, width: '60%' }}>
                            <Text style={{ marginTop: 8, fontSize: 18, fontWeight: "bold" }}>{request.user.FirstName}</Text>
                            <Text style={{ marginTop: 8, fontSize: 16, fontWeight: "bold" }}>Blood type: {request.Btype}</Text>
                            <Text style={{ marginTop: 8, fontSize: 16 }}>Quantity: {request.quantity}</Text>
                        </View>
                        <View style={{ padding: 20, width: '40%', }}>
                            <View style={{ justifyContent: "center", marginTop: 30 }}>
                                {request.Status == true ?
                                (
                                    <View style={{backgroundColor:"green",justifyContent:"center",alignItems:"center",borderRadius:4}}>
                                    <Text style={{color:"white", fontSize:16,fontWeight:"bold",marginTop:3,marginBottom:3}}>Complete</Text>
                                    </View>
                                ):(
                                    <View style={{backgroundColor:"red",justifyContent:"center",alignItems:"center",borderRadius:4}}>
                                    <Text style={{color:"white", fontSize:16,fontWeight:"bold",marginTop:3,marginBottom:3}}>Incomplete</Text>
                                    </View>
                                )
                                }
                            </View>
                        </View>
                    </View>
                </View>
                )})
                ):(
                    <View style={{alignItems:'center',justifyContent:'center',marginTop:50}}>
                        <Text style={{fontSize:20}}>No Request</Text>
                    </View>
                )}
            </ScrollView>

        </>
    );
};


export default RecRequests;

const styles = StyleSheet.create({

    container: {
        flex: 1,
        backgroundColor: "#fff",
    },
    forgotpass: {
        color: "#0096C7",
        fontSize: 14,

        marginLeft: 20,
        marginTop: 15
    },
    Formcontainer: {
        flexDirection: 'row',
        marginTop: 15,
        marginBottom: 5,
        height: 50,
        borderWidth: 1,
        borderColor: "#05375a",
        borderRadius: 10,
        marginHorizontal: 20
    },
    icon: {
        marginTop: 10,
        marginBottom: 20,
        color: '#0096C7',

    },
    textInput: {
        flex: 1,
        marginTop: Platform.OS === 'ios' ? 0 : -12,
        paddingLeft: 10,
        color: '#05375a',
        marginLeft: 20,
    },
    signIn: {
        width: '100%',
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
        paddingLeft: 40,
        paddingRight: 40
    },
    footer: {
        marginTop: 30,
        height: "45%",
        width: "100%",
        alignContent: "center",
        alignContent: "center",
        justifyContent: "center",
        alignItems: "center",
    },
    footerImage: {
        height: "120%",
        flex: 1,
        resizeMode: "contain"
    }
})