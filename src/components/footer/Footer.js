import React from 'react';
import './Footer.css';
import Icon from "../IconComponent.js"
import ICONS from "../ICONS.js"

import request from 'superagent';
import Glyphicon from 'react-bootstrap/lib/Glyphicon';
import classNames from 'classnames';
import {Input, Validator} from 'gigle-basemodules';


import '../../../node_modules/gigle-basemodules/build/css/index.css';

//const SERVER_URL = "http://localhost:8080/"; // dev
const SERVER_URL = 'https://gigle-app.appspot.com/';

export default class Footer extends React.Component {
	
	constructor(props){
		super(props);
		this.state={
		}
		if (this.props.data.exitIntent) {
			document.addEventListener("mouseleave", function(e){
			    if( e.clientY < 0 )
			    {
			         alert("Hey don't leave. I have an free eBook for you");
			    }
        }, false);
		}
	}
		
	render(){	
    console.log('hello')
		let newsletter, menuLinks, rawMenus;
		let version = this.props.data.siteVersion ? 'Gigle v'+this.props.data.siteVersion+' by ' : '';
		let year = (new Date()).getFullYear();
		
		rawMenus = this.props.data.subMenus.gigle.concat(this.props.data.footerMenu);
		menuLinks=rawMenus.map((item)=>{
			return <div className='footer-link' key={item.title} onClick={()=>window.open(item.url,'_self')}>{item.title}</div>
		});
		
		
		return(
			<div ref='footer' className='gigle-footer' >
				<div className='footer-row'>
					<div className='footer-col'>
						<NewsletterSubscription 
						/>
					</div>
					<div className='footer-col'>
						<div className='footer-col-title'>Yritys</div>
						{menuLinks}
					</div>
					<div className='footer-col'>						
						<div className='footer-col-title'>Seuraa Gigleä</div>
						<SomeLink label='Gigle facebookissa' icon={ICONS.FACEBOOK} link='https://www.facebook.com/gigleapp' />
						<SomeLink label='Gigle twitterissä' icon={ICONS.TWITTER} link='https://twitter.com/gigleapp' />
						<div className='footer-hline' />
						<div className='footer-col-title'>Yhteistyössä</div>
						<div className='footer-partners'>
							<div><a href='https://www.kopiosto.fi/avek' target='_blank' alt='Yhteistyökumppanina Avek, Audiovisuaalisen Kulttuurin Edistämiskeskus'><img className='footer-partnerLogo' src='https://gigleapp.com/static/avek-logo.jpg' /></a></div>
							<div><a href='http://www.allipaasikivensaatio.com/' target='_blank' alt='Yhteistyökumppanina Alli Paasikiven säätiö'><img className='footer-partnerLogo' src='https://gigleapp.com/static/alli-logo.png' /></a></div>
						</div>
					</div>

					
				</div>
				<div className='footer-bottomtext'>
				{version}Gigle Oy {year}<br/>
				
				
				</div>
				
			</div>		
		);
		
	}
}

const SomeLink = (props) => (
 <div className='footer-somelink' onClick={()=>window.globals.changePage(props.link,true,true)}>
 	<div className='footer-somelink-icon'><Icon icon={props.icon} height='2rem' width='2rem'/></div>
 	<div className='footer-somelink-label'>{props.label}</div>
 </div>
);

// render newsLetter
class NewsletterSubscription extends React.Component {
	constructor(props){
		super(props);
		this.valueChanged=this.valueChanged.bind(this);
		let validator=new Validator({
			email:{value:'', valid:false}
		});
		this.state={
			validator: validator
		}
	}
	// subscribe to newsletter
	subscribeNews = () => {
		console.log('subscribing: '+SERVER_URL+'contact');
		this.setState({newsletterState:'sending'});
		let o = {
			contactType: 'newsletterSubscription',
			email:this.state.validator.value('email'),
			roles:'basic'
		}
		
		let self = this;
		// connect to API
		request
		  .post(SERVER_URL+'contact')
		  .send(o)
		  .set('Accept', 'application/json')
		  .end(function(err, res){
		    // Calling the end function will send the request
		    if (err) {
			    console.error('Error subscribing to newsletter', err);
			    request
				  .post(SERVER_URL+'slack')
				  .send({
					  channel: 'users',
					  message:'Testing: '+o.email
				  })
				  .set('Accept', 'application/json')
				  .end(function(err, res){
				    // Calling the end function will send the request
				    self.setState({newsletterState:'subscribed'})
				    if (err) {
					    console.error('Error subscribing to newsletter', err);
				    } else {
					    console.log("Posted error message to slack",res);
				    }
				   
				});
		    } else {
			    console.log("Subscribed",res);
			    self.setState({newsletterState:'subscribed'})
		    }
		   
		});

	}
	
	valueChanged(e){
		console.log('changed: ',e.target);
		
		switch (e.target.id){
			case 'email':
			this.state.validator.validateEmail('email',e.target.value,3);
			break;
			default:
			break;
		}
				
		this.setState({validator:this.state.validator});
	}

	
	render(){
		
	let newsletter, validation;
	// programmatically render newsletter
	// sending case: async
	switch (this.state.newsletterState) {
			case 'sending':
				newsletter=<div className='footer-col centered'>Lähetetään...</div>
			break;
			
			// when user already successfully subscribed
			case 'subscribed':
				newsletter=<div className='footer-col'>
					<div className='footer-col-title'><Glyphicon className='inline-glyph green' glyph='ok'/>&nbsp; Uutiskirje tilattu.</div>
					<div>Kiitos mielenkiinnostasi! Halutessasi voit peruuttaa tilauksen jokaisen sähköpostin alareunassa olevalla linkillä.</div>
				</div>
			break;
			
			// when user not yet provided email
			default:
				// check whether the email is valid
				let valid = this.state.validator.allValid();
				let buttonLabel = (valid) ? 'Tilaa Giglen uutiskirje' : 'Tilaamalla uutiskirjeemme saat tietoa tulevista tapahtumista ja yhteistyöprojekteistamme. Emme spämmäile turhaan, emmekä jaa osoitettasi muille.';		
				let subscribe = (valid) ? this.subscribeNews : null;
				let emailButton = <div className={classNames('gui-basicButton', {'disabled': !valid})} onClick={subscribe}>{buttonLabel}</div>;
				
				newsletter=<div className='footer-col'>
							<div className='footer-col-title'>Haluatko hyvällä otteella kirjoitettua tietoa Giglen kuulumisista, ilmaiskeikoista, esitystaiteen tilasta?</div>
							<div>
								<div 
									onClick={()=>this.setState({newsletterSelected:true})}>
									<Input 
										name='email'
										type='text'
										value={this.state.validator.value('email')}
										placeholder='nimi@osoite.com'
										valid={this.state.validator.valid('email')}
										handleChange={this.valueChanged}
										onTouch={()=>this.setState({focused:'email'})}
									/>

							        {emailButton}
								</div>
							</div>
						</div>
			break;
		}
	
	 return newsletter;		
	}
}







		
