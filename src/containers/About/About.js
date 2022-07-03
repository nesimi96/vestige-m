import React from 'react';
import '../../sass/main.scss';

const About = () => {
    return <about>
              <div className="About">
                   <div className="About-text">
                       <p>U Vestige vjerujemo da bi ljepota trebala biti dostupna svima jer ona pridonosi samopouzdanju i mijenja na bolje. Kada se ljudi osjećaju dobro, lakše postižu svoje ciljeve, a zauzvrat čine ljepšim svijet oko sebe. Uvijek se trudimo u ponudi imati najprikladnije proizvode za vas. </p>
                       <p>Naš cilj je, u isto vrijeme, dostaviti proizvode što sigurnije i što brže. Sve proizvode imamo na zalihama, a zahvaljujući našoj tehnologiji, odličnim vještinama upravljanja našeg logističkog i distribucijskog centra, vaša narudžba će biti isporučena u najkraćem mogućem roku. Naše parfeme možete naručiti putem društvenih mreža Facebook i Instagram. </p>
                        <p>Vestige smatra svakog svog klijenta jedinstvenim, zato se trudimo da svakom našem klijentu pružimo ljubav koju nosimo do naših proizvoda, usluge i stučnosti, kako bi to postala zajednička strast.  Zadovoljstvo kupaca je za nas uvijek bilo i uvijek će biti na prvom mjestu.</p>
                   </div>
                   <div className="About-img">
                       <div className="About-img-logo">
                            <img  src={require(`../../assets/images/logo.png`)}/>
                       </div>
                      <img  src={require(`../../assets/images/about.jpg`)}/>
                   </div>
              </div>
          </about >
}

export default About