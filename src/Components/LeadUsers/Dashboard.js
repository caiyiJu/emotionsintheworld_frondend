import React, {Fragment} from "react";
import LeadsForm from "./LeadForm";
import Leads from "./Leads";



export default function Dashboard(){

  return(

    <div className="container">
      <Fragment >
        <div className="row row-list justify-content-center">
          <div  className="row move_form-userForm col-xl-12">
            <LeadsForm />
          </div>
          <div className="row move_list-userForm" >
            <Leads />
          </div>
        </div>
      </Fragment>
    </div>
  )
}