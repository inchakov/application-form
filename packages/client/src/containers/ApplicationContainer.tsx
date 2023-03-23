import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ApplicationForm from "../components/ApplicationForm";
import { useApplicationDataApi } from "../hooks/use-application-data-api";
import { PartialApplication } from "../shared/model/application";
import { ApplicationUid } from "../shared/model/application-uid";

export default function ApplicationContainer() {

    const { applicationUid } = useParams<ApplicationUid>();
    const { getApplication } = useApplicationDataApi();
    const [applicationState, setApplication] = useState<PartialApplication>({})

    useEffect(() => {
        if (applicationUid) {
            getApplication(applicationUid)
                .then((application) => setApplication(application))
                .catch(e => console.error(e))
        }
    }, [applicationUid, getApplication])
    
    return (
        <ApplicationForm application={applicationState} />
    )
}