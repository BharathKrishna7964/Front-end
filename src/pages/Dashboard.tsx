import { useState, useEffect, useCallback } from 'react'
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  AreaChart,
  Area,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar
} from 'recharts'
import { 
  Users, 
  TrendingUp, 
  DollarSign, 
  ShoppingCart,
  Activity,
  Calendar,
  Clock,
  Target,
  Zap,
  Star,
  Heart,
  Eye,
  Download,
  Upload,
  RefreshCw,
  Settings,
  Bell,
  Search,
  Filter,
  Grid,
  List,
  BarChart3,
  PieChart as PieChartIcon,
  Plus
} from 'lucide-react'
import { useProductsStore } from '../stores/productsStore'
import RealTimeWidget from '../components/RealTimeWidget'

const Dashboard = () => {
  const [timeRange, setTimeRange] = useState('7d')
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const [isRefreshing, setIsRefreshing] = useState(false)
  const [selectedMetric, setSelectedMetric] = useState('sales')
  const [showNotifications, setShowNotifications] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [activeWidgets, setActiveWidgets] = useState(['stats', 'charts', 'activity', 'goals'])
  
  const { products } = useProductsStore()

  // Enhanced mock data with more variety
  const salesData = [
    { name: 'Jan', value: 4000, target: 3500, growth: 14.3 },
    { name: 'Feb', value: 3000, target: 3800, growth: -21.1 },
    { name: 'Mar', value: 2000, target: 4000, growth: -50.0 },
    { name: 'Apr', value: 2780, target: 4200, growth: 39.0 },
    { name: 'May', value: 1890, target: 4500, growth: -32.0 },
    { name: 'Jun', value: 2390, target: 4800, growth: 26.5 },
  ]

  const userGrowthData = [
    { name: 'Jan', users: 1000, newUsers: 150, churn: 20 },
    { name: 'Feb', users: 1200, newUsers: 200, churn: 25 },
    { name: 'Mar', users: 1400, newUsers: 250, churn: 30 },
    { name: 'Apr', users: 1600, newUsers: 300, churn: 35 },
    { name: 'May', users: 1800, newUsers: 350, churn: 40 },
    { name: 'Jun', users: 2000, newUsers: 400, churn: 45 },
  ]

  const pieData = [
    { name: 'Desktop', value: 400, color: '#3B82F6', percentage: 44.4 },
    { name: 'Mobile', value: 300, color: '#10B981', percentage: 33.3 },
    { name: 'Tablet', value: 200, color: '#F59E0B', percentage: 22.2 },
  ]

  const performanceData = [
    { metric: 'Speed', value: 85, fullMark: 100 },
    { metric: 'Reliability', value: 92, fullMark: 100 },
    { metric: 'Security', value: 78, fullMark: 100 },
    { metric: 'Usability', value: 88, fullMark: 100 },
    { metric: 'Support', value: 95, fullMark: 100 },
  ]

  const recentActivity = [
    { id: 1, action: 'New user registered', time: '2 minutes ago', type: 'user', priority: 'high', user: 'John Doe' },
    { id: 2, action: 'Order #12345 completed', time: '15 minutes ago', type: 'order', priority: 'medium', user: 'Jane Smith' },
    { id: 3, action: 'Payment received', time: '1 hour ago', type: 'payment', priority: 'high', user: 'Bob Johnson' },
    { id: 4, action: 'Product updated', time: '2 hours ago', type: 'product', priority: 'low', user: 'Alice Brown' },
    { id: 5, action: 'Support ticket resolved', time: '3 hours ago', type: 'support', priority: 'medium', user: 'Charlie Wilson' },
  ]

  const notifications = [
    { id: 1, message: 'New order received', type: 'success', time: '1 min ago' },
    { id: 2, message: 'Server maintenance scheduled', type: 'warning', time: '5 min ago' },
    { id: 3, message: 'Payment failed', type: 'error', time: '10 min ago' },
    { id: 4, message: 'New user signup', type: 'info', time: '15 min ago' },
  ]

  const goals = [
    { id: 1, title: 'Monthly Sales Target', current: 45000, target: 60000, unit: '$', color: 'blue' },
    { id: 2, title: 'User Growth', current: 2000, target: 2500, unit: 'users', color: 'green' },
    { id: 3, title: 'Customer Satisfaction', current: 4.2, target: 4.5, unit: 'stars', color: 'yellow' },
    { id: 4, title: 'Response Time', current: 2.5, target: 2.0, unit: 'sec', color: 'red' },
  ]

  const stats = [
    { name: 'Total Users', value: '12,345', change: '+12%', icon: Users, color: 'bg-blue-500', trend: 'up' },
    { name: 'Revenue', value: '$45,678', change: '+8%', icon: DollarSign, color: 'bg-green-500', trend: 'up' },
    { name: 'Orders', value: '1,234', change: '+15%', icon: ShoppingCart, color: 'bg-purple-500', trend: 'up' },
    { name: 'Growth', value: '+23%', change: '+5%', icon: TrendingUp, color: 'bg-orange-500', trend: 'up' },
  ]

  // Interactive functions
  const handleRefresh = useCallback(async () => {
    setIsRefreshing(true)
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000))
    setIsRefreshing(false)
  }, [])

  const toggleWidget = (widgetId: string) => {
    setActiveWidgets(prev => 
      prev.includes(widgetId) 
        ? prev.filter(id => id !== widgetId)
        : [...prev, widgetId]
    )
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'text-red-600 bg-red-100'
      case 'medium': return 'text-yellow-600 bg-yellow-100'
      case 'low': return 'text-green-600 bg-green-100'
      default: return 'text-gray-600 bg-gray-100'
    }
  }

  const getNotificationColor = (type: string) => {
    switch (type) {
      case 'success': return 'bg-green-100 text-green-800 border-green-200'
      case 'warning': return 'bg-yellow-100 text-yellow-800 border-yellow-200'
      case 'error': return 'bg-red-100 text-red-800 border-red-200'
      case 'info': return 'bg-blue-100 text-blue-800 border-blue-200'
      default: return 'bg-gray-100 text-gray-800 border-gray-200'
    }
  }

  // Auto-refresh effect
  useEffect(() => {
    const interval = setInterval(() => {
      // Simulate real-time updates
      console.log('Dashboard auto-refresh')
    }, 30000) // Every 30 seconds

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="space-y-6">
      {/* Enhanced Header with Interactive Controls */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-600">Welcome back! Here's what's happening today.</p>
        </div>
        
        <div className="flex items-center gap-3">
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <input
              type="text"
              placeholder="Search dashboard..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            />
          </div>

          {/* View Mode Toggle */}
          <div className="flex bg-gray-100 rounded-lg p-1">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-2 rounded-md transition-colors ${
                viewMode === 'grid' ? 'bg-white shadow-sm' : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              <Grid className="h-4 w-4" />
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`p-2 rounded-md transition-colors ${
                viewMode === 'list' ? 'bg-white shadow-sm' : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              <List className="h-4 w-4" />
            </button>
          </div>

          {/* Time Range Selector */}
          <select
            value={timeRange}
            onChange={(e) => setTimeRange(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          >
            <option value="7d">Last 7 days</option>
            <option value="30d">Last 30 days</option>
            <option value="90d">Last 90 days</option>
            <option value="1y">Last year</option>
          </select>

          {/* Refresh Button */}
          <button
            onClick={handleRefresh}
            disabled={isRefreshing}
            className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors disabled:opacity-50"
          >
            <RefreshCw className={`h-4 w-4 ${isRefreshing ? 'animate-spin' : ''}`} />
          </button>

          {/* Notifications */}
          <button
            onClick={() => setShowNotifications(!showNotifications)}
            className="relative p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <Bell className="h-4 w-4" />
            {notifications.length > 0 && (
              <span className="absolute -top-1 -right-1 h-5 w-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                {notifications.length}
              </span>
            )}
          </button>

          {/* Settings */}
          <button className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors">
            <Settings className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* Notifications Dropdown */}
      {showNotifications && (
        <div className="absolute right-0 top-20 z-50 w-80 bg-white rounded-lg shadow-lg border border-gray-200 p-4">
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-semibold text-gray-900">Notifications</h3>
            <button className="text-sm text-primary-600 hover:text-primary-800">Mark all read</button>
          </div>
          <div className="space-y-2 max-h-64 overflow-y-auto">
            {notifications.map((notification) => (
              <div
                key={notification.id}
                className={`p-3 rounded-lg border ${getNotificationColor(notification.type)}`}
              >
                <p className="text-sm font-medium">{notification.message}</p>
                <p className="text-xs opacity-75 mt-1">{notification.time}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Enhanced Stats Cards with Trends */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <div key={stat.name} className="card hover:shadow-lg transition-shadow duration-200 cursor-pointer group">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div className={`p-3 rounded-lg ${stat.color} group-hover:scale-110 transition-transform duration-200`}>
                  <stat.icon className="h-6 w-6 text-white" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">{stat.name}</p>
                  <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                  <div className="flex items-center">
                    <span className={`text-sm ${stat.trend === 'up' ? 'text-green-600' : 'text-red-600'}`}>
                      {stat.change}
                    </span>
                    <TrendingUp className={`h-4 w-4 ml-1 ${stat.trend === 'up' ? 'text-green-600' : 'text-red-600'}`} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Interactive Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Enhanced Sales Chart with Target Lines */}
        <div className="card">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Sales Overview</h3>
            <div className="flex items-center space-x-2">
              <button
                onClick={() => setSelectedMetric('sales')}
                className={`px-3 py-1 rounded-md text-sm font-medium transition-colors ${
                  selectedMetric === 'sales' 
                    ? 'bg-primary-100 text-primary-700' 
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                Sales
              </button>
              <button
                onClick={() => setSelectedMetric('growth')}
                className={`px-3 py-1 rounded-md text-sm font-medium transition-colors ${
                  selectedMetric === 'growth' 
                    ? 'bg-primary-100 text-primary-700' 
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                Growth
              </button>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={salesData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip 
                content={({ active, payload, label }) => {
                  if (active && payload && payload.length) {
                    return (
                      <div className="bg-white p-3 border border-gray-200 rounded-lg shadow-lg">
                        <p className="font-medium">{label}</p>
                        <p className="text-primary-600">Sales: ${payload[0]?.value}</p>
                        <p className="text-gray-600">Target: ${payload[0]?.payload.target}</p>
                        <p className="text-sm text-gray-500">Growth: {payload[0]?.payload.growth}%</p>
                      </div>
                    )
                  }
                  return null
                }}
              />
              <Area 
                type="monotone" 
                dataKey="value" 
                stroke="#3B82F6" 
                fill="#3B82F6" 
                fillOpacity={0.3}
                strokeWidth={2}
              />
              <Line 
                type="monotone" 
                dataKey="target" 
                stroke="#EF4444" 
                strokeDasharray="5 5"
                strokeWidth={2}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Enhanced User Growth Chart */}
        <div className="card">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">User Growth & Metrics</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={userGrowthData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="users" stroke="#10B981" strokeWidth={3} name="Total Users" />
              <Line type="monotone" dataKey="newUsers" stroke="#3B82F6" strokeWidth={2} name="New Users" />
              <Line type="monotone" dataKey="churn" stroke="#EF4444" strokeWidth={2} name="Churn" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Additional Interactive Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Enhanced Device Usage with Interactive Legend */}
        <div className="card">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Device Usage</h3>
          <ResponsiveContainer width="100%" height={200}>
            <PieChart>
              <Pie
                data={pieData}
                cx="50%"
                cy="50%"
                innerRadius={40}
                outerRadius={80}
                paddingAngle={5}
                dataKey="value"
                onClick={(entry) => console.log('Clicked:', entry)}
                className="cursor-pointer"
              >
                {pieData.map((entry, index) => (
                  <Cell 
                    key={`cell-${index}`} 
                    fill={entry.color}
                    className="hover:opacity-80 transition-opacity duration-200"
                  />
                ))}
              </Pie>
              <Tooltip 
                content={({ active, payload }) => {
                  if (active && payload && payload.length) {
                    return (
                      <div className="bg-white p-3 border border-gray-200 rounded-lg shadow-lg">
                        <p className="font-medium">{payload[0]?.name}</p>
                        <p className="text-primary-600">Users: {payload[0]?.value}</p>
                        <p className="text-gray-600">Percentage: {payload[0]?.payload.percentage}%</p>
                      </div>
                    )
                  }
                  return null
                }}
              />
            </PieChart>
          </ResponsiveContainer>
          <div className="mt-4 space-y-2">
            {pieData.map((item) => (
              <div key={item.name} className="flex items-center justify-between text-sm hover:bg-gray-50 p-2 rounded cursor-pointer transition-colors">
                <div className="flex items-center">
                  <div className="w-3 h-3 rounded-full mr-2" style={{ backgroundColor: item.color }} />
                  {item.name}
                </div>
                <span className="font-medium">{item.value} ({item.percentage}%)</span>
              </div>
            ))}
          </div>
        </div>

        {/* Performance Radar Chart */}
        <div className="card">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Performance Metrics</h3>
          <ResponsiveContainer width="100%" height={200}>
            <RadarChart data={performanceData}>
              <PolarGrid />
              <PolarAngleAxis dataKey="metric" />
              <PolarRadiusAxis angle={90} domain={[0, 100]} />
              <Radar
                name="Performance"
                dataKey="value"
                stroke="#3B82F6"
                fill="#3B82F6"
                fillOpacity={0.3}
              />
              <Tooltip />
            </RadarChart>
          </ResponsiveContainer>
        </div>

        {/* Goals Progress */}
        <div className="card">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Goals & Targets</h3>
          <div className="space-y-4">
            {goals.map((goal) => {
              const percentage = Math.min((goal.current / goal.target) * 100, 100)
              const getColor = (color: string) => {
                switch (color) {
                  case 'blue': return 'bg-blue-500'
                  case 'green': return 'bg-green-500'
                  case 'yellow': return 'bg-yellow-500'
                  case 'red': return 'bg-red-500'
                  default: return 'bg-gray-500'
                }
              }
              
              return (
                <div key={goal.id} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-gray-700">{goal.title}</span>
                    <span className="text-sm text-gray-500">
                      {goal.current}/{goal.target} {goal.unit}
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className={`h-2 rounded-full transition-all duration-500 ${getColor(goal.color)}`}
                      style={{ width: `${percentage}%` }}
                    />
                  </div>
                  <div className="text-xs text-gray-500 text-right">{percentage.toFixed(1)}%</div>
                </div>
              )
            })}
          </div>
        </div>

        {/* Real-Time Widget */}
        <RealTimeWidget />
      </div>

      {/* Enhanced Recent Activity with Priority and Actions */}
      <div className="card">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900">Recent Activity</h3>
          <div className="flex items-center space-x-2">
            <button className="text-sm text-primary-600 hover:text-primary-800">View All</button>
            <button className="text-sm text-gray-500 hover:text-gray-700">Export</button>
          </div>
        </div>
        <div className="space-y-3">
          {recentActivity.map((activity) => (
            <div key={activity.id} className="flex items-center space-x-3 p-3 hover:bg-gray-50 rounded-lg transition-colors cursor-pointer group">
              <div className="flex-shrink-0">
                <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-200">
                  <Activity className="h-5 w-5 text-gray-600" />
                </div>
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center space-x-2">
                  <p className="text-sm font-medium text-gray-900">{activity.action}</p>
                  <span className={`px-2 py-1 text-xs font-medium rounded-full ${getPriorityColor(activity.priority)}`}>
                    {activity.priority}
                  </span>
                </div>
                <div className="flex items-center space-x-4 text-sm text-gray-500">
                  <span>{activity.time}</span>
                  <span>by {activity.user}</span>
                </div>
              </div>
              <div className="flex items-center space-x-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                <button className="p-1 text-gray-400 hover:text-gray-600 rounded">
                  <Eye className="h-4 w-4" />
                </button>
                <button className="p-1 text-gray-400 hover:text-gray-600 rounded">
                  <Heart className="h-4 w-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Quick Actions Panel */}
      <div className="card">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <button className="flex flex-col items-center p-4 border border-gray-200 rounded-lg hover:border-primary-300 hover:bg-primary-50 transition-colors group">
            <Plus className="h-8 w-8 text-primary-600 mb-2 group-hover:scale-110 transition-transform duration-200" />
            <span className="text-sm font-medium text-gray-700">Add Product</span>
          </button>
          <button className="flex flex-col items-center p-4 border border-gray-200 rounded-lg hover:border-primary-300 hover:bg-primary-50 transition-colors group">
            <Users className="h-8 w-8 text-primary-600 mb-2 group-hover:scale-110 transition-transform duration-200" />
            <span className="text-sm font-medium text-gray-700">Invite User</span>
          </button>
          <button className="flex flex-col items-center p-4 border border-gray-200 rounded-lg hover:border-primary-300 hover:bg-primary-50 transition-colors group">
            <Download className="h-8 w-8 text-primary-600 mb-2 group-hover:scale-110 transition-transform duration-200" />
            <span className="text-sm font-medium text-gray-700">Export Data</span>
          </button>
          <button className="flex flex-col items-center p-4 border border-gray-200 rounded-lg hover:border-primary-300 hover:bg-primary-50 transition-colors group">
            <Settings className="h-8 w-8 text-primary-600 mb-2 group-hover:scale-110 transition-transform duration-200" />
            <span className="text-sm font-medium text-gray-700">Settings</span>
          </button>
        </div>
      </div>
    </div>
  )
}

export default Dashboard

