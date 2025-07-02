import React, { useState, useEffect } from 'react';
import { Plus, Save } from 'lucide-react';
import { Counter } from '../components/Counter';
import { useGameSessions } from '../hooks/useGameSessions';
import { CounterConfig } from '../types';

export function Tracker() {
  const { addSession, getCounterConfigs, saveCounterConfig, deleteCounterConfig } = useGameSessions();
  const [sessionTitle, setSessionTitle] = useState('');
  const [counters, setCounters] = useState<Record<string, number>>({});
  const [counterConfigs, setCounterConfigs] = useState<CounterConfig[]>([]);
  const [showAddCounter, setShowAddCounter] = useState(false);
  const [newCounterName, setNewCounterName] = useState('');
  const [newCounterColor, setNewCounterColor] = useState('blue');

  // Sayaç yapılandırmalarını yükle
  useEffect(() => {
    const loadConfigs = () => {
      const configs = getCounterConfigs();
      console.log('Yüklenen sayaç yapılandırmaları:', configs);
      setCounterConfigs(configs);
      
      // Sayaçları 0 değeriyle başlat
      const initialCounters: Record<string, number> = {};
      configs.forEach(config => {
        initialCounters[config.id] = 0;
      });
      setCounters(initialCounters);
    };

    loadConfigs();
  }, []);

  const handleCounterChange = (counterId: string, value: number) => {
    // Değerin 0'dan küçük olmamasını garanti et
    const safeValue = Math.max(0, value);
    console.log(`Sayaç güncelleniyor: ${counterId} = ${safeValue}`);
    setCounters(prev => ({
      ...prev,
      [counterId]: safeValue
    }));
  };

  const handleSaveSession = () => {
    if (!sessionTitle.trim()) {
      alert('Lütfen oturum başlığı girin');
      return;
    }

    const session = {
      title: sessionTitle.trim(),
      counters: { ...counters },
      date: new Date().toISOString(),
    };

    console.log('Oturum kaydediliyor:', session);
    addSession(session);
    
    // Formu sıfırla
    setSessionTitle('');
    const resetCounters: Record<string, number> = {};
    counterConfigs.forEach(config => {
      resetCounters[config.id] = 0;
    });
    setCounters(resetCounters);
    
    alert('Oturum başarıyla kaydedildi!');
  };

  const handleAddCounter = () => {
    if (!newCounterName.trim()) {
      alert('Lütfen sayaç adı girin');
      return;
    }

    const newConfig: CounterConfig = {
      id: `counter_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      name: newCounterName.trim(),
      color: newCounterColor as any,
    };

    console.log('Yeni sayaç ekleniyor:', newConfig);
    saveCounterConfig(newConfig);
    
    // State'i güncelle
    setCounterConfigs(prev => {
      const updated = [...prev, newConfig];
      console.log('Güncellenmiş sayaç listesi:', updated);
      return updated;
    });
    
    setCounters(prev => ({ ...prev, [newConfig.id]: 0 }));
    
    setNewCounterName('');
    setShowAddCounter(false);
  };

  const handleDeleteCounter = (counterId: string) => {
    if (confirm('Bu sayacı silmek istediğinizden emin misiniz?')) {
      console.log('Sayaç siliniyor:', counterId);
      deleteCounterConfig(counterId);
      
      setCounterConfigs(prev => {
        const updated = prev.filter(c => c.id !== counterId);
        console.log('Silme sonrası sayaç listesi:', updated);
        return updated;
      });
      
      setCounters(prev => {
        const newCounters = { ...prev };
        delete newCounters[counterId];
        return newCounters;
      });
    }
  };

  const colors = [
    { value: 'blue', label: 'Mavi' },
    { value: 'green', label: 'Yeşil' },
    { value: 'red', label: 'Kırmızı' },
    { value: 'purple', label: 'Mor' },
    { value: 'yellow', label: 'Sarı' },
    { value: 'pink', label: 'Pembe' }
  ];

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      {/* Başlık */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent mb-4">
          Oyun Oturumu
        </h1>
        <p className="text-gray-600 dark:text-gray-400 text-lg">
          Performansınızı gerçek zamanlı takip edin
        </p>
      </div>

      {/* Oturum Başlığı */}
      <div className="bg-white dark:bg-gray-800 rounded-3xl p-8 shadow-xl border border-gray-200 dark:border-gray-700 mb-8">
        <label className="block text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
          Oturum Başlığı
        </label>
        <input
          type="text"
          value={sessionTitle}
          onChange={(e) => setSessionTitle(e.target.value)}
          placeholder="örn: Akşam Ranked Oturumu, Turnuva Antrenmanı"
          className="w-full p-4 text-lg border-2 border-gray-300 dark:border-gray-600 rounded-2xl bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all duration-200"
        />
      </div>

      {/* Sayaçlar Izgara */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {counterConfigs.map((config) => (
          <Counter
            key={config.id}
            label={config.name}
            value={counters[config.id] || 0}
            onChange={(value) => handleCounterChange(config.id, value)}
            color={config.color}
            onDelete={() => handleDeleteCounter(config.id)}
          />
        ))}

        {/* Sayaç Ekleme Butonu */}
        <div className="bg-white dark:bg-gray-800 rounded-3xl p-8 shadow-xl border-2 border-dashed border-gray-300 dark:border-gray-600 flex items-center justify-center min-h-[200px]">
          {!showAddCounter ? (
            <button
              onClick={() => setShowAddCounter(true)}
              className="flex flex-col items-center space-y-4 text-gray-500 dark:text-gray-400 hover:text-purple-600 dark:hover:text-purple-400 transition-colors duration-200"
            >
              <Plus className="w-12 h-12" />
              <span className="text-lg font-medium">Sayaç Ekle</span>
            </button>
          ) : (
            <div className="w-full space-y-4">
              <input
                type="text"
                value={newCounterName}
                onChange={(e) => setNewCounterName(e.target.value)}
                placeholder="Sayaç adı"
                className="w-full p-3 border-2 border-gray-300 dark:border-gray-600 rounded-xl bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
              />
              <select
                value={newCounterColor}
                onChange={(e) => setNewCounterColor(e.target.value)}
                className="w-full p-3 border-2 border-gray-300 dark:border-gray-600 rounded-xl bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
              >
                {colors.map(color => (
                  <option key={color.value} value={color.value}>
                    {color.label}
                  </option>
                ))}
              </select>
              <div className="flex space-x-2">
                <button
                  onClick={handleAddCounter}
                  className="flex-1 bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-xl transition-colors duration-200"
                >
                  Ekle
                </button>
                <button
                  onClick={() => {
                    setShowAddCounter(false);
                    setNewCounterName('');
                  }}
                  className="flex-1 bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-xl transition-colors duration-200"
                >
                  İptal
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Oturumu Kaydet */}
      <div className="text-center">
        <button
          onClick={handleSaveSession}
          className="inline-flex items-center space-x-3 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white px-8 py-4 rounded-2xl text-lg font-semibold shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105"
        >
          <Save className="w-6 h-6" />
          <span>Oturumu Kaydet</span>
        </button>
      </div>
    </div>
  );
}