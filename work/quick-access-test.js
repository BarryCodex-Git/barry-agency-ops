const site = 'https://mynewwebsite.co.za';
const username = 'barry';
const password = process.env.BARRY_APP_PASS;

if (!password) {
  throw new Error('Missing BARRY_APP_PASS');
}

const authorization = `Basic ${Buffer.from(`${username}:${password}`, 'utf8').toString('base64')}`;

async function request(url, options = {}) {
  return fetch(url, {
    ...options,
    headers: {
      Authorization: authorization,
      ...options.headers,
    },
  });
}

const authResponse = await request(`${site}/wp-json/wp/v2/users/me?context=edit`);
const authBody = await authResponse.text();
let authUser = null;

try {
  authUser = JSON.parse(authBody);
} catch {
  // Status and content type are enough to identify a failed auth layer.
}

const mcpResponse = await request(`${site}/wp-json/mcp/elementor-mcp-server`, {
  method: 'POST',
  headers: {
    Accept: 'application/json, text/event-stream',
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    jsonrpc: '2.0',
    id: 1,
    method: 'initialize',
    params: {
      protocolVersion: '2025-03-26',
      capabilities: {},
      clientInfo: { name: 'Barry', version: '1.0.0' },
    },
  }),
});

const mcpBody = await mcpResponse.text();
const mcpReady = mcpResponse.ok && /"result"|event:\s*message/i.test(mcpBody);

console.log(JSON.stringify({
  domain: 'mynewwebsite.co.za',
  wordpress: {
    ready: authResponse.ok && authUser?.slug === username,
    status: authResponse.status,
    user: authUser?.slug || null,
  },
  elementorMcp: {
    ready: mcpReady,
    status: mcpResponse.status,
    endpoint: `${site}/wp-json/mcp/elementor-mcp-server`,
  },
}, null, 2));

if (!authResponse.ok || authUser?.slug !== username || !mcpReady) {
  process.exitCode = 1;
}
