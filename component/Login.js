import React, { useEffect, useState } from 'react';
import { View, TextInput, Button, Text } from 'react-native';
import axios from 'axios';
import validator from 'validator';

const Login = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [error, setError] = useState(null);


  const handleLogin = async () => {
    // reset the error message
    setError(null);

    // validate the email address
    if (!validator.isEmail(email)) {
      setError('Please enter a valid email address');
      return;
    }

    try {
      // send a GET request to the API endpoint to check the email
      const response = await axios.get(
        `https://9f22-209-226-0-76.ngrok.io/api/Employee/CheckEmail`,
        {
          params: {
            email: email,
          },
        }
      );

      // check if the email exists
      if (response.data) {
        // the email exists, navigate to the next screen
        navigation.replace('Home');
      } else {
        // the email does not exist, show an error message
        setError('Invalid email');
      }
    } catch (error) {
      console.error(error);
      setError('An error occurred while checking the email');
      console.log(error.message);
    }
  };

  return (
    <View>
      {error && <Text>{error}</Text>}
      <TextInput
       value={email}
         onChangeText={(text) => setEmail(text)}

         placeholder="Email"
/>
    
      <Button title="Login" onPress={handleLogin} />
    </View>
  );
};

export default Login;
