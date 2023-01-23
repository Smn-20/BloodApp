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
export const Dashboard = () => {
  return (
    <View>
        <Text>This is the dashboard</Text>

        <View style={{flexDirection:'row'}}>
                <View  style={{width:'30%', height: 200, backgroundColor: 'red',  position: 'relative', margin: 10,  justifyContent: 'center', borderRadius: 8 }}>

                </View>
                <View  style={{width:'30%', height: 200, backgroundColor: 'red',  position: 'relative', margin: 10,  justifyContent: 'center', borderRadius: 8 }}>

                </View>
        </View>
    </View>
  )
}
