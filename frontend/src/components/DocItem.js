import React from 'react'
import { Link } from 'react-router-dom';


const DocItem = ({id, doc, name}) => {
    return (
        <Link
        className="text-decoration-none card border border-secondary mb-3"
        to={`/doc/${id}`}
      >
        <div className="card-body">
          <h5 className="card-title">Title</h5>
          <p className="card-text">
            With supporting text below as a natural lead-in to additional content.
          </p>
          <Link className="btn btn-primary" to='/update'>Update Doc</Link>
        </div>
      </Link>
    )
}

export default DocItem