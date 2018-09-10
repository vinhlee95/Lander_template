import React, { Component } from 'react';
import Header from './header/Header';
import Footer from './footer/Footer';
import Intro from './Intro/Intro';
import './App.scss';
import PerformerList from './Performer/PerformerList';
import Modal from './Modal/Modal';
import { Snackbar } from '@material-ui/core';
import { IoIosClose } from 'react-icons/io';


class App extends Component {
  state = {
    showModal: false,
    submitSuccess: false
  }


  submitSuccess = () => {
    this.setState({ showModal: false, submitSuccess: true });
  }

  hideSnackbar = () => this.setState({ submitSuccess: false });


  render() {
    const { showModal, submitSuccess } = this.state;
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
          handleCloseModal={() => this.setState({ showModal: false })}
          submitSuccess={this.submitSuccess}
          formClassName={showModal ? 'form form-show' : 'form form-hide'}
        />
        : 
        null
      }
      

      <PerformerList />

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
