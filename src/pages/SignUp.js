import { Component } from "react";
import "./SignUp.css";

export class SignUp extends Component {
    render() {
        return (
            <div>
                <h1 class="h1-bookly">BOOKLY</h1>
                <div class="container-signup">
                    <h2 class="h2-signup">Signup</h2>
                    <p class="p-start">to get start</p>
                    <input class="input-signup" type="text" placeholder="Email" />
                    <br />
                    <input class="input-signup" type="text" placeholder="Password" />
                    <br />
                    <button class="btn btn-continue">Continue</button>
                    <button class="btn btn-google">Sign up with Google <img src="/google-icon.svg" alt="Icon" class="btn-icon" /></button>
                    <p class="p-login">Already registered? <a><b>Login</b></a></p>
                </div>
            </div>
        )
    }
}
