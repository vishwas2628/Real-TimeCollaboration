import React from 'react'
import Title from '../components/Title.js'

const Update = () => {
  return (
    <div className="container mt-5 justify-content-center align-items-center">
        <Title text1={"Update"} text2={"Document"}/>
        <div className='container d-flex justify-content-center align-items-center'>
        <form className="card border-0 p-4 shadow-sm " style={{ width: '40rem' }}>
          <div className="mb-3">
            <p className="p-2" style={{ color: '#4a5568', fontSize: '1.5rem', fontWeight: 400 }}>Title</p>
          </div>
          <div className="mb-3">
            <label htmlFor="content" className="form-label">Content</label>
            <textarea
              id="content"
              rows="10"
              className="form-control bg-transparent border border-secondary-subtle"
              placeholder="Enter Your Content here..."
              required
            ></textarea>
          </div>
          <div className="mb-3">
            <label htmlFor="comment" className="form-label">Comment</label>
            <input
              type="text"
              id="comment"
              className="form-control bg-transparent border border-secondary-subtle"
              placeholder="Enter Comment"
              required
            />
          </div>
          <button type="submit" className="btn btn-secondary w-100">Update</button>
        </form>
        </div>
    </div>
  )
}

export default Update