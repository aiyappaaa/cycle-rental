'use client';

import { useState } from 'react';

export default function AuthPage() {
  const [tab, setTab] = useState('login'); // 'login' | 'signup'

  // --- Shared State ---
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  // --- Login State ---
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [remember, setRemember] = useState(false);

  // --- Signup State ---
  const [role, setRole] = useState('rider');
  const [showConfirm, setShowConfirm] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    firstName: '', lastName: '', email: '', phone: '', city: '', password: '', confirmPassword: '', agreeTerms: false,
  });

  const set = field => e => setForm(p => ({ ...p, [field]: e.target.value }));

  // --- Handlers ---
  function handleLogin(e) {
    e.preventDefault();
    setError('');
    if (!loginEmail || !loginPassword) { setError('Please fill in all fields.'); return; }
    setLoading(true);
    setTimeout(() => { setLoading(false); alert('Logged in!'); }, 1200);
  }

  function handleSignup(e) {
    e.preventDefault();
    setError('');
    const { firstName, lastName, email, phone, password, confirmPassword, agreeTerms } = form;
    if (!firstName || !lastName || !email || !phone || !password || !confirmPassword) {
      setError('Please fill in all required fields.'); return;
    }
    if (password !== confirmPassword) { setError('Passwords do not match.'); return; }
    if (!agreeTerms) { setError('Please agree to the Terms of Service.'); return; }
    setLoading(true);
    setTimeout(() => { setLoading(false); setSubmitted(true); }, 1500);
  }

  function switchTab(newTab) {
    setTab(newTab);
    setError('');
  }

  return (
    <main className="shell">
      <div className="auth-box">

        {/* Brand */}
        <div className="brand">
          <div className="brand-icon">🚲</div>
          <span className="brand-name">RideFlow</span>
        </div>

        {/* Tabs */}
        <div className="tabs" role="tablist">
          <button
            className={`tab ${tab === 'login' ? 'active' : ''}`}
            role="tab"
            aria-selected={tab === 'login'}
            onClick={() => switchTab('login')}
          >
            Sign In
          </button>
          <button
            className={`tab ${tab === 'signup' ? 'active' : ''}`}
            role="tab"
            aria-selected={tab === 'signup'}
            onClick={() => switchTab('signup')}
          >
            Create Account
          </button>
        </div>

        {/* Google Button */}
        <button id="btn-google" type="button" className="btn-google">
          <svg width="16" height="16" viewBox="0 0 48 48" fill="none">
            <path d="M44.5 20H24v8.5h11.8C34.7 33.9 29.9 37 24 37c-7.2 0-13-5.8-13-13s5.8-13 13-13c3.1 0 5.9 1.1 8.1 2.9l6.4-6.4C34.6 5.1 29.6 3 24 3 12.4 3 3 12.4 3 24s9.4 21 21 21c10.5 0 20-7.6 20-21 0-1.4-.1-2.7-.4-4z" fill="#FFC107"/>
            <path d="M6.3 14.7l7 5.1C15.1 16 19.2 13 24 13c3.1 0 5.9 1.1 8.1 2.9l6.4-6.4C34.6 5.1 29.6 3 24 3c-7.7 0-14.4 4.4-17.7 11.7z" fill="#FF3D00"/>
            <path d="M24 45c5.8 0 10.7-1.9 14.6-5.2l-6.8-5.6C29.9 36 27.1 37 24 37c-5.9 0-10.8-3.9-12.1-9.2l-7 5.4C8 40.1 15.4 45 24 45z" fill="#4CAF50"/>
            <path d="M44.5 20H24v8.5h11.8c-.6 2.9-2.3 5.3-4.8 6.8l6.8 5.6C42.1 37.3 45 31.1 45 24c0-1.4-.1-2.7-.5-4z" fill="#1976D2"/>
          </svg>
          Continue with Google
        </button>

        <div className="divider">or</div>

        {/* ── Login Form ── */}
        {tab === 'login' && (
          <form className="form" onSubmit={handleLogin} noValidate>
            <div className="field">
              <label className="label" htmlFor="login-email">Email address</label>
              <input id="login-email" type="email" className="input" placeholder="you@example.com" value={loginEmail} onChange={e => setLoginEmail(e.target.value)} required />
            </div>
            <div className="field">
              <label className="label" htmlFor="login-password">Password</label>
              <div className="pw-wrap">
                <input id="login-password" type={showPassword ? 'text' : 'password'} className="input" placeholder="••••••••" value={loginPassword} onChange={e => setLoginPassword(e.target.value)} required />
                <button type="button" className="pw-btn" onClick={() => setShowPassword(v => !v)}>{showPassword ? 'Hide' : 'Show'}</button>
              </div>
            </div>
            <div className="inline" style={{ marginTop: '4px' }}>
              <label className="check" htmlFor="remember-me">
                <input id="remember-me" type="checkbox" checked={remember} onChange={e => setRemember(e.target.checked)} />
                Remember me
              </label>
              <a href="#" className="link">Forgot password?</a>
            </div>
            {error && <p className="err" role="alert">{error}</p>}
            <button type="submit" className="btn-primary" disabled={loading}>
              {loading ? 'Signing in…' : 'Sign in'}
            </button>
          </form>
        )}

        {/* ── Signup Form ── */}
        {tab === 'signup' && (
          submitted ? (
            <div className="success">
              Account created! Please check your email to verify.
            </div>
          ) : (
            <form className="form" onSubmit={handleSignup} noValidate>
              
              <div className="row">
                <div className="field">
                  <label className="label" htmlFor="fname">First name</label>
                  <input id="fname" type="text" className="input" placeholder="Jane" value={form.firstName} onChange={set('firstName')} required />
                </div>
                <div className="field">
                  <label className="label" htmlFor="lname">Last name</label>
                  <input id="lname" type="text" className="input" placeholder="Doe" value={form.lastName} onChange={set('lastName')} required />
                </div>
              </div>

              <div className="field">
                <label className="label" htmlFor="reg-email">Email address</label>
                <input id="reg-email" type="email" className="input" placeholder="you@example.com" value={form.email} onChange={set('email')} required />
              </div>

              <div className="field">
                <label className="label" htmlFor="reg-pw">Password</label>
                <div className="pw-wrap">
                  <input id="reg-pw" type={showPassword ? 'text' : 'password'} className="input" placeholder="Min. 8 characters" value={form.password} onChange={set('password')} required />
                  <button type="button" className="pw-btn" onClick={() => setShowPassword(v => !v)}>{showPassword ? 'Hide' : 'Show'}</button>
                </div>
              </div>

              <div className="field">
                <label className="label" htmlFor="reg-cpw">Confirm password</label>
                <div className="pw-wrap">
                  <input id="reg-cpw" type={showConfirm ? 'text' : 'password'} className="input" placeholder="••••••••" value={form.confirmPassword} onChange={set('confirmPassword')} required />
                  <button type="button" className="pw-btn" onClick={() => setShowConfirm(v => !v)}>{showConfirm ? 'Hide' : 'Show'}</button>
                </div>
              </div>

              <label className="check" htmlFor="agree" style={{ marginTop: '8px' }}>
                <input id="agree" type="checkbox" checked={form.agreeTerms} onChange={e => setForm(p => ({ ...p, agreeTerms: e.target.checked }))} required />
                <span>I agree to the <a href="#" className="link">Terms</a> &amp; <a href="#" className="link">Privacy</a></span>
              </label>

              {error && <p className="err" role="alert">{error}</p>}

              <button type="submit" className="btn-primary" disabled={loading} style={{ marginTop: '8px' }}>
                {loading ? 'Creating account…' : 'Create account'}
              </button>
            </form>
          )
        )}

        <p className="terms">
          By signing in, you agree to our <a href="#">Terms of Service</a> and <a href="#">Privacy Policy</a>.
        </p>

      </div>
    </main>
  );
}
