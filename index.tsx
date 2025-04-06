import React, { useState, useEffect } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';

const ForestDashboardEditor = () => {
  // Estado para modo de edição
  const [isEditMode, setIsEditMode] = useState(false);
  const [activeTab, setActiveTab] = useState('chart');
  const [selectedMonth, setSelectedMonth] = useState(10); // Outubro
  const [selectedYear, setSelectedYear] = useState(2024);
  const [showTreeCatalog, setShowTreeCatalog] = useState(false);
  const [selectedTreeCategory, setSelectedTreeCategory] = useState(null);
  
  // Dados iniciais
  const [focusTime, setFocusTime] = useState({
    totalHours: 262,
    trees: 408,
    flowers: 6
  });
  
  // Estado para dados diários
  const [dailyData, setDailyData] = useState(() => {
    // Gera dados diários para o mês selecionado
    const daysInMonth = new Date(selectedYear, selectedMonth, 0).getDate();
    return Array.from({ length: daysInMonth }, (_, i) => {
      const day = i + 1;
      return { 
        day: `${day.toString().padStart(2, '0')}/${selectedMonth.toString().padStart(2, '0')}`, 
        minutes: Math.floor(Math.random() * 800) + 200 
      };
    });
  });
  
  // Estado para dados de categoria
  const [categoryData, setCategoryData] = useState([
    { name: "Work", value: 25, hours: 65.3, color: "#A499E8", icon: "💼", treeType: 0 },
    { name: "Study", value: 18, hours: 48.3, color: "#D2864B", icon: "💻", treeType: 1 },
    { name: "Gaming", value: 17, hours: 45.1, color: "#F8AD5A", icon: "🎮", treeType: 2 },
    { name: "Photo Editing", value: 12, hours: 30.8, color: "#B5726A", icon: "📸", treeType: 3 },
    { name: "Developer", value: 9, hours: 22.3, color: "#67BBAA", icon: "🔒", treeType: 4 },
    { name: "Exercises", value: 8, hours: 19.8, color: "#F5D572", icon: "🏃", treeType: 5 },
    { name: "Reading", value: 7, hours: 17.3, color: "#E991A9", icon: "😍", treeType: 6 },
    { name: "Design", value: 5, hours: 13.2, color: "#A6CC7E", icon: "🖌️", treeType: 7 }
  ]);
  
  // Catálogo de árvores
  const treeCatalog = [
    { id: 0, name: "Pine", emoji: "🌲", color: "#2D6A4F" },
    { id: 1, name: "Evergreen", emoji: "🌳", color: "#40916C" },
    { id: 2, name: "Palm", emoji: "🌴", color: "#52B788" },
    { id: 3, name: "Deciduous", emoji: "🍃", color: "#74C69D" },
    { id: 4, name: "Cactus", emoji: "🌵", color: "#95D5B2" },
    { id: 5, name: "Cherry Blossom", emoji: "🌸", color: "#FAC7D0" },
    { id: 6, name: "Maple", emoji: "🍁", color: "#C1121F" },
    { id: 7, name: "Bamboo", emoji: "🎋", color: "#B4E197" },
    { id: 8, name: "Bonsai", emoji: "🪴", color: "#567A49" },
    { id: 9, name: "Willow", emoji: "🌿", color: "#709775" },
    { id: 10, name: "Fir", emoji: "🎄", color: "#0B6E4F" },
    { id: 11, name: "Oak", emoji: "🪵", color: "#7F4F24" },
    { id: 12, name: "Sakura", emoji: "🌸", color: "#FFCAD4" },
    { id: 13, name: "Baobab", emoji: "🌳", color: "#6C584C" },
    { id: 14, name: "Birch", emoji: "🌳", color: "#F0EFEB" },
    { id: 15, name: "Redwood", emoji: "🌲", color: "#A75A46" },
    { id: 16, name: "Cypress", emoji: "🌲", color: "#344E41" },
    { id: 17, name: "Acacia", emoji: "🌳", color: "#DDA15E" },
    { id: 18, name: "Sequoia", emoji: "🌲", color: "#583101" },
    { id: 19, name: "Ginkgo", emoji: "🍃", color: "#FFCC29" },
    { id: 20, name: "Olive", emoji: "🫒", color: "#606C38" },
    { id: 21, name: "Cedar", emoji: "🌲", color: "#283618" },
    { id: 22, name: "Mangrove", emoji: "🌿", color: "#386641" },
    { id: 23, name: "Coconut", emoji: "🥥", color: "#BC6C25" },
    { id: 24, name: "Eucalyptus", emoji: "🌿", color: "#87BFFF" },
    { id: 25, name: "Juniper", emoji: "🌿", color: "#6A994E" },
    { id: 26, name: "Mahogany", emoji: "🪵", color: "#632626" },
    { id: 27, name: "Walnut", emoji: "🌰", color: "#5C4033" },
    { id: 28, name: "Beach", emoji: "🏝️", color: "#FFD166" },
    { id: 29, name: "Spruce", emoji: "🌲", color: "#004B23" }
  ];
  
  // Atualiza o período baseado no mês e ano selecionados
  const getPeriod = () => {
    const startDate = `${selectedMonth.toString().padStart(2, '0')}.01`;
    const lastDay = new Date(selectedYear, selectedMonth, 0).getDate();
    const endDate = `${selectedMonth.toString().padStart(2, '0')}.${lastDay}`;
    return `${startDate} — ${endDate} ${selectedYear}`;
  };
  
  // Atualiza os dados diários quando o mês/ano mudam
  useEffect(() => {
    const daysInMonth = new Date(selectedYear, selectedMonth, 0).getDate();
    setDailyData(Array.from({ length: daysInMonth }, (_, i) => {
      const day = i + 1;
      return { 
        day: `${day.toString().padStart(2, '0')}/${selectedMonth.toString().padStart(2, '0')}`, 
        minutes: Math.floor(Math.random() * 800) + 200 
      };
    }));
  }, [selectedMonth, selectedYear]);
  
  // Calcula o total de horas com base nos dados diários
  useEffect(() => {
    const totalMinutes = dailyData.reduce((acc, day) => acc + day.minutes, 0);
    const totalHours = Math.round(totalMinutes / 60 * 10) / 10;
    setFocusTime(prev => ({ ...prev, totalHours }));
  }, [dailyData]);
  
  // Atualiza as horas das categorias quando o total de horas muda
  useEffect(() => {
    setCategoryData(prev => 
      prev.map(category => ({
        ...category,
        hours: Math.round(focusTime.totalHours * (category.value / 100) * 10) / 10
      }))
    );
  }, [focusTime.totalHours]);
  
  // Funções para renderização
  const getMaxBarHeight = () => {
    return Math.max(...dailyData.map(item => item.minutes));
  };
  
  const handleEditMinutes = (index, value) => {
    const newValue = parseInt(value);
    if (!isNaN(newValue)) {
      const newData = [...dailyData];
      newData[index] = { ...newData[index], minutes: newValue };
      setDailyData(newData);
    }
  };
  
  const handleEditCategory = (index, field, value) => {
    const newData = [...categoryData];
    
    if (field === 'value') {
      const newValue = parseInt(value);
      if (!isNaN(newValue)) {
        newData[index] = { ...newData[index], value: newValue };
        
        // Recalculate hours based on new percentage
        newData[index].hours = Math.round(focusTime.totalHours * (newValue / 100) * 10) / 10;
      }
    } else {
      newData[index] = { ...newData[index], [field]: value };
    }
    
    setCategoryData(newData);
  };
  
  const selectTreeForCategory = (categoryIndex, treeId) => {
    const newData = [...categoryData];
    newData[categoryIndex] = { ...newData[categoryIndex], treeType: treeId };
    setCategoryData(newData);
    setShowTreeCatalog(false);
    setSelectedTreeCategory(null);
  };
  
  const handleEditTotalHours = (value) => {
    const newValue = parseFloat(value);
    if (!isNaN(newValue)) {
      setFocusTime(prev => ({ ...prev, totalHours: newValue }));
    }
  };
  
  // Renderização da floresta virtual
  const renderForest = () => {
    return (
      <div className="relative w-full h-64 bg-green-200 rounded-lg overflow-hidden">
        <div className="absolute inset-0 flex flex-wrap items-center justify-center p-2">
          {categoryData.map((category, index) => {
            const count = Math.floor((category.value / 100) * 30); // Número de árvores baseado na porcentagem
            const tree = treeCatalog[category.treeType];
            
            return Array.from({ length: count }).map((_, i) => (
              <div 
                key={`${index}-${i}`} 
                className="m-1 w-8 h-8 flex items-center justify-center" 
                style={{ color: tree.color }}
                title={category.name}
              >
                <span style={{ fontSize: '20px' }}>{tree.emoji}</span>
              </div>
            ));
          })}
        </div>
        <div className="absolute bottom-2 right-2 flex items-center">
          <span className="mr-2 text-gray-500">🌳 {focusTime.trees}</span>
          <span className="text-gray-500">🌸 {focusTime.flowers}</span>
        </div>
      </div>
    );
  };
  
  // Renderização do gráfico de barras
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
              >
                {isEditMode ? (
                  <input 
                    type="number" 
                    value={day.minutes}
                    onChange={(e) => handleEditMinutes(index, e.target.value)}
                    className="w-12 mb-1 text-xs border p-1 text-center"
                  />
                ) : null}
                <div 
                  className="w-full bg-teal-400 rounded-t transition-all duration-300 cursor-pointer"
                  style={{ height: `${heightPercentage}%`, minWidth: '10px' }}
                  onClick={() => isEditMode && handleEditMinutes(index, prompt('Minutos:', day.minutes))}
                ></div>
                {index % 5 === 0 && (
                  <div className="text-xs text-gray-500 mt-1">{day.day.split('/')[0]}</div>
                )}
              </div>
            );
          })}
        </div>
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
                  data={categoryData}
                  cx="50%"
                  cy="50%"
                  innerRadius={35}
                  outerRadius={60}
                  paddingAngle={2}
                  dataKey="value"
                >
                  {categoryData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="w-full md:w-1/2">
            <div className="grid grid-cols-1 gap-1">
              {categoryData.map((category, index) => {
                const tree = treeCatalog[category.treeType];
                
                return (
                  <div key={index} className="flex items-center text-xs">
                    {isEditMode ? (
                      <>
                        <input 
                          type="color" 
                          value={category.color}
                          onChange={(e) => handleEditCategory(index, 'color', e.target.value)}
                          className="w-5 h-5 mr-1 border-none"
                        />
                        <div 
                          className="mr-1 cursor-pointer" 
                          onClick={() => {
                            setSelectedTreeCategory(index);
                            setShowTreeCatalog(true);
                          }}
                          style={{ color: tree.color }}
                        >
                          {tree.emoji}
                        </div>
                        <input 
                          type="text" 
                          value={category.name}
                          onChange={(e) => handleEditCategory(index, 'name', e.target.value)}
                          className="w-24 p-1 mr-1 text-xs border"
                        />
                        <input 
                          type="number" 
                          value={category.value}
                          onChange={(e) => handleEditCategory(index, 'value', e.target.value)}
                          className="w-12 p-1 mr-1 text-xs border text-center"
                        />
                        <span className="text-gray-500">{category.hours} H</span>
                      </>
                    ) : (
                      <>
                        <div 
                          className="w-3 h-3 rounded-full mr-1" 
                          style={{ backgroundColor: category.color }}
                        ></div>
                        <span className="mr-1" style={{ color: tree.color }}>{tree.emoji}</span>
                        <span className="mr-2">{category.name}</span>
                        <span className="mr-2 text-gray-600">{category.value}%</span>
                        <span className="text-gray-500">{category.hours} H</span>
                      </>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    );
  };
  
  // Renderização do catálogo de árvores
  const renderTreeCatalog = () => {
    if (!showTreeCatalog) return null;
    
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-10">
        <div className="bg-white p-4 rounded-lg max-w-2xl max-h-96 overflow-y-auto">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-medium">Catálogo de Árvores</h3>
            <button 
              onClick={() => {
                setShowTreeCatalog(false);
                setSelectedTreeCategory(null);
              }}
              className="text-gray-500 hover:text-gray-700"
            >
              ✕
            </button>
          </div>
          
          <div className="grid grid-cols-5 gap-4">
            {treeCatalog.map((tree) => (
              <div 
                key={tree.id}
                onClick={() => selectTreeForCategory(selectedTreeCategory, tree.id)}
                className="p-2 border rounded-lg flex flex-col items-center justify-center cursor-pointer hover:bg-gray-100"
              >
                <div style={{ color: tree.color, fontSize: '28px' }}>{tree.emoji}</div>
                <div className="text-xs mt-1">{tree.name}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  };
  
  const renderMonthYearSelector = () => {
    const months = [
      { value: 1, label: 'Janeiro' },
      { value: 2, label: 'Fevereiro' },
      { value: 3, label: 'Março' },
      { value: 4, label: 'Abril' },
      { value: 5, label: 'Maio' },
      { value: 6, label: 'Junho' },
      { value: 7, label: 'Julho' },
      { value: 8, label: 'Agosto' },
      { value: 9, label: 'Setembro' },
      { value: 10, label: 'Outubro' },
      { value: 11, label: 'Novembro' },
      { value: 12, label: 'Dezembro' }
    ];
    
    return (
      <div className="flex space-x-2 mb-4">
        <select 
          value={selectedMonth}
          onChange={(e) => setSelectedMonth(parseInt(e.target.value))}
          className="p-1 border rounded text-sm"
        >
          {months.map(month => (
            <option key={month.value} value={month.value}>{month.label}</option>
          ))}
        </select>
        
        <select 
          value={selectedYear}
          onChange={(e) => setSelectedYear(parseInt(e.target.value))}
          className="p-1 border rounded text-sm"
        >
          {Array.from({ length: 10 }, (_, i) => 2020 + i).map(year => (
            <option key={year} value={year}>{year}</option>
          ))}
        </select>
      </div>
    );
  };
  
  // Exporta os dados como JSON
  const exportData = () => {
    const data = {
      focusTime,
      dailyData,
      categoryData,
      period: getPeriod(),
      month: selectedMonth,
      year: selectedYear
    };
    
    const dataStr = JSON.stringify(data, null, 2);
    const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
    
    const exportFileDefaultName = `forest-data-${selectedMonth}-${selectedYear}.json`;
    
    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileDefaultName);
    linkElement.click();
  };
  
  // Importa dados a partir de JSON
  const importData = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    
    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const data = JSON.parse(event.target.result);
        if (data.focusTime) setFocusTime(data.focusTime);
        if (data.dailyData) setDailyData(data.dailyData);
        if (data.categoryData) setCategoryData(data.categoryData);
        if (data.month) setSelectedMonth(data.month);
        if (data.year) setSelectedYear(data.year);
      } catch (error) {
        console.error("Erro ao importar dados:", error);
        alert("Erro ao importar dados. Verifique o formato do arquivo.");
      }
    };
    reader.readAsText(file);
  };
  
  return (
    <div className="w-full max-w-2xl p-4 font-sans bg-white rounded-lg shadow">
      {/* Barra de ferramentas */}
      <div className="flex justify-between items-center mb-4">
        <button 
          onClick={() => setIsEditMode(!isEditMode)}
          className={`px-3 py-1 rounded text-sm ${isEditMode ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
        >
          {isEditMode ? 'Concluir Edição' : 'Editar Dashboard'}
        </button>
        
        <div className="flex space-x-2">
          <button 
            onClick={exportData}
            className="px-3 py-1 bg-green-500 text-white rounded text-sm"
          >
            Exportar
          </button>
          
          <label className="px-3 py-1 bg-purple-500 text-white rounded text-sm cursor-pointer">
            Importar
            <input type="file" className="hidden" accept=".json" onChange={importData} />
          </label>
        </div>
      </div>
      
      {/* Seletor de mês e ano */}
      {isEditMode && renderMonthYearSelector()}
      
      {/* Cabeçalho */}
      <div className="flex justify-between items-center mb-4">
        <div className="text-gray-500">{getPeriod()}</div>
        {isEditMode ? (
          <div className="flex space-x-2">
            <label className="flex items-center">
              <span className="mr-1">🌳</span>
              <input 
                type="number" 
                value={focusTime.trees}
                onChange={(e) => setFocusTime(prev => ({ ...prev, trees: parseInt(e.target.value) || 0 }))}
                className="w-16 p-1 text-sm border"
              />
            </label>
            <label className="flex items-center">
              <span className="mr-1">🌸</span>
              <input 
                type="number" 
                value={focusTime.flowers}
                onChange={(e) => setFocusTime(prev => ({ ...prev, flowers: parseInt(e.target.value) || 0 }))}
                className="w-16 p-1 text-sm border"
              />
            </label>
          </div>
        ) : (
          <div className="flex items-center space-x-2">
            <span className="text-gray-500">🌳 {focusTime.trees}</span>
            <span className="text-gray-500">🌸 {focusTime.flowers}</span>
          </div>
        )}
      </div>
      
      {/* Tempo total */}
      <div className="flex justify-between items-center mb-4">
        <div>
          <div className="text-gray-500">Tempo total</div>
          <div className="text-gray-500">de foco</div>
        </div>
        {isEditMode ? (
          <div className="flex items-baseline">
            <input 
              type="number" 
              value={focusTime.totalHours}
              onChange={(e) => handleEditTotalHours(e.target.value)}
              className="w-20 p-1 text-xl border text-right"
              step="0.1"
            />
            <span className="text-2xl text-gray-600 ml-2">horas</span>
          </div>
        ) : (
          <div className="text-5xl text-gray-600 font-light">{focusTime.totalHours},0 <span className="text-2xl">horas</span></div>
        )}
      </div>
      
      {/* Visualização da floresta */}
      {renderForest()}
      
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
      
      {/* Catálogo de árvores */}
      {renderTreeCatalog()}
    </div>
  );
};

export default ForestDashboardEditor;
