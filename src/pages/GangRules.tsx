import React, { useEffect } from 'react';
    import useStore from '../store/useStore';
    
    function GangRules() {
      const gangRules = useStore((state) => state.gangRules);
      const fetchRules = useStore((state) => state.fetchRules);
    
      useEffect(() => {
        if (gangRules.length === 0) {
          fetchRules();
        }
      }, [fetchRules, gangRules]);
    
      return (
        <div className="prose prose-invert max-w-none">
          <h1 className="gradient-text text-4xl font-bold mb-8">قوانین گنگ‌ها</h1>
          <div className="bg-black/30 p-6 rounded-lg" dangerouslySetInnerHTML={{ __html: gangRules[0]?.content || '' }} />
        </div>
      );
    }
    
    export default GangRules;
