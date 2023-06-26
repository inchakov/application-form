import React from "react";
import { UseFormReturn } from "react-hook-form";
import { States } from "../../data/us-states";
import { PartialApplication } from "../../shared/model/application";
import { StringInput } from "../Inputs/StringInput";
import { SelectInput } from "../Inputs/SelectInput";

export default function ApplicationAddress(
    props: UseFormReturn<PartialApplication>
) {
    return (
        <React.Fragment>
            <h2 className="application-section">Address</h2>

            <StringInput
                form={props}
                path='street'
                label='Street'
                placeholder='123 Main St Apt 456'
                options={{ required: 'Street is required' }}
            />

            <StringInput
                form={props}
                path='city'
                label='City'
                placeholder='Silver Spring'
                options={{ required: 'City is required' }}
            />

            <SelectInput
                form={props}
                path='state'
                label='State'
                options={{ required: 'State is required' }}
            >
                <option value=''>Select...</option>
                {States.map((state) => (<option key={state.abbreviation} value={state.abbreviation}>{state.name}</option>))}
            </SelectInput>

            <StringInput
                form={props}
                type='number'
                path='zip'
                label='Zip'
                placeholder='12345'
                options={{
                    required: 'Zip is required',
                    minLength: { value: 5, message: 'Zip must be 5 digits' },
                    maxLength: { value: 5, message: 'Zip must be 5 digits' }
                }}
            />

        </React.Fragment>
    )
}