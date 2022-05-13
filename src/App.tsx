import React, {useEffect} from 'react';
import {Map as LeafletMap} from 'leaflet';
import './App.css';
import {MapContainer} from "react-leaflet";
import 'leaflet/dist/leaflet.css';
import AppCommandBar from "./components/CommandBar";
import SidePanel from "./components/SidePanel";
import Toolbar from "./components/Toolbar";
import {useBoolean} from '@fluentui/react-hooks';
import Map from './components/Map'

function App() {
    const [height, setHeight] = React.useState(window.innerHeight)
    const position: [number, number] = [52.03333, 8.53333]
    const [map, setMap] = React.useState<LeafletMap>()
    const zoom = 13;

    const [isOpen, {setTrue: openPanel, setFalse: dismissPanel}] = useBoolean(false);

    useEffect(() => {
        window.addEventListener('resize', () => setHeight(window.innerHeight));
        return () => window.removeEventListener('resize', () => setHeight(window.innerHeight));
    })

    return (
        <div className="App">
            <SidePanel isOpen={isOpen} dismissPanel={() => dismissPanel()} />
            <Toolbar zoomIn={() => map?.zoomIn()} zoomOut={() => map?.zoomOut()} openPanel={() => openPanel()}/>
            <MapContainer zoomControl={false} center={position} zoom={zoom} style={{height: height}}
                          whenCreated={setMap}>
                <Map/>
            </MapContainer>
            <AppCommandBar/>
        </div>
    );
}

export default App;