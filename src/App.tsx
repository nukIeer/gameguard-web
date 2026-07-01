import React, { useState } from 'react';
import { packageManifest } from './data';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { PackageCard } from './components/PackageCard';
import { SelectedInfo } from './components/SelectedInfo';
import { DownloadButton } from './components/DownloadButton';
import { ConfirmationModal } from './components/ConfirmationModal';
import { DownloadStarted } from './components/DownloadStarted';
import { StickyCTA } from './components/StickyCTA';
import { Footer } from './components/Footer';

export default function App() {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [downloadState, setDownloadState] = useState<'idle' | 'confirming' | 'started'>('idle');

  const packages = packageManifest.packages;
  const selectedPkg = packages.find(p => p.id === selectedId) || null;

  const handlePackageSelect = (id: string) => {
    setSelectedId(id);
  };

  const handleDownloadClick = () => {
    if (selectedPkg) {
      setDownloadState('confirming');
    }
  };

  const handleConfirm = () => {
    if (selectedPkg && selectedPkg.download_url !== '#') {
       // In a real scenario: window.location.href = selectedPkg.download_url;
    }
    setDownloadState('started');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleCancel = () => {
    setDownloadState('idle');
  };

  const handleReset = () => {
    setSelectedId(null);
    setDownloadState('idle');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (downloadState === 'started') {
    return (
      <div className="min-h-screen bg-slate-50 font-sans selection:bg-green-200">
        <Header />
        <DownloadStarted onReset={handleReset} />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 font-sans selection:bg-green-200 relative pb-32 overflow-x-hidden">
      <Header />
      
      <main className="max-w-md mx-auto w-full">
        <Hero />
        
        <div className="px-5">
          <h2 className="text-2xl font-black text-slate-800 text-center mb-6">Ne yüklemek istiyorsun?</h2>
          
          <div className="space-y-4">
            {packages.map((pkg) => (
              <PackageCard 
                key={pkg.id} 
                pkg={pkg} 
                isSelected={selectedId === pkg.id} 
                onClick={() => handlePackageSelect(pkg.id)} 
              />
            ))}
          </div>

          {selectedPkg && (
            <SelectedInfo pkg={selectedPkg} />
          )}

          <DownloadButton 
            disabled={!selectedPkg} 
            onClick={handleDownloadClick} 
          />
        </div>

        <Footer />
      </main>

      {downloadState === 'idle' && (
        <StickyCTA 
          pkg={selectedPkg} 
          onDownload={handleDownloadClick} 
        />
      )}

      <ConfirmationModal 
        isOpen={downloadState === 'confirming'} 
        pkg={selectedPkg} 
        onConfirm={handleConfirm} 
        onCancel={handleCancel} 
      />
    </div>
  );
}
