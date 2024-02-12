import { useDispatch, useSelector } from 'react-redux';

import { useState } from 'react';

import { createNewDeposit } from '../features/user/usersSlice';

const User = () => {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    const dispatch = useDispatch();
    const deposits = useSelector((state) => state.users.list.find((user) => user.id === currentUser.id)?.deposits || []);

    let allSum = 0;

    const takeAllDepositsSum = () => {
      for(let i = 0; i < deposits.length; i++) {
        let currentNumber = parseInt(deposits[i].depositSum);

        if(!isNaN(currentNumber)) {
          allSum += currentNumber;
        }
      }
    }

    takeAllDepositsSum(); // take all deposits' sum when page is downloaded 

    const [form, setForm] = useState({
        depositName: '',
        depositSum: null,
        depositPeriod: null
    });

    const handleUpdateForm = (formType, formName) => { 
        setForm({
          ...form,
          [formType]: formName
        });
      }

      const DepositsCollection = deposits.map((el, index) => (
        <div key={index}>
          <h3>{el.depositName}</h3>
          <p>{el.depositSum}</p>
          <p>%:0.5</p>
          <p>{el.depositPeriod}</p>
          <p>After {el.depositPeriod} months you will have {el.depositSum + ((el.depositSum * 0.5) / 100) * el.depositPeriod}$</p>
        </div>
      ));

      const handleCreateDeposit = () => {
        dispatch(createNewDeposit({id: currentUser.id, depositName: form.depositName, depositSum: form.depositSum, depositPeriod: form.depositPeriod}));
        takeAllDepositsSum(); // update the depositSum when user add new deposit
      }

    return (
        <center>
            <h1>{currentUser.login}</h1>
            <h3>{allSum}</h3>
            <div>
                <h2>Create new deposit</h2>
                <input type="text" placeholder="Enter a name" onChange={(e) => handleUpdateForm('depositName', e.target.value)}/>
                <input type="text" placeholder="Enter a sum" onChange={(e) => handleUpdateForm('depositSum', e.target.value)}/>
                <input type="text" placeholder='Enter a period (in months)' onChange={(e) => handleUpdateForm('depositPeriod', e.target.value)}/>
                <button onClick={handleCreateDeposit}>Submit</button>
            </div>
            {DepositsCollection}
        </center>
    );
}

export default User;