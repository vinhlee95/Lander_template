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
            let itemData=items[key];
  					return <ListItem data={ itemData } onClick={ ()=>this.props.onItemClick(itemData)} />
  				})
  			}
  		</ListContainer>

  	);
  }

}

const ListItem = props => {

	console.log('Props: ',props);
  let label;
  let status = props.data.status.value || 0;
  switch (status) {
    case 1:
      label='Tule keikalle';
    break;

    case 2:
      label='Täynnä';
    break;

    default:
      label='Tilaa keikka';
    break;
  }
 
	return (
		<ItemContainer onClick={props.onClick}>
			<ItemImageRow style={{backgroundImage:'url('+props.data.performer.image+')'}} />
			
			<ItemDescriptionRow>
				<ItemTitle>{props.data.performer.name}</ItemTitle>
				<ItemDescription>{props.data.time}</ItemDescription>
				<ItemButton>{label}</ItemButton>
			</ItemDescriptionRow>
		</ItemContainer>
	);
}





	

