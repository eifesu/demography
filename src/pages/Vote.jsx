import Title from '../components/Title';
import IconButton from '../components/IconButton'
import {FaVoteYea} from 'react-icons/fa'
import Candidate from '../components/Candidate';
import Button from '../components/Button';
import { collection, doc, getFirestore, onSnapshot, query, where } from 'firebase/firestore';
import {useEffect} from 'react'
const Vote = ({state, setState}) => {

    const db = getFirestore();
    function select(id) {
        setState((prevState) => ({...prevState, selected: id}));
    }

    async function vote() {
        
    }

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


    return <>
        <Title><em>CHOOSE YOUR</em> VOTE</Title>

        {state.candidates && state.candidates.map((candidate, i) =>
            (
                <Button variant={state.selected == candidate.id ? 'green' : 'red'} key={candidate.id} onClick={() => select(candidate.id)} >
                    <Candidate >
                        <h1>{candidate.name}</h1>
                    </Candidate>
                </Button>
            )
        )}

        <IconButton variant="green">
            <FaVoteYea fontSize="32" />
        </IconButton>
    </>
}


export default Vote