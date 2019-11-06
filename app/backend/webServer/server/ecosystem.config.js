module.exports = {
  apps : [{
    name: 'StimuliServer',
    script: './server.js',
    args: '',
    instances: 2,
    exec_mode  : "cluster",
    autorestart: false,
    watch: false,
    max_memory_restart: '1G',
    env: {
      NODE_ENV: 'development'
    },
    env_production: {
      NODE_ENV: 'production'
    }
  }]
};
