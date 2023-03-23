import { useCallback, useState } from "react";
import Button from "react-bootstrap/esm/Button";
import Container from "react-bootstrap/esm/Container";
import { useNavigate } from "react-router-dom";
import { useToastContext } from "../components/ToastContextProvider";
import { useApplicationDataApi } from "../hooks/use-application-data-api";
import getErrorMessage from "../shared/getErrorMessage";
import './StartApplicationContainer.css'


export default function StartApplicationContainer() {

    const navigate = useNavigate();
    const { createApplication } = useApplicationDataApi();
    const [isStarting, setStarting] = useState(false)
    const { showToast } = useToastContext()

    const startApplication = useCallback(() => {
        setStarting(true);
        createApplication({})
            .then((res) => {
                navigate(`/application/${res.applicationUid}`)
            })
            .catch(e => {
                console.error(e)
                showToast({ header: 'Error', text: getErrorMessage(e), bg: 'danger' })
            })
            .finally(() => setStarting(false))
    }, [createApplication, navigate, showToast])

    return (
        <div className='d-grid start-button-container'>
            <Button
                variant='primary'
                size='lg'
                disabled={isStarting}
                onClick={startApplication}
            >{isStarting ? 'Starting...' : 'Start Application'}</Button>
        </div>
    )
}