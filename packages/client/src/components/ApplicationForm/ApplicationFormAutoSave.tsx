import React, { useRef } from "react";
import { useAutosave } from "react-autosave";
import { UseFormReturn } from "react-hook-form";
import { PartialApplication } from "../../shared/model/application";


export type ApplicationFormAutoSaveProps = UseFormReturn<PartialApplication> & {
    onSave: (application: PartialApplication) => Promise<void>
}

export default function ApplicationFormAutoSave(
    props: ApplicationFormAutoSaveProps
) {
    const { watch, onSave } = props;
    const application = watch();
    const lastSavedApplication = useRef<string | undefined>(undefined);

    useAutosave({
        interval: 4000,
        data: application, onSave: (application) => {
            const cleanApp = removeEmptyFields(application);
            const cleanAppString = JSON.stringify(cleanApp); // this is not best way to compare objects, but it's good enough for this use case
            const currentAppString = lastSavedApplication.current;
            
            lastSavedApplication.current = cleanAppString;
            
            if (currentAppString !== undefined && currentAppString !== cleanAppString) {
                onSave(cleanApp);
            }
        }
    })

    return (
        <React.Fragment></React.Fragment>
    )
}

function removeEmptyFields(data: Record<string, unknown>) {
    
    const cleanData: Record<string, unknown> = {};

    for (const key in data) {
        const value = data[key];
        if (value !== null && value !== undefined && value !== '') {
            if (Array.isArray(value)) {
                cleanData[key] = value.map(v => removeEmptyFields(v as Record<string, unknown>));
            } else if (typeof value === 'object') {
                cleanData[key] = removeEmptyFields(value as Record<string, unknown>);
            } else {
                cleanData[key] = value;
            }
        }
    }

    return cleanData;
}