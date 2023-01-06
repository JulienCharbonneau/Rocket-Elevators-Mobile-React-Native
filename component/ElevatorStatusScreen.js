import { View, Text, Button } from 'react-native';
import axios from 'axios';
import { useNavigation, useRoute } from '@react-navigation/native';
import React, { useState } from 'react';
import { useEffect } from 'react';

function ElevatorStatusScreen() {
  const route = useRoute();
  const elevatorData = route.params.elevatorData;
  const navigation = useNavigation();
  const [elevatorStatus, setElevatorStatus] = useState(elevatorData.status);
  const [elevatorId, setElevatorId] = useState(elevatorData.id);



  const changeStatus = async (id) => {
    try {
      const response = await axios.post(
        `https://9f22-209-226-0-76.ngrok.io/api/Elevator/UpdateStatusElevatorById?id=${id}&status=online`
      );
      setElevatorId(response.data.id);
      setElevatorStatus(response.data.status);
      
      console.log(response.data.status);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center' }}>
      <View style={{ flex: 1, justifyContent: 'center' }}>
        <Text>Elevator id: {elevatorData.id} </Text>
        <Text>Elevator serial number: {elevatorData.serialNumber} </Text>
        <Text>Elevator model: {elevatorData.model} </Text>
        {elevatorStatus === 'online' ? ( // if status is  online  the text is  write in green else in red
          <Text style={{ color: 'green' }}>Elevator status: {elevatorStatus}</Text>
        ) : (
          <Text style={{ color: 'red' }}>Elevator status: {elevatorStatus}</Text>
        )}
        {elevatorStatus !== 'online' && (
          <Button
            title="Change Status"
            onPress={() => changeStatus(elevatorId)} />

        )}

        {elevatorStatus === 'online' && (
          <Button
            title="Return to Home"
            style={{ display: elevatorStatus != 'online' ? 'flex' : 'none' }}
            onPress={() => navigation.navigate('Home')} />
        )}
      </View>


      {/* // logout button */}
      <View style={{ flex: 1, justifyContent: 'flex-end' }}>
        <Button
          title="Logout"
          onPress={() => navigation.navigate('Login')}
          color="red"
          backgroundColor="red" />
      </View>

    </View>
  );
}







export default ElevatorStatusScreen;
