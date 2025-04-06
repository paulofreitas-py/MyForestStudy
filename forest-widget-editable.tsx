import React, { useState } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';

const EditableForestWidget = () => {
  // Estado para modo de edição
  const [isEditing, setIsEditing] = useState(false);
  
  // Estados para os dados editáveis
  const [period, setPeriod] = useState("10.01 — 10.31 2024");
  const [totalHours, setTotalHours] = useState(262);
  const [trees, setTrees] = useState(408);
  const [flowers, setFlowers] = useState(6);
  
  // Estado para as categorias
  const [categories, setCategories] = useState([
    { name: "Work", value: 25, hours: 65.3, color: "#A499E8", icon: "💼" },
    { name: "Study", value: 18, hours: 48.3, color: "#D2864B", icon: "💻" },
    { name: "Gaming", value: 17, hours: 45.1, color: "#F8AD5A", icon: "🎮" },
    { name: "Photo Editing", value: 12, hours: 30.8, color: "#B5726A", icon: "📸" },
    { name: "Developer", value: 9, hours: 22.3, color: "#67BBAA", icon: "🔒" },
    { name: "Exercises", value: 8, hours: 19.8, color: "#F5D572", icon: "🏃" },
    { name: "Reading", value: 7, hours: 17.3, color: "#E991A9", icon: "😍" },
    { name: "Design", value: 5, hours: 13.2, color: "#A6CC7E", icon: "🖌️" }
  ]);
  
  // Estado para dados diários
  const [dailyData, setDailyData] = useState([
    { day: '01', minutes: 480 },
    { day: '02', minutes: 1050 },
    { day: '03', minutes: 500 },
    { day: '04', minutes: 620 },
    { day: '05', minutes: 780 },
    { day: '06', minutes: 450 },
    { day: '07', minutes: 650 },
    { day: '08', minutes: 520 },
    { day: '09', minutes: 220 },
    { day: '10', minutes: 750 },
    { day: '11', minutes: 450 },
    { day: '12', minutes: 400 },
    { day: '13', minutes: 620 },
    { day: '14', minutes: 550 },
    { day: '15', minutes: 500 },
    { day: '16', minutes: 400 },
    { day: '17', minutes: 380 },
    { day: '18', minutes: 550 },
    { day: '19', minutes: 270 },
    { day: '20', minutes: 430 },
    { day: '21', minutes: 600 },
    { day: '22', minutes: 580 },
    { day: '23', minutes: 600 },
    { day: '24', minutes: 580 },
    { day: '25', minutes: 300 },
    { day: '26', minutes: 350 },
    { day: '27', minutes: 380 },
    { day: '28', minutes: 520 },
    { day: '29', minutes: 350 },
    { day: '30', minutes: 520 },
    { day: '31', minutes: 420 }
  ]);
  
  const [activeTab, setActiveTab] = useState('chart');
  const [editingCategory, setEditingCategory] = useState(null);
  const [editingDay, setEditingDay] = useState(null);
  
  // Seleção de mês e ano
  const [month, setMonth] = useState(10);
  const [year, setYear] = useState(2024);
  
  // Função para atualizar o período baseado no mês e ano
  const updatePeriod = () => {
    const getDaysInMonth = (month, year) => {
      return new Date(year, month, 0).getDate();
    };
    
    const daysInMonth = getDaysInMonth(month, year);
    setPeriod(`${month.toString().padStart(2, '0')}.01 — ${month.toString().padStart(2, '0')}.${daysInMonth} ${year}`);
    
    // Atualizar dados diários para corresponder ao número de dias no mês
    const newDailyData = [...dailyData];
    while (newDailyData.length > daysInMonth) {
      newDailyData.pop();
    }
    
    while (newDailyData.length < daysInMonth) {
      newDailyData.push({ 
        day: (newDailyData.length + 1).toString().padStart(2, '0'), 
        minutes: Math.floor(Math.random() * 600) + 200 
      });
    }
    
    // Atualizar os dias
    newDailyData.forEach((item, index) => {
      item.day = (index + 1).toString().padStart(2, '0');
    });
    
    setDailyData(newDailyData);
  };
  
  // Função para calcular as horas baseado em percentagens
  const recalculateHours = () => {
    const newCategories = [...categories];
    const totalPercentage = newCategories.reduce((sum, cat) => sum + cat.value, 0);
    
    if (totalPercentage > 0) {
      newCategories.forEach(cat => {
        cat.hours = parseFloat(((cat.value / 100) * totalHours).toFixed(1));
      });
      setCategories(newCategories);
    }
  };
  
  // Funções para renderização
  const getMaxBarHeight = () => {
    return Math.max(...dailyData.map(item => item.minutes));
  };
  
  // Renderização de cada árvore na floresta virtual (simplificada)
  const renderForest = () => {
    return (
      <div className="relative w-full h-64 bg-green-200 rounded-lg overflow-hidden">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-lg text-gray-500 font-medium">Floresta Virtual</div>
        </div>
        <div className="absolute bottom-2 right-2 flex items-center">
          <span className="mr-2 text-gray-500">🌳 {trees}</span>
          <span className="text-gray-500">🌸 {flowers}</span>
        </div>
      </div>
    );
  };
  
  // Renderização do gráfico de barras para distribuição diária
  const renderBarChart = () => {
    const maxHeight = getMaxBarHeight();
    
    return (
      <div className="mt-4 p-4 border rounded-lg">
        <div className="text-sm text-gray-500 mb-2">Distribuição do tempo de foco</div>
        <div className="flex items-end h-40 space-x-1 overflow-x-auto">
          {dailyData.map((day, index) => {
            const heightPercentage = (day.minutes / maxHeight) * 100;
            return (
              <div 
                key={index} 
                className="flex-1 min-w-4 flex flex-col items-center"
                onClick={() => isEditing && setEditingDay(index)}
              >
                {editingDay === index && isEditing ? (
                  <input
                    type="number"
                    className="w-16 text-center mb-1 text-xs"
                    value={day.minutes}
                    onChange={(e) => {
                      const newDailyData = [...dailyData];
                      newDailyData[index].minutes = parseInt(e.target.value) || 0;
                      setDailyData(newDailyData);
                    }}
                    onBlur={() => setEditingDay(null)}
                    autoFocus
                  />
                ) : (
                  <div 
                    className="w-full bg-teal-400 rounded-t cursor-pointer"
                    style={{ height: `${heightPercentage}%` }}
                  ></div>
                )}
                {index % 5 === 0 && (
                  <div className="text-xs text-gray-500 mt-1">{day.day}</div>
                )}
              </div>
            );
          })}
        </div>
        {isEditing && (
          <div className="mt-2 text-xs text-gray-500">
            Clique em uma barra para editar os minutos
          </div>
        )}
      </div>
    );
  };
  
  // Renderização do gráfico de categorias
  const renderCategoryChart = () => {
    return (
      <div className="mt-4 p-4 border rounded-lg">
        <div className="text-sm text-gray-500 mb-2">Distribuição de marcadores</div>
        <div className="flex flex-col md:flex-row">
          <div className="w-full md:w-1/2">
            <ResponsiveContainer width="100%" height={150}>
              <PieChart>
                <Pie
                  data={categories}
                  cx="50%"
                  cy="50%"
                  innerRadius={35}
                  outerRadius={60}
                  paddingAngle={2}
                  dataKey="value"
                >
                  {categories.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="w-full md:w-1/2">
            <div className="grid grid-cols-1 gap-1">
              {categories.map((category, index) => (
                <div 
                  key={index} 
                  className="flex items-center text-xs cursor-pointer"
                  onClick={() => isEditing && setEditingCategory(index)}
                >
                  <div 
                    className="w-3 h-3 rounded-full mr-1" 
                    style={{ backgroundColor: category.color }}
                  ></div>
                  <span className="mr-1">{category.icon}</span>
                  <span className="mr-2">{category.name}</span>
                  
                  {editingCategory === index && isEditing ? (
                    <>
                      <input
                        type="number"
                        className="w-12 text-center mr-2"
                        value={category.value}
                        onChange={(e) => {
                          const newCategories = [...categories];
                          newCategories[index].value = parseInt(e.target.value) || 0;
                          setCategories(newCategories);
                        }}
                        onBlur={recalculateHours}
                      />%
                    </>
                  ) : (
                    <span className="mr-2 text-gray-600">{category.value}%</span>
                  )}
                  
                  <span className="text-gray-500">{category.hours} H</span>
                </div>
              ))}
            </div>
            {isEditing && (
              <div className="mt-2 text-xs text-gray-500">
                Clique em uma categoria para editar a porcentagem
              </div>
            )}
          </div>
        </div>
      </div>
    );
  };
  
  // Painel de edição
  const renderEditPanel = () => {
    return (
      <div className="mt-4 p-4 border rounded-lg bg-gray-50">
        <h3 className="text-sm font-medium mb-3">Painel de Edição</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <div className="mb-3">
              <label className="block text-xs mb-1">Mês</label>
              <select 
                className="w-full p-1 border rounded"
                value={month}
                onChange={(e) => setMonth(parseInt(e.target.value))}
              >
                {[...Array(12)].map((_, i) => (
                  <option key={i} value={i+1}>{i+1}</option>
                ))}
              </select>
            </div>
            
            <div className="mb-3">
              <label className="block text-xs mb-1">Ano</label>
              <input 
                type="number" 
                className="w-full p-1 border rounded"
                value={year}
                onChange={(e) => setYear(parseInt(e.target.value) || 2024)}
              />
            </div>
            
            <button 
              className="bg-blue-500 text-white px-3 py-1 rounded text-sm"
              onClick={updatePeriod}
            >
              Atualizar Período
            </button>
          </div>
          
          <div>
            <div className="mb-3">
              <label className="block text-xs mb-1">Tempo Total (horas)</label>
              <input 
                type="number" 
                step="0.1"
                className="w-full p-1 border rounded"
                value={totalHours}
                onChange={(e) => setTotalHours(parseFloat(e.target.value) || 0)}
                onBlur={recalculateHours}
              />
            </div>
            
            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="block text-xs mb-1">Árvores</label>
                <input 
                  type="number" 
                  className="w-full p-1 border rounded"
                  value={trees}
                  onChange={(e) => setTrees(parseInt(e.target.value) || 0)}
                />
              </div>
              
              <div>
                <label className="block text-xs mb-1">Flores</label>
                <input 
                  type="number" 
                  className="w-full p-1 border rounded"
                  value={flowers}
                  onChange={(e) => setFlowers(parseInt(e.target.value) || 0)}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };
  
  // Função para exportar os dados em formato JSON
  const exportData = () => {
    const data = {
      period,
      totalHours,
      trees,
      flowers,
      categories,
      dailyData
    };
    
    const dataStr = JSON.stringify(data, null, 2);
    const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
    
    const exportFileDefaultName = `forest-data-${period.replace(/\s/g, '-')}.json`;
    
    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileDefaultName);
    linkElement.click();
  };
  
  return (
    <div className="w-full max-w-lg p-4 font-sans bg-white rounded-lg shadow">
      {/* Toggle Edit Mode */}
      <div className="flex justify-end mb-2">
        <button 
          className={`px-3 py-1 rounded text-sm ${isEditing ? 'bg-red-500 text-white' : 'bg-blue-500 text-white'}`}
          onClick={() => setIsEditing(!isEditing)}
        >
          {isEditing ? 'Concluir Edição' : 'Editar Dashboard'}
        </button>
        
        {isEditing && (
          <button 
            className="ml-2 px-3 py-1 rounded text-sm bg-green-500 text-white"
            onClick={exportData}
          >
            Exportar Dados
          </button>
        )}
      </div>
      
      {/* Cabeçalho */}
      <div className="flex justify-between items-center mb-4">
        <div className="text-gray-500">
          {isEditing ? (
            <input 
              type="text" 
              className="p-1 border rounded w-40"
              value={period}
              onChange={(e) => setPeriod(e.target.value)}
            />
          ) : (
            period
          )}
        </div>
        <div className="flex items-center space-x-2">
          <span className="text-gray-500">🌳 {trees}</span>
          <span className="text-gray-500">🌸 {flowers}</span>
        </div>
      </div>
      
      {/* Tempo total */}
      <div className="flex justify-between items-center mb-4">
        <div>
          <div className="text-gray-500">Tempo total</div>
          <div className="text-gray-500">de foco</div>
        </div>
        <div className="text-5xl text-gray-600 font-light">
          {isEditing ? (
            <input 
              type="number" 
              step="0.1"
              className="p-1 border rounded w-24 text-2xl"
              value={totalHours}
              onChange={(e) => setTotalHours(parseFloat(e.target.value) || 0)}
              onBlur={recalculateHours}
            />
          ) : (
            `${totalHours},0`
          )}
          <span className="text-2xl"> horas</span>
        </div>
      </div>
      
      {/* Visualização da floresta */}
      {renderForest()}
      
      {/* Painel de edição */}
      {isEditing && renderEditPanel()}
      
      {/* Tabs */}
      <div className="flex mt-4 border-b">
        <button 
          className={`px-4 py-2 text-sm ${activeTab === 'chart' ? 'border-b-2 border-teal-500 text-teal-600' : 'text-gray-500'}`}
          onClick={() => setActiveTab('chart')}
        >
          Gráfico Diário
        </button>
        <button 
          className={`px-4 py-2 text-sm ${activeTab === 'category' ? 'border-b-2 border-teal-500 text-teal-600' : 'text-gray-500'}`}
          onClick={() => setActiveTab('category')}
        >
          Categorias
        </button>
      </div>
      
      {/* Conteúdo baseado na tab ativa */}
      {activeTab === 'chart' ? renderBarChart() : renderCategoryChart()}
      
      {/* Rodapé */}
      <div className="mt-4 flex justify-center">
        <div className="flex items-center text-gray-500 text-sm">
          <span className="mr-1">🌳</span>
          <span>Forest</span>
        </div>
      </div>
    </div>
  );
};

export default EditableForestWidget;
