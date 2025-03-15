import { GoogleLogin } from "@react-oauth/google";
import {jwtDecode} from "jwt-decode";


export default function Landing() {
    return (
        <div>
            <GoogleLogin
  onSuccess={credentialResponse => {
    
    console.log(jwtDecode(credentialResponse.credential));
  }}
  onError={() => {
    console.log('Login Failed');
  }}
  auto_select={true}/>
        </div>
    )
}