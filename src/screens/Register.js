import React, { useState } from 'react'
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


const Register = ({ navigation }) => {

    const [securetext, setsecuretext] = useState(true)
    const [loading, setloading] = useState('')
    const updateSecureTextEntry = () => {
        setsecuretext(!securetext)
    }
    const [FirstName, setFirstName] = useState('')
    const [LastName, setLastName] = useState('')
    const [MName, setMName] = useState('')
    const [FName, setFName] = useState('')
    const [phone, setphone] = useState('')
    const [email, setemail] = useState('')
    const [Weight, setWeight] = useState('')
    const [Height, setHeight] = useState('')
    const [Password, setPassword] = useState(null)
    const [year, setYear] = useState(JSON.stringify(new Date().getFullYear()))
    const [month, setMonth] = useState('01')
    const [days, setdays] = useState('01')



    const addDigit = (num) => {
        if (JSON.stringify(num).length > 1) {
            return JSON.stringify(num)
        }
        else {
            return '0' + num
        }
    }

    const handleSubmit = (e) => {
        setloading(true)
        if (FirstName.length < 2) {
            alert('Please Enter first Name');
        }
        else if (LastName.length < 2) {
            alert('Please Enter Last Name');
        }
        else if (phone.length < 10) {
            alert('Please Enter phone');
        }
        else {
            e.preventDefault()
            const postObj = new FormData();
            postObj.append('FirstName', FirstName)
            postObj.append('LastName', LastName)
            postObj.append('MName', MName)
            postObj.append('FName', FName)
            postObj.append('phone', phone)
            postObj.append('DOB', year + '-' + month + '-' + days)
            postObj.append('email', email)
            postObj.append('Weight', Weight)
            postObj.append('Height', Height)
            postObj.append('password', Password)
            console.log(postObj)


            axios.defaults.xsrfHeaderName = "X-CSRFTOKEN";
            axios.defaults.xsrfCookieName = "csrftoken";
            axios.defaults.headers = {
                "Content-Type": "multipart/form-data",
            };

            axios.post('https://8e78-41-186-143-119.eu.ngrok.io/register/', postObj).then((res) => {
                if (res.data.code == 200) {
                    alert('Your are succesfully register Please login with you credentials')
                    navigation.navigate('Login')
                }
                else {
                    alert('Phone Number or email already taken')
                }

            }).catch(err => {
                console.log(err)
            })

            setTimeout(() => {
                setloading(false)
            }, 5000)
        }
    }


    return (
        // onPress={() => navigation.goBack()}
        <>


            <StatusBar barStyle='dark-content' backgroundColor="#000000" hidden={false} translucent={true} />
            <KeyboardAvoidingView style={styles.container} behavior='position'>

                <View style={{ marginTop: 20, alignItems: "center", flexDirection: "row",backgroundColor:'red',paddingBottom:20 }}>
                    <TouchableOpacity style={{ width: "20%", alignItems: "flex-end", marginTop: 10, marginLeft: -20 }}
                        onPress={() => navigation.goBack()}>
                            <Ionicons name="arrow-back" size={30} color="#fff" />
                    </TouchableOpacity>
                    
                    <View style={{ width: "80%",alignItems:"center"}}>
                        <Text style={{ fontWeight: "bold", marginTop: 10, fontSize: 20,color:'white' }}>Register as donor</Text>
                    </View>
                </View>

                <ScrollView>
                    <View style={styles.Formcontainer}>
                        <TextInput
                            placeholder="First Name"
                            placeholderTextColor="#666666"
                            style={styles.textInput}
                            autoCapitalize="none"
                            onChangeText={text => setFirstName(text)}
                        />
                    </View>
                    <View style={styles.Formcontainer}>
                        <TextInput
                            placeholder="Last Name"
                            placeholderTextColor="#666666"
                            style={styles.textInput}
                            autoCapitalize="none"
                            onChangeText={text => setLastName(text)}
                        />
                    </View>

                    <View style={styles.Formcontainer}>
                        <TextInput
                            placeholder="Izina rya nyina"
                            placeholderTextColor="#666666"
                            style={styles.textInput}
                            autoCapitalize="none"
                            onChangeText={text => setMName(text)}
                        />
                    </View>

                    <View style={styles.Formcontainer}>
                        <TextInput
                            placeholder="Izina rya se"
                            placeholderTextColor="#666666"
                            style={styles.textInput}
                            autoCapitalize="none"
                            onChangeText={text => setFName(text)}
                        />
                    </View>


                    <Text style={{ marginTop: 3, fontSize: 14, marginLeft: 25 }}>Date of Birth</Text>
                    <View style={{ flexDirection: "row", marginHorizontal: 15 }}>
                        <View
                            style={{
                                width: '33%',
                                marginTop: 0,
                                borderColor: 'black',
                                borderRadius: 10,
                            }}>

                            <Picker
                                selectedValue={year}
                                onValueChange={(val) => { setYear(val) }}>
                                <Picker.Item label={JSON.stringify(new Date().getFullYear())} value={JSON.stringify(new Date().getFullYear())} />
                                <Picker.Item label={JSON.stringify(new Date().getFullYear() - 1)} value={JSON.stringify(new Date().getFullYear() - 1)} />
                                <Picker.Item label={JSON.stringify(new Date().getFullYear() - 2)} value={JSON.stringify(new Date().getFullYear() - 2)} />
                                <Picker.Item label={JSON.stringify(new Date().getFullYear() - 3)} value={JSON.stringify(new Date().getFullYear() - 3)} />

                            </Picker>
                        </View>
                        <View
                            style={{
                                width: '33%',
                                marginTop: 0,
                                borderColor: 'black',
                                borderRadius: 10,
                            }}>
                            <Picker
                                selectedValue={month}
                                onValueChange={(val) => { setMonth(val) }}>
                                <Picker.Item value="01" label="January" />
                                <Picker.Item value="02" label="February" />
                                <Picker.Item value="03" label="March" />
                                <Picker.Item value="04" label="April" />
                                <Picker.Item value="05" label="May" />
                                <Picker.Item value="06" label="June" />
                                <Picker.Item value="07" label="July" />
                                <Picker.Item value="07" label="August" />
                                <Picker.Item value="08" label="September" />
                                <Picker.Item value="10" label="October" />
                                <Picker.Item value="11" label="November" />
                                <Picker.Item value="12" label="December" />

                            </Picker>
                        </View>
                        <View
                            style={{
                                width: '33%',
                                marginTop: 0,
                                borderColor: 'black',
                                borderRadius: 10,

                            }}>
                            <Picker
                                selectedValue={days}
                                onValueChange={(val) => { setdays(val) }}>
                                {Array.from({ length: 31 }, (_, index) => index + 1).map((element) => {
                                    return (
                                        <Picker.Item label={addDigit(element)} value={addDigit(element)} />
                                    )
                                })}
                            </Picker>
                        </View>
                    </View>



                    <View style={styles.Formcontainer}>
                        <TextInput
                            placeholder="Weight"
                            placeholderTextColor="#666666"
                            style={styles.textInput}
                            autoCapitalize="none"
                            onChangeText={(val) => setWeight(val)}
                        />
                    </View>
                    <View style={styles.Formcontainer}>
                        <TextInput
                            placeholder="Height"
                            placeholderTextColor="#666666"
                            style={styles.textInput}
                            autoCapitalize="none"
                            onChangeText={(val) => setHeight(val)}
                        />
                    </View>
                    <View style={styles.Formcontainer}>
                        <TextInput
                            placeholder="Phone"
                            placeholderTextColor="#666666"
                            keyboardType='number-pad'
                            style={styles.textInput}
                            autoCapitalize="none"
                            onChangeText={(val) => setphone(val)}
                        />
                    </View>
                    <View style={styles.Formcontainer}>
                        <TextInput
                            placeholder="email"
                            placeholderTextColor="#666666"
                            keyboardType='email-address'
                            style={styles.textInput}
                            autoCapitalize="none"
                            onChangeText={(val) => setemail(val)}
                        />
                    </View>

                    <View style={styles.Formcontainer}>
                        <TextInput
                            placeholder="Password"
                            placeholderTextColor="#666666"
                            secureTextEntry={securetext ? true : false}
                            style={styles.textInput}
                            autoCapitalize="none"
                            onChangeText={(val) => setPassword(val)}
                        />
                        <TouchableOpacity
                            onPress={updateSecureTextEntry}>
                            {securetext ?

                                <Icon
                                    name="eye-with-line"
                                    color="grey"
                                    size={20}
                                    style={[styles.icon, { marginRight: 10, color: "#05375a" }]}
                                />
                                :
                                <Icon
                                    name="eye"
                                    color="black"
                                    size={20}
                                    style={[styles.icon, { marginRight: 10, color: "#05375a" }]}
                                />
                            }
                        </TouchableOpacity>
                    </View>
                    <View style={{ marginTop: 30, marginBottom: 90 }}>
                        <TouchableOpacity
                            style={styles.signIn}
                            onPress={(e) => {
                                handleSubmit(e)
                            }}>
                            <View
                                style={{ backgroundColor: "red", width: "115%", height: "100%", alignItems: "center", borderRadius: 10 }}
                            >
                                {loading ? (
                                    <ActivityIndicator size='large' color='white' style={{ marginTop: 10 }} />
                                ) :
                                    (
                                        <Text style={{ color: "white", marginTop: 10, fontSize: 20, fontWeight: "bold" }}>Register</Text>
                                    )}

                            </View>
                        </TouchableOpacity>
                    </View>
                </ScrollView>
            </KeyboardAvoidingView>

        </>
    );
};


export default Register;

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