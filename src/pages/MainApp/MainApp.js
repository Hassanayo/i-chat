import { Link } from "react-router-dom";

export default function MainApp() {
  return (
    <div>
      <div>Hello</div>
      <div>
      <Link to="/login">Login</Link>
      <br/>
      <Link to="/signup">Sign up</Link>
      </div>
    </div>
  )
}
