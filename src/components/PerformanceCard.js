import React from 'react';
import {Card, ProductTitle, Tag, TagGroup} from 'gigle-basemodules';

class PerformanceCard extends React.Component {
	
	clickedTag(data,e){
		
		console.log('Clicked tag: ',data);
		e.preventDefault();
		e.stopPropagation();
	}
	
	render(){
		
		let tags=[
			{type:'duration',title:`${this.props.duration} mins` , id:'tag_1'},
			{type:'performers',title: this.props.performers, id:'tag_1'},
		
		];
		
		return(
			<div className='gigle-card-product-content'>
				<ProductTitle 
					product={{
						performerData:{
							name:this.props.performerName,
							icon:this.props.performerIcon
						},
						title:this.props.title
					}} />
				<TagGroup 
					tags={tags}
					onClick={this.clickedTag}
				/>				
				<div className='gigle-card-product-pricetag'>{this.props.price}</div>
			</div>	
		);
		
	}
}

export default Card(PerformanceCard);