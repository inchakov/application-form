import { useCallback, useState } from "react";
import { useApplicationDataApi } from "./api/use-application-data-api";
import getErrorMessage from "../shared/getErrorMessage";
import { useToastContext } from "../components/ToastContextProvider";


export interface UseStartApplicationProps {
    onSuccess: (applicationUid: string) => void
}

export function useStartApplication(props: UseStartApplicationProps) {

    const { onSuccess } = props;
    const { createApplication } = useApplicationDataApi();
    const [isStarting, setStarting] = useState(false)
    const { showToast } = useToastContext()

    const onStartApplication = useCallback(() => {
        setStarting(true);
        createApplication({})
            .then((res) => {
                onSuccess(res.applicationUid)
            })
            .catch(e => {
                console.error(e)
                showToast({ header: 'Error', text: getErrorMessage(e), bg: 'danger' })
            })
            .finally(() => setStarting(false))
    }, [createApplication, onSuccess, showToast])

    return {
        isStarting,
        onStartApplication
    }
}