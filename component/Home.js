import React, { useState, useEffect } from 'react';
import { View, Text, FlatList,BackHandler, Button,Image } from 'react-native';
import axios from 'axios';
import { useNavigation, useRoute } from '@react-navigation/native';






const Home = ({ navigation }) => {

useEffect(()=>{
  
 
},[navigation])

  // const navigation = useNavigation();
  const [elevatorStatusList, setElevatorStatusList] = useState([]);

 // Button
const onElevatorPress = (elevator ) => {
  navigation.navigate('Status',{ elevatorData: elevator, updateStatusList: setElevatorStatusList });
}

const Item = ({ elevator }) => {
  console.log("id is:", elevator);

  return (
    <Button
    style={{ width: 300, height: 400, margin:50, padding:20 }}
      title={elevator.id.toString()}
      onPress={() => onElevatorPress(elevator)}
    />

  );
};
// button end
useEffect(() => {
  const focusHandler = navigation.addListener('focus', () => {
      fetchData();
  });
  return focusHandler;
}, [navigation]);



const fetchData = async () => {
  try {
    // send a GET request to the API endpoint to get a list of elevator statuses
    const response = await axios.get(
      `https://9f22-209-226-0-76.ngrok.io/api/Elevator/GetAllElevatorStatusNotOperation`
    );
    setElevatorStatusList(response.data);
  } catch (error) {
    console.error(error);
  }
};
 

  const renderItem = ({ item }) => (
    <Item elevator={item}
     />
  );

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
         <View style={{ position: 'absolute', top: 0, alignItems: 'center', justifyContent: 'center' }}>
  <Image
      source={require('../assets/R201-removebg-preview.png')}
    style={{ width: 300, height: 300 }}
  />
</View>
      <View style={{position: 'absolute', top: 300, flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text style={{ fontSize: 20, textAlign: 'center' }}>Elevators not in operation</Text>
      <FlatList
      style={{width:400}}
        data={elevatorStatusList}
        renderItem={renderItem}
        keyExtractor={item => item.id.toString()}
      />
      </View>

         <View style={{ flex: 1, justifyContent: 'flex-end',margin:20 }}>
         <Button
           title="Logout"
           onPress={() =>  navigation.reset({
            index: 0,
            routes: [{ name: 'Login' }],
          })}
           color="red"
           backgroundColor="red"
          />
         </View>
    </View>
  );
};

export default Home;
