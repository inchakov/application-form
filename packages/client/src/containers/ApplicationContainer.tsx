import React from "react";
import Spinner from "react-bootstrap/esm/Spinner";
import { useNavigate, useParams } from "react-router-dom";
import ApplicationForm from "../components/ApplicationForm";
import { ApplicationUid } from "../shared/model/application-uid";
import { useApplication } from "../hooks/use-application";

export default function ApplicationContainer() {

    const { applicationUid } = useParams<ApplicationUid>();
    const navigate = useNavigate();

    const { application, onRequestPrice, onSaveApplication } = useApplication({
        applicationUid,
        notFound: () => navigate('/')
    });

    return (
        <React.Fragment>
            {!application &&
                <Spinner animation="border" role="status">
                    <span className="visually-hidden">Loading...</span>
                </Spinner>
            }
            {application &&
                <ApplicationForm
                    application={application}
                    requestPrice={onRequestPrice}
                    onSave={onSaveApplication}
                />
            }
        </React.Fragment>
    )
}