import React from 'react'

const Components = () => {
  return (
    <div className='flex m-auto justify-center align-center'>
     <form action="">
        {/* <h1 className='text-center text-5xl font-bold mb-6'>Create Account</h1> */}
        <div className='flex justify-center align-center'>
            <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-xs border p-4">
              <legend className="fieldset-legend text-2xl font-bold text-center">SignUp</legend>

               <label className="label">Name</label>
              <input type="text"  required className="input" placeholder="Name" />

              <label className="label">Email</label>
              <input type="email" required className="input" placeholder="Email" />

              <label className="label">Password</label>
              <input type="password" required className="input" placeholder="Password" />

              <label className="label">Confirm Password</label>
              <input type="password" required className="input" placeholder="Confirm Password" />

              <button className="btn btn-neutral mt-4">SignUp</button>

              <p className="mt-4 text-center">
                Already have an account? <a className="link text-blue-600 font-bold"  href="/login">Login</a>
              </p>
            </fieldset>
        </div>
     </form>
    </div>
  )
}

export default Components
