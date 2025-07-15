import { useEffect, useState } from "react";
import ReactApexChart from "react-apexcharts";
import { getToken, userId, BASE_URL } from "../utils/common";
import { BarChart3, TrendingUp, Calendar, FileText, Activity, Eye } from "lucide-react";

function DashBoard() {
  const [series, setSeries] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [totalNotes, setTotalNotes] = useState(0);

  useEffect(() => {
    async function getNoteDayWise() {
      setLoading(true);
      try {
        const data = await fetch(
          `${BASE_URL}/notes/days?userId=${userId()}`,
          {
            method: "GET",
            headers: {
              authorization: `Bearer ${getToken()}`,
            },
          }
        );
        const result = await data.json();
        const counts = result.data.map((item) => item.count);
        const names = result.data.map((item) => item.category);

        setSeries([{ name: "Notes", data: counts }]);
        setCategories(names);
        setTotalNotes(counts.reduce((sum, count) => sum + count, 0));
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    }
    getNoteDayWise();
  }, []);

  const chartOptions = {
    chart: {
      id: "notes-bar",
      toolbar: { show: false },
      background: 'transparent',
      fontFamily: 'Inter, system-ui, sans-serif',
    },
    plotOptions: {
      bar: {
        borderRadius: 8,
        columnWidth: '60%',
        dataLabels: {
          position: 'top',
        },
      },
    },
    dataLabels: {
      enabled: true,
      formatter: function (val) {
        return val;
      },
      offsetY: -20,
      style: {
        fontSize: '12px',
        fontWeight: '600',
        colors: ['#64748b']
      }
    },
    xaxis: {
      categories,
      labels: {
        style: {
          colors: '#64748b',
          fontSize: '12px',
          fontWeight: '500'
        }
      },
      axisBorder: {
        show: false
      },
      axisTicks: {
        show: false
      }
    },
    yaxis: {
      labels: {
        style: {
          colors: '#64748b',
          fontSize: '12px'
        }
      }
    },
    grid: {
      borderColor: '#e2e8f0',
      strokeDashArray: 4,
      xaxis: {
        lines: {
          show: false
        }
      }
    },
    colors: ['#3b82f6'],
    tooltip: {
      theme: 'light',
      style: {
        fontSize: '12px',
      },
      y: {
        formatter: function (val) {
          return val + " notes";
        }
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="mb-8">
          <div className="flex items-center gap-4 mb-2">
            {/* bg-gradient-to-r from-blue-500 to-purple-600 */}
            <div className="p-3  bg-[#2A4759]  rounded-xl">
              <BarChart3 className="w-7 h-7 text-white" />
            </div>
            <div>
              <h1 className="text-3xl  font-bold bg-black bg-clip-text text-transparent">
                Analytics Dashboard
              </h1>
              <p className="text-slate-600 mt-1">Track your note-taking patterns and productivity</p>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-2xl p-6 shadow-lg border border-slate-200 hover:shadow-xl transition-all duration-300">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-500 text-sm font-medium">Total Notes</p>
                <p className="text-2xl font-bold text-slate-800 mt-1">{totalNotes}</p>
              </div>
              <div className="p-3 bg-blue-100 rounded-xl">
                <FileText className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-lg border border-slate-200 hover:shadow-xl transition-all duration-300">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-500 text-sm font-medium">Categories</p>
                <p className="text-2xl font-bold text-slate-800 mt-1">{categories.length}</p>
              </div>
              <div className="p-3 bg-green-100 rounded-xl">
                <Activity className="w-6 h-6 text-green-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-lg border border-slate-200 hover:shadow-xl transition-all duration-300">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-500 text-sm font-medium">Avg per Day</p>
                <p className="text-2xl font-bold text-slate-800 mt-1">
                  {categories.length > 0 ? (totalNotes / categories.length).toFixed(1) : '0'}
                </p>
              </div>
              <div className="p-3 bg-purple-100 rounded-xl">
                <TrendingUp className="w-6 h-6 text-purple-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-lg border border-slate-200 hover:shadow-xl transition-all duration-300">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-500 text-sm font-medium">Most Active</p>
                <p className="text-2xl font-bold text-slate-800 mt-1">
                  {series.length > 0 && series[0].data.length > 0 
                    ? categories[series[0].data.indexOf(Math.max(...series[0].data))] || 'N/A'
                    : 'N/A'
                  }
                </p>
              </div>
              <div className="p-3 bg-orange-100 rounded-xl">
                <Calendar className="w-6 h-6 text-orange-600" />
              </div>
            </div>
          </div>
        </div>

        {/* Chart Section */}
        <div className="bg-white rounded-2xl shadow-lg border border-slate-200 overflow-hidden">
          <div className="p-6 border-b border-slate-200">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl font-bold text-slate-800">Notes by Category</h2>
                <p className="text-slate-500 text-sm mt-1">Distribution of your notes across different categories</p>
              </div>
              <div className="flex items-center gap-2 text-sm text-slate-500">
                <Eye className="w-4 h-4" />
                <span>Last 7 days</span>
              </div>
            </div>
          </div>
          
          <div className="p-6">
            {loading ? (
              <div className="flex items-center justify-center h-80">
                <div className="flex flex-col items-center space-y-4">
                  <div className="animate-spin rounded-full h-12 w-12 border-4 border-blue-200 border-t-blue-600"></div>
                  <p className="text-slate-600 font-medium">Loading analytics...</p>
                </div>
              </div>
            ) : series.length > 0 ? (
              <ReactApexChart
                options={chartOptions}
                series={series}
                type="bar"
                height={400}
              />
            ) : (
              <div className="flex items-center justify-center h-80">
                <div className="text-center">
                  <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <BarChart3 className="w-8 h-8 text-slate-400" />
                  </div>
                  <h3 className="text-lg font-semibold text-slate-700 mb-2">No data available</h3>
                  <p className="text-slate-500">Start creating notes to see your analytics</p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Additional Info Section */}
        <div className="mt-8 bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-6 border border-blue-200">
          <div className="flex items-center gap-3 mb-3">
            <div className="p-2 bg-blue-100 rounded-lg">
              <TrendingUp className="w-5 h-5 text-blue-600" />
            </div>
            <h3 className="text-lg font-semibold text-slate-800">Productivity Insights</h3>
          </div>
          <p className="text-slate-600 text-sm leading-relaxed">
            Track your note-taking habits to improve productivity. The chart above shows your note distribution across different categories, 
            helping you identify your most active areas and optimize your workflow.
          </p>
        </div>
      </div>
    </div>
  );
}

export default DashBoard;