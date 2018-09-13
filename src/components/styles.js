import styled, { css } from 'styled-components';

const sizes = {
  big: 1200,
  desktop: 1000,
  tablet: 768,
  phone: 576,
}

// Iterate through the sizes and create a media template
const media = Object.keys(sizes).reduce((acc, label) => {
  acc[label] = (...args) => css`
    @media (max-width: ${sizes[label] / 16}em) {
      ${css(...args)}
    }
  `

  return acc
}, {})

const ListContainer = styled.div`
	position:relative;
	width:90%;

	margin: 2rem auto;
  	display: flex;
  	flex-wrap: wrap;
  	justify-content: center;

  	
  	
  	
`;

const ItemContainer = styled.div`

  position:relative;
  display: flex;
  justify-content: space-between;
  flex-direction:column;
  padding: .5rem;
  margin: 0.25%;
  width:16%;
  min-height: 300px;
  max-height:600px;

  border: 1px #cccccc solid;
  &:first-child { margin-left: 0; }
  &:last-child { margin-right: 0; }

  cursor: pointer;

  &:hover {
  	transform: translateY(-5px);
	border: 1px green solid;
  }

  transition: all .2s ease;

  /* Now we have our methods on media and can use them instead of raw queries */
  ${media.big`width:20%; `}
  ${media.desktop`width:28%; `}
  ${media.tablet`width:28%; `}
  ${media.phone`width:40%; `}
`;


const ItemImageRow = styled.div`
	flex:5;
	background:#dddddd;
	background-size: cover;
	background-position: center;
		
`;
const ItemDescriptionRow = styled.div`
	
	position:relative;
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	align-items: center;
	padding: 0 .5rem;
	
`;

const ItemTitle = styled.div`
	padding:.5rem;
	font-size:1.3rem;
	position:relative;	
`;

const ItemDescription = styled.div`
	font-size:1rem;
	position:relative;
`;

const ItemButton = styled.div`
	margin-top:.5rem;
	font-size:1.2rem;
	padding: 1rem .5rem;
	width: 100%;
	background: green;
	color: white;
	text-align: center;
	position:relative;	
`;


const HeroImage = styled.div`
	position:relative;
	border-radius: 10px 10px 0 0;
	background:#dddddd;
	background-size: cover;
	background-position: top center;
	height: 50vh;
`;

const HeroTitle = styled.div`
  position:absolute;
  bottom: 0;
	width:100%;
	text-align:center;
	font-size:1.5rem;
  color: black;
  background-color: rgba(255,255,255, .9);
  padding: 5px 0;
  margin-bottom: 5px;
`;


export {
	ItemContainer,
	ItemImageRow,
	ItemDescriptionRow,
	ListContainer,
	ItemTitle,
	ItemDescription,
	ItemButton,
	HeroImage,
	HeroTitle,
	
}