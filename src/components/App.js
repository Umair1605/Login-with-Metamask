import React, { useState,useEffect } from 'react';
import logo from '../logo.png';
import UserContract from '../abis/UserContract.json'
import './App.css';
import Web3 from 'web3';
import Login from './Login'
import Profile from './Profile'


function App() {

  const [mounted, setMounted] = useState(false)
  const [usercontract,setUserContract] = useState();
  const [ user, setLoginUser] = useState({});

  // load Metamask
  const loadWeb3 = async() => {
    
    if (window.ethereum) {
      window.web3 = new Web3(window.ethereum)
      await window.ethereum.enable()
    }
    else if (window.web3) {
      window.web3 = new Web3(window.web3.currentProvider)
    }
    else {
      window.alert('Non-Ethereum browser detected. You should consider trying MetaMask!')
    }

  }

  // load smart contract
  const loadBlockchainData  = async() => {
    
    const web3 = window.web3
    const networkId = await web3.eth.net.getId()
    const networkData = UserContract.networks[networkId];
    
    
    if(networkData){
      const usercontract = new web3.eth.Contract(UserContract.abi,networkData.address)
      setUserContract(usercontract)
    }
    else{
      window.alert('User Contract not deployed to detected network');
    }
    
  }

  //load just like the constructor
  if(!mounted){
    loadWeb3()
    loadBlockchainData()
  }

  useEffect(() =>{   
    setLoginUser(JSON.parse(localStorage.getItem("MyUser")))
    setMounted(true)
  },[])

  // update the user data
  const updateUser = (user) =>{

    localStorage.setItem("MyUser",JSON.stringify(user))
    setLoginUser(user)
  }

  return (
    <div className='App'>
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <h1 className="App-title">
          Welcome to Login with MetaMask Demo
        </h1>
      </header >

      <div className="App-intro">
        {user && user.addr ? (
          <Profile user={user}  usercontract={usercontract} updateUser = {updateUser} />
        ) : (
          <Login usercontract={usercontract} handleLogin={updateUser} />
        )}
      </div>
      
    </div>   
  );
}

export default App;
