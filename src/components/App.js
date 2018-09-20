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
  closeModal = () => this.setState({ showModal: false });

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
        handleOpenModal={() => this.setState({ showModal: true })}
      />

      {
        showModal
        ?
        <Modal 
          modalShow={showModal}
          handleCloseModal={this.closeModal}
          state='showDescription'
          modalParams={modalParams}
           >
        </Modal>
        : 
        null
      }
      
      <Title>Esitykset</Title>
      <Subtitle>Näppärä alaotsikko</Subtitle>
      <ItemList 
        agent={agent} 
        onItemClick={ (itemData) => {
          console.log(itemData)
          this.setState({showModal:true, modalParams:itemData});
        }}
      />

      <Title>Mitä ihmettä, ilmaiseksi?</Title>
      <InfoSection>
        <InfoSectionImage style={{backgroundImage:'url(./static/lapset.jpg)'}} />
        <InfoSectionText>
      <Ingress>Olkkarikekkerit! -keikkasarja naapurin olohuoneessa tuo yhteen naapurustoa lapsille suunnattujen keikkojen muodossa.</Ingress><p>Vuoden pimeimpänä aikana olohuoneiden nurkissa nähdään erilaisia elämyksiä mm. tanssia, sirkusta, teatteria ja musiikkia.
Tuomme laadukkaita esityksiä lapsiperheiden koteihin, jotta voimme luoda kohtaamisia ihmisten välille tutussa ympäristössä ja lähentää lähialueiden perheitä. Lapsiperheiden kohtaaminen lisää yhteisöllisyyden tuntua. Toisen olohuoneeseen astuminen lähentää perheitä ja madaltaa kynnystä pyytää apua tai vaikka vain leikkiseuraa vanhemmalle ja lapselle.</p>
<p>“Kahden lapsen äitinä pohdin usein sitä miten ystävyydet syntyvät ja miten esimerkiksi lapsiperheet solahtavat osaksi yhteisöä esimerkiksi muuton vuoksi. Olemme huomanneet että yhteinen, intiimi taide-elämys lähentää ja tuo yhteistä puhuttavaa niin yksityisjuhlissa kuin työpaikan bileissäkin. Toivomme, että yhteisen jaetun elämyksen avulla madalletaan kynnystä kutsua naapurin pieni tyttö tai poika kylään myös tulevaisuudessa, tapahtumasarjan päätyttyä”, sanoo Giglen toimitusjohtaja Inkeri Borgman.
</p><p>Keikoille ovat tervetulleita naapuruston lapset ja esitykset ovat suunnattu 5-7-vuotiaille. Keikkapaikan voi tarjota kuka tahansa, joka on valmis avaamaan kotinsa ovet naapureille ja tarjoamaan muutaman neliömetrin nurkan esitykselle sekä tilaa noin 15-20 lapsen yleisölle. Keikkasarja toteutetaan Helsingissä marras-joulukuussa 2018. Järjestämme tapahtuman yhteistyössä Alli Paasikiven säätiön kanssa.</p>
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
      </div>
    );
  }
}

export default App;
