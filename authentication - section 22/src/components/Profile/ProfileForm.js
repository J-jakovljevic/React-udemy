import { useContext, useRef } from 'react';

import AuthContext from '../../store/auth-context';
import classes from './ProfileForm.module.css';

const ProfileForm = () => {
  const newPassInputRef = useRef();
  const authCtx = useContext(AuthContext);

  const submitHandler = (event) => {
    event.preventDefault();

    const enteredNewPass = newPassInputRef.current.value;

    // optional: add validation

    fetch('https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyALo34yPd4UvL70JncBzikj5cs12dgFSDc', 
    {
      method: 'POST',
      body: JSON.stringify({
        idToken: authCtx.token,
        password: enteredNewPass,
        returnSecureToken: false // required on firebase auth rest api website for changing pass
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(res => {
      // pretpostavka da je uvek succeed kako bismo ustedeli vreme (nema error hendlinga)
      
    })
  }

  return (
    <form className={classes.form} onSubmit={submitHandler}>
      <div className={classes.control}>
        <label htmlFor='new-password'>New Password</label>
        <input type='password' id='new-password' minLength="7" ref={newPassInputRef} />
      </div>
      <div className={classes.action}>
        <button>Change Password</button>
      </div>
    </form>
  );
}

export default ProfileForm;
