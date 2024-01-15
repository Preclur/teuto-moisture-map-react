import "./App.css";
import { MapContainer, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import AppCommandBar from "./components/CommandBar";
import SidePanel from "./components/SidePanel";
import { useBoolean } from "@fluentui/react-hooks";
import MoistureMarkers from "./components/MoistureMarkers";
import { Info, Imprint } from "./components/Markdown";
import { useEffect, useState } from "react";

function App() {
    const position: [number, number] = [52.01, 8.542732];
    const zoom = 13;

    const [imprintOpen, { setTrue: openImprint, setFalse: dismissImprint }] = useBoolean(false);
    const [infoOpen, { setTrue: openInfo, setFalse: dismissInfo }] = useBoolean(false);

    // We manually update the height of the map to the window.innerHeight to avoid problems with mobile views
    const [height, setHeight] = useState(window.innerHeight);
    useEffect(() => {
        const cb = () => setHeight(window.innerHeight);
        window.addEventListener("resize", cb);
        return () => window.removeEventListener("resize", cb);
    });

    return (
        <div className="App">
            <SidePanel isOpen={infoOpen} dismissPanel={() => dismissInfo()} children={<Info />} />
            <SidePanel isOpen={imprintOpen} dismissPanel={() => dismissImprint()} children={<Imprint />} />
            <MapContainer zoomControl={false} center={position} zoom={zoom} style={{ height: height }}>
                <MoistureMarkers />
                <TileLayer
                    attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <AppCommandBar openImprint={openImprint} openInfo={openInfo} />
            </MapContainer>
        </div>
    );
}

export default App;

//<Toolbar zoomIn={() => map?.zoomIn()} zoomOut={() => map?.zoomOut()} togglePanel={openPanel} />
