import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, Button } from 'react-native';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';


const Home = () => {
  const navigation = useNavigation();
  const [elevatorStatusList, setElevatorStatusList] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // send a GET request to the API endpoint to get a list of elevator statuses
        const response = await axios.get(
          `https://be27-209-226-0-76.ngrok.io/api/Elevator/GetAllElevatorStatusNotOperation`
        );
        setElevatorStatusList(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  return (
    <View style={{ flex: 1, justifyContent: 'center' }}>
      <Text style={{ fontSize: 20, textAlign: 'center' }}>Elevators not in operation</Text>
      <FlatList
        data={elevatorStatusList}
        keyExtractor={item => item.id.toString()}
        renderItem={({ item }) => ( // item represent an elevator
          <View style={{ alignItems: 'center' }}>
            <Text style={{ fontSize: 16, textAlign: 'center' }}>
              {`Elevator id: ${item.id} status: ${item.status}`}
            </Text>

         
          </View>
        )}
      />
         <View style={{ flex: 1, justifyContent: 'flex-end' }}>
         <Button
  title="Logout"
  onPress={() => navigation.navigate('Login')}
  color="red"
  backgroundColor="red"
/>



      </View>
    </View>
  );
};

export default Home;
