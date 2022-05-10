import React, { useState } from "react";
import { useNavigate } from "react-router";

export default function Create() {
    const [form, setForm] = useState({
        name: "", 
        cost: "", 
        email: "", 
    }); 

    const navigate = useNavigate(); 

    // update the state properties 

    function updateForm(value){
        return setForm((prev) => {
            return { ...prev, ...value}; 
        }); 
    }

    async function onSubmit(e){
        e.preventDefault(); 

        // When a post request is sent to the create url, we'll add a new subscription object to the database.
        const newSubscription = { ...form}; 

        await fetch("http://localhost:3001/createOne", {
            method: "POST", 
            headers: {
                "Content-Type": "application/json",
            }, 
            body: JSON.stringify(newSubscription),
        })
        .catch(error => {
            window.alert(error)
            return; 
        }); 

        setForm({name: "", cost: "", email: ""}); 
        navigate("/"); 
    }

    return (
        <div>
            <h3> Add a New Subscription</h3>
            <form onSubmit={onSubmit}>
                <div className="form-group">
                    <label htmlFor="name"> Subscription Name</label>
                    <input 
                    type= "text"
                    className="form-control"
                    id="name"
                    value={form.name}
                    onChange={(e) => updateForm({ name: e.target.value})}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="cost"> Price of Subscription</label>
                    <input 
                    type= "text"
                    className="form-control"
                    id="cost"
                    value={form.cost}
                    onChange={(e) => updateForm({ cost: e.target.value})}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="email"> Email used for subscription</label>
                    <input 
                    type= "text"
                    className="form-control"
                    id="email"
                    value={form.email}
                    onChange={(e) => updateForm({ email: e.target.value})}
                    />
                </div>
                <div className="form-group"> 
                <input 
                    type= "submit"
                    value= "create subscription"
                    className="btn btn-primary"
                /> 
                </div>
            </form>
        </div>
    ); 
}