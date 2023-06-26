import Button from "react-bootstrap/esm/Button";
import { useNavigate } from "react-router-dom";
import { useStartApplication } from "../hooks/use-start-application";

import './StartApplicationContainer.css'


export default function StartApplicationContainer() {

    const navigate = useNavigate();

    const { isStarting, onStartApplication } = useStartApplication({
        onSuccess: (applicationUid) => navigate(`/application/${applicationUid}`)
    })

    return (
        <div className='d-grid start-button-container'>
            <Button
                variant='primary'
                size='lg'
                disabled={isStarting}
                onClick={onStartApplication}
            >{isStarting ? 'Starting...' : 'Start Application'}</Button>
        </div>
    )
}