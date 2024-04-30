import { createStackNavigator } from "@react-navigation/stack";
import CropPrediction from "../CropPrediction";
import CropDetails from "../CropDetails";

const Stack=createStackNavigator()
const CropStackNavigator=()=>(
    <Stack.Navigator>
        <Stack.Screen name='CropForm' component={CropPrediction} options={{
            headerShown:false
        }}/>
        <Stack.Screen name='CropDetails' component={CropDetails}/>
    </Stack.Navigator>
)

export default CropStackNavigator;