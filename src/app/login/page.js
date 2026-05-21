'use client';

import { useState, useMemo } from 'react';

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

  // --- Strength Meter (Signup) ---
  const strength = useMemo(() => {
    const p = form.password;
    if (!p) return { score: 0, label: '', color: '' };
    let s = 0;
    if (p.length >= 8) s++;
    if (/[A-Z]/.test(p)) s++;
    if (/[0-9]/.test(p)) s++;
    if (/[^A-Za-z0-9]/.test(p)) s++;
    if (s <= 1) return { score: s, label: 'Weak', color: 'var(--red)' };
    if (s <= 2) return { score: s, label: 'Fair', color: '#f59e0b' };
    if (s === 3) return { score: s, label: 'Good', color: '#60a5fa' };
    return { score: s, label: 'Strong', color: 'var(--green)' };
  }, [form.password]);

  function barClass(i) {
    if (!form.password) return '';
    const s = strength.score;
    if (s <= 1) return i === 0 ? 'w' : '';
    if (s <= 2) return i <= 1 ? 'f' : '';
    if (s === 3) return i <= 2 ? 'f' : '';
    return 's';
  }

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
      {/* ── Left Panel (Brand) ── */}
      <section className="left">
        <div className="left-blob" />
        <div className="left-logo">
          <div className="logo-mark">🚲</div>
          <span className="logo-name">RideFlow</span>
        </div>
        <div className="left-body">
          <h1 className="left-title">Ride the city,<br /><em>your way.</em></h1>
          <p className="left-desc">
            Thousands of bikes available across the city. Find, unlock, and ride in under 60 seconds. Join the community today.
          </p>
        </div>
        <div className="left-features">
          <div className="feat"><div className="feat-dot" /> Instant unlock, no paperwork</div>
          <div className="feat"><div className="feat-dot" /> Flexible pricing — pay per ride</div>
          <div className="feat"><div className="feat-dot" /> List your bike to earn cash</div>
        </div>
      </section>

      {/* ── Right Panel (Auth) ── */}
      <section className="right">
        <div className="auth-box">

          {/* Mobile Logo */}
          <div className="mob-logo">
            <div className="mob-logo-mark">🚲</div>
            <span className="mob-logo-name">RideFlow</span>
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

          <div className="divider">or continue with email</div>

          {/* ── Login Form ── */}
          {tab === 'login' && (
            <form className="form" onSubmit={handleLogin} noValidate style={{ marginTop: '14px' }}>
              <div className="field">
                <label className="label" htmlFor="login-email">Email</label>
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
              <button type="submit" className="btn-primary" disabled={loading} style={{ marginTop: '8px' }}>
                {loading ? 'Signing in…' : 'Sign In'}
              </button>
            </form>
          )}

          {/* ── Signup Form ── */}
          {tab === 'signup' && (
            submitted ? (
              <div className="success" style={{ marginTop: '14px' }}>
                🎉 <strong>Account created!</strong><br />Check your email to verify your address.
              </div>
            ) : (
              <form className="form" onSubmit={handleSignup} noValidate style={{ marginTop: '14px' }}>
                {/* Role */}
                <div className="field">
                  <span className="label">I want to</span>
                  <div className="roles" role="radiogroup">
                    <label className="role" htmlFor="role-rider">
                      <input id="role-rider" type="radio" name="role" value="rider" checked={role === 'rider'} onChange={() => setRole('rider')} />
                      <div className="role-card">
                        <span className="role-icon">🚴</span>
                        <div className="role-info">
                          <span className="role-name">Rent Bikes</span>
                          <span className="role-hint">Find & ride</span>
                        </div>
                      </div>
                    </label>
                    <label className="role" htmlFor="role-owner">
                      <input id="role-owner" type="radio" name="role" value="owner" checked={role === 'owner'} onChange={() => setRole('owner')} />
                      <div className="role-card">
                        <span className="role-icon">🏪</span>
                        <div className="role-info">
                          <span className="role-name">List Bikes</span>
                          <span className="role-hint">Earn cash</span>
                        </div>
                      </div>
                    </label>
                  </div>
                </div>

                <div className="row">
                  <div className="field">
                    <label className="label" htmlFor="fname">First name</label>
                    <input id="fname" type="text" className="input" placeholder="John" value={form.firstName} onChange={set('firstName')} required />
                  </div>
                  <div className="field">
                    <label className="label" htmlFor="lname">Last name</label>
                    <input id="lname" type="text" className="input" placeholder="Doe" value={form.lastName} onChange={set('lastName')} required />
                  </div>
                </div>

                <div className="field">
                  <label className="label" htmlFor="reg-email">Email</label>
                  <input id="reg-email" type="email" className="input" placeholder="you@example.com" value={form.email} onChange={set('email')} required />
                </div>

                <div className="row">
                  <div className="field">
                    <label className="label" htmlFor="phone">Phone</label>
                    <input id="phone" type="tel" className="input" placeholder="+91 98765 43210" value={form.phone} onChange={set('phone')} required />
                  </div>
                  <div className="field">
                    <label className="label" htmlFor="city">City</label>
                    <select id="city" className="select" value={form.city} onChange={set('city')}>
                      <option value="">Select</option>
                      <option value="mumbai">Mumbai</option>
                      <option value="delhi">Delhi</option>
                      <option value="bangalore">Bangalore</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                </div>

                <div className="field">
                  <label className="label" htmlFor="reg-pw">Password</label>
                  <div className="pw-wrap">
                    <input id="reg-pw" type={showPassword ? 'text' : 'password'} className="input" placeholder="Min. 8 characters" value={form.password} onChange={set('password')} required />
                    <button type="button" className="pw-btn" onClick={() => setShowPassword(v => !v)}>{showPassword ? 'Hide' : 'Show'}</button>
                  </div>
                  {form.password && (
                    <div className="strength-wrap">
                      <div className="bars">
                        {[0,1,2,3].map(i => <div key={i} className={`bar ${barClass(i)}`} />)}
                      </div>
                      <span className="strength-lbl" style={{ color: strength.color }}>{strength.label}</span>
                    </div>
                  )}
                </div>

                <div className="field">
                  <label className="label" htmlFor="reg-cpw">Confirm password</label>
                  <div className="pw-wrap">
                    <input id="reg-cpw" type={showConfirm ? 'text' : 'password'} className="input" placeholder="••••••••" value={form.confirmPassword} onChange={set('confirmPassword')} required />
                    <button type="button" className="pw-btn" onClick={() => setShowConfirm(v => !v)}>{showConfirm ? 'Hide' : 'Show'}</button>
                  </div>
                  {form.confirmPassword && (
                    form.password !== form.confirmPassword ? <p className="err">Passwords don't match</p> : <p className="ok">✓ Passwords match</p>
                  )}
                </div>

                <label className="check" htmlFor="agree" style={{ marginTop: '4px' }}>
                  <input id="agree" type="checkbox" checked={form.agreeTerms} onChange={e => setForm(p => ({ ...p, agreeTerms: e.target.checked }))} required />
                  <span>I agree to the <a href="#">Terms</a> &amp; <a href="#">Privacy</a></span>
                </label>

                {error && <p className="err" role="alert">{error}</p>}

                <button type="submit" className="btn-primary" disabled={loading} style={{ marginTop: '8px' }}>
                  {loading ? 'Creating account…' : 'Create Account'}
                </button>
              </form>
            )
          )}

          <p className="terms">
            By continuing, you agree to RideFlow's <a href="#">Terms of Service</a> and confirm you have read our <a href="#">Privacy Policy</a>.
          </p>
        </div>
      </section>
    </main>
  );
}
