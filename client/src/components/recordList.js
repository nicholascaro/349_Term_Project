import React, { useEffect, useState } from "react"; 
import { Link } from "react-router-dom"

const Subscription = (props) => (
    <tr>
        <td>{props.subscription.name}</td>
        <td>{props.subscription.cost}</td>
        <td>{props.subscription.email}</td>

        <td>
            < Link className="btn btn-link" to={`/edit/${props.subscription._id}`}> Update </Link> | 
            <button className="btn btn-link"
                onClick={() => {
                    props.deleteSubscription(props.subscription._id); 
                }}
            > 
            Delete Subscription
            </button>
        </td>
    </tr>
); 

export default function SubscriptionList (){
    const [subscriptions, setSubscriptions] = useState([]); 
    
    useEffect(() => {
        async function getSubscriptions() {
            const response = await fetch (`http://localhost:3001/getAll/`); 

            if (!response.ok){
                const message = `An error /getAll occured: ${response.statusText}`; 
                window.alert(message); 
                return; 
            }

            const subscriptions = await response.json(); 
            setSubscriptions(subscriptions)
        }

        getSubscriptions(); 

        return; 
    }, [subscriptions.length]); 




    async function deleteSubscription(id) {
        await fetch(`http://localhost:3001/deleteOne/${id}`, {
            method: "DELETE"
        }); 
        console.log("Check Point")
        const newSubscriptions = subscriptions.filter((el) => el._id !== id); 
        setSubscriptions(newSubscriptions); 

    }

    // will present the subscriptions on a table

    function subscriptionList() {
        return subscriptions.map((subscription) => {
            return (
                <Subscription
                subscription={subscription}
                deleteSubscription={() => deleteSubscription(subscription._id)}
                key={subscription._id}
                />
            ); 
        }); 
    }

    return (
        <div>
            <h3> Subscription List</h3>
            <table className="table table-striped" style={{marginTop: 20}}>
                <thead>
                    <tr>
                        <th> Subscription Name </th>
                        <th> Subscription Cost </th>
                        <th> Subscription Email </th>
                        <th> Changes </th>
                    </tr>
                </thead>
                <tbody>{subscriptionList()}</tbody>
            </table>
        </div>
    ); 
    // This method will get the records from the database
}