import React, { useState } from 'react';
import axios from 'axios';
import Header from './components/Header';
import SearchBar from './components/SearchBar';
import DrugCard from './components/DrugCard';
import { AlertCircle, Loader2 } from 'lucide-react';

const API_BASE_URL = 'https://api.fda.gov/drug/event.json';
const API_KEY = 'TpX5p3BkRHZhxPVBtqXVGwJvb4GxBGAOBP1dDPEk'; // FDA API key for demo purposes

function App() {
  const [language, setLanguage] = useState<'en' | 'zh'>('en');
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [data, setData] = useState<any[]>([]);

  const searchDrugs = async () => {
    if (!query.trim()) return;

    setLoading(true);
    setError(null);

    try {
      const response = await axios.get(API_BASE_URL, {
        params: {
          api_key: API_KEY,
          search: `patient.drug.medicinalproduct:"${query}"`,
          limit: 10
        }
      });

      if (response.data.results && response.data.results.length > 0) {
        const formattedData = response.data.results.map((result: any) => ({
          drug_name: result.patient?.drug?.[0]?.medicinalproduct || 'Unknown',
          sponsor_name: result.companynumb || 'Unknown',
          submission_date: new Date(result.receiptdate).toLocaleDateString(),
          application_number: result.safetyreportid || 'Unknown'
        }));
        setData(formattedData);
      } else {
        setError(language === 'en' 
          ? 'No results found. Try a different search term.' 
          : '未找到结果。请尝试其他搜索词。'
        );
        setData([]);
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : String(err);
      console.error('API Error:', errorMessage);
      
      let userMessage = language === 'en' 
        ? 'Failed to fetch data. Please try again.' 
        : '获取数据失败。请重试。';

      if (axios.isAxiosError(err)) {
        if (err.response?.status === 429) {
          userMessage = language === 'en'
            ? 'Too many requests. Please try again later.'
            : '请求过多。请稍后再试。';
        } else if (err.response?.status === 404) {
          userMessage = language === 'en'
            ? 'No results found. Try a different search term.'
            : '未找到结果。请尝试其他搜索词。';
        }
      }

      setError(userMessage);
      setData([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header 
        language={language} 
        onLanguageChange={setLanguage} 
      />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            {language === 'en' 
              ? 'FDA Drug Reports Explorer' 
              : 'FDA 药物报告浏览器'}
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            {language === 'en'
              ? 'Search FDA adverse event reports by drug name (e.g., "aspirin", "ibuprofen")'
              : '按药品名称搜索 FDA 不良事件报告（例如："aspirin"、"ibuprofen"）'}
          </p>
        </div>

        <SearchBar 
          query={query}
          onQueryChange={setQuery}
          onSearch={searchDrugs}
          language={language}
        />

        {loading && (
          <div className="flex justify-center py-8">
            <Loader2 className="w-8 h-8 text-indigo-600 animate-spin" />
          </div>
        )}

        {error && (
          <div className="flex items-center justify-center space-x-2 text-red-600 py-4">
            <AlertCircle className="w-5 h-5" />
            <span>{error}</span>
          </div>
        )}

        <div className="grid md:grid-cols-2 gap-6 mt-8">
          {data.map((item, index) => (
            <DrugCard 
              key={`${item.application_number}-${index}`}
              data={item}
              language={language}
            />
          ))}
        </div>

        {data.length === 0 && !loading && !error && (
          <div className="text-center text-gray-600 py-12">
            {language === 'en'
              ? 'Try searching for a drug name (e.g., "aspirin")'
              : '尝试搜索药品名称（例如："aspirin"）'}
          </div>
        )}
      </main>
    </div>
  );
}

export default App;