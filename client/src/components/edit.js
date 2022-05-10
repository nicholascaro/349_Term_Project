import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router";

export default function Edit() {
    const [form, setForm] = useState({
        name: "", 
        cost: "", 
        email: "", 
        records: [],
    }); 

    const params =  useParams(); 
    const navigate = useNavigate(); 

    useEffect(() => {
        async function fetchData() {
            const id = params.id.toString(); 
            const responce = await fetch(`http://localhost:3001/getOne/${params.id.toString()}`); 

            if (!responce.ok){
                const message = `Error occured: ${responce.statusText}`
                window.alert(message); 
                return; 
            }

            const subscription = await responce.json(); 
            if (!subscription){
                window.alert(`Subscription with id ${id} not found`); 
                navigate("/"); 
                return; 
            }

            setForm(subscription); 
        }

        fetchData(); 

        return; 
    }, [params.id, navigate]); 


    // functions will be used to update the subscription properties
    function updateForm(value) {
        return setForm((prev) => {
            return { ...prev, ...value}; 
        }); 
    }

    async function onSubmit(e) {
        e.preventDefault(); 
        const editedSubscription = {
            name: form.name, 
            cost: form.cost,
            email: form.email,
        }; 

        await fetch(`http://localhost:3001/updateOne/${params.id}`, {
            method: "POST", 
            body: JSON.stringify(editedSubscription), 
            headers:{
                "Content-Type": "application/json"
            }, 
        });

        navigate("/"); 
    }

    // this form is where the user will provide input to update the object

    return (
        <div>
            <h3> Update Subscription Details</h3>
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

                <br /> 

                <div className="form-group"> 
                    <input 
                        type = "submit"
                        value = "Update Subscription"
                        className="btn btn-primary"
                    />
                </div>
            </form>
        </div>
    ); 
}