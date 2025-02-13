import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useStore from '../store/useStore';

function AdminLogin() {
  const [username, setUsername] = useState('');
  const [password1, setPassword1] = useState('');
  const [password2, setPassword2] = useState('');
  const [password3, setPassword3] = useState('');
  const [error, setError] = useState('');

  const navigate = useNavigate();
  const login = useStore((state) => state.login);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (login(username, password1, password2, password3)) {
      navigate('/admin/panel');
    } else {
      setError('اطلاعات وارد شده صحیح نمی‌باشد');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-black to-orange-900/30 text-white flex items-center justify-center p-4">
      <div className="max-w-md w-full mx-auto bg-white/10 p-8 rounded-lg backdrop-blur-sm">
        <h2 className="text-2xl font-bold mb-6 text-center">ورود به پنل مدیریت</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block mb-2">نام کاربری</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-4 py-2 rounded bg-black/50 border border-gray-700 focus:border-orange-500 outline-none"
              autoComplete="username"
            />
          </div>

          <div>
            <label className="block mb-2">رمز عبور اول</label>
            <input
              type="password"
              value={password1}
              onChange={(e) => setPassword1(e.target.value)}
              className="w-full px-4 py-2 rounded bg-black/50 border border-gray-700 focus:border-orange-500 outline-none"
              autoComplete="current-password"
            />
          </div>

          <div>
            <label className="block mb-2">رمز عبور دوم</label>
            <input
              type="password"
              value={password2}
              onChange={(e) => setPassword2(e.target.value)}
              className="w-full px-4 py-2 rounded bg-black/50 border border-gray-700 focus:border-orange-500 outline-none"
              autoComplete="current-password"
            />
          </div>

          <div>
            <label className="block mb-2">رمز عبور سوم</label>
            <input
              type="password"
              value={password3}
              onChange={(e) => setPassword3(e.target.value)}
              className="w-full px-4 py-2 rounded bg-black/50 border border-gray-700 focus:border-orange-500 outline-none"
              autoComplete="current-password"
            />
          </div>

          {error && (
            <p className="text-red-500 text-center">{error}</p>
          )}

          <button
            type="submit"
            className="w-full bg-gradient-to-r from-orange-600 to-orange-400 text-white py-2 rounded-lg hover:from-orange-700 hover:to-orange-500 transition-all duration-200"
          >
            ورود
          </button>
        </form>
      </div>
    </div>
  );
}

export default AdminLogin;
