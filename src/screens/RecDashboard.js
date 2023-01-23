import React from 'react'
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

export const RecDashboard = ({navigation}) => {
  return (
    <View>
        <StatusBar barStyle='dark-content' backgroundColor="red" hidden={false} translucent={true} />
        <View style={{ marginTop: 20, alignItems: "center", flexDirection: "row",backgroundColor:'red',paddingBottom:20 }}>
                    <TouchableOpacity style={{ width: "15%", alignItems: "flex-end", marginTop: 10, marginLeft: -20 }}
                        onPress={() => navigation.goBack()}>
                            <Ionicons name="menu" size={30} color="#fff" />
                    </TouchableOpacity>
                    
                    <View style={{ width: "85%",alignItems:"center"}}>
                        <Text style={{ fontWeight: "bold", marginTop: 10, fontSize: 20,color:'white' }}>Dashboard</Text>
                    </View>
        </View>

        <View style={{flexDirection:'row',justifyContent:'space-around'}}>

                <TouchableOpacity onPress={()=>{navigation.navigate('Recipients')}}   style={{flexDirection:'row',width:'80%', height: 150, backgroundColor: '#E0E0E0',  position: 'relative', margin: 10,  borderRadius: 8 }}>
                    <View style={{padding:20,width:'70%'}}>
                        <Text>Requests</Text>
                        <Text style={{marginTop:25,fontSize:50,fontWeight: "bold"}}>3</Text>
                    </View>
                    <View style={{padding:20,width:'30%',paddingTop:65}}>
                    <FontAwesome5 name="hand-paper" size={50} color="#7a7a7a" />
                    </View>
                </TouchableOpacity>
                
        </View>


       


        <View style={{flexDirection:'row',justifyContent:'space-around'}}>
            
            <View  style={{flexDirection:'row',width:'80%', height: 150, backgroundColor: '#E0E0E0',  position: 'relative', margin: 10,  borderRadius: 8 }}>
                <View style={{padding:20,width:'70%'}}>
                    <Text>Donation History</Text>
                    <Text style={{marginTop:25,fontSize:50,fontWeight: "bold"}}>5</Text>
                </View>
                <View style={{padding:20,width:'30%',paddingTop:65}}>
                <FontAwesome name="calendar" size={50} color="#7a7a7a" />
                </View>
            </View>
            
    </View>
        
    </View>
  )
}
