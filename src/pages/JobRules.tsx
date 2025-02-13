import React, { useEffect } from 'react';
    import useStore from '../store/useStore';
    
    function JobRules() {
      const jobRules = useStore((state) => state.jobRules);
      const fetchRules = useStore((state) => state.fetchRules);
    
      useEffect(() => {
        if (jobRules.length === 0) {
          fetchRules();
        }
      }, [fetchRules, jobRules]);
    
      return (
        <div className="prose prose-invert max-w-none">
          <h1 className="gradient-text text-4xl font-bold mb-8">قوانین شغل‌ها</h1>
          <div className="bg-black/30 p-6 rounded-lg" dangerouslySetInnerHTML={{ __html: jobRules[0]?.content || '' }} />
        </div>
      );
    }
    
    export default JobRules;
