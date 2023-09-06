import { useState } from 'react'
import { useRegisterUserMutation, useUserLoginMutation } from '../services/authApi';
import styled from 'styled-components';
import AuthForm from '../components/Form';

const Cover = styled.div`
  height: 100vh;
  width: 100vw;
  background: rgba(13, 32, 60, 0.761);
`;

const FormWrapper = styled.div`
  position: absolute;
  top: 50%;
  right: 50%;
  transform: translate(50%, -50%);
  color: #000;
`;

const initialState: Record<string, any> = {
    username: '',
    emailAddress: '',
    password: '',
    confirmPassword: '',
    loginId: ''
}

function Auth() {
    const [formValues, setFormvalues]= useState(initialState)
    const [showRegister, setShowRegister] = useState(false)
    const [loginUser] = useUserLoginMutation()
    const [registerUser] = useRegisterUserMutation();
    
    return (
      <Cover>
        <FormWrapper>
          <AuthForm
            showRegister={showRegister}
            setShowRegister={setShowRegister}
            formValues={formValues}
            setFormvalues={setFormvalues}
            loginUser={loginUser}
            registerUser={registerUser}
          />
        </FormWrapper>
      </Cover>
    );
}

export default Auth