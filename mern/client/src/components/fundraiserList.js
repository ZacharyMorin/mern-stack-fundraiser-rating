import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from '../api';

const Record = (props) => (
    <tr>
        <td>{props.record.fundraiser_name}</td>
        <td>{props.record.overall_rating} Star(s)</td>
        <td>
            <Link className="btn btn-link" to={`/edit/${props.record._id}`}>Leave a Review</Link>
        </td>
    </tr>
);

export default function FundraiserList() {
    const [records, setRecords] = useState([]);

    // This method fetches the records from the database.
    useEffect(() => {
        async function getRecords() {
            const response = await api.getAllFundraisers();

            if (response.status !== 200) {
                console.log(response)
                const message = `An error occurred: ${response.statusText}`;
                window.alert(message);
                return;
            }

            const records = response.data;
            setRecords(records);
        }

        getRecords(); // Future Zach: this seems to be getting called twice on page load?
    }, [records.length]);


    // Map out the records on the table
    function recordList() {
        return records.map((record) => {
            return (
                <Record
                    record={record}
                    key={record._id}
                />
            );
        });
    }

    // Display the table with the records of fundraisers.
    return (
        <div className="ps-3 pe-3">
            <h3 className="pt-2">Fundraiser List</h3>
            <table className="table table-striped" style={{ marginTop: 20 }}>
                <thead>
                <tr>
                    <th>Fundraiser Name</th>
                    <th>Rating</th>
                    <th></th>
                </tr>
                </thead>
                <tbody>{ recordList() }</tbody>
            </table>
        </div>
    );
}
