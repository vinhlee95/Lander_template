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
  }

  closeModal = () => {
    this.stopBodyScrolling(false);
     this.setState({ showModal: false });
  }


  hideSnackbar = () => this.setState({ submitSuccess: false });


  render() {
    const { showModal, submitSuccess, agent, modalParams } = this.state;
    return (
      <div className="App">

        <Header data={{
				rightMenu: [
					{title:'Backstage', url:'submenu:gigle'},
					{title:'Login', url:'testilinkki'}
				],
				leftMenu:[
					{title:'Tilaa esitys', url:'linkki'},
					{title:'Tietoa Giglestä', attr_title:'submenu:gigle'}
				],
				subMenus: {
					gigle:[
						{title:'Blogi', url:'linkki2'},
						{title:'Giglen missio', url:'linkki2'},
						{title:'Tiimi', url:'linkki2'},
						{title:'Ota yhteyttä', url:'linkki2'},
					]
				}
			}} />
      
      <Intro
        
      />

      
      
      <Title>Esitykset</Title>

      <ItemList 
        agent={agent} 
        onItemClick={ (itemData) => {
          console.log(itemData)
          this.showModal(itemData);
         
        }}
      />

      <Title>Mitä ihmettä, ilmaiseksi?</Title>
      <InfoSection>
        <InfoSectionImage style={{backgroundImage:'url(./static/lapset.jpg)'}} />
        <InfoSectionText>
      <Ingress>Olkkarikekkerit! -keikkasarja naapurin olohuoneessa tuo yhteen naapuruston lapsia. Vuoden pimeimpänä aikana olohuoneiden nurkissa nähdään erilaisia upeita elämyksiä mm. tanssia, teatteria ja musiikkia.</Ingress>

<p>Keikoille ovat tervetulleita naapuruston lapset ja esitykset ovat suunnattu 5-7-vuotiaille. Keikkapaikan voi tarjota kuka tahansa, joka on valmis avaamaan kotinsa ovet naapureille ja tarjoamaan muutaman neliömetrin nurkan esitykselle sekä tilaa noin 15-20 lapsen yleisölle. </p>

<p>Giglen ammattitaitoinen henkilökunta on mukana koko keikan ajan, ohjaamassa lapsia, avustamassa esiintyjää ja pitämässä huolen siitä että perintövaasit eivät tipu hyllyltä.
Valitsemme kodit tilan puitteiden ja sijainnin mukaan. Toivomme että keikkoja nähdään eri puolilla Helsinkiä. Yleisön ilmoittautuminen keikoille alkaa lokakuussa.</p>

<p>Keikkasarja toteutetaan Helsingissä marras-joulukuussa 2018. Ilmoittaudu olkkariksi 15. lokakuuta mennessä. Valituille olohuoneille ilmoitetaan viikon 42 aikana. Yleisöilmoittautuminen alkaa 30. lokakuuta. Järjestämme tapahtuman yhteistyössä Alli Paasikiven säätiön kanssa. </p>

      </InfoSectionText>
      </InfoSection>

      <Footer 
					data={{
						
						leftMenu:[
							{title:'Tilaa esitys', url:'linkki'},
							{title:'Tietoa Giglestä', attr_title:'submenu:gigle'}
						],
						subMenus: {
							gigle:[
								{title:'Blogi', url:'linkki2'},
								{title:'Giglen missio', url:'linkki2'},
								{title:'Tiimi', url:'linkki2'},
								{title:'Ota yhteyttä', url:'linkki2'},
							]
						},
						footerMenu:[
							{title:'Käyttöehdot', url:'linkki2'},
							{title:'Mediapankki', url:'linkki2'},
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
