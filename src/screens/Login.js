import React, { useState } from 'react'
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
import { AuthContext } from '../context/Context';
import Icon from '@expo/vector-icons/Entypo';
import axios from 'axios';

const Login = ({ navigation }) => {
    const { signIn } = React.useContext(AuthContext);
    const [securetext, setsecuretext] = useState(true)
    const [email, setemail] = useState('')
    const [password, setpassword] = useState('')
    const [loading, setloading] = useState('')
    const updateSecureTextEntry = () => {
        setsecuretext(!securetext)
    }

    const loginHandle = (phone, password) => {
        setloading(true)
        console.log(phone, password)
        signIn(phone, password);
        setTimeout(() => {
            setloading(false)
        }, 10000)

    }

    return (

        <>


            <StatusBar barStyle='dark-content' backgroundColor="#000000" hidden={false} translucent={true} />




            <View style={styles.container}>

                <View style={styles.Logo}>

                    <Image style={styles.LogoImage} source={require('../images/blood.png')} />

                </View>

                <View style={styles.Formcontainer}>
                    <Icon
                        name="phone"
                        color="red"
                        size={20}
                        style={[styles.icon, { marginLeft: 10 }]}
                    />

                    <TextInput
                        placeholder="Phone"
                        placeholderTextColor="#666666"
                        keyboardType='email-address'
                        style={styles.textInput}
                        autoCapitalize="none"
                    onChangeText={(val) => setemail(val)}
                    />
                </View>

                <View style={styles.Formcontainer}>
                    <Icon
                        name="lock"
                        color="red"
                        size={20}
                        style={[styles.icon, { marginLeft: 10 }]}
                    />
                    <TextInput
                        placeholder="Password"
                        placeholderTextColor="#666666"
                        secureTextEntry={securetext ? true : false}
                        style={styles.textInput}
                        autoCapitalize="none"
                    onChangeText={(val) => setpassword(val)}
                    />
                    <TouchableOpacity
                        onPress={updateSecureTextEntry}>
                        {securetext ?

                            <Icon
                                name="eye-with-line"
                                color="grey"
                                size={20}
                                style={[styles.icon, { marginRight: 10 }]}
                            />
                            :
                            <Icon
                                name="eye"
                                color="black"
                                size={20}
                                style={[styles.icon, { marginRight: 10 }]}
                            />
                        }
                    </TouchableOpacity>
                </View>

                <TouchableOpacity onPress={() => { navigation.navigate('Register') }}>
                    <Text style={styles.forgotpass}>Are you a donor? Register here</Text>
                </TouchableOpacity>

                <View style={{ marginTop: 30 }}>
                    <TouchableOpacity
                        style={styles.signIn}
                    onPress={() => { loginHandle(email, password) }}
                    >
                        <View
                            style={{ backgroundColor: "red", width: "100%", height: "100%", alignItems: "center", borderRadius: 10 }}
                        >
                            {loading ? (
                                <ActivityIndicator size='large' color='white' style={{ marginTop: 10 }} />
                            ) :
                                (
                                    <Text style={{ color: "white", marginTop: 10, fontSize: 20, fontWeight: "bold" }}>Login</Text>
                                )}

                        </View>
                    </TouchableOpacity>

                </View>

             

            </View>
        </>
    );
};


export default Login;

const styles = StyleSheet.create({

    container: {
        flex: 1,
        backgroundColor: "#fff",
    },
    Logo: {
        backgroundColor: "#fff",
        borderRadius: 800,
        marginTop: 30,
        height: "32%",
        width: "55%",
        alignContent: "center",
        marginLeft: "22%",
        alignContent: "center",
        justifyContent: "center",
        alignItems: "center",
        shadowColor: "#707070",
        shadowOffset: {
            width: 0,
            height: 8,
        },
        shadowOpacity: 0.5,
        shadowRadius: 4.65,
        elevation: 8,
    },
    footer: {
        marginTop: 30,
        height: "32%",
        width: "100%",
        alignContent: "center",
        alignContent: "center",
        justifyContent: "center",
        alignItems: "center",
    },
    LogoImage: {
        width: 130,
        height: 130,
        flex: 1,
        resizeMode: "contain"
    },
    footerImage: {
        // width: 10000,
        height: 100,
        flex: 1,
        resizeMode: "contain"
    },
    forgotpass: {
        color: "#14213d",
        fontSize: 14,
        marginLeft: 20,
        marginTop: 10
    },
    Formcontainer: {
        flexDirection: 'row',
        marginTop: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#05375a',
        paddingBottom: 2,
        marginHorizontal: 20
    },
    icon: {
        marginTop: 20,
        marginBottom: 20,
        color: 'red',

    },
    textInput: {
        flex: 1,
        marginTop: Platform.OS === 'ios' ? 0 : -12,
        paddingLeft: 10,
        color: '#05375a',
        marginLeft: 20
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
})