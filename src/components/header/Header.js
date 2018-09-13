import React from 'react';
import './Header.css';
import Glyphicon from 'react-bootstrap/lib/Glyphicon';
import classNames from 'classnames';

export default class Header extends React.Component {
	constructor(props){
		super(props);
		this.setItemAction=this.setItemAction.bind(this);
		this.openSubmenu=this.openSubmenu.bind(this);
		this.state={ isTop: true }
	}
	componentDidMount() {
    document.addEventListener('scroll', () => {
      const isTop = window.scrollY < 100;
      if (isTop !== this.state.isTop) {
          this.setState({ isTop })
      }
    });
  }

	render(){
		
		console.log('Rendering header',this.props);
		console.log('Rendering header, state',this.state);
		let leftMenu, leftMenu_mobile, rightMenu, subMenus, currentSubmenu;

		subMenus=[];
		if (this.props.data) {
			
			// render leftMenu
			if (this.props.data.leftMenu) {
				leftMenu=[];
				leftMenu_mobile=[];

				// leftMenu:[
				// 	{title:'Tilaa esitys', url:'linkki'},
				// 	{title:'Tietoa Giglestä', attr_title:'submenu:gigle'}
				// ],
				
				this.props.data.leftMenu.forEach((item)=>{
					let onClick = this.setItemAction(item.attr_title, item.url);

					// render submenu icon only when the item has attr_title
					let submenuIcon = item.attr_title ? <Glyphicon className='gigle-header-leftMenu-itemIcon' glyph='menu-down' /> : null;

					// render leftMenu-item
					let itemHtml=<div className='gigle-header-leftMenu-item' key={item.url} onClick={onClick}>{item.title}&nbsp;{submenuIcon}</div>;
					leftMenu.push( itemHtml );

					// render items with attr_title only in mobile screen size
					if (item.attr_title) if(item.attr_title.split(':')[0]!=='submenu') leftMenu_mobile.push( itemHtml );
				});

				this.props.data.leftMenu.map(item => {
					let onClick = this.setItemAction(item.attr_title, item.url);
					let submenuIcon = item.attr_title ? <Glyphicon className='gigle-header-leftMenu-itemIcon' glyph='menu-down' /> : null;
					return leftMenu = (
						<div 
							className='gigle-header-leftMenu-item'
							key={item.url}
							onClick={onClick} >
							{item.title}&nbsp;{submenuIcon}
						</div>
					);
					
				});
			}
			
			// renderRightMenu
			if (this.props.data.rightMenu) {
				rightMenu=this.props.data.rightMenu.map((item)=>{
					let onClick = this.setItemAction(item.attr_title, item.url);
					return <div className='gigle-header-rightMenu-item' key={item.url} onClick={onClick}>{item.title}</div>;
				});
			}
			
			// render subMenus
			if (this.props.data.subMenus) {
				console.log('submenu: ',this.props.data.subMenus[this.state.subMenu]);
				
				Object.keys(this.props.data.subMenus).forEach((key)=>{
					this.props.data.subMenus[key].forEach((item)=>{
						let onClick = this.setItemAction(item.attr_title, item.url);
						subMenus.push(<div key={item.title} className='gigle-header-leftMenu-item' onClick={onClick}>{item.title}</div>);
					});
				});
				
				// render subMenu
				if (this.state.subMenu) {
					if (this.props.data.subMenus[this.state.subMenu]!=null) {
					
						currentSubmenu =this.props.data.subMenus[this.state.subMenu].map((item)=>{
							let onClick = this.setItemAction(item.attr_title, item.url);
							return <div key={item.title} className='gigle-header-leftMenu-item' onClick={onClick}>{item.title}</div>;
						});
					}
				}  
			}
		}
		
		let staticItems;
		return(
			<div className={this.state.isTop ? 'gigle-header-container-top' : 'gigle-header-container' }>
				<div className='gigle-header'>
					<div className='gigle-header-left'>
						<img className='gigle-logo' src='/static/logo_marker.png' onClick={()=>window.open('/','_self')} />
						<div className={classNames('gigle-header-leftMenu',{active:this.state.menuActive})}>
							{leftMenu}
						</div>
					</div>
					
					<div className={classNames('gigle-header-rightMenu',{active:this.state.menuActive})}>
						{rightMenu}
						{staticItems}
					</div>
					{/* hamburger icon */}
					<div className='gigle-header-menuIcon-mobile' onClick={()=>this.setState({menuActive: !this.state.menuActive})}>
						<div className={classNames("hamburger hamburger--squeeze",{'is-active':this.state.menuActive})}>
						  <span className="hamburger-box">
						    <span className="hamburger-inner"></span>
						  </span>
						</div>
					</div>
				</div>

				<div className='gigle-header-underlay' />
				<div className={classNames('gigle-header-mobileMenu',{'active':this.state.menuActive})}>
						{leftMenu_mobile}
						{subMenus}
						{rightMenu}
					</div>
				<div className={classNames('gigle-header-subMenu',{'active':this.state.subMenu})}  onMouseOut={()=>this.hideSubmenu(true)} onMouseOver={()=>this.hideSubmenu(false)}>
						{currentSubmenu}
					</div>
			
			</div>
		);
		
	}
	
	hideSubmenu(hide){
		if (hide) {
			this.hideDelay=setTimeout(()=>this.setState({subMenu:null}), 1000);
		} else {
			clearTimeout(this.hideDelay);
		}
	}
	
	setItemAction(attr, url) {
		let action;
		// case: when leftItem contains attr_title
		if (attr) {
			let split = attr.split(':');
			if(split[0] === 'submenu') {
				action = () => this.setState({ subMenu: split[1]})
			}
		} else {
			action= ()=>window.open(url,'_self');
		}
		return action;
	}
	
	openSubmenu(menuId) {
		console.log('Opening sub menu: '+menuId);
	}
}


