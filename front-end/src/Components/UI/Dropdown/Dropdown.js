import React from 'react';

import styles from './Dropdown.module.css';

function Dropdown(props){
    return(
        <div className={`${styles['dropdown']} ${props.className}`}>
            {props.children}
        </div>
    );
}

export default Dropdown;