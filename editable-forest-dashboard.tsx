import React, { useState, useEffect } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';

const TREE_CATALOG = [
  { id: 1, name: "Pine", emoji: "🌲", description: "Coniferous evergreen" },
  { id: 2, name: "Oak", emoji: "🌳", description: "Deciduous hardwood" },
  { id: 3, name: "Palm", emoji: "🌴", description: "Tropical tree" },
  { id: 4, name: "Bamboo", emoji: "🎋", description: "Fast-growing grass" },
  { id: 5, name: "Cherry Blossom", emoji: "🌸", description: "Flowering tree" },
  { id: 6, name: "Evergreen", emoji: "🌲", description: "Year-round green" },
  { id: 7, name: "Maple", emoji: "🍁", description: "Fall foliage" },
  { id: 8, name: "Bonsai", emoji: "🪴", description: "Miniature tree" },
  { id: 9, name: "Cactus", emoji: "🌵", description: "Desert plant" },
  { id: 10, name: "Willow", emoji: "🌳", description: "Weeping tree" },
  { id: 11, name: "Cypress", emoji: "🌲", description: "Conical conifer" },
  { id: 12, name: "Sakura", emoji: "🌸", description: "Japanese cherry" },
  { id: 13, name: "Sequoia", emoji: "🌲", description: "Giant redwood" },
  { id: 14, name: "Baobab", emoji: "🌳", description: "African tree" },
  { id: 15, name: "Fir", emoji: "🌲", description: "Pyramid-shaped" },
  { id: 16, name: "Olive", emoji: "🫒", description: "Mediterranean tree" },
  { id: 17, name: "Apple", emoji: "🍎", description: "Fruit tree" },
  { id: 18, name: "Cedar", emoji: "🌲", description: "Aromatic wood" },
  { id: 19, name: "Birch", emoji: "🌳", description: "White bark" },
  { id: 20, name: "Aspen", emoji: "🌳", description: "Quaking leaves" },
  { id: 21, name: "Mangrove", emoji: "🌳", description: "Coastal tree" },
  { id: 22, name: "Redwood", emoji: "🌲", description: "Tall conifer" },
  { id: 23, name: "Acacia", emoji: "🌳", description: "Savanna tree" },
  { id: 24, name: "Ginkgo", emoji: "🌳", description: "Ancient species" },
  { id: 25, name: "Juniper", emoji: "🌲", description: "Berry-producing" },
  { id: 26, name: "Magnolia", emoji: "🌸", description: "Large flowers" },
  { id: 27, name: "Eucalyptus", emoji: "🌳", description: "Australian tree" },
  { id: 28, name: "Banyan", emoji: "🌳", description: "Aerial roots" },
  { id: 29, name: "Peach", emoji: "🍑", description: "Fruit tree" },
  { id: 30, name: "Coconut", emoji: "🥥", description: "Palm variety" }
];

const COLOR_PALETTE = [
  "#A499E8", "#D2864B", "#F8AD5A", "#B5726A", 
  "#67BBAA", "#F5D572", "#E991A9", "#A6CC7E",
  "#6A8CDD", "#D46A6A", "#65B891", "#FFCB77",
  "#9D4EDD", "#5E60CE", "#48BFE3", "#64DFDF"
];

const MONTHS = [
  "Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho",
  "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"
];

const EditableForestDashboard = () => {
  const currentYear = new Date().getFullYear();
  const currentMonth = new Date().getMonth();
  
  // Estado principal
  const [activeTab, setActiveTab] = useState('chart');
  const [editMode, setEditMode] = useState(false);
  const [showTreeCatalog, setShowTreeCatalog] = useState(false);
  const [selectedCategoryIndex, setSelectedCategoryIndex] = useState(null);
  
  // Estados para dados editáveis
  const [month, setMonth] = useState(currentMonth);
  const [year, setYear] = useState(currentYear);
  const [totalHours, setTotalHours] = useState(262);
  const [trees, setTrees] = useState(408);
  const [flowers, setFlowers] = useState(6);
  
  // Dados das categorias (atividades)
  const [categories, setCategories] = useState([
    { 
      name: "Work", 
      value: 25, 
      hours: 65.3, 
      color: "#A499E8", 
      icon: "💼",
      tree: TREE_CATALOG[0]
    },
    { 
      name: "Study", 
      value: 18, 
      hours: 48.3, 
      color: "#D2864B", 
      icon: "💻",
      tree: TREE_CATALOG[1]
    },
    { 
      name: "Gaming", 
      value: 17, 
      hours: 45.1, 
      color: "#F8AD5A", 
      icon: "🎮",
      tree: TREE_CATALOG[2]
    },
    { 
      name: "Photo Editing", 
      value: 12, 
      hours: 30.8, 
      color: "#B5726A", 
      icon: "📸",
      tree: TREE_CATALOG[3]
    },
    { 
      name: "Developer", 
      value: 9, 
      hours: 22.3, 
      color: "#67BBAA", 
      icon: "🔒",
      tree: TREE_CATALOG[4]
    },
    { 
      name: "Exercises", 
      value: 8, 
      hours: 19.8, 
      color: "#F5D572", 
      icon: "🏃",
      tree: TREE_CATALOG[5]
    },
    { 
      name: "Reading", 
      value: 7, 
      hours: 17.3, 
      color: "#E991A9", 
      icon: "😍",
      tree: TREE_CATALOG[6]
    },
    { 
      name: "Design", 
      value: 5, 
      hours: 13.2, 
      color: "#A6CC7E", 
      icon: "🖌️",
      tree: TREE_CATALOG[7]
    }
  ]);
  
  // Dados diários
  const [dailyData, setDailyData] = useState(() => {
    // Gerar dados para cada dia do mês
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    return Array.from({ length: daysInMonth }, (_, i) => {
      const day = i + 1;
      return {
        day: `${day.toString().padStart(2, '0')}/${(month + 1).toString().padStart(2, '0')}`,
        minutes: Math.floor(Math.random() * 800) + 200 // 200-1000 minutos
      };
    });
  });
  
  // Recalcular dados do mês quando o mês/ano mudar
  useEffect(() => {
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    setDailyData(Array.from({ length: daysInMonth }, (_, i) => {
      const day = i + 1;
      // Manter os dados existentes ou criar novos
      const existingDay = dailyData.find(d => d.day.startsWith(day.toString().padStart(2, '0')));
      return existingDay || {
        day: `${day.toString().padStart(2, '0')}/${(month + 1).toString().padStart(2, '0')}`,
        minutes: Math.floor(Math.random() * 800) + 200
      };
    }));
  }, [month, year]);
  
  // Função para atualizar uma categoria
  const updateCategory = (index, updatedCategory) => {
    const newCategories = [...categories];
    newCategories[index] = updatedCategory;
    setCategories(newCategories);
  };
  
  // Função para adicionar uma nova categoria
  const addCategory = () => {
    if (categories.length >= 10) return; // Limitar a 10 categorias
    
    const newCategory = {
      name: "Nova Atividade",
      value: 5,
      hours: 10,
      color: COLOR_PALETTE[categories.length % COLOR_PALETTE.length],
      icon: "📝",
      tree: TREE_CATALOG[categories.length % TREE_CATALOG.length]
    };
    
    setCategories([...categories, newCategory]);
  };
  
  // Função para remover uma categoria
  const removeCategory = (index) => {
    if (categories.length <= 1) return; // Manter pelo menos uma categoria
    
    const newCategories = categories.filter((_, i) => i !== index);
    // Recalcular as porcentagens
    const totalValue = newCategories.reduce((sum, cat) => sum + cat.value, 0);
    const updatedCategories = newCategories.map(cat => ({
      ...cat,
      value: Math.round((cat.value / totalValue) * 100)
    }));
    
    setCategories(updatedCategories);
  };
  
  // Função para atribuir uma árvore a uma categoria
  const assignTreeToCategory = (treeIndex) => {
    if (selectedCategoryIndex === null) return;
    
    const newCategories = [...categories];
    newCategories[selectedCategoryIndex] = {
      ...newCategories[selectedCategoryIndex],
      tree: TREE_CATALOG[treeIndex]
    };
    
    setCategories(newCategories);
    setShowTreeCatalog(false);
  };
  
  // Renderização de cada árvore na floresta virtual (simplificada)
  const renderForest = () => {
    return (
      <div className="relative w-full h-64 bg-green-200 rounded-lg overflow-hidden">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="grid grid-cols-8 gap-2 p-4">
            {categories.map((category, idx) => (
              <div key={idx} className="flex flex-col items-center">
                <div className="text-2xl">{category.tree?.emoji || "🌱"}</div>
                <div className="text-xs text-gray-700">{category.name}</div>
              </div>
            ))}
          </div>
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
    const maxHeight = Math.max(...dailyData.map(item => item.minutes));
    
    return (
      <div className="mt-4 p-4 border rounded-lg">
        <div className="text-sm text-gray-500 mb-2">Distribuição do tempo de foco</div>
        <div className="flex items-end h-40 space-x-0.5">
          {dailyData.map((day, index) => {
            const heightPercentage = (day.minutes / maxHeight) * 100;
            return (
              <div 
                key={index} 
                className="flex-1 flex flex-col items-center"
              >
                <div 
                  className="w-full bg-teal-400 rounded-t"
                  style={{ height: `${heightPercentage}%` }}
                  title={`${day.day}: ${Math.floor(day.minutes / 60)}h ${day.minutes % 60}min`}
                ></div>
                {(index % 5 === 0 || index === dailyData.length - 1) && (
                  <div className="text-xs text-gray-500 mt-1">{day.day.split('/')[0]}</div>
                )}
              </div>
            );
          })}
        </div>
        {editMode && (
          <div className="mt-4">
            <div className="font-medium text-sm mb-2">Editar dados diários:</div>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
              {dailyData.map((day, index) => (
                <div key={index} className="flex items-center">
                  <label className="text-xs">{day.day}:</label>
                  <input
                    type="number"
                    className="ml-1 p-1 w-16 text-xs border rounded"
                    value={day.minutes}
                    onChange={(e) => {
                      const newValue = Math.max(0, parseInt(e.target.value) || 0);
                      const newDailyData = [...dailyData];
                      newDailyData[index].minutes = newValue;
                      setDailyData(newDailyData);
                    }}
                  />
                </div>
              ))}
            </div>
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
                <div key={index} className="flex items-center text-xs">
                  <div 
                    className="w-3 h-3 rounded-full mr-1" 
                    style={{ backgroundColor: category.color }}
                  ></div>
                  <span className="mr-1">{category.icon}</span>
                  <span className="mr-1">{category.tree?.emoji || "🌱"}</span>
                  <span className="mr-2">{category.name}</span>
                  <span className="mr-2 text-gray-600">{category.value}%</span>
                  <span className="text-gray-500">{category.hours} H</span>
                  {editMode && (
                    <button 
                      className="ml-auto text-xs text-blue-600 hover:text-blue-800"
                      onClick={() => {
                        setSelectedCategoryIndex(index);
                        setShowTreeCatalog(true);
                      }}
                    >
                      Árvore
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
        
        {editMode && (
          <div className="mt-4 border-t pt-4">
            <h3 className="font-medium text-sm mb-2">Editar Categorias:</h3>
            {categories.map((category, index) => (
              <div key={index} className="mb-3 p-2 border rounded bg-gray-50">
                <div className="flex items-center mb-2">
                  <input
                    type="text"
                    className="p-1 border rounded flex-grow mr-2"
                    value={category.name}
                    onChange={(e) => updateCategory(index, { ...category, name: e.target.value })}
                    placeholder="Nome da categoria"
                  />
                  <button 
                    className="px-2 py-1 bg-red-500 text-white rounded text-xs"
                    onClick={() => removeCategory(index)}
                  >
                    Remover
                  </button>
                </div>
                
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block text-xs text-gray-600">Porcentagem (%)</label>
                    <input
                      type="number"
                      className="p-1 border rounded w-full"
                      value={category.value}
                      onChange={(e) => {
                        const newValue = Math.max(1, Math.min(100, parseInt(e.target.value) || 0));
                        updateCategory(index, { ...category, value: newValue });
                      }}
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-gray-600">Horas</label>
                    <input
                      type="number"
                      step="0.1"
                      className="p-1 border rounded w-full"
                      value={category.hours}
                      onChange={(e) => {
                        const newValue = Math.max(0, parseFloat(e.target.value) || 0);
                        updateCategory(index, { ...category, hours: newValue });
                      }}
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-gray-600">Ícone</label>
                    <input
                      type="text"
                      className="p-1 border rounded w-full"
                      value={category.icon}
                      onChange={(e) => updateCategory(index, { ...category, icon: e.target.value })}
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-gray-600">Cor</label>
                    <input
                      type="color"
                      className="p-1 border rounded w-full h-8"
                      value={category.color}
                      onChange={(e) => updateCategory(index, { ...category, color: e.target.value })}
                    />
                  </div>
                </div>
              </div>
            ))}
            
            <button 
              className="w-full py-2 bg-green-500 text-white rounded"
              onClick={addCategory}
            >
              + Adicionar Categoria
            </button>
          </div>
        )}
      </div>
    );
  };
  
  // Renderização do catálogo de árvores
  const renderTreeCatalog = () => {
    if (!showTreeCatalog) return null;
    
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white rounded-lg p-4 max-w-lg w-full max-h-[80vh] overflow-y-auto">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-medium">Catálogo de Árvores</h2>
            <button 
              className="text-gray-500 hover:text-gray-700"
              onClick={() => setShowTreeCatalog(false)}
            >
              ✕
            </button>
          </div>
          
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {TREE_CATALOG.map((tree, index) => (
              <div 
                key={index}
                className="p-3 border rounded cursor-pointer hover:bg-gray-100 flex flex-col items-center"
                onClick={() => assignTreeToCategory(index)}
              >
                <div className="text-3xl mb-1">{tree.emoji}</div>
                <div className="text-sm font-medium">{tree.name}</div>
                <div className="text-xs text-gray-500">{tree.description}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  };
  
  return (
    <div className="w-full max-w-2xl p-4 font-sans bg-white rounded-lg shadow">
      {/* Botão de edição */}
      <div className="flex justify-end mb-2">
        <button 
          className={`px-3 py-1 rounded text-sm ${editMode ? 'bg-green-500 text-white' : 'bg-gray-200'}`}
          onClick={() => setEditMode(!editMode)}
        >
          {editMode ? 'Salvar Alterações' : 'Editar Dashboard'}
        </button>
      </div>
      
      {/* Seleção de mês e ano */}
      {editMode && (
        <div className="mb-4 flex items-center justify-between">
          <div className="flex items-center">
            <label className="mr-2 text-sm">Mês:</label>
            <select 
              className="border rounded p-1"
              value={month}
              onChange={(e) => setMonth(parseInt(e.target.value))}
            >
              {MONTHS.map((monthName, idx) => (
                <option key={idx} value={idx}>{monthName}</option>
              ))}
            </select>
          </div>
          
          <div className="flex items-center">
            <label className="mr-2 text-sm">Ano:</label>
            <input
              type="number"
              className="border rounded p-1 w-20"
              value={year}
              onChange={(e) => setYear(parseInt(e.target.value) || currentYear)}
            />
          </div>
        </div>
      )}
      
      {/* Cabeçalho */}
      <div className="flex justify-between items-center mb-4">
        <div className="text-gray-500">
          {MONTHS[month].substring(0, 3)} 01 — {MONTHS[month].substring(0, 3)} {new Date(year, month + 1, 0).getDate()} {year}
        </div>
        <div className="flex items-center space-x-2">
          {editMode ? (
            <>
              <div className="flex items-center">
                <span className="text-gray-500 mr-1">🌳</span>
                <input
                  type="number"
                  className="border rounded p-1 w-16 text-sm"
                  value={trees}
                  onChange={(e) => setTrees(parseInt(e.target.value) || 0)}
                />
              </div>
              <div className="flex items-center">
                <span className="text-gray-500 mr-1">🌸</span>
                <input
                  type="number"
                  className="border rounded p-1 w-16 text-sm"
                  value={flowers}
                  onChange={(e) => setFlowers(parseInt(e.target.value) || 0)}
                />
              </div>
            </>
          ) : (
            <>
              <span className="text-gray-500">🌳 {trees}</span>
              <span className="text-gray-500">🌸 {flowers}</span>
            </>
          )}
        </div>
      </div>
      
      {/* Tempo total */}
      <div className="flex justify-between items-center mb-4">
        <div>
          <div className="text-gray-500">Tempo total</div>
          <div className="text-gray-500">de foco</div>
        </div>
        {editMode ? (
          <div className="flex items-end">
            <input
              type="number"
              step="0.1"
              className="text-4xl text-gray-600 font-light border rounded p-1 w-24"
              value={totalHours}
              onChange={(e) => setTotalHours(parseFloat(e.target.value) || 0)}
            />
            <span className="text-2xl text-gray-600 font-light ml-2">,0 horas</span>
          </div>
        ) : (
          <div className="text-5xl text-gray-600 font-light">{totalHours},0 <span className="text-2xl">horas</span></div>
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
      
      {/* Catálogo de árvores (modal) */}
      {renderTreeCatalog()}
      
      {/* Export Buttons */}
      {editMode && (
        <div className="mt-4 pt-4 border-t">
          <div className="flex justify-between">
            <button 
              className="px-4 py-2 bg-blue-600 text-white rounded"
              onClick={() => {
                // Aqui você implementaria a exportação dos dados para JSON
                const exportData = {
                  month,
                  year,
                  totalHours,
                  trees,
                  flowers,
                  categories,
                  dailyData
                };
                
                alert("Dados exportados! Veja o console.");
                console.log(exportData);
              }}
            >
              Exportar Dados
            </button>
            
            <button 
              className="px-4 py-2 bg-purple-600 text-white rounded"
              onClick={() => {
                // Aqui você implementaria a geração de um SVG estático
                alert("Função para gerar SVG para GitHub");
              }}
            >
              Gerar SVG para GitHub
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default EditableForestDashboard;
