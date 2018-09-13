import React from 'react'
import PlacesAutocomplete, { geocodeByAddress, getLatLng } from 'react-places-autocomplete';
import './SearchInput.css';

class SearchInput extends React.Component {
   constructor(props) {
      super(props);  
      this.state = { address: '', location: { lat: '', lng: '' } };
   }

   handleChange = (address) => {
      this.setState({ address })
   }

   handleSelect = (address) => {
      geocodeByAddress(address)
         .then(results => getLatLng(results[0]))
         .then(({lat, lng}) => {
            const location = { lat, lng };
            this.setState({ location, address });
            this.props.selectLocation(location, address);
         })
   }
   render() {

      return (
         <PlacesAutocomplete
            value={this.state.address}
            onChange={this.handleChange}
            onSelect={this.handleSelect}
         >
         {({ getInputProps, suggestions, getSuggestionItemProps }) => (
            <div>
               <input
                  { ...getInputProps({}) }
                  placeholder={this.props.placeholder}
                  className='searchInput'
               />
               <div className='autocompleteDropdown' >
                  {suggestions.map(suggestion => {
                     return (
                        <div
                           className='item' 
                           {...getSuggestionItemProps(suggestion)}>
                           <span
                              className={
                                 suggestion.active 
                                 ? 
                                 'activeSuggestionItem'
                                 :
                                 'suggestionItem' }
                           >
                              {suggestion.description}
                           </span>
                        </div>
                     )
                  })}
               </div>
            </div>
         )}
         </PlacesAutocomplete>
      );
   }
}

export default SearchInput;