const presets = [
  [
    '@babel/env',
    {
      targets: {
        edge: '15',
        firefox: '50',
        chrome: '64',
        safari: '11.1',
      },
      useBuiltIns: 'usage', // эта настройка babel-polyfill, если стоит значение usage, то будут подставлятся полифилы для версий браузеров которые указали ниже.
      corejs: '3.6.5', // явно проставить версию corejs
    },
  ],
];

module.exports = { presets };