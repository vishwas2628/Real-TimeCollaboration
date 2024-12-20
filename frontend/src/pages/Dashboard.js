import React from 'react'
import Title from '../components/Title.js'
import { Link } from 'react-router-dom'
import DocItem from '../components/DocItem.js'

const Dashboard = () => {
  return (
    <div className="container mt-5 justify-content-center align-items-center">
      <div className="d-flex justify-content-between align-items-center w-100">
        <div style={{ flex: 1 }}>
          <Title text1={"Dash"} text2={"board"} />
        </div>
        <Link to="/add" className="btn btn-success mt-2">Add Doc</Link>
      </div>
      <div className="flex-grow-1 mt-3">
        <div className="row gx-4 gy-3">
            <div className="col-6 col-md-4 col-lg-3">
              <DocItem/>
            </div>
            <div  className="col-6 col-md-4 col-lg-3">
              <DocItem/>
            </div>
            <div  className="col-6 col-md-4 col-lg-3">
              <DocItem/>
            </div>
        </div>
      </div>









    </div>
  )
}

export default Dashboard