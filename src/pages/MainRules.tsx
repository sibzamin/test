import React, { useEffect } from 'react';
    import useStore from '../store/useStore';
    
    function MainRules() {
      const mainRules = useStore((state) => state.mainRules);
      const fetchRules = useStore((state) => state.fetchRules);
    
      useEffect(() => {
        if (mainRules.length === 0) {
          fetchRules();
        }
      }, [fetchRules, mainRules]);
    
      return (
        <div className="prose prose-invert max-w-none">
          <h1 className="gradient-text text-4xl font-bold mb-8">قوانین اصلی سرور</h1>
          <div className="bg-black/30 p-6 rounded-lg" dangerouslySetInnerHTML={{ __html: mainRules[0]?.content || '' }} />
        </div>
      );
    }
    
    export default MainRules;
