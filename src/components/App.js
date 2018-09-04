import React, { Component } from 'react';
import Header from './header/Header';
import Footer from './footer/Footer';
import Intro from './Intro/Intro';
import Button from './Button/Button';
import './App.scss';
import PerformerList from './Performer/PerformerList';


class App extends Component {
  render() {
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
      
      <Intro />
      <div className='button-group'>
        <Button
          label='Ilmoittaudu olkkariksi'
          subLabel='Kutsu essintyjä jä yleisöä kotikeikalle'
        />
        <Button
          label='Tule keikalle'
          subLabel='Käy kylässä ja nauti lastenesityksestä'
        />
      </div>

      <PerformerList />

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
