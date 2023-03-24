import { useCallback, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ApplicationForm from "../components/ApplicationForm";
import { useToastContext } from "../components/ToastContextProvider";
import { useApplicationCalculatorApi } from "../hooks/use-application-calculator-api";
import { useApplicationDataApi } from "../hooks/use-application-data-api";
import getErrorMessage from "../shared/getErrorMessage";
import { Application, PartialApplication } from "../shared/model/application";
import { ApplicationUid } from "../shared/model/application-uid";

export default function ApplicationContainer() {

    // useParams run rerender even if nothing changed
    const { applicationUid } = useParams<ApplicationUid>();
    const navigate = useNavigate();

    const { getApplication } = useApplicationDataApi();
    const { calculatePrice } = useApplicationCalculatorApi();
    const [applicationState, setApplication] = useState<PartialApplication>({})

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
                    navigate('/');
                }
            }
        }
        fetchApplication();
    }, [applicationUid, getApplication, navigate, showToast])

    const onRequestPrice = useCallback(async (application: Application) => {
        const price = await calculatePrice(application)
        return price
    }, [calculatePrice])

    return (
        <ApplicationForm
            application={applicationState}
            requestPrice={onRequestPrice}
        />
    )
}