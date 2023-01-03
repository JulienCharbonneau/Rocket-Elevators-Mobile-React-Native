import React, { useState } from 'react';
import { View, TextInput, Button } from 'react-native';
import { isEmail } from 'validator';


const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    if (!isEmail(email)) {
      alert("Not a valid email.")
      return;
    }
  
    // the email is valid, send a request to the server to verify the email and password
  };

  return (
    <View>
      <TextInput
        value={email}
        onChangeText={setEmail}
        placeholder="Email"
      />
      <TextInput
        value={password}
        onChangeText={setPassword}
        placeholder="Password"
        secureTextEntry={true}
      />
      <Button title="Login" onPress={handleLogin} />
    </View>
  );
};

export default Login;
