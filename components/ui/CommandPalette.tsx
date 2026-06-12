'use client';
import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, FileText, ExternalLink, Mail, MonitorSmartphone, X } from 'lucide-react';

const GithubIcon = ({ size = 16 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.02c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
  </svg>
);

type Action = {
  id: string;
  name: string;
  icon: React.ReactNode;
  url?: string;
  action?: () => void;
  section: 'Links' | 'Projects' | 'Contact';
};

const ACTIONS: Action[] = [
  { id: 'resume', name: 'Open Resume', icon: <FileText size={16} />, url: 'https://drive.google.com/file/d/13X9SjsDNBsfetqCPz_FwAgXQew_9j3Be/view?usp=sharing', section: 'Links' },
  { id: 'github', name: 'Open GitHub', icon: <GithubIcon size={16} />, url: 'https://github.com/kazuha2004', section: 'Links' },
  { id: 'ai-interviewer', name: 'Open AI Interviewer', icon: <MonitorSmartphone size={16} />, url: 'https://ai-interviewer-chi-henna.vercel.app/', section: 'Projects' },
  { id: 'kazuha-closet', name: 'Open Kazuha Closet', icon: <MonitorSmartphone size={16} />, url: 'https://www.kazuhacloset.com', section: 'Projects' },
  { id: 'taskflow', name: 'Open TaskFlow Manager', icon: <MonitorSmartphone size={16} />, url: 'https://taskflow-manager-fullstack.vercel.app/login', section: 'Projects' },
  { id: 'lumiface', name: 'Open LUMIFACE Repo', icon: <ExternalLink size={16} />, url: 'https://github.com/kazuha2004/FACE_RECOGNITION_ATTENDANCE_SYSTEM', section: 'Projects' },
  { id: 'contact', name: 'Email Priyanshu', icon: <Mail size={16} />, url: 'mailto:priyanshushukla0608@gmail.com', section: 'Contact' },
];

export default function CommandPalette() {
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setIsOpen((open) => !open);
      }
      if (e.key === 'Escape') {
        setIsOpen(false);
      }
    };

    document.addEventListener('keydown', down);
    return () => document.removeEventListener('keydown', down);
  }, []);

  const filteredActions = ACTIONS.filter((action) =>
    action.name.toLowerCase().includes(search.toLowerCase())
  );

  useEffect(() => {
    setSelectedIndex(0);
  }, [search]);

  useEffect(() => {
    if (!isOpen) return;
    
    const handleNavigation = (e: KeyboardEvent) => {
      if (e.key === 'ArrowDown') {
        e.preventDefault();
        setSelectedIndex((prev) => (prev + 1) % filteredActions.length);
      }
      if (e.key === 'ArrowUp') {
        e.preventDefault();
        setSelectedIndex((prev) => (prev - 1 + filteredActions.length) % filteredActions.length);
      }
      if (e.key === 'Enter' && filteredActions[selectedIndex]) {
        e.preventDefault();
        const action = filteredActions[selectedIndex];
        if (action.url) {
          window.open(action.url, '_blank');
        } else if (action.action) {
          action.action();
        }
        setIsOpen(false);
      }
    };

    window.addEventListener('keydown', handleNavigation);
    return () => window.removeEventListener('keydown', handleNavigation);
  }, [isOpen, filteredActions, selectedIndex]);

  // Lock body scroll when open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100]"
            onClick={() => setIsOpen(false)}
          />

          {/* Dialog */}
          <div className="fixed inset-0 z-[101] flex items-start justify-center pt-[15vh] sm:pt-[20vh] px-4 pointer-events-none">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: -20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: -20 }}
              transition={{ duration: 0.2, ease: 'easeOut' }}
              className="w-full max-w-xl bg-[#0F0F11] rounded-2xl shadow-[0_0_40px_rgba(0,0,0,0.5)] border border-white/10 overflow-hidden pointer-events-auto flex flex-col"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Search Header */}
              <div className="flex items-center gap-3 px-4 py-4 border-b border-white/10">
                <Search size={20} className="text-[#A1A1AA]" />
                <input
                  autoFocus
                  placeholder="Type a command or search..."
                  className="flex-1 bg-transparent text-white outline-none placeholder:text-[#52525B]"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-1 rounded-md text-[#52525B] hover:text-white hover:bg-white/10 transition-colors"
                >
                  <X size={16} />
                </button>
              </div>

              {/* Action List */}
              <div className="max-h-[300px] overflow-y-auto p-2">
                {filteredActions.length === 0 ? (
                  <div className="p-8 text-center text-[#52525B] text-sm">No results found.</div>
                ) : (
                  filteredActions.map((action, i) => (
                    <button
                      key={action.id}
                      onClick={() => {
                        if (action.url) window.open(action.url, '_blank');
                        else if (action.action) action.action();
                        setIsOpen(false);
                      }}
                      onMouseEnter={() => setSelectedIndex(i)}
                      className={`w-full flex items-center justify-between px-3 py-3 rounded-lg text-sm transition-colors text-left ${
                        selectedIndex === i ? 'bg-[#7C3AED]/20 text-white' : 'text-[#A1A1AA] hover:bg-white/5 hover:text-white'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <span className={selectedIndex === i ? 'text-[#7C3AED]' : 'text-[#71717A]'}>{action.icon}</span>
                        <span className="font-medium">{action.name}</span>
                      </div>
                      <span className="text-[10px] uppercase tracking-wider text-[#52525B]">{action.section}</span>
                    </button>
                  ))
                )}
              </div>
              
              {/* Footer */}
              <div className="px-4 py-3 border-t border-white/5 bg-black/40 flex items-center justify-between">
                <div className="flex items-center gap-4 text-[10px] text-[#52525B]">
                  <div className="flex items-center gap-1"><span className="bg-white/10 px-1.5 py-0.5 rounded">↑↓</span> to navigate</div>
                  <div className="flex items-center gap-1"><span className="bg-white/10 px-1.5 py-0.5 rounded">Enter</span> to select</div>
                  <div className="flex items-center gap-1"><span className="bg-white/10 px-1.5 py-0.5 rounded">Esc</span> to close</div>
                </div>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}
