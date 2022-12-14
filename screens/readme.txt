yarn add @react-oauth/google@latest
yarn add @react-oauth/google
yarn add jwt-decode




import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';
import jwtDecode from 'jwt-decode';





<GoogleOAuthProvider clientId="<your_client_id>">...</GoogleOAuthProvider>
<GoogleLogin
  onSuccess={credentialResponse => {
    console.log(credentialResponse);
  }}
  onError={() => {
    console.log('Login Failed');
  }}
/>;