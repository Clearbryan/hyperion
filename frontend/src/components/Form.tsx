import { useNavigate } from 'react-router-dom';
import{ toast } from 'react-toastify'
import { useAppDispatch } from '../app/hooks';
import { setUser } from '../features/authSlice';

export interface IFormInputs {
  type?: string;
  className?: string;
  id?: string;
  placeholder?: string;
  name?: string;
  required?: boolean;
  label?: string;
  handleChange?: any;
  values?: any;
}

const UserLoginFormInputs: IFormInputs[] = [
  {
    label: 'Login ID',
    type: 'text',
    className: 'form-control custom-input my-2',
    id: 'loginId',
    placeholder: 'Login ID',
    name: 'loginId',
    required: true,
  },
  {
    label: 'Password',
    type: 'password',
    className: 'form-control custom-input my-2',
    id: 'password',
    placeholder: 'Password',
    name: 'password',
    required: true,
  },
];

const UserRegistrationFormInputs: IFormInputs[] = [
  {
    label: 'Username',
    type: 'text',
    className: 'form-control custom-input my-2',
    id: 'username',
    placeholder: 'Username',
    name: 'username',
    required: true,
  },
  {
    label: 'Email Address',
    type: 'email',
    className: 'form-control custom-input my-2',
    id: 'emailAddress',
    placeholder: 'Email',
    name: 'emailAddress',
    required: true,
  },
  {
    label: 'Password',
    type: 'password',
    className: 'form-control custom-input my-2',
    id: 'password',
    placeholder: 'Password',
    name: 'password',
    required: true,
  },
  {
    label: 'Confirm Password',
    type: 'password',
    className: 'form-control custom-input my-2',
    id: 'confirmPassword',
    placeholder: 'Confirm Password',
    name: 'confirmPassword',
    required: true,
  },
];

function AuthForm({
  showRegister,
  setShowRegister,
  formValues,
  setFormvalues,
  loginUser,
  registerUser,
}: any) {
  const handleInputChange = (evt: any) => {
    const { value, name } = evt.target;
    setFormvalues({ ...formValues, [name]: value });
  };
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const submitUserForRegistration = async () => {
     const { username, emailAddress, password, confirmPassword } = formValues;
    if(!username || !password || !emailAddress || !confirmPassword) {
      toast.error('Please enter all fields!');
    }
     else if (password !== confirmPassword) {
       toast.error('Passwords do not match!');
     }
     else if (username && emailAddress && password && confirmPassword) {
       const { error, data } = await registerUser({
         username,
         emailAddress,
         password,
         confirmPassword,
       });

       if (error) {
         toast.error(error && error.data && error.data.message);
       }
       else {
        if(data && data.success) {
            toast.success(data.message)
            const { token, user } = data;
            dispatch(setUser({ ...user, token }));
            setTimeout(() => {
              navigate('/dashboard');
            }, 2000);
        }else {
          toast.error(data.message);
        }
       }
    }
  };

  const submitUserForLogin = async () => {
    const { emailAddress, confirmPassword, username, ...rest } = formValues;
    const { loginId, password } = rest;
    if (loginId && password) {
      const {error, data} = await loginUser({ loginId, password });
      if(error){
        toast.error(error && error.data && error.data.message)
      }else {
        toast.success(data.message);
        const { token, user } = data;
        dispatch(setUser({ ...user, token }));
        setTimeout(() => {
          navigate('/dashboard');
        }, 2000);
      }
       
    } else {
      toast.error('Please enter Login ID and Password!');
    }
  };
  return (
    <form>
      <p className="heading text-center">
        {showRegister ? 'Register' : 'Login'}
      </p>
      <div className="form-wrapper">
        {showRegister &&
          UserRegistrationFormInputs.map((el) => {
            return (
              <input
                key={el.id}
                type={el.type}
                name={el.name}
                placeholder={el.placeholder}
                className={el.className}
                required={el.required}
                id={el.id}
                onChange={handleInputChange}
              />
            );
          })}
        {!showRegister &&
          UserLoginFormInputs.map((el) => {
            return (
              <input
                key={el.id}
                type={el.type}
                name={el.name}
                placeholder={el.placeholder}
                className={el.className}
                required={el.required}
                id={el.id}
                onChange={handleInputChange}
              />
            );
          })}

        {showRegister ? (
          <button
            onClick={() => submitUserForRegistration()}
            className="btn btn-block btn-outline-light btn-lg custom-btn"
            type="button"
          >
            {' Register '}
          </button>
        ) : (
          <button
            onClick={() => submitUserForLogin()}
            className="btn btn-block btn-outline-light btn-lg custom-btn"
            type="button"
          >
            {' Login '}
          </button>
        )}
      </div>
      <div>
        <div className="fw-bold text-white my-3 text-center">
          {!showRegister ? (
            <>
              No account yet?
              <span
                className="custom-link-text"
                onClick={() => setShowRegister(true)}
              >
                {' '}
                Register
              </span>
            </>
          ) : (
            <>
              Have an account?
              <span
                className="custom-link-text"
                onClick={() => setShowRegister(false)}
              >
                {' '}
                Login
              </span>
            </>
          )}
        </div>
      </div>
    </form>
  );
}

export default AuthForm;