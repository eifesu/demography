import './styles/App.css'
import Main from './components/Main'
import Header from './components/Header'

import Home from './pages/Home'
import Management from './pages/Management'
import Vote from './pages/Vote'
import Screen from './components/Screen';
import { Routes, Route } from 'react-router-dom'

import { initializeApp } from "firebase/app";
import { useState, useEffect } from 'react';
import { doc, getFirestore, onSnapshot } from 'firebase/firestore'
import { v4 as uuidv4 } from 'uuid';

const firebaseConfig = {
  apiKey: "AIzaSyAg7ZYdVd5mECllnrWJURfUAs7inXmUYbQ",
  authDomain: "demography-21c97.firebaseapp.com",
  projectId: "demography-21c97",
  storageBucket: "demography-21c97.appspot.com",
  messagingSenderId: "434382374430",
  appId: "1:434382374430:web:624c77835675911c00900f"
};

const app = initializeApp(firebaseConfig);


function App() {
  const db = getFirestore();
  const [state, setState] = useState({
    ref: '',
    id: '',
    candidates: [],
    votes: [],
    selected: '',
    enabled: false,
    userId: null,
    vote: null,
  })

  useEffect(() => {
    const id = localStorage.getItem('id');

    if (id) {
      setState((prevState => ({ ...prevState, userId: id })))
    } else {
      const uuid = uuidv4();
      localStorage.setItem('id', uuid);
      setState((prevState => ({ ...prevState, userId: uuid})))
    }

  }, [state.userId]);


  useEffect(() => {
    console.log(state)
  }, [state]);


    return (
      <Main>
        <Header state={state}>
          <h1>
            <em>DEMO</em>GRAPHY
          </h1>
          {state.id != '' ? <h1><em>Room ID:</em> {state.id}</h1> : null}
        </Header>
        <Screen>
          <Routes>
            <Route path="/" element={<Home state={state} setState={setState} />} />
            <Route path="/vote" element={<Vote state={state} setState={setState} />} />
            <Route path="/create" element={<Management state={state} setState={setState} />} />
          </Routes>
        </Screen>
      </Main>
    )
}

export default App
