import { useCallback, useState } from "react";
import Button from "react-bootstrap/esm/Button";
import Container from "react-bootstrap/esm/Container";
import { useNavigate } from "react-router-dom";
import { useApplicationDataApi } from "../hooks/use-application-data-api";

export default function StartApplicationContainer() {

    const navigate = useNavigate();
    const { createApplication } = useApplicationDataApi();
    const [isStarting, setStarting] = useState(false)

    const startApplication = useCallback(() => {
        setStarting(true);
        createApplication({})
            .then((res) => {
                navigate(`/application/${res.applicationUid}`)
            })
            .catch(e => console.error(e))
            .finally(() => setStarting(false))
    }, [createApplication, navigate])

    return (
        <Container>
            <div className='d-grid'>
                <Button
                    variant='primary'
                    size='lg'
                    disabled={isStarting}
                    onClick={startApplication}
                >{isStarting ? 'Starting...' : 'Start Application'}</Button>
            </div>
        </Container>
    )
}