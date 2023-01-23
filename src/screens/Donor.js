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
import { MaterialIcons, AntDesign, EvilIcons, FontAwesome, Ionicons, Feather, Entypo, SimpleLineIcons } from "@expo/vector-icons";

export const Donor = ({ navigation }) => {
    return (
        <View>
            <StatusBar barStyle='dark-content' backgroundColor="red" hidden={false} translucent={true} />
            <View style={{ marginTop: 20, alignItems: "center", flexDirection: "row", backgroundColor: 'red', paddingBottom: 20 }}>
                <TouchableOpacity style={{ width: "15%", alignItems: "flex-end", marginTop: 10, marginLeft: -20 }}
                    onPress={() => navigation.goBack()}>
                    <Ionicons name="menu" size={30} color="#fff" />
                </TouchableOpacity>

                <View style={{ width: "85%", alignItems: "center" }}>
                    <Text style={{ fontWeight: "bold", marginTop: 10, fontSize: 20, color: 'white' }}>FirstName LastName</Text>
                </View>
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
