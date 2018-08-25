import React, {Component} from 'react'
import styled from 'styled-components'
import {colors} from "../utils/const";
import Input from '../components/Input'
import Button from "../components/Button";
import LogoImage from '../assets/images/logo_jfvr_orange.png'
import { GoogleMap, Marker ,withGoogleMap, withScriptjs} from "react-google-maps"
import {connect} from "react-redux";
import PlacesActions from '../reducers/places.reducer'

const StartWrapper = styled.div`
width: 100%;
height: 100%;
background-color: ${colors.white};
display: flex;
flex-direction: row;

`

const StartContainer = styled.div`
display: flex;
width: 315px;
height: 100%;
justify-content: flex-start;
align-items: flex-start;
flex-direction: column;
background-color: ${colors.darkpurple};
`

const MapContainer = styled.div`
display: flex;
flex: 1;
height: 100%;
justify-content: center;
align-items: center;
flex-direction: column;
`

const StartInputContainer = styled.div`
display: flex;
width: 100%;
padding: 10px;
flex-direction: column;
`

const Logo = styled.img`
  margin-top: 40px;
  width: 100%;
  height: 130px;
  object-fit: contain;
  margin-bottom: 20px;
`
const Text = styled.h2`
  color: ${colors.white};
  margin-top: 50px;
  font-weight: 300;
`

const MyMapComponent = withScriptjs(withGoogleMap((props) =>{
    console.log(props.latOrigin)
    console.log(props.lngOrigin)
    console.log(props.latDestination)
    console.log(props.lngDestination)
    return(
        <GoogleMap
            defaultZoom={13}
            defaultCenter={{ lat: 4.624335, lng: -74.063644 }}
        >
            <Marker position={{ lat: props.latOrigin, lng: props.lngOrigin }} />
            <Marker position={{ lat: props.latDestination, lng: props.lngDestination }} />
        </GoogleMap>
    )
    }

))



class Start extends Component{

    componentWillReceiveProps(nextProps){
        if(nextProps.placesOriginData.length > 0 && this.props.placesDestinationData.length > 0) {

        }
    }

    render(){

        return(
            <StartWrapper>
                <StartContainer>
                    <Logo
                        src={LogoImage}
                    />
                    <StartInputContainer>
                        <Input
                            placeholder={'Lugar de inicio'}
                            onChange={(event) => {
                                this.props.setKeywordOrigin(event.target.value)
                            }}/>
                        <Input
                            placeholder={'Lugar de destino'}
                            onChange={(event) => {
                                this.props.setKeywordDestination(event.target.value)
                            }}/>
                        <Button
                            onClick={() => {
                                this.props.placesOrigin()
                                this.props.placesDestination()
                            }}>
                            {'Buscar'}
                        </Button>

                        <Text>
                            {`Tiempo: ${this.props.directionsData.routes && this.props.directionsData.routes.length > 0 ? this.props.directionsData.routes[0].legs[0].duration.text : '--'}`}
                        </Text>
                        <Text>
                            {`Distancia: ${this.props.directionsData.routes && this.props.directionsData.routes.length > 0  ? this.props.directionsData.routes[0].legs[0].distance.text : '--'}`}
                        </Text>

                    </StartInputContainer>
                </StartContainer>
                <MapContainer>
                    <MyMapComponent
                        latOrigin={this.props.placesOriginData.length > 0 ? this.props.placesOriginData[0].geometry.location.lat : 0.0}
                        lngOrigin={this.props.placesOriginData.length > 0 ? this.props.placesOriginData[0].geometry.location.lng : 0.0}
                        latDestination={this.props.placesDestinationData.length > 0 ? this.props.placesDestinationData[0].geometry.location.lat : 0.0}
                        lngDestination={this.props.placesDestinationData.length > 0 ? this.props.placesDestinationData[0].geometry.location.lng : 0.0}
                        isMarkerShown
                        googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyDxbFXNECkoRKjJr3f0L2fqSGVYcP_cQiA&v=3.exp&libraries=geometry,drawing,places"
                        loadingElement={<div style={{ height: `100%`, width: `100%` }} />}
                        containerElement={<div style={{ height: `100%`, width: `100%`  }} />}
                        mapElement={<div style={{ height: `100%` }} />}
                    />
                </MapContainer>
            </StartWrapper>
        )
    }
}


/* Container */
const mapStateToProps = state => ({
    directionsData: state.places.get('directionsData'),
    placesOriginData: state.places.get('placesOrigin'),
    placesDestinationData: state.places.get('placesDestination'),
    keywordOrigin: state.places.get('keywordOrigin'),
    keywordDestination: state.places.get('keywordDestination'),
})

const mapDispatchToProps = dispatch => ({
    directions: () => dispatch(PlacesActions.directions()),
    placesOrigin: () => dispatch(PlacesActions.placesOrigin()),
    placesDestination: () => dispatch(PlacesActions.placesDestination()),
    setKeywordOrigin: keyword => dispatch(PlacesActions.setKeywordOrigin(keyword)),
    setKeywordDestination: keyword => dispatch(PlacesActions.setKeywordDestination(keyword)),
})

export default connect(mapStateToProps, mapDispatchToProps)(Start)
