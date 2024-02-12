import { useDispatch, useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { useState } from 'react';

import { auth } from '../features/user/usersSlice';

const Main = () => {

    const [currentUser, setCurrentUser] = useState(null);

    const [form, setForm] = useState({
        login: '',
        password: ''
    });

    const dispatch = useDispatch();
    const list = useSelector(state => state.users.list);

    const handleUpdateForm = (formType, formName) => { 
        setForm({
          ...form,
          [formType]: formName
        });
      }

      const handleAuth = () => {
        const foundUser = list.find(user => user.login === form.login)
        if(!foundUser) {
            alert(`Can not find user ${form.login}`);
            return;
        };

        if(foundUser.password === form.password) {
            dispatch(auth(foundUser.login, foundUser.password));
            alert('You have beeen logged in successfully');
            setCurrentUser(foundUser);
            localStorage.setItem('currentUser', JSON.stringify(foundUser));
        };
    }

    return (
        <main>
            <center>
                <h1>Auth</h1>
                <input type="text" placeholder="Enter your login" onChange={(e) => handleUpdateForm('login', e.target.value)}/>
                <input type="password" placeholder="Enter your password" onChange={(e) => handleUpdateForm('password', e.target.value)}/>
                <button onClick={handleAuth}>Submit</button>
                {currentUser && <Navigate to='/user' replace={true}/>}
            </center>
        </main>
    )
}

export default Main;