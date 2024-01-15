'use client'

import { Chart as ChartJS, BarElement, CategoryScale, LinearScale, Tooltip, Legend } from 'chart.js'
import { Bar } from 'react-chartjs-2'

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend)

type BarGraphProps = {
    graphData: GraphData[]
}

type GraphData = {
    day: string
    date: string
    totalAmount: number
}

const BarGraph = ({ graphData }: BarGraphProps) => {

    console.log(graphData)

    const labels = graphData.map((item) => item.day)
    const amounts = graphData.map((item) => item.totalAmount)

    const chartData = {
        labels: labels,
        datasets: [
            {
                label: 'Sale Amount',
                data: amounts,
                backgroundColor: 'rgba(75, 192, 192, 0.6)',
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 1
            }
        ]
    }

    const options = {
        scales: {
            y: {
                beginAtZero: true
            }
        }
    }

    return (
        <Bar data={chartData} options={options} />
    )
}

export default BarGraph