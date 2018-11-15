/* 
	ItemList
*/
import moment from 'moment';
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
        let items=reply.data.items;
        let itemArr=[];
        if (items) { Object.keys(items).map( key => { 
          items[key].id=key;
          itemArr.push(items[key]); });  
        }
        itemArr.sort(compare);
        this.setState({items:itemArr});
	  	});
  	} else console.warn ('ItemList: No agent provided!');
  	
  }

  

  

  render(){

  	const { test, items } = this.state; console.log(items)

  	if (!items) return null;

  	return (
  		<ListContainer>
  			{ 
  				items.map( itemData => {
            //let itemData=items[key];
            //itemData.id=key;
  					return <ListItem key={itemData.id} data={ itemData } onClick={ ()=>this.props.onItemClick(itemData)} />
  				})
  			}
  		</ListContainer>

  	);
  }

}

const ListItem = props => {

	console.log('Props: ',props);
  let label, address;
  let status = props.data.status.value || 0;
  switch (status) {
    case 1:
      label='Tule keikalle';
      address=<ItemDescription>{props.data.area}</ItemDescription>
    break;

    case 2:
      label='Tulossa pian';
    break;

    default:
      label='Ilmoittaudu olkkariksi';
    break;
  }
 
	return (
		<ItemContainer onClick={props.onClick}>
			<ItemImageRow style={{backgroundImage:'url('+props.data.performer.image+')'}} />
			
			<ItemDescriptionRow>
				<ItemTitle>{props.data.performer.name}</ItemTitle>
				<ItemDescription>{props.data.time}</ItemDescription>
        {address}
				<ItemButton>{label}</ItemButton>
			</ItemDescriptionRow>
		</ItemContainer>
	);
}

// hackish sorting based on item time. :)

const compare = (a,b) => {
   
    let a1 = a.time.split(',')[0].split('.');
    let aStr=a1[2]+twoDigits(a1[1])+twoDigits(a1[0]);
    let b1 = b.time.split(',')[0].split('.');
    let bStr=b1[2]+twoDigits(b1[1])+twoDigits(b1[0]);

    
    if (parseInt(aStr) < parseInt(bStr))  return -1;
    else return 1;
    
  }

const twoDigits = (n) => {
    return ("0" + n).slice(-2);
    
  }


	

