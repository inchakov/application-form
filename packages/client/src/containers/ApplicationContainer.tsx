import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ApplicationForm from "../components/ApplicationForm";
import { useToastContext } from "../components/ToastContextProvider";
import { useApplicationDataApi } from "../hooks/use-application-data-api";
import { PartialApplication } from "../shared/model/application";
import { ApplicationUid } from "../shared/model/application-uid";

export default function ApplicationContainer() {

    // useParams run rerender even if nothing changed
    const { applicationUid } = useParams<ApplicationUid>();
    const navigate = useNavigate();

    const { getApplication } = useApplicationDataApi();
    const [applicationState, setApplication] = useState<PartialApplication>({})
    
    const { showToast } = useToastContext()

    useEffect(() => {
        async function fetchApplication() {
            if (applicationUid) {
                try {
                    const application = await getApplication(applicationUid)
                    setApplication(application)
                } catch (e) {
                    console.error(e);
                    showToast({ header: 'Error', text: 'Application load failed', bg: 'danger' })
                    navigate('/');
                }
            }
        }
        fetchApplication();
    }, [applicationUid, getApplication, navigate, showToast])

    return (
        <ApplicationForm application={applicationState ?? {}} />
    )
}