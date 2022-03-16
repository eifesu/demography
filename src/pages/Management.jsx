import Title from '../components/Title';
import Button from '../components/Button';
import Field from '../components/Field';
import Input from '../components/Input';
import IconBar from '../components/IconBar';
import IconButton from '../components/IconButton';

import { HiUserAdd } from 'react-icons/hi'
import { FaPlay } from 'react-icons/fa'
import { BsStoplightsFill } from 'react-icons/bs'
import { FaUserAlt } from 'react-icons/fa';

import * as S from '../components/_styled';
import Candidate from '../components/Candidate';
import Bar from '../components/Bar';

import { addDoc, arrayUnion, collection, deleteDoc, doc, getDocs, getFirestore, onSnapshot, query, setDoc, updateDoc, where } from 'firebase/firestore';
import { useRef, useEffect } from 'react';



function Management({ state, setState }) {
    const candidateRef = useRef(null);
    const db = getFirestore();


    async function addCandidate() {
        await addDoc(collection(db, "candidates"), {
            roomId: state.id,
            name: candidateRef.current?.value,
        })
    }

    async function enableVotes() {
        const q = query(collection(db, "rooms"), where("id", "==", state.id));
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach(async (document) => 
        {
            const ref = doc(db, "rooms", document.id)
            await updateDoc(ref, {
                enabled: true,
            })
        });
    }
    
    async function stopVotes() {
        const q = query(collection(db, "rooms"), where("id", "==", state.id));
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach(async (document) => 
        {
            const ref = doc(db, "rooms", document.id)
            await updateDoc(ref, {
                enabled: false,
            })
        });
    }

    async function removeCandidate(id) {
        await deleteDoc(doc(db, "candidates", id));
    }

    useEffect(() => {
        const q = query(collection(db, "candidates"), where("roomId", "==", state.id))
        const candidatesSub = onSnapshot(q, (snapshot) => {
            let candidates = [];
            snapshot.forEach((doc) => {
                const data = doc.data()
                candidates.push({...data, id: doc.id})
            })
            setState((prevState) => ({ ...prevState, candidates }))
        })

        return () => candidatesSub();
    }, []);
    return (
        <>
            <Title><em>CREATE YOUR</em> POLL</Title>
            <Field>
                <Input ref={candidateRef} placeholder="JOHN JEAN" />
                <FaUserAlt fontSize="16  " color={S.theme.darkgray} />
            </Field>

            <IconBar>
                <IconButton variant="teal" onClick={addCandidate}>
                    <HiUserAdd fontSize="32" />
                </IconButton>
                <IconButton variant="green" onClick={enableVotes}>
                    <FaPlay fontSize="32" />
                </IconButton>
                <IconButton variant="red" onClick={stopVotes}>
                    <BsStoplightsFill fontSize="32" />
                </IconButton>
            </IconBar>

            {state.candidates && state.candidates.map((candidate, i) =>
            (
                <Button key={candidate.id} onClick={() => removeCandidate(candidate.id)} >
                    <Candidate >
                        <Bar />
                        <h1>{candidate.name}</h1>
                    </Candidate>
                </Button>
            )
            )}


        </>

    )
}

export default Management