import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, Button } from 'react-native';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';






const Home = () => {
  const navigation = useNavigation();
  const [elevatorStatusList, setElevatorStatusList] = useState([]);

 // Button
const onElevatorPress = (elevator ) => {
  navigation.navigate('ElevatorStatusScreen');
  console.log("onElevatorPress elevator:", elevator);
}

const Item = ({ elevator }) => {
  console.log("id is:", elevator);

  return (
    <Button
      title={elevator.id.toString()}
      onPress={() => onElevatorPress(elevator)}
    />

  );
};
// button end

  useEffect(() => {
    const fetchData = async () => {
      try {
        // send a GET request to the API endpoint to get a list of elevator statuses
        const response = await axios.get(
          `https://bd0f-209-226-0-76.ngrok.io/api/Elevator/GetAllElevatorStatusNotOperation`
        );
        setElevatorStatusList(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  const renderItem = ({ item }) => (
    <Item elevator={item} />
  );

  return (
    <View style={{ flex: 1, justifyContent: 'center' }}>
      <Text style={{ fontSize: 20, textAlign: 'center' }}>Elevators not in operation</Text>
      <FlatList
        data={elevatorStatusList}
        renderItem={renderItem}
        keyExtractor={item => item.id.toString()}
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
