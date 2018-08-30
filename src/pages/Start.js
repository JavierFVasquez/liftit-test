import React, {Component, Fragment} from 'react'
import styled from 'styled-components'
import {colors} from "../utils/const";
import Input from '../components/Input'
import Button from "../components/Button";
import LogoImage from '../assets/images/logo_jfvr_orange.png'
import {GoogleMap, Marker, Polyline, withGoogleMap, withScriptjs} from "react-google-maps"
import {connect} from "react-redux";
import PlacesActions from '../reducers/places.reducer'
import LoginActions from '../reducers/login.reducer'
import {Redirect, Switch} from "react-router-dom";

var polyline = require('@mapbox/polyline');

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
position: relative;
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
  color: ${colors.darkpurple};
  font-weight: 300;
`
const InfoWrapper = styled.div`
  position: absolute;
  bottom: 40px; 
  right: 40px;
  left: 40px;
  background-color: ${colors.white};
  box-shadow: 0 10px 6px -6px #777;
  display: ${props => props.visible ? 'flex' : 'none'};
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-around;
  align-items: center;

`

const MyMapComponent = withScriptjs(withGoogleMap((props) =>{
    const bounds = new window.google.maps.LatLngBounds();
    const northeastLatLng = new window.google.maps.LatLng(props.northeast.lat, props.northeast.lng);
    const southwestLatLng = new window.google.maps.LatLng(props.southwest.lat, props.southwest.lng);
    bounds.extend(northeastLatLng);
    bounds.extend(southwestLatLng);

    return(
        <GoogleMap
            ref={map => map && map.fitBounds(bounds)}
            defaultZoom={13}
            defaultCenter={{ lat: 4.624335, lng: -74.063644 }}
        >
                <Polyline
                    path={props.polyline}
                    options={{
                        strokeColor: colors.orange,
                        strokeWeight: 4,
                    }}
                />
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
    componentDidMount(){
    }

    render(){
        var poly = []
        this.props.directionsData.routes &&
        this.props.directionsData.routes[0] &&
        polyline.decode(this.props.directionsData.routes[0].overview_polyline.points).map((point) => {
            poly.push({ lat: point[0], lng: point[1] })
        })

        const southwest = this.props.directionsData.routes &&
        this.props.directionsData.routes[0] &&
        this.props.directionsData.routes[0].bounds.southwest

        const northeast = this.props.directionsData.routes &&
        this.props.directionsData.routes[0] &&
        this.props.directionsData.routes[0].bounds.northeast

        const isAuthenticated = ((localStorage.getItem('id_token') ? true : false)
            || this.props.loginData && this.props.loginData.data && this.props.loginData.data.token) ;
        if (!isAuthenticated) {
            return (
                <Switch>
                    <Redirect to={{
                        pathname: '/login'
                    }}/>
                </Switch>
            );
        }else {
            return (
                <StartWrapper>
                    <StartContainer>
                        <Logo
                            src={LogoImage}
                        />
                        <StartInputContainer>
                            <Input
                                value={this.props.keywordOrigin}
                                placeholder={'Lugar de inicio'}
                                onChange={(event) => {
                                    this.props.setKeywordOrigin(event.target.value)
                                }}/>
                            <Input
                                value={this.props.keywordDestination}
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

                            <Button
                                onClick={() => {
                                    this.props.logout()
                                }}>
                                {'Cerrar Sesión'}
                            </Button>

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
                            loadingElement={<div style={{height: `100%`, width: `100%`}}/>}
                            containerElement={<div style={{height: `100%`, width: `100%`}}/>}
                            polyline={poly}
                            mapElement={<div style={{height: `100%`}}/>}
                            southwest={southwest ? southwest : 0}
                            northeast={northeast ? northeast : 0}
                        />
                        <InfoWrapper
                            visible={this.props.directionsData.routes}>
                            {this.props.directionsData.routes && this.props.directionsData.routes.length > 0 ?
                                <Fragment>
                                    <Text>
                                        {`Tiempo: ${this.props.directionsData.routes && this.props.directionsData.routes.length > 0 ? this.props.directionsData.routes[0].legs[0].duration.text : '--'}`}
                                    </Text>
                                    <Text>
                                        {`Distancia: ${this.props.directionsData.routes && this.props.directionsData.routes.length > 0 ? this.props.directionsData.routes[0].legs[0].distance.text : '--'}`}
                                    </Text>
                                </Fragment>

                                :
                                <Text>
                                {'No se encontró ninguna ruta'}
                                </Text>
                                }
                        </InfoWrapper>
                    </MapContainer>
                </StartWrapper>
            )
        }
    }
}


/* Container */
const mapStateToProps = state => ({
    directionsData: state.places.get('directionsData'),
    placesOriginData: state.places.get('placesOrigin'),
    placesDestinationData: state.places.get('placesDestination'),
    keywordOrigin: state.places.get('keywordOrigin'),
    keywordDestination: state.places.get('keywordDestination'),
    loginData: state.login.get('loginData'),
})

const mapDispatchToProps = dispatch => ({
    directions: () => dispatch(PlacesActions.directions()),
    placesOrigin: () => dispatch(PlacesActions.placesOrigin()),
    placesDestination: () => dispatch(PlacesActions.placesDestination()),
    setKeywordOrigin: keyword => dispatch(PlacesActions.setKeywordOrigin(keyword)),
    setKeywordDestination: keyword => dispatch(PlacesActions.setKeywordDestination(keyword)),
    logout: () => dispatch(LoginActions.logout()),
})

export default connect(mapStateToProps, mapDispatchToProps)(Start)
