import React, { Component } from 'react';
import request from 'superagent';
import SearchInput from '../LocationSearch/SearchInput';
import { withStyles } from "@material-ui/core/styles";
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Switch from '@material-ui/core/Switch';
import Input from '../Input/Input';
import './HostSignUp.scss';
import Form from '../Form/Form';
import MDSpinner from 'react-md-spinner';
import _ from 'lodash';
import { BottomButton, BottomArea } from '../../styles';


class SignUp extends Component {
  state = {
    name: '', email: '', 
    location: null, address: '', 
    newsletter: false,
    submitSuccess: false,
    loading: false, error:'',
    errorMessage: {},
    audience:'',
    kidInfo:''
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

  signupAsHost = () => {
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

  signupAsAudience = () => {

    console.log('Signing up as audience: ',this.state);
    this.setState({ loading: true });

    const { name, email, kidInfo, adult, questions, newsletter } = this.state;

    // Error handling
    const obj = {email, kidInfo}; 
    const empty = Object.keys(obj).filter(key => obj[key] === '');

    let newErrorMessage = {};
    empty.forEach(key => {
      newErrorMessage = {
        ...newErrorMessage,
        [key]: `Please fill in your ${key}`
      }
      this.setState({ errorMessage: newErrorMessage})
    })
    
    const data = {
      mainEvent:'Olkkarikekkerit18',
      eventId:this.props.modalParams.id,
      action:'signUpAsAudience',
      eventName:this.props.modalParams.performer.name,
      name,
      email,
      kidInfo, 
      adult, 
      questions,
      newsletter, 
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

    const { name, email, kidInfo, questions, newsletter, roomProps, adult, loading, error, errorMessage, audience,phone } = this.state; 
    const { modalParams, classes } = this.props;

    console.log('Signup: ',modalParams);

    let valid = (email!=='' && kidInfo!=='') ? true : false;

    let additional, description, petInfo, bottomButton;
    switch (modalParams.status.value) {
      case 1:
        description = 'Teitä odottaa hieno kokemus naapurin olohuoneessa! Kerro keitä on tulossa keikalle, niin lähetämme sähköpostilla keikkapaikan osoitteen ja lisätietoja tapahtumasta. Keikalle mahtuu rajallinen määrä katsojia ja valitsemme ensimmäiset ilmoittautuneet.';
        petInfo = modalParams.pets ? <div><b>Huom:</b> Keikkapaikka on lemmikkikodissa, joten tila saattaa allergisoida.</div> : null;
        bottomButton = <BottomButton disabled={!valid} onClick={valid ? this.signupAsAudience : null}>Ilmoittaudu keikalle</BottomButton>;
        additional = (
            <div>
              <Input
                value={phone}
                placeholder='Puhelinnumero'
                onChange={(e) => this.handleChange(e, 'phone')}
                
              />
              <Input
                value={kidInfo}
                placeholder='Lapsen/lasten nimi & ikä (Esim. Aatos 5v, Kerttu 2v)'
                onChange={(e) => this.handleChange(e, 'kidInfo')}
                
              />

              <Input
                value={questions}
                placeholder='Kysymyksiä järjestäjälle?'
                onChange={(e) => this.handleChange(e, 'questions')}
                
              />

              {petInfo}
              
              <section className='newsletter'>
                <span>Huoltaja tulee mukaan keikalle.</span>
                <Switch
                  checked={adult}
                  onChange={(e,checked) => this.handleChange(checked,'adult','checkbox')}
                  color='primary'
                />
              </section>

            </div>
          );
      break;
        
        
      default:
        description = 'Mahtavaa, että avaat ovesi lastenkulttuurille ja siitä kiinnostuneille! Tarvitsemme vähän perustietoja sinusta ja tulevasta esityspaikasta – täytä allaolevat kentät ja saat meiltä piakkoin mailia.';
        bottomButton = <BottomButton disabled={!valid} onClick={valid ? this.signupAsHost : null}>Varaa keikka</BottomButton>;
        additional = (
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
            <section className='newsletter'>
              <span>Olkkarini on vapaana {modalParams.time} ja meillä on tarvittava avoin tila esiintyjälle ( {modalParams.performer.stage} ) ja yleisölle.</span>
              <Switch
                checked={roomProps}
                onChange={(e,checked) => this.handleChange(checked,'roomProps','checkbox')}
                color='primary'
              />
            </section>
          </div> 
        );
    }


    

    return (
      <div style={{marginBottom:'10rem', overflow:'auto',height:'100%'}} onClick={this.props.formClick}>

        <Form
          params={modalParams}
          
          description={description}
          buttonLabel='Sign up as a host'
          name={name} email={email} newsletter={newsletter}
          inputChange={(e, item, type) => this.handleChange(e, item, type)}
          subscribe={value=> this.setState({ newsletter: value})}
          additionalFields={additional}
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
        <BottomArea>
          {bottomButton}
        </BottomArea>
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

export default withStyles(styles)(SignUp);
