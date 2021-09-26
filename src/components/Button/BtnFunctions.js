import { clearTokens } from "../../Jwt/token";
export const logOut = ()=>{
    const {updateRoutes} = this.props;
    clearTokens();
    updateRoutes();
}