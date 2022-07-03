import React, { useState, useMemo, useEffect, lazy, Suspense } from 'react';
import './sass/main.scss';
import Header from './containers/Header/Header';
import Toolbar from './containers/Toolbar/Toolbar';
import Layout from './containers/Layout/Layout';
import Preview from './containers/Preview/Preview';
import TopThree from './components/TopThree/TopThree';
import Brand from './containers/Brand/Brand';
import Info from './containers/Info/Info';
import Checkout from './containers/Checkout/Checkout';
import OrderSummary from './containers/OrderSummary/OrderSummary';
import About from './containers/About/About';
import Faq from './components/Faq/Faq';
import Artical from './components/Artical/Artical';
import VestigeOrders from './components/VestigeOrders/VestigeOrders';
import CountryAlert from './components/Backdrop/Alert/CountryAlert/CountryAlert';
import { Route, Switch } from "react-router-dom";
import * as action from './store/actions/index';
import * as actionTypes from './store/actions/actionTypes';
import { connect } from 'react-redux';
import axios from 'axios';
import { act } from '@testing-library/react';

// Lazy Loading...
const Parfum = lazy(() => import('./pages/Parfum'))
const Catalogue =lazy(() => import('./pages/Catalogue'))

const App = props => {

  const [country, setContry] = useState(null);
 
  useEffect(() => {
     props.updateStateFromLocalStorage(country);
    }, [props.cartUpdated])

    useEffect(() => {
      setContry(localStorage.getItem('country'))
    }, [country])


    
    // CHANGE THE PRICE
  useEffect(() => {
      axios.get('https://vestige-2172c.firebaseio.com/serbiaPerfums.json')
      .then(res => {
        
        const extracted = Object.values(res.data);
        const key = Object.keys(res.data);
        
        extracted.forEach((cur, ind) => {
          console.log(cur)
              cur.price.big.price = '0';
              cur.price.big.discount = '0';
             
              axios.patch(`https://vestige-2172c.firebaseio.com/serbiaPerfums/${key[ind]}.json`, cur)
            
        })
 


      })
      .catch(err => console.log(err))
  }, [])

  useEffect(() => {
    axios.get('https://vestige-2172c.firebaseio.com/serbiaPerfums.json')
    .then(res => {
      
      const extracted = Object.values(res.data)[0];
      const key = Object.keys(res.data);
      
      extracted.articalID = 654646
      extracted.bought = 120
      extracted.brand = 'Creed'
      extracted.description = ``
      extracted.names.UI = `Aventus`
      extracted.names.img = `creed-aventus-big`
      extracted.names.route = `/parfem/Creed/aventus`
      extracted.notes = ['']
      extracted.price.big.discount = '0'
      extracted.price.big.price = '0'
      extracted.price.medium.discount = '2400'
      extracted.price.medium.price = '3800'
      extracted.sex = 'men'

      

      //axios.post('https://vestige-2172c.firebaseio.com/perfums.json', extracted)
      .then(() => {
         console.log('SENT')
      })
      .catch(error => console.log(error))
  })

    .catch(err => console.log(err))
}, [])

  
  return (
    <Suspense fallback={<div style={{
      height: '100vh', textAlign: 'center'
    }}>Stranica se učitava...</div>}>
        <div className="App">
          <Switch>
          <Route exact path="/" render={(props) => {
            return <Layout route={props} >
                      <CountryAlert />
                      <Header route={props} country={country} />
                      <Info />
                      <Preview country={country} route={props}/>
                      <TopThree route={props}/>
                      <Brand />
                  </Layout>
          }} />

            <Route strict path="/parfem/:id" render={(props) => {
              return <Layout route={props}>
                        <Parfum route={props}/>
                    </Layout>
            }} />

      
        <Route exact path="/originalni-testeri-:id/page=:id" render={(props) => {
                  return <Layout route={props}>
                              <Catalogue country={country} route={props}/>
                        </Layout>
                }} />

        <Route exact path="/muški-testeri-:id/page=:id" render={(props) => {
                      return <Layout route={props}>
                                  <Catalogue country={country} route={props}/>
                            </Layout>
                    }} />

        <Route exact path="/ženski-testeri-:id/page=:id" render={(props) => {
                      return <Layout route={props}>
                                  <Catalogue country={country} route={props}/>
                            </Layout>
                    }} />

        <Route exact path="/checkout" render={(props) => {
                          return <Layout route={props}>
                                    <Info />
                                    <Checkout route={props}/>
                                </Layout>
                        }} />

        <Route exact path="/order-summary" render={(props) => {
                              return <Layout route={props}>
                                        <OrderSummary />
                                    </Layout>
                            }} />

        <Route exact path="/about" render={(props) => {
                                  return <Layout route={props}>
                                            <About />
                                        </Layout>
                                }} />
          <Route exact path="/faq" render={(props) => {
                                  return <Layout route={props}>
                                            <Faq />
                                        </Layout>
                                }} />

<Route exact path="/artical" render={(props) => {
                                  return <Layout route={props}>
                                            <Artical />
                                        </Layout>
                                }} />

<Route exact path="/vestige-orders" render={(props) => {
                                  return <VestigeOrders />
                                }} />
          </Switch>
        </div>
    </Suspense>
  );
}

const mapStateToProps = state => {

  console.log(state.country)

  return {
    cartOpen: state.cartOpen,
    cartUpdated: state.cartUpdated,
    countryAlert: state.countryAlert,
    country: state.country,
  }
}

const mapDispatchToProps = dispatch => ({
  updateStateFromLocalStorage: () => dispatch(action.addToCart()),
  updateCart: () => dispatch(action.updateCart()),
})

export default connect(mapStateToProps, mapDispatchToProps)(App);
