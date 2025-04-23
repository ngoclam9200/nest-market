import "./form-send-mail.scss";

const FormSendEmail = () => {
  return (
    <>
      <form className="form-subcriber d-flex">
        <input type="email" placeholder="Your emaill address" />
        <button className="btn" type="submit">
          Subscribe
        </button>
      </form>
    </>
  );
};
export default FormSendEmail;
