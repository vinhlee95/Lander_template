import React, { Component } from 'react';
import request from 'superagent';
import SearchInput from '../LocationSearch/SearchInput';
import { withStyles } from "@material-ui/core/styles";
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import './HostSignUp.scss';
import Form from '../Form/Form';
import MDSpinner from 'react-md-spinner';
import _ from 'lodash';
import { BottomButton } from '../../styles';

class AudienceSignUp extends Component {
  state = {
    name: '', email: '', 
    location: null, address: '', 
    newsletter: false,
    submitSuccess: false,
    loading: false, error:'',
    errorMessage: {},
    audience:''
  }

  


  handleChange = (e, item, type) => {
    
    console.log('PARAMS: ',this.props.modalParams)
    let value;
    switch (type) {
      case 'checkbox':
        value=e;
      break;

      default:
        value=e.target.value;
      break;
    }
    
    this.setState({ 
      [item]: value, 
      error: '',
      errorMessage: {
        ...this.state.errorMessage,
        [item]: ''
      }

    });

  }

  selectLocation = (location, address) => {
    this.setState({ location, address });
    if(address !== '') {
      this.setState({
        errorMessage: {
          ...this.state.errorMessage,
          address: ''
        }
      })
    }
  }

  signup = () => {
    this.setState({ loading: true });
    const { name, email, location, address, newsletter, audience } = this.state;

    // Error handling
    const obj = {name, email, address}; 
    const empty = Object.keys(obj).filter(key => obj[key] === '');

    let newErrorMessage = {};
    empty.forEach(key => {
      newErrorMessage = {
        ...newErrorMessage,
        [key]: `Please fill in your ${key}`
      }
      this.setState({ errorMessage: newErrorMessage})
    })
    const addarr = address.split(',');

    // get specific address elements
    const street = addarr.slice(0, 1).toString();
    const city = addarr.slice(addarr.length -2, addarr.length -1).toString();
    const country =addarr.slice(addarr.length -1, addarr.length).toString();
    
    const data = {
      mainEvent:'Olkkarikekkerit18',
      eventId:this.props.modalParams.id,
      action:'signUpAsHost',
      name,
      email,
      location,
      address,
      street, city, country, 
      newsletter,
      audience,
      error: '',
    }

    let agent = this.props.agent;
    if (agent) {
      agent.request('/gig',data, reply => {
        console.log('Got reply: ',reply);
        if (reply.error) return this.setState({ error: 'Please make sure that you have filled in all necessary information above', loading: false });
       this.props.submitSuccess();
      });
    } else console.warn ('ItemList: No agent provided!');

    
  }

  render() {
    const { name, email, newsletter, roomProps, loading, error, errorMessage, audience } = this.state; 
    const { modalParams, classes } = this.props;

    let locationSearch = (
      <div>
      <SearchInput
        placeholder='Osoite (Helsingissä)'
        selectLocation={(location, address) => this.selectLocation(location, address)}
        disabled={loading}
      />
      <FormControl className={classes.formControl}  >
          <InputLabel htmlFor="audience">Yleisön määrä (maksimi, lapset)</InputLabel>
          <Select 
            autoWidth={true}
            value={this.state.audience}
            onChange={(e)=>this.handleChange(e,'audience')}
            inputProps={{
              name: 'audience',
              id: 'audience',
            }}
          >
            <MenuItem value={10}>10</MenuItem>
            <MenuItem value={15}>15</MenuItem>
            <MenuItem value={20}>20</MenuItem>
            <MenuItem value={25}>25</MenuItem>
            <MenuItem value={30}>30</MenuItem>
            <MenuItem value='30+'>Enemmän kuin 30</MenuItem>
          </Select>
          <FormHelperText>Huomaa, että lasten mukana tulee aikuinen tai pari, jotka hengaavat esityksen aikana enimmäkseen tilan takanurkissa.</FormHelperText>
        </FormControl>
      </div>
    )

    let valid = (name && email && roomProps && audience!=='') ? true : false;

    return (
      <div onClick={this.props.formClick}>
        <Form
          params={modalParams}
          
          description={`Mahtavaa, että avaat ovesi lastenkulttuurille ja siitä kiinnostuneille! Tarvitsemme vähän perustietoja sinusta ja tulevasta esityspaikasta – täytä allaolevat kentät ja saat meiltä piakkoin mailia.`}
          buttonLabel='Sign up as a host'
          name={name} email={email} newsletter={newsletter}
          inputChange={(e, item, type) => this.handleChange(e, item, type)}
          subscribe={value=> this.setState({ newsletter: value})}
          additionalFields={}
          signup={this.signup}
          loading={
            loading
            ?
            <MDSpinner size={40} singleColor='green' className='spinner' />
            :
            null
          }
          error={
            error
            ?
            <p style={{ textAlign: 'center', color: 'red'}}>{error}</p>
            : null
          }
          errorMessage={errorMessage}
          inputDisabled={loading}
        />
        <BottomButton disabled={!valid} onClick={valid ? this.signup : null}>Varaa keikka</BottomButton>
      </div>
    )
  }
}

const styles = {
    formControl: {
      margin: '.5rem 0',
      fullWidth: true,
      backgroundColor: "white",
      display: "flex",
      wrap: "nowrap",
      zIndex:200000000000
    }
  };

export default withStyles(styles)(AudienceSignUp);
