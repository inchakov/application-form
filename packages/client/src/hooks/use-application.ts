import { useCallback, useEffect, useState } from "react";
import { useApplicationCalculatorApi } from "./api/use-application-calculator-api";
import { useApplicationDataApi } from "./api/use-application-data-api";
import { Application, PartialApplication } from "../shared/model/application";
import { useToastContext } from "../components/ToastContextProvider";
import getErrorMessage from "../shared/getErrorMessage";

export interface UseApplicationProps {
    applicationUid: string | undefined
    notFound: () => void
}

export function useApplication(props: UseApplicationProps) {
    
    const { applicationUid, notFound: navigateNotFound } = props;
    const { getApplication, saveApplication } = useApplicationDataApi();
    const { calculatePrice } = useApplicationCalculatorApi();
    const [applicationState, setApplication] = useState<PartialApplication | undefined>()

    const { showToast } = useToastContext()

    useEffect(() => {
        async function fetchApplication() {
            if (applicationUid) {
                try {
                    const application = await getApplication(applicationUid)
                    if (!application.vehicles) {
                        application.vehicles = [{}];
                    }
                    if (application.vehicles.length === 0) {
                        application.vehicles.push({});
                    }
                    setApplication(application)
                } catch (e) {
                    console.error(e);
                    showToast({ header: 'Error', text: getErrorMessage(e), bg: 'danger' })
                    navigateNotFound(); //navigate('/');
                }
            }
        }
        fetchApplication();
    }, [applicationUid, getApplication, navigateNotFound, showToast])

    const onRequestPrice = useCallback(async (application: Application) => {
        const price = await calculatePrice(application)
        return price
    }, [calculatePrice])

    const onSaveApplication = useCallback(async (application: PartialApplication) => {
        if (applicationUid) {
            try {
                showToast({ header: 'Saving', text: 'Saving application...', bg: 'info' });
                await saveApplication(applicationUid, application);
                showToast({ header: 'Saved', text: 'Application saved', bg: 'info', milliseconds: 3000 });
            } catch (e) {
                console.error(e);
                showToast({ header: 'Error', text: "Saving error:" + getErrorMessage(e), bg: 'danger' })
            }
        }
    }, [applicationUid, saveApplication, showToast])

    return {
        application: applicationState,
        onRequestPrice,
        onSaveApplication
    }
}