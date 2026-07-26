import React from "react"
import "../auth.form.scss"

const Login = () => {

   
  const handleSubmit = (e) =>{
    e.preventdefault() 
  }


  return (
    <main>
      <div className="form-container">
        <h1>Login</h1>
        <form>
          <div className="input-group">
            <label htmlFor="email">Email</label>
            <input
              id="email"
              type="email"
              name="email"
              placeholder="Enter email address"
            />
          </div>

          <div className="input-group">
            <label htmlFor="password">Password</label>
            <input
              id="password"
              type="password"
              name="password"
              placeholder="Enter password"
            />
          </div>

          <button type="submit" className="button primary-button">
            Login
          </button>
        </form>
      </div>
    </main>
  )
}

export default Login



