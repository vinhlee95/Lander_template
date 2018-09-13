import React, { Component } from 'react';
import Header from './header/Header';
import Footer from './footer/Footer';
import Intro from './Intro/Intro';
import './App.scss';
import ItemList from './ItemList/ItemList'
import Modal from './Modal/Modal';

import { Snackbar } from '@material-ui/core';
import { IoIosClose } from 'react-icons/io';
import NodeAgent from './NodeAgent';


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
      
      <ItemList 
        agent={agent} 
        onItemClick={ (itemData) => {
          console.log(itemData)
          this.setState({showModal:true, modalParams:itemData});
        }}
      />


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
