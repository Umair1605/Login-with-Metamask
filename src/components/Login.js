import './Login.css';

import React, { useState } from 'react';
import Web3 from 'web3';

const Login=({usercontract,handleLogin}) =>{
    
    const [loading, setLoading] = useState(false); // Loading button state

    // register function
    const register = async(address) =>{

        try{
            await usercontract.methods.register(address).send({ from: address}).on('transactionHash', (hash) => {
                let userInfo = {
                    name : "",
                    addr : address,
                }
                handleLogin(userInfo)

            })
            
        } catch (err){
            window.alert("You have to confirm the transaction");
            setLoading(false)
        }
        
    }

    // login function
    const handleClick = async () => {
		
        setLoading(true);
        const web3 = window.web3
        const accounts = await web3.eth.getAccounts();
        
        const checkUser = await usercontract.methods.user(accounts[0]).call()
        
        if(parseInt(checkUser[0]) === 0)
        {
            register(accounts[0])       
        }
        else{
            setLoading(false)
            handleLogin(checkUser)
        }   
	};

    return (
        <div>
			<p>
				Please select your login method.
				<br />
				Only MetaMask login is
				implemented.
			</p>

			<button className="Login-button Login-mm"  onClick={handleClick}>
				{loading ? 'Loading...' : 'Login with MetaMask'}
			</button>
			<button className="Login-button Login-fb" disabled>
				Login with Facebook
			</button>
			<button className="Login-button Login-email" disabled>
				Login with Email
			</button>
		</div>
    );
};
export default Login;
