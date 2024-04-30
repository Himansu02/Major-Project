import { createStackNavigator } from "@react-navigation/stack";
import CropPrediction from "../CropPrediction";
import CropDetails from "../CropDetails";
import ChatRoom from "../rohan/ChatRoom";
import MessageContainer from "../rohan/MessageContainer";

const Stack=createStackNavigator()
const CropStackNavigator=()=>(
    <Stack.Navigator>
        <Stack.Screen name='MessageContainer' component={MessageContainer} options={{
            headerShown:false
        }}/>
        <Stack.Screen name='Rakesh' component={ChatRoom}/>
        <Stack.Screen name='Shalini' component={ChatRoom}/>
        <Stack.Screen name='Riya' component={ChatRoom}/>
    </Stack.Navigator>
)

export default CropStackNavigator;