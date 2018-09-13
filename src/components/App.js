import React, { Component } from 'react';
import HostSignUp from './HostSignUp/HostSignUp';

import Header from './header/Header';
import Footer from './footer/Footer';
import Intro from './Intro/Intro';
import './App.scss';
//import PerformerList from './Performer/PerformerList';
import ItemList from './ItemList/ItemList';
import Modal from './Modal/Modal';

import { Snackbar } from '@material-ui/core';
import { IoIosClose } from 'react-icons/io';
import NodeAgent from './NodeAgent';


class App extends Component {
  state = {
    showModal: false,
    submitSuccess: false,
    agent: new NodeAgent()
  }


  submitSuccess = () => {
    this.setState({ showModal: false, submitSuccess: true });
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
        handleOpenModal={() => this.setState({ showModal: true })}
      />

      {
        showModal
        ?
        <HostSignUp
          submitSuccess={this.submitSuccess}
// <<<<<<< HEAD
          closeModal={() => this.setState({ showModal: false })}
          modalShow={showModal}
// =======
//           formClassName={showModal ? 'form form-show' : 'form form-hide'}
//           modalParams={modalParams}
// >>>>>>> 0d9178f9c6e36f8cadd82f595538cc52836f7b05
        />
        : 
        null
      }
      
      <ItemList 
        agent={agent} 
        onItemClick={ (itemData) => this.setState({showModal:true, modalParams:itemData})}
      />
      

      {
        submitSuccess
        ?
        <Snackbar
          open={submitSuccess}
          // autoHideDuration={2000}
          onClose={this.hideSnackbar}
          message={
            <span className='snackbar-message'>
              Congratulations! You have successfully registered as a host!
            </span>}
          action={
            <IoIosClose 
              color='red' size={30} 
              onClick={this.hideSnackbar}
              style={{ cursor: 'pointer'}} 
            />
          }
          className='snackbar'
        />
        : null
      }

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
