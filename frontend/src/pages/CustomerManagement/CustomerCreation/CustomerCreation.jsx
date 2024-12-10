import React from 'react'
import TopBar from './TopBar/TopBar'
import CustomerForm from './CustomerForm/CustomerForm'
import { Paper } from '@mui/material'

const CustomerCreation = () => {
  return (
    <div>
      <TopBar />
      <Paper sx={{marginTop: "40px", width: "55%", marginLeft: "20rem"}}>
        <CustomerForm />
      </Paper>
    </div>
  );
}

export default CustomerCreation