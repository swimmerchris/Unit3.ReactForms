import { useState } from "react";


function Authenticate ({token, setToken}) {
    const [success, setSuccess] = useState(null);
    const [error, setError] = useState(null);
    const [username, setUsername] = useState(null);

    async function handleClick() {
        try {
            const response = await fetch("https://fsa-jwt-practice.herokuapp.com/authenticate", 
            {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                }
            });
            const result = await response.json();
            setSuccess(result.message);
            setUsername(result.data.username);
            console.log(result);
        } catch (err) {
            setError(err.message);
        }
    }
    
    return(
        <div>
            <h2>Authenticate</h2>
            {success && <p>{success}</p> }
            {error && <p>{error}</p> }
            <button onClick={handleClick}>Authenticate Token</button>    
            {username && <h3>Your Username is {username}</h3> }
        </div>
)
};

export default Authenticate;