import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts'
import { useGameStore } from '@/stores/gameStore'

export function RoundGrowthChart() {
  const growthData = useGameStore((state) => state.growthData)

  return (
    <div className="bg-white p-6 rounded-lg shadow-md h-96">
      <h3 className="text-xl font-bold mb-4 text-center">
        Round Game Growth (2025)
      </h3>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={growthData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line
            type="monotone"
            dataKey="rounds"
            stroke="#82ca9d"
            strokeWidth={2}
            name="Rounds"
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}
