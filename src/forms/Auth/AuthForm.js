import { Component } from "react";
import { AuthFormLayout } from "../../components/Auth/AuthFormLayout";
import { AuthInput } from "../../components/Auth/AuthInput";
import { GoogleAuthButton } from "../../components/Auth/GoogleAuthButton";
import axios from "axios";

export class AuthForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      success: "",
      emailError: "",
      passwordError: "",
    };
  }

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleSubmit = async (e) => {
    e.preventDefault();
    const { email, password } = this.state;
    const { apiEndpoint } = this.props;

    try {
      const response = await axios.post(apiEndpoint, { email, password });
      this.setState({ success: response.data.message, errors: [] });

      console.log(`${this.props.mode} response:`, response.data);
    } catch (error) {
      if (error.response) {
        const messages = Array.isArray(error.response.data.message)
          ? error.response.data.message
          : [error.response.data.message];

        let emailError = "";
        let passwordError = "";

        messages.forEach((msg) => {
          if (msg.toLowerCase().includes("email")) {
            emailError = msg;
          } else if (msg.toLowerCase().includes("password")) {
            passwordError = msg;
          }
        });

        this.setState({ emailError, passwordError });
      }
    }
  };

  render() {
    const { email, password, emailError, passwordError } = this.state;
    const { title, bottomText, showForgotPassword } = this.props;

    return (
      <AuthFormLayout title={title} bottomText={bottomText}>
        <form onSubmit={this.handleSubmit}>
          <AuthInput
            type="text"
            name="email"
            placeholder="Email"
            value={email}
            onChange={this.handleChange}
            error={emailError}
          />
          <AuthInput
            type="password"
            name="password"
            placeholder="Password"
            value={password}
            onChange={this.handleChange}
            error={passwordError}
          />
          {showForgotPassword && <p className="p-forgot">Forgot Password?</p>}
          <button type="submit" className="btn btn-continue">
            Continue
          </button>
        </form>
        <GoogleAuthButton />
      </AuthFormLayout>
    );
  }
}
