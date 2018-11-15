import styled, { css, keyframes } from 'styled-components';

const sizes = {
  big: 1400,
  desktop: 1200,
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

const Centered = styled.div`
	
	display: flex;
	flex-direction: ${props => props.row ? props.row : 'column'};
	flex-wrap: wrap;
	justify-content: center;
	align-items: center;	
	text-align: ${props => props.textAlign ? props.textAlign : 'left'};
	padding: ${props => props.padding ? props.padding : '1rem'};
`;

const Title = styled.div`
	width: 100%;
	padding: 3rem 0 1rem 0;
	text-align: center;
	font-size: 2rem;
	font-weight: bold;	
`;

const Subtitle = styled.div`
	width: 100%;
	margin-top: -1rem;
	margin-bottom: 1rem;
	text-align: center;
	font-size: 1.2rem;
	
`;

const Ingress = styled.p`
	font-size: 1.1rem;
	font-weight: 800;
	
`;

const BgImage = styled.div`
	background:#dddddd;
	background-size: cover;
	background-position: top center;
	
`;

const InfoSection= styled.div`
	position:relative;
	display: flex;
	width: 90%;
	margin: 0 auto;
	${media.phone,media.tablet`
		flex-direction:column; 
		width: 100%;

	`}
`;

const InfoSectionImage= styled(BgImage)`
	position:relative;
	flex: 1;
	margin: 2rem;
	min-height:60vh;
`;

const InfoSectionText= styled.div`
	position:relative;
	flex: 1;
	padding: 2rem;
`;

const ListContainer = styled.div`
	position:relative;
	width:90%;

	margin: 0 auto;
  	display: flex;
  	flex-wrap: wrap;
  	justify-content: center;

  	${media.phone`
		width:100%;

	`}
  	
  	
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

const BottomArea = styled.div`
	background: white;
	position: fixed;
	background: white;
	margin: 0;
	width: 50%;
	left: 25%;
	display: block;
	
	bottom: 6vh;
	padding: 1rem 0;
	text-align: center;
	${media.big`width:60%; left: 20%;`}
	  ${media.desktop`width:70%; left: 15%; `}
	  ${media.tablet`width:80%; left: 10%; `}
	  ${media.phone`
	    width:96%;  left: 2%;
	    bottom: 0;
	  `}
`;

const BottomButton = styled.div`
  background: ${props => props.disabled ? '#cccccc' : 'green'};
  color: white;
  text-align: center;
  position: relative;
  margin: 0 auto;
  width: 90%;
  padding: 1rem;
  
  display:flex;
  flex-wrap: wrap;
  justify-content:center;
  align-items:center;
  font-size: 1.3rem;
  border-radius: .5rem;
  opacity: ${props => props.disabled ? '.6' : '1'};
  cursor:  ${props => props.disabled ? 'default' : 'pointer'};

  &:hover {
    opacity: ${props => props.disabled ? '.6' : '.8'};

    
  }

  

   transition: all .2s ease;

`;




/* Animations */
const appear = keyframes`
  from {
  	opacity:0;
    transform: scale(.75,.75);
  }

  to {
  	opacity:1;
    transform: scale(1,1);
  }
`;



export {
	media,
	appear,
	Centered,
	Title,
	Subtitle,
	Ingress,
	ItemContainer,
	ItemImageRow,
	ItemDescriptionRow,
	ListContainer,
	ItemTitle,
	ItemDescription,
	ItemButton,
	InfoSection,
	InfoSectionImage, 
	InfoSectionText,
	BottomArea,
	BottomButton 
}