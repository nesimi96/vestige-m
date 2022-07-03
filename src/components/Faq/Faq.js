import React from 'react';
import '../../sass/main.scss';

const Faq = () => {
    return <div className="Faq" >
              <div className="Faq-question">
                   <h4>- Kako naručiti?</h4>
                   <p>Narudžbe vršite tako što dodate artikal u korpu. Kada završite sa dodavanjem artikala u korpu, otvorite korpu (gordnji desni ugao) i kliknete gumb <b>"Nastavi"</b>. Zatim unesete svoje podatke koje forma zahtijeva i pritisnete gumb <b>"POŠALJI"</b> i uspješno ste završili kupovinu. </p>
              </div>
              <div className="Faq-question">
                    <h4>- Kako funkcionišu dostava i plaćanje?</h4>
                    <p> Plaćate pouzećem. Dostavu vršimo u saradnji sa firmom koja je zadužena za brzu dostavu: <b> "X-Express" </b>. Rok isporuke: 24-48 sati. Ukoliko dostava kasni, mi ne odgovaramo jer mi ne možemo ništa promijeniti i utjecati na situaciju. Primaoc ima pravo otvoriti paket, ukoliko bude nepravilnosti(oštećenje i sl.) primaoc može izvršiti povrat i novac će biti vraćen.</p>
              </div>
              <div className="Faq-question">
                    <h4>- Da li su testeri originalni i kakva je ambalaža? </h4>
                    <p> Mi prodajemo isključivo originalne testere od pravih proizvođača. Ambalaže su također originalne. </p>
              </div>
              <div className="Faq-question">
                    <h4> Imam popust ali kada otvorim korpu nije izračunat popust u ukupnu cijenu? </h4>
                    <p> Popust se izračunava jedino na <b>"Checkout-u".</b> </p>
              </div>
    </div>
} 

export default Faq;