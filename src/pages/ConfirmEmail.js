import "./Auth.css";

function ConfirmEmail() {
  return (
    <div className="container-signup">
      <h1 className="title">Confirm Your Email</h1>
      <p>
        We’ve sent a confirmation email to .
      </p>
      <p>
        Please check your inbox and follow the instructions to complete the
        verification process.
      </p>
      <p>
        If you don’t see the email, check your spam or junk folder—it might have
        landed there by mistake.
      </p>
    </div>
  );
}

export default ConfirmEmail;
