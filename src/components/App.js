import React, { Component } from 'react';
//import Header from './header/Header';
//import Footer from './footer/Footer';

import Intro from './Intro/Intro';
import './App.scss';
import ItemList from './ItemList/ItemList'
import Modal from './Modal/Modal';
import { Header, Footer } from 'gigle-webcomponents';
import { Snackbar } from '@material-ui/core';
import { IoIosClose } from 'react-icons/io';
import NodeAgent from './NodeAgent';
import { Title, Subtitle, Ingress, InfoSection, InfoSectionImage, InfoSectionText } from './styles';



class App extends Component {
  state = {
    showModal: false,
    submitSuccess: false,
    agent: new NodeAgent(),
    modalParams: null,
  }


  submitSuccess = () => {
    this.setState({ showModal: false, submitSuccess: true });
  }

  showModal = (itemData)=>{
    this.stopBodyScrolling(true);
    this.setState({showModal:true,modalParams:itemData});
    window.Tawk_API.hideWidget();
  }

  closeModal = () => {
    this.stopBodyScrolling(false);
     this.setState({ showModal: false });
     window.Tawk_API.showWidget();
  }


  hideSnackbar = () => this.setState({ submitSuccess: false });


  render() {
    const { showModal, submitSuccess, agent, modalParams } = this.state;
    return (
      
      <div className="App">

        <Header data={{
    				rightMenu: [
    					{title:'Giglen esiintyjille', url:'/backstage'},
    				],
    				leftMenu:[
    					{title:'Tilaa esitys', attr_title:'submenu:categories', mobile_visible:true},
    					{title:'Tietoa Giglestä', attr_title:'submenu:gigle'}
    				],
    				subMenus: {
    					gigle:[
    						{title:'Blogi', url:'/blog'},
                {title:'Kokemuksia', url:'/kokemuksia'},
                {title:'Tiimi', url:'/tiimi'},
                {title:'UKK', url:'/ukk'},
                {title:'UKK esiintyjille', url:'/ukk-esiintyjille'},
    					],
              categories:[
                {"title":"Yritystapahtuma",url:'/?tg=tag_10'},
                {"title":"Lasten synttärit",url:'/?tg=tag_2'},
                {"title":"Perhejuhla",url:'/?tg=tag_3'},
                {"title":"Illanvietto",url:'/?tg=tag_4'},
                {"title":"Yleisötilaisuus",url:'/?tg=tag_5'}
              ]
    				}
  			}} 
      />
      
      <Intro
        
      />

      
      <Title>Tulevat esitykset</Title>
      
      <ItemList 
        agent={agent} 
        onItemClick={ (itemData) => {
          console.log(itemData)
          this.showModal(itemData);
         
        }}
      />

      <Title>Ilmoittaudu keikalle!</Title>
      <InfoSection>
        
        <InfoSectionText>
      <Ingress>Olkkarikekkereiden keikkailmoittautumiset ovat alkaneet - tervetuloa mukaan yleisöön! Keikat järjestetään ympäri Helsinkiä mm. Sörnäisissä, Munkkiniemessä, Laajasalossa sekä Kruunuvuorenrannassa. </Ingress>

      <p>Keikat on suunnattu naapuruston 5-7-vuotiaille lapsille ja ilmoittautuminen tapahtumaan onnistuu klikkaamalla esiintyjän kuvaa yllä.  Jokaisen esiintyjän kohdalle on määritelty tarkempi naapurusto sekä mainittu onko keikkapaikalla lemmikkieläimiä.</p><p>Vahvistus ilmoittautumisesta ja tarkemmat ohjeet & osoitteet lähetetään sähköpostiisi lähempänä keikkapäivää. Keikat kuvataan ja myös yleisöstä otettuja kuvia saatetaan käyttää joko Giglen tai Alli Paasikiven säätiön viestinnässä. Paikkoja on rajoitettu määrä ja tunnelma on tiivis! Tervetuloa!</p>

      </InfoSectionText>

      </InfoSection>
     

      <Title>Mitä ihmettä, ilmaiseksi?</Title>
      <InfoSection>
        <InfoSectionImage style={{backgroundImage:'url(./static/lapset.jpg)'}} />
        <InfoSectionText>
      <Ingress>Olkkarikekkerit! -keikkasarja tuo yhteen naapuruston lapsia eri puolilla Helsinkiä. Vuoden pimeimpänä aikana olohuoneiden nurkissa nähdään erilaisia upeita elämyksiä mm. teatteria, musiikkia ja sirkusta (kenties maailman pienintä).</Ingress>

<p>Keikoille ovat tervetulleita naapuruston lapset ja esitykset ovat suunnattu 5-7-vuotiaille. Keikkapaikan voi tarjota kuka tahansa, joka on valmis avaamaan kotinsa ovet naapureille ja tarjoamaan muutaman neliömetrin nurkan esitykselle sekä tilaa noin 15-20 lapsen yleisölle. </p>

<p>Giglen ammattitaitoinen henkilökunta on mukana koko keikan ajan, ohjaamassa lapsia, avustamassa esiintyjää ja pitämässä huolen siitä että perintövaasit eivät tipu hyllyltä.
Valitsemme kodit tilan puitteiden ja sijainnin mukaan. Toivomme että keikkoja nähdään eri puolilla Helsinkiä. Yleisön ilmoittautuminen keikoille alkaa lokakuussa.</p>

<p>Keikkasarja toteutetaan Helsingissä marras-joulukuussa 2018. Järjestämme tapahtuman yhteistyössä Alli Paasikiven säätiön kanssa. </p>

      </InfoSectionText>
      </InfoSection>

      <Footer 
					data={{
						
						leftMenu:[
							{title:'Tilaa esitys', url:'/'},
							{title:'Tietoa Giglestä', attr_title:'submenu:gigle'}
						],
						subMenus: {
							gigle:[
								{title:'Blogi', url:'/blog'},
								{title:'Kokemuksia', url:'/kokemuksia'},
								{title:'Tiimi', url:'/tiimi'},
								{title:'UKK', url:'/ukk'},
                {title:'UKK esiintyjille', url:'/ukk-esiintyjille'},
                
							]
						},
            footerMenu:[
              {title:'Käyttöehdot', url:'/kayttoehdot'},
              {title:'Tietosuojaseloste', url:'/tietosuojaseloste'}
            ]
					}}
				/>   
        {
        showModal
        ?
        <Modal 
          agent={agent}
          modalShow={showModal}
          handleCloseModal={this.closeModal}
          state='showDescription'
          modalParams={modalParams}
           >
        </Modal>
        : 
        null
      }
      </div>

    );
  }

  stopBodyScrolling = (bool) => {
      if (bool === true) {
        window.document.body.style.overflowY='hidden';
      } else {
          window.document.body.style.overflowY='visible';
      }
  }
  
}

export default App;
