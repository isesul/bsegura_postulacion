import Login from "./Login";

export default function Header() {


return (
  <header className="d-flex flex-wrap justify-content-center py-3 mb-4">
    <a href="/" className="d-flex align-items-center mb-3 mb-md-0 me-md-auto link-body-emphasis text-decoration-none">
      <svg className="bi me-2" width="40" height="32"><use xlinkHref="#bootstrap"></use></svg>
      <span className="fs-4">Users Administrator App</span>
    </a>

    <ul className="nav nav-pills">
      <li className="nav-item"><a href="#" className="nav-link active" aria-current="page">User List</a></li>
      <li className="nav-item"><a href="#" className="nav-link">Create New User</a></li>

      <li className="nav-item dropdown"> <Login /> </li>
    </ul>
  </header>
)

}