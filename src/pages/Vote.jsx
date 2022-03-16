import Title from '../components/Title';
import IconButton from '../components/IconButton'
import {FaVoteYea} from 'react-icons/fa'
import Candidate from '../components/Candidate';
import Button from '../components/Button';

const Vote = () => {
    return <>
        <Title><em>CHOOSE YOUR</em> VOTE</Title>

        <Button>
        <Candidate variant=""><h1>JOHN JEAN</h1><h1></h1></Candidate>
        </Button>
        <Button>
        <Candidate variant=""><h1>MABO KENZA</h1><h1></h1></Candidate>
        </Button>
        <Button>
        <Candidate variant=""><h1>ORI EMMANUELLE</h1><h1></h1></Candidate>
        </Button>
        <IconButton variant="green">
            <FaVoteYea fontSize="32" />
        </IconButton>
    </>
}


export default Vote