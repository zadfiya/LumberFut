import React from 'react';
import Footer from './Footer'
import Header from './Header'
const layout = (props)=>(
    <>
        <Header/>
        <div>
            {props.children}
        </div>
        <Footer/>
    </>
)
export default layout;