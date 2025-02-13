import React, { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import useStore from '../store/useStore';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

type RuleType = 'main' | 'job' | 'robbery' | 'gang';

function AdminPanel() {
  const isAuthenticated = useStore((state) => state.isAuthenticated);
  const logout = useStore((state) => state.logout);
  const mainRules = useStore((state) => state.mainRules);
  const jobRules = useStore((state) => state.jobRules);
  const robberyRules = useStore((state) => state.robberyRules);
  const gangRules = useStore((state) => state.gangRules);
  const updateRules = useStore((state) => state.updateRules);

  const [selectedType, setSelectedType] = useState<RuleType>('main');
  const [editingRule, setEditingRule] = useState('');
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    const rules = getRules(selectedType);
    if (rules && rules.length > 0) {
      setEditingRule(rules[0].content);
    }
  }, [selectedType, mainRules, jobRules, robberyRules, gangRules]);

  if (!isAuthenticated) {
    return <Navigate to="/admin" replace />;
  }

  const getRules = (type: RuleType) => {
    switch (type) {
      case 'main':
        return mainRules;
      case 'job':
        return jobRules;
      case 'robbery':
        return robberyRules;
      case 'gang':
        return gangRules;
    }
  };

  const getTitle = (type: RuleType) => {
    switch (type) {
      case 'main':
        return 'قوانین اصلی';
      case 'job':
        return 'قوانین شغل‌ها';
      case 'robbery':
        return 'قوانین رابری';
      case 'gang':
        return 'قوانین گنگ‌ها';
    }
  };

  const handleUpdateRule = async () => {
    setIsSaving(true);
    updateRules(selectedType, [{ id: '1', content: editingRule }]);
    setTimeout(() => {
      setIsSaving(false);
    }, 500);
  };

  const handleTypeChange = (type: RuleType) => {
    setSelectedType(type);
  };

  const modules = {
    toolbar: [
      ['bold', 'italic', 'underline', 'strike'],
      ['link', 'code-block'],
      [{ 'color': [] }],
    ],
  };

  const formats = [
    'bold', 'italic', 'underline', 'strike',
    'link', 'code-block', 'color'
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-black to-orange-900/30 text-white p-4">
      <div className="space-y-6 max-w-4xl mx-auto">
        <motion.div
          className="flex justify-between items-center flex-col md:flex-row gap-4"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1 className="gradient-text text-4xl font-bold">پنل مدیریت</h1>
          <motion.button
            onClick={logout}
            className="px-4 py-2 bg-red-500 hover:bg-red-600 rounded-lg transition-colors"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            خروج
          </motion.button>
        </motion.div>

        <motion.div
          className="bg-black/30 p-6 rounded-lg space-y-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <div className="flex flex-wrap gap-4">
            {(['main', 'job', 'robbery', 'gang'] as RuleType[]).map((type) => (
              <motion.button
                key={type}
                onClick={() => handleTypeChange(type)}
                className={`px-4 py-2 rounded-lg transition-colors ${
                  selectedType === type
                    ? 'bg-orange-500 text-white'
                    : 'bg-white/10 hover:bg-white/20'
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {getTitle(type)}
              </motion.button>
            ))}
          </div>

          <div className="space-y-4">
            <h2 className="text-2xl font-bold">{getTitle(selectedType)}</h2>
            <ReactQuill
              value={editingRule}
              onChange={setEditingRule}
              modules={modules}
              formats={formats}
              className="bg-black/50 rounded-lg"
              placeholder="متن قوانین را وارد کنید..."
              dir="rtl"
            />
            <motion.button
              onClick={handleUpdateRule}
              className={`w-full py-2 rounded-lg transition-colors flex items-center justify-center ${
                isSaving
                  ? 'bg-green-500'
                  : 'bg-orange-500 hover:bg-orange-600'
              }`}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              disabled={isSaving}
            >
              {isSaving ? 'ذخیره شد ✓' : 'ذخیره تغییرات'}
            </motion.button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

export default AdminPanel;
