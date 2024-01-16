import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    BarElement,
    Tooltip,
    Legend,
    ChartData,
    LineController,
} from "chart.js";
import { Chart } from "react-chartjs-2";
import { SensorDetails, SensorInfo } from "../../model/models";
import useSensorDetails from "../../hooks/useSensorDetails";

// ChartJS setup
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, BarElement, Tooltip, Legend, LineController);

const recentDaysChartOptions = {
    responsive: true,
    interaction: {
        mode: "index" as const,
        intersect: false,
    },
    plugins: {
        legend: {
            position: "top" as const,
            labels: {
                boxWidth: 20,
                boxHeight: 1,
            },
        },
    },
    maintainAspectRatio: false,
    scales: {
        moisture: {
            type: "linear" as const,
            display: true,
            position: "left" as const,
            ticks: {
                callback: (value: any, index: any, ticks: any) => value + " %",
            },
            suggestMin: 0,
            suggestMax: 50,
        },
        // precipitation: {
        //     type: 'linear' as const,
        //     display: true,
        //     position: 'right' as const,
        //     suggestedMax: 10,
        //     grid: {
        //         drawOnChartArea: false,
        //     },
        //     ticks: {
        //         callback: (value: any, index: any, ticks: any) => (value + " mm")
        //     }
        // },
    },
};

function extractRecentDaysDataset(details: SensorDetails): ChartData<"bar" | "line", number[], string> {
    const colors = {
        red: "rgb(255, 99, 132)",
        orange: "rgb(255, 159, 64)",
        yellow: "rgb(255, 205, 86)",
        green: "rgb(75, 192, 192)",
        blue: "rgb(54, 162, 235)",
        purple: "rgb(153, 102, 255)",
        grey: "rgb(201, 203, 207)",
    };
    return {
        labels: details.measurements.map((d) => d.timestamp.toLocaleDateString()),
        datasets: [
            {
                label: "Tageswert",
                type: "line",
                data: details.measurements.map((d) => d.moisture),
                borderColor: colors.green,
                backgroundColor: colors.green,
                yAxisID: "moisture",
            },
            {
                label: "Globales Mittel",
                type: "line",
                data: details.peerMeasurements.map((d) => d.moisture),
                borderColor: colors.grey,
                backgroundColor: colors.grey,
                yAxisID: "moisture",
            },
        ],
    };
}

export default function SensorChart({ sensorInfo }: { sensorInfo: SensorInfo }) {
    const { details, loading, error } = useSensorDetails(sensorInfo);
    if (details) return <Chart type="line" options={recentDaysChartOptions} data={extractRecentDaysDataset(details)} />;
    else if (loading) return "Loading";
    else if (error) return "Error";
    return "No chart";
}
