import './Profile.css'
import React, { useState} from 'react';
import Blockies from 'react-blockies';
import Web3 from 'web3';

const Profile=({user,usercontract,updateUser}) =>{

    const [_name, setName] = useState('');

    const handleChange = event => {
        setName(event.target.value)
    };

    // sumbit user data
    const handleSubmit = async()=>{

        usercontract.methods.updateName(user.addr,_name).send({ from: user.addr}).on('transactionHash', (hash) => {
            let userInfo = {
                name : _name,
                addr : user.addr,
            }
            updateUser(userInfo)
            console.log("USerInfo :",userInfo)
        })      
    }
   
    return (
        <div className="Profile">
            <p>
                Logged in as <Blockies seed={user.addr} />
            </p>
            <div>
                My username is {user.name ? <pre>{user.name}</pre> : 'not set.'}
                <br/>
                My publicAddress is {user.addr}
            </div>
            <div>
                <label htmlFor="username">Change username: </label>
                <input name="username" onChange={handleChange} />
                <button onClick={handleSubmit}>
                    Submit
                </button>
            </div>
            <p>
                <button onClick={()=>updateUser({})}>Logout</button>
            </p>
        </div>
    );
};
export default Profile;