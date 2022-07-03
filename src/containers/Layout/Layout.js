import React from 'react';
import Toolbar from '../Toolbar/Toolbar';
import Footer from '../Footer/Footer';

const Layout = (props) => {

   return <React.Fragment>
              <Toolbar route={props.route} />
              { props.children }
              <Footer route={props.route} />
        </React.Fragment>
}

export default Layout;