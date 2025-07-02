import { useState, useEffect } from 'react';
import { GameSession, CounterConfig } from '../types';

export function useGameSessions() {
  const [sessions, setSessions] = useState<GameSession[]>([]);

  // Oturumları yükle
  useEffect(() => {
    const loadSessions = () => {
      try {
        const saved = localStorage.getItem('vyros-sessions');
        if (saved) {
          const parsedSessions = JSON.parse(saved);
          console.log('Yüklenen oturumlar:', parsedSessions);
          setSessions(parsedSessions);
        }
      } catch (error) {
        console.error('Oturumlar yüklenirken hata:', error);
        setSessions([]);
      }
    };

    loadSessions();
  }, []);

  // Oturumları kaydet
  useEffect(() => {
    try {
      console.log('Oturumlar kaydediliyor:', sessions);
      localStorage.setItem('vyros-sessions', JSON.stringify(sessions));
    } catch (error) {
      console.error('Oturumlar kaydedilirken hata:', error);
    }
  }, [sessions]);

  const addSession = (sessionData: Omit<GameSession, 'id'>) => {
    const newSession: GameSession = {
      ...sessionData,
      id: `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
    };
    
    console.log('Yeni oturum ekleniyor:', newSession);
    setSessions(prev => {
      const updated = [...prev, newSession];
      console.log('Güncellenmiş oturum listesi:', updated);
      return updated;
    });
  };

  const deleteSession = (sessionId: string) => {
    console.log('Oturum siliniyor:', sessionId);
    setSessions(prev => {
      const updated = prev.filter(session => session.id !== sessionId);
      console.log('Silme sonrası oturum listesi:', updated);
      return updated;
    });
  };

  const getCounterConfigs = (): CounterConfig[] => {
    try {
      const saved = localStorage.getItem('vyros-counter-configs');
      if (saved) {
        return JSON.parse(saved);
      }
    } catch (error) {
      console.error('Sayaç yapılandırmaları yüklenirken hata:', error);
    }
    
    // Varsayılan sayaçlar
    const defaultConfigs: CounterConfig[] = [
      { id: 'wins', name: 'Galibiyetler', color: 'green' },
      { id: 'losses', name: 'Mağlubiyetler', color: 'red' },
    ];
    
    localStorage.setItem('vyros-counter-configs', JSON.stringify(defaultConfigs));
    return defaultConfigs;
  };

  const saveCounterConfig = (config: CounterConfig) => {
    try {
      const configs = getCounterConfigs();
      const updatedConfigs = [...configs, config];
      localStorage.setItem('vyros-counter-configs', JSON.stringify(updatedConfigs));
    } catch (error) {
      console.error('Sayaç yapılandırması kaydedilirken hata:', error);
    }
  };

  const deleteCounterConfig = (configId: string) => {
    try {
      const configs = getCounterConfigs();
      const updatedConfigs = configs.filter(config => config.id !== configId);
      localStorage.setItem('vyros-counter-configs', JSON.stringify(updatedConfigs));
    } catch (error) {
      console.error('Sayaç yapılandırması silinirken hata:', error);
    }
  };

  return {
    sessions,
    addSession,
    deleteSession,
    getCounterConfigs,
    saveCounterConfig,
    deleteCounterConfig,
  };
}