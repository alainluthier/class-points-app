const { setGlobalDispatcher, EnvHttpProxyAgent } = require('undici');

// sets proxy user from env variables
if (process.env.HTTPS_PROXY || process.env.HTTP_PROXY) {
  console.log('Using proxy user:', process.env.HTTP_PROXY || process.env.HTTPS_PROXY);
  console.log('Setting no_proxy to:', process.env.NO_PROXY);
  setGlobalDispatcher(new EnvHttpProxyAgent());
}