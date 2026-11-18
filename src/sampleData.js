// day-06-diffmaster/src/sampleData.js
// Realistic preset comparison pairs for DiffMaster

export const SAMPLE_PRESETS = {
  javascript: {
    name: 'JavaScript Hook Migration',
    leftLabel: 'Legacy State (UserCard.js)',
    rightLabel: 'Refactored React 19 (UserCard.jsx)',
    left: `import React, { Component } from 'react';

class UserCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: null,
      loading: true,
      error: null
    };
  }

  componentDidMount() {
    fetch('/api/user/' + this.props.id)
      .then(res => res.json())
      .then(data => this.setState({ user: data, loading: false }))
      .catch(err => this.setState({ error: err.message, loading: false }));
  }

  render() {
    const { user, loading, error } = this.state;
    if (loading) return <div>Loading user profile...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
      <div className="card">
        <h3>{user.name}</h3>
        <p>{user.email}</p>
        <span>Role: {user.role}</span>
      </div>
    );
  }
}

export default UserCard;`,
    right: `import React, { useState, useEffect } from 'react';

export function UserCard({ id }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function loadUser() {
      try {
        setLoading(true);
        const res = await fetch(\`/api/user/\${id}\`);
        const data = await res.json();
        setUser(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    loadUser();
  }, [id]);

  if (loading) return <div className="spinner">Loading user profile...</div>;
  if (error) return <div className="alert-error">Error: {error}</div>;

  return (
    <div className="card shadow-lg rounded-xl">
      <h3 className="font-bold text-lg">{user.name}</h3>
      <p className="text-muted">{user.email}</p>
      <span className="badge badge-primary">{user.role}</span>
    </div>
  );
}`
  },

  json: {
    name: 'JSON API Payload Drift',
    left: JSON.stringify({
      version: '1.0',
      status: 'active',
      user: {
        id: 'usr_849102',
        name: 'Alex Rivera',
        email: 'alex@company.com',
        role: 'developer'
      },
      plan: 'starter',
      features: ['api_access', 'basic_support'],
      quota: 10000
    }, null, 2),
    right: JSON.stringify({
      version: '2.0',
      status: 'active',
      user: {
        id: 'usr_849102',
        name: 'Alex Rivera',
        email: 'alex.rivera@hyperlink.dev',
        role: 'lead_architect',
        mfa_enabled: true
      },
      plan: {
        tier: 'enterprise_scale',
        billing_interval: 'annual'
      },
      features: ['api_access', 'priority_support', 'audit_logs', 'sso'],
      quota: 500000
    }, null, 2)
  },

  merge: {
    name: 'Git Merge Conflict (Config)',
    base: `PORT=3000
DATABASE_URL=postgres://localhost:5432/app_dev
LOG_LEVEL=info
CACHE_TTL=3600
WORKERS=4`,
    current: `PORT=8080
DATABASE_URL=postgres://dev-db.internal:5432/app_dev
LOG_LEVEL=debug
CACHE_TTL=3600
WORKERS=4
ENABLE_METRICS=true`,
    incoming: `PORT=3000
DATABASE_URL=postgres://cluster.prod.internal:5432/app_prod
LOG_LEVEL=warn
CACHE_TTL=7200
WORKERS=8
SSL_CERT_PATH=/etc/ssl/certs/db.crt`
  }
};
