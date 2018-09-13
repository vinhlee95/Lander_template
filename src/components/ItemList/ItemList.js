/* 
	ItemList
*/

import React, { Component } from 'react';
import { ListContainer, ItemContainer, ItemImageRow, ItemDescriptionRow,ItemTitle, ItemDescription, ItemButton } from '../styles';



export default class ItemList extends Component {
  
  state = {
    test: 'Jepa'
  }

  componentDidMount(){
  	console.log('Mounted NodeAgent.',this.props);
  	let agent = this.props.agent;
  	if (agent) {
  		agent.request('/gig',{
  			action:'getEvent',
  			eventId:'Olkkarikekkerit18'
	  	}, reply => {
	  		console.log('Got reply: ',reply);
        this.setState({items:reply.data.items});
	  	});
  	} else console.warn ('ItemList: No agent provided!');
  	
  }

  render(){

  	const { test, items } = this.state; console.log(items)

  	if (!items) return null;

  	return (
  		<ListContainer>
  			{ 
  				Object.keys(items).map( key => {
  					return <ListItem data={ items[key] } onClick={ ()=>this.props.onItemClick(items[key])} />
  				})
  			}
  		</ListContainer>

  	);
  }

}

const ListItem = props => {

	// console.log('Props: ',props);
 
	return (
		<ItemContainer onClick={props.onClick}>
			<ItemImageRow style={{backgroundImage:'url('+props.data.performer.image+')'}} />
			
			<ItemDescriptionRow>
				<ItemTitle>{props.data.performer.name}</ItemTitle>
				<ItemDescription>{props.data.time}</ItemDescription>
				<ItemButton>Jepa</ItemButton>
			</ItemDescriptionRow>
		</ItemContainer>
	);
}





	

