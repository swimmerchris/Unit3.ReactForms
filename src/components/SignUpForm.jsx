import { useState } from "react";

function SignUpForm ({setToken}) {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(null);
    const [usernameError, setUsernameError] = useState(null);
    const [passwordError, setPasswordError] = useState(null);

    async function handleSubmit (event) {
        event.preventDefault();
        
        if (username.length < 8) {
            setUsernameError("INPUT ERROR: Your Username needs to be longer than 8 characters")
        } else if (password.length <8) {
            setUsernameError(null);
            setPasswordError("INPUT ERROR: Your Password needs to be longer than 8 characters")
        } else {
            try {
                const response = await fetch('https://fsa-jwt-practice.herokuapp.com/signup', {
                        method: 'POST',
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({
                            username: username,
                            password: password,
                        })
                    }
                )
                const result = await response.json();
                setToken(result.token);
                setUsernameError(null);
                setPasswordError(null);
            } catch (error) {
                setError(error);
            }
        }
    }


    return(
        <div className="signup">
            <h2>Sign Up</h2>
            {error && <p>{error}</p>}
            <form onSubmit={handleSubmit}>
                <label>
                    Username: <input value={username} onChange={(e) => setUsername(e.target.value)}/>
                </label>
                <label>
                    Password: <input value={password} onChange={(e) => setPassword(e.target.value)}/>
                </label>
                <button id="formButton">Submit</button>
            </form>
            {usernameError && <p id="error">{usernameError}</p>}
            {passwordError && <p id="error">{passwordError}</p>}
        </div>
        
    )
};

export default SignUpForm;