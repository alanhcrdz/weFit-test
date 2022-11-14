import { NavigationContainer } from "@react-navigation/native";
import StackRoutes from "./stack.routes";
import TabRoutes from "./tabs.routes";

export const Routes = () => {
    return (
        <NavigationContainer>
            <TabRoutes />
        </NavigationContainer>
    )
}