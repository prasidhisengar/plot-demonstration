import React, { useState, useEffect } from 'react';
import {
  ScreenType,
  StageId,
  StageInfo,
  BlockSummary,
  Farmer,
  FilterState,
  StageInspectionData,
} from './types';
import { INITIAL_BLOCKS, INITIAL_STAGES, INITIAL_FARMERS } from './data/mockData';
import { Header } from './components/Header';
import { BottomNav } from './components/BottomNav';
import { MobileFrame } from './components/MobileFrame';

import { LoginScreen } from './screens/LoginScreen';
import { DashboardScreen } from './screens/DashboardScreen';
import { FiltersScreen } from './screens/FiltersScreen';
import { InspectionDashboardScreen } from './screens/InspectionDashboardScreen';
import { FarmerListScreen } from './screens/FarmerListScreen';
import { InspectionFormScreen } from './screens/InspectionFormScreen';
import { ReportsScreen } from './screens/ReportsScreen';
import { ProfileScreen } from './screens/ProfileScreen';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<ScreenType>('dashboard');
  const [screenHistory, setScreenHistory] = useState<ScreenType[]>(['dashboard']);

  const [blocks, setBlocks] = useState<BlockSummary[]>(() => {
    const saved = localStorage.getItem('mp_kisan_blocks');
    return saved ? JSON.parse(saved) : INITIAL_BLOCKS;
  });

  const [stages, setStages] = useState<StageInfo[]>(() => {
    const saved = localStorage.getItem('mp_kisan_stages');
    return saved ? JSON.parse(saved) : INITIAL_STAGES;
  });

  const [farmers, setFarmers] = useState<Farmer[]>(() => {
    const saved = localStorage.getItem('mp_kisan_farmers');
    return saved ? JSON.parse(saved) : INITIAL_FARMERS;
  });

  const [filterState, setFilterState] = useState<FilterState>({
    financialYear: '2026-27',
    season: 'खरीफ (Kharif)',
    scheme: 'NFSM Pulses',
    block: '',
    status: 'Pending',
    circle: 'All',
    village: 'All',
    searchQuery: '',
  });

  const [currentStageId, setCurrentStageId] = useState<StageId>(1);
  const [selectedFarmer, setSelectedFarmer] = useState<Farmer | null>(null);
  const [adminUnlocked, setAdminUnlocked] = useState<boolean>(false);
  const [isMobileDeviceFrame, setIsMobileDeviceFrame] = useState<boolean>(false);

  // Sync to LocalStorage
  useEffect(() => {
    localStorage.setItem('mp_kisan_blocks', JSON.stringify(blocks));
  }, [blocks]);

  useEffect(() => {
    localStorage.setItem('mp_kisan_stages', JSON.stringify(stages));
  }, [stages]);

  useEffect(() => {
    localStorage.setItem('mp_kisan_farmers', JSON.stringify(farmers));
  }, [farmers]);

  // Navigate handler with history stack
  const handleNavigate = (nextScreen: ScreenType) => {
    if (nextScreen !== currentScreen) {
      setScreenHistory((prev) => [...prev, nextScreen]);
      setCurrentScreen(nextScreen);
      window.scrollTo(0, 0);
    }
  };

  const handleBack = () => {
    if (screenHistory.length > 1) {
      const newHistory = [...screenHistory];
      newHistory.pop();
      const previousScreen = newHistory[newHistory.length - 1];
      setScreenHistory(newHistory);
      setCurrentScreen(previousScreen);
      window.scrollTo(0, 0);
    } else {
      handleNavigate('dashboard');
    }
  };

  // Filter handlers
  const handleFilterChange = (updates: Partial<FilterState>) => {
    setFilterState((prev) => ({ ...prev, ...updates }));
  };

  const handleResetFilters = () => {
    setFilterState({
      financialYear: '2026-27',
      season: 'खरीफ (Kharif)',
      scheme: 'NFSM Pulses',
      block: '',
      status: 'Pending',
      circle: 'All',
      village: 'All',
      searchQuery: '',
    });
  };

  const handleSearchFilter = () => {
    handleNavigate('inspection_dashboard');
  };

  // Stage selection
  const handleSelectStage = (stageId: StageId) => {
    setCurrentStageId(stageId);
  };

  // Save inspection data
  const handleSaveInspection = (
    farmerId: string,
    stageId: StageId,
    data: StageInspectionData
  ) => {
    const updatedFarmers = farmers.map((f) => {
      if (f.id === farmerId) {
        return {
          ...f,
          stageStatuses: {
            ...f.stageStatuses,
            [stageId]: 'completed' as const,
          },
          inspectionData: {
            ...f.inspectionData,
            [stageId]: data,
          },
        };
      }
      return f;
    });

    setFarmers(updatedFarmers);

    // Recalculate Stage progress counts
    const nextStages = stages.map((stg) => {
      if (stg.id === stageId) {
        const pending = updatedFarmers.filter((f) => f.stageStatuses[stageId] === 'pending').length;
        const completed = updatedFarmers.filter((f) => f.stageStatuses[stageId] === 'completed').length;
        return {
          ...stg,
          pendingCount: pending,
          completedCount: completed,
        };
      }
      return stg;
    });

    // Check automatic unlock rule:
    // If Stage 1 has 0 pending or completed > 0, unlock Stage 2
    const stage1Pending = updatedFarmers.filter((f) => f.stageStatuses[1] === 'pending').length;
    if (stage1Pending === 0) {
      nextStages[1] = { ...nextStages[1], isUnlocked: true, statusText: 'OPEN' };
    }

    const stage2Pending = updatedFarmers.filter((f) => f.stageStatuses[2] === 'pending').length;
    if (stage2Pending === 0 && nextStages[1].isUnlocked) {
      nextStages[2] = { ...nextStages[2], isUnlocked: true, statusText: 'OPEN' };
    }

    const stage3Pending = updatedFarmers.filter((f) => f.stageStatuses[3] === 'pending').length;
    if (stage3Pending === 0 && nextStages[2].isUnlocked) {
      nextStages[3] = { ...nextStages[3], isUnlocked: true, statusText: 'OPEN' };
    }

    setStages(nextStages);
  };

  // Filter farmers by selected block if any
  const displayedFarmers = filterState.block
    ? farmers.filter((f) => f.block === filterState.block)
    : farmers;

  const currentStageInfo = stages.find((s) => s.id === currentStageId) || stages[0];

  return (
    <MobileFrame isFrameEnabled={isMobileDeviceFrame}>
      {/* Header bar (hidden on Login) */}
      {currentScreen !== 'login' && (
        <Header
          currentScreen={currentScreen}
          onNavigate={handleNavigate}
          onBack={handleBack}
          isMobileDeviceFrame={isMobileDeviceFrame}
          onToggleFrame={() => setIsMobileDeviceFrame(!isMobileDeviceFrame)}
          adminUnlocked={adminUnlocked}
          onToggleAdminUnlocked={() => setAdminUnlocked(!adminUnlocked)}
        />
      )}

      {/* Screen Container */}
      <main className="min-h-[calc(100vh-3.5rem)]">
        {currentScreen === 'login' && (
          <LoginScreen onLoginSuccess={() => handleNavigate('dashboard')} />
        )}

        {currentScreen === 'dashboard' && (
          <DashboardScreen
            onNavigate={handleNavigate}
            onLogout={() => handleNavigate('login')}
          />
        )}

        {currentScreen === 'filters' && (
          <FiltersScreen
            filterState={filterState}
            onFilterChange={handleFilterChange}
            onSearch={handleSearchFilter}
            onReset={handleResetFilters}
            blocks={blocks}
            onNavigate={handleNavigate}
          />
        )}

        {currentScreen === 'inspection_dashboard' && (
          <InspectionDashboardScreen
            stages={stages}
            onSelectStage={handleSelectStage}
            onNavigate={handleNavigate}
            adminUnlocked={adminUnlocked}
          />
        )}

        {currentScreen === 'farmer_list' && (
          <FarmerListScreen
            farmers={displayedFarmers}
            currentStageId={currentStageId}
            onSelectFarmer={(farmer) => {
              setSelectedFarmer(farmer);
              handleNavigate('inspection_form');
            }}
            onNavigate={handleNavigate}
            stageTitle={currentStageInfo.titleHindi}
          />
        )}

        {currentScreen === 'inspection_form' && selectedFarmer && (
          <InspectionFormScreen
            farmer={selectedFarmer}
            currentStageId={currentStageId}
            onSaveInspection={handleSaveInspection}
            onNavigate={handleNavigate}
          />
        )}

        {currentScreen === 'reports' && (
          <ReportsScreen
            blocks={blocks}
            stages={stages}
            onNavigate={handleNavigate}
          />
        )}

        {currentScreen === 'profile' && (
          <ProfileScreen
            onNavigate={handleNavigate}
            onLogout={() => handleNavigate('login')}
          />
        )}
      </main>

      {/* Bottom Navigation */}
      {currentScreen !== 'login' && (
        <BottomNav
          currentScreen={currentScreen}
          onNavigate={handleNavigate}
          pendingPlotsCount={2}
        />
      )}
    </MobileFrame>
  );
}
