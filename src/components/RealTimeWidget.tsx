import { useState, useEffect } from 'react'
import { Zap, Wifi, WifiOff, Activity, Clock, TrendingUp } from 'lucide-react'

interface RealTimeData {
  timestamp: string
  value: number
  change: number
  status: 'online' | 'offline' | 'warning'
}

const RealTimeWidget = () => {
  const [isActive, setIsActive] = useState(true)
  const [data, setData] = useState<RealTimeData[]>([])
  const [currentStatus, setCurrentStatus] = useState<'online' | 'offline' | 'warning'>('online')

  // Simulate real-time data updates
  useEffect(() => {
    if (!isActive) return

    const interval = setInterval(() => {
      const newData: RealTimeData = {
        timestamp: new Date().toLocaleTimeString(),
        value: Math.floor(Math.random() * 1000) + 500,
        change: Math.floor(Math.random() * 20) - 10,
        status: Math.random() > 0.9 ? 'warning' : 'online'
      }

      setData(prev => {
        const updated = [...prev, newData]
        if (updated.length > 10) updated.shift()
        return updated
      })

      setCurrentStatus(newData.status)
    }, 2000)

    return () => clearInterval(interval)
  }, [isActive])

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'online': return 'text-green-600 bg-green-100'
      case 'offline': return 'text-red-600 bg-red-100'
      case 'warning': return 'text-yellow-600 bg-yellow-100'
      default: return 'text-gray-600 bg-gray-100'
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'online': return <Wifi className="h-4 w-4" />
      case 'offline': return <WifiOff className="h-4 w-4" />
      case 'warning': return <Activity className="h-4 w-4" />
      default: return <Wifi className="h-4 w-4" />
    }
  }

  return (
    <div className="card">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-2">
          <Zap className="h-5 w-5 text-yellow-500" />
          <h3 className="text-lg font-semibold text-gray-900">Real-Time Monitor</h3>
        </div>
        <div className="flex items-center space-x-2">
          <span className={`px-2 py-1 text-xs font-medium rounded-full flex items-center space-x-1 ${getStatusColor(currentStatus)}`}>
            {getStatusIcon(currentStatus)}
            <span className="capitalize">{currentStatus}</span>
          </span>
          <button
            onClick={() => setIsActive(!isActive)}
            className={`p-2 rounded-lg transition-colors ${
              isActive 
                ? 'bg-green-100 text-green-600 hover:bg-green-200' 
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            <Activity className={`h-4 w-4 ${isActive ? 'animate-pulse' : ''}`} />
          </button>
        </div>
      </div>

      {isActive ? (
        <div className="space-y-4">
          {/* Current Value */}
          <div className="text-center">
            <div className="text-3xl font-bold text-gray-900">
              {data.length > 0 ? data[data.length - 1]?.value : '--'}
            </div>
            <div className="text-sm text-gray-500">Current Value</div>
          </div>

          {/* Live Chart */}
          <div className="h-32 bg-gray-50 rounded-lg p-4 relative overflow-hidden">
            <div className="flex items-end justify-between h-full space-x-1">
              {data.map((item, index) => (
                <div
                  key={index}
                  className="flex-1 bg-primary-500 rounded-t transition-all duration-300 hover:bg-primary-600"
                  style={{
                    height: `${(item.value / 1500) * 100}%`,
                    minHeight: '4px'
                  }}
                />
              ))}
            </div>
            <div className="absolute top-2 right-2 text-xs text-gray-500">
              Live
            </div>
          </div>

          {/* Recent Updates */}
          <div className="space-y-2 max-h-32 overflow-y-auto">
            {data.slice(-5).reverse().map((item, index) => (
              <div key={index} className="flex items-center justify-between text-sm p-2 bg-gray-50 rounded">
                <div className="flex items-center space-x-2">
                  <Clock className="h-3 w-3 text-gray-400" />
                  <span className="text-gray-600">{item.timestamp}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="font-medium">{item.value}</span>
                  <div className={`flex items-center space-x-1 ${
                    item.change > 0 ? 'text-green-600' : 'text-red-600'
                  }`}>
                    <TrendingUp className={`h-3 w-3 ${item.change < 0 ? 'rotate-180' : ''}`} />
                    <span className="text-xs">{Math.abs(item.change)}%</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="text-center py-8 text-gray-500">
          <WifiOff className="h-12 w-12 mx-auto mb-2 text-gray-400" />
          <p>Real-time monitoring is paused</p>
          <p className="text-sm">Click the button above to resume</p>
        </div>
      )}
    </div>
  )
}

export default RealTimeWidget
