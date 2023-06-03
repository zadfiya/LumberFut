import React from 'react';
import Footer from './Footer'
import Header from './Header'
import LayoutCss from './Layout.module.css'
const layout = (props)=>(
    <>
        <Header/>
        <div className={LayoutCss.center}>
            {props.children}
        </div>
        <Footer/>
    </>
)
export default layout;