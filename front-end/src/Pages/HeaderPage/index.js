import React from "react";
import Header from "../../Components/Header/Header";
import NavBar from "../../Components/Header/NavBarComponent/NavBarComponent";

function HeaderPage(props){

    return(
        <div>
            <Header companyDetails={props.companyDetails} profileDetails={props.profileDetails} type={props.type}/>
            <div className="mt-1">
                <NavBar type={props.type}/>
            </div>
        </div>
    );
}

export default HeaderPage;
