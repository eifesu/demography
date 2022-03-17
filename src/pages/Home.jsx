import Title from '../components/Title';
import Button from '../components/Button';
import Field from '../components/Field';
import Input from '../components/Input';
import { FaLock } from 'react-icons/fa';
import * as S from '../components/_styled';
import { getFirestore, collection, addDoc, onSnapshot, setDoc, doc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import { useRef} from 'react'
function makeid(length) {
    var result = '';
    var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() *
            charactersLength));
    }
    return result;
}


const Home = ({state, setState}) => {

    const roomRef = useRef(null)
    const db = getFirestore();
    const navigate = useNavigate()

    async function createRoom() {
        const id = makeid(4).toUpperCase();
        const docRef = await addDoc(collection(db, "rooms"), {
            id,
            enabled: false,
        })
        setState(prevState => ({...prevState, id}))
        navigate('/create', {replace: true})
    }

    async function joinRoom() {
        setState(prevState => ({...prevState, id: roomRef.current?.value}))
        navigate('/vote', {replace: true})
    }

    return <>
        <Title><em>HOME</em> SCREEN</Title>
        <Button onClick={createRoom} variant="green">CREATE ROOM</Button>
        <Field>
            <Input ref={roomRef} placeholder="#R2K9" />
            <FaLock fontSize="16  " color={S.theme.darkgray} />
        </Field>

        <Button onClick={joinRoom} variant="teal">JOIN A ROOM</Button>
    </>
}


export default Home