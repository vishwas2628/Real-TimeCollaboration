import React from 'react'
import Title from '../components/Title.js'

const AddDoc = () => {
  return (
    <div className="container mt-5 d-flex justify-content-center align-items-center">
      <div>
        <Title text1="Add" text2="Document" />
        <form className="card border-0 p-4 shadow-sm" style={{ width: '40rem' }}>
          <div className="mb-3">
            <label htmlFor="title" className="form-label">Title</label>
            <input
              type="text"
              id="title"
              className="form-control bg-transparent border border-secondary-subtle"
              placeholder="Enter Title"
              required
            />
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
          <button type="submit" className="btn btn-secondary w-100">Add</button>
        </form>
      </div>
    </div>
  )
}

export default AddDoc