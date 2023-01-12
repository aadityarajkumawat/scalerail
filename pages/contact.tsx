export default function Contact() {
  return (
    <form
      style={{ display: "flex", flexDirection: "column", width: "300px" }}
      action="https://formsubmit.co/arkumawat78@gmail.com"
      method="POST"
    >
      <input type="hidden" name="_captcha" value="false"></input>
      <input type="hidden" name="_next" value="http://localhost:3000"></input>
      <input type="text" name="name" placeholder="Name" required />
      <input type="email" name="email" placeholder="Email" required />
      <textarea name="featues" placeholder="Features" required />
      <button type="submit">Send</button>
    </form>
  );
}
