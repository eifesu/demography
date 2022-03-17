import Title from '../components/Title';
import IconButton from '../components/IconButton'
import {FaVoteYea, FaUserLock, FaCheckDouble} from 'react-icons/fa'
import Candidate from '../components/Candidate';
import Button from '../components/Button';
import { addDoc, collection, doc, getFirestore, onSnapshot, query, setDoc, where } from 'firebase/firestore';
import {useEffect} from 'react'
const Vote = ({state, setState}) => {

    const db = getFirestore();
    function select(id) {   
        setState((prevState) => ({...prevState, selected: id}));
    }

    async function vote() {
        if (state.vote != null || state.enabled == false) {
            return false
        } else {
            const ref = collection(db, "votes");
            await addDoc(ref, {
                userId: state.userId,
                roomId: state.id,
                candidateId: state.selected
            })
        }
    }

    useEffect(() => {
        const q = query(collection(db, "rooms"), where("id", "==", state.id));
        const roomSnapshot = onSnapshot(q, (snapshot) => {
            snapshot.forEach((doc) => {
                const data = doc.data();
                console.log(`Result : `, data);
                setState((prevState) => ({ ...prevState, enabled: data.enabled }))
            })
        })
    }, [state.id]);


    useEffect(() => {
        const q = query(collection(db, "candidates"), where("roomId", "==", state.id))
        const candidatesSub = onSnapshot(q, (snapshot) => {
            let candidates = [];
            snapshot.forEach((doc) => {
                const data = doc.data()
                candidates.push({...data, id: doc.id})
            })
            console.log('lol')
            setState((prevState) => ({ ...prevState, candidates }))
        })

        return () => candidatesSub();
    }, []);


    useEffect(() => {
        setState((prevState) => ({ ...prevState, vote: null }))
        const q = query(collection(db, "votes"), where("userId", "==", state.userId))
        const voteSub = onSnapshot(q, (snapshot) => {
            snapshot.forEach((doc) => {
                const data = doc.data()
                console.log('Matching votes :', data);
                if(data.roomId === state.id) {
                    setState((prevState) => ({ ...prevState, vote: data.candidateId }))
                } 
            })
        })

        return () => voteSub();
    }, [])


    return <>
        <Title><em>CHOOSE YOUR</em> VOTE</Title>

        {state.candidates && state.candidates.map((candidate, i) =>
            (
                <Button  key={candidate.id} onClick={() => select(candidate.id)} >
                    <Candidate variant={state.vote == candidate.id ? 'green' : state.selected == candidate.id ? 'teal' : null}>
                        <h1>{candidate.name}</h1>
                    </Candidate>
                </Button>
            )
        )}

        <IconButton variant={state.vote ? 'green' : state.enabled  ? 'teal' : 'red'} onClick={() => vote()}>  
                {state.vote ?  <FaCheckDouble fontSize="32" /> : state.enabled ? <FaVoteYea fontSize="32" /> : <FaUserLock fontSize="32" />}
        </IconButton>
    </>
}


export default Vote