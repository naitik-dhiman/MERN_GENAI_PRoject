
import React from "react"
import "../auth.form.scss"

function Register(){
  

  const handleSubmit = (e) =>{
    e.preventDefault() 
  }
 
 return (
    <main>
      <div className="form-container">
        <h1>Register</h1>
        <form onSubmit={handleSubmit}>


           <div className="input-group">
            <label htmlFor="username">Username</label>
            <input
              id="username"
              type="text"
              name="username"
              placeholder="Enter username"
            />
          </div>
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
            Register 
          </button>
        </form>
      </div>
    </main>
  )
}


export default Register 