const http = require('http');
const { URL } = require('url');

const PORT = Number(process.env.PORT || 8090);
const XRPL_RPC = process.env.XRPL_RPC || 'https://xrplcluster.com/';
const EOC_ISSUER = process.env.EOC_ISSUER || 'rB2fKokBsnHCoFWLqZ89dqp2VCbVkKoY2k';
const EOC_CURRENCY = process.env.EOC_CURRENCY || 'EOC';
const startedAt = new Date().toISOString();

function json(res, status, body) {
  const payload = JSON.stringify(body, null, 2);
  res.writeHead(status, { 'content-type': 'application/json; charset=utf-8' });
  res.end(payload);
}

async function xrpl(method, params) {
  const response = await fetch(XRPL_RPC, {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify({ method, params: [params] })
  });
  if (!response.ok) throw new Error(`XRPL_RPC_HTTP_${response.status}`);
  const body = await response.json();
  if (body.result?.status === 'error' || body.result?.error) {
    throw new Error(body.result.error_message || body.result.error || 'XRPL_RPC_ERROR');
  }
  return body.result;
}

function assertAccount(address) {
  if (!/^r[1-9A-HJ-NP-Za-km-z]{24,34}$/.test(address)) {
    throw new Error('INVALID_XRPL_ACCOUNT');
  }
}

async function accountSnapshot(address) {
  assertAccount(address);
  const [info, lines] = await Promise.all([
    xrpl('account_info', { account: address, ledger_index: 'validated' }),
    xrpl('account_lines', { account: address, ledger_index: 'validated', limit: 400 })
  ]);
  const eocLines = (lines.lines || []).filter(line =>
    line.currency === EOC_CURRENCY && (line.account === EOC_ISSUER || address === EOC_ISSUER)
  );
  return {
    account: address,
    ledger_index: info.ledger_index,
    sequence: info.account_data?.Sequence,
    owner_count: info.account_data?.OwnerCount,
    xrp_drops: info.account_data?.Balance,
    eoc_trust_lines: eocLines.map(line => ({
      counterparty: line.account,
      balance: line.balance,
      limit: line.limit,
      limit_peer: line.limit_peer,
      quality_in: line.quality_in,
      quality_out: line.quality_out,
      no_ripple: line.no_ripple,
      no_ripple_peer: line.no_ripple_peer,
      freeze: line.freeze,
      freeze_peer: line.freeze_peer
    }))
  };
}

async function issuerSnapshot() {
  assertAccount(EOC_ISSUER);
  const [info, balances] = await Promise.all([
    xrpl('account_info', { account: EOC_ISSUER, ledger_index: 'validated' }),
    xrpl('gateway_balances', { account: EOC_ISSUER, strict: true, ledger_index: 'validated' })
  ]);
  return {
    issuer: EOC_ISSUER,
    currency: EOC_CURRENCY,
    ledger_index: info.ledger_index,
    sequence: info.account_data?.Sequence,
    owner_count: info.account_data?.OwnerCount,
    xrp_drops: info.account_data?.Balance,
    obligations: balances.obligations?.[EOC_CURRENCY] || '0',
    obligations_all: balances.obligations || {},
    validated: true
  };
}

async function main(req, res) {
  const url = new URL(req.url, `http://${req.headers.host || 'localhost'}`);
  try {
    if (req.method !== 'GET') return json(res, 405, { error: 'READ_ONLY_GET_ONLY' });
    if (url.pathname === '/health') {
      return json(res, 200, {
        status: 'ok',
        service: 'eoc-custody-verifier',
        mode: 'read-only',
        can_sign: false,
        can_submit_transactions: false,
        started_at: startedAt
      });
    }
    if (url.pathname === '/config') {
      return json(res, 200, {
        mode: 'read-only',
        xrpl_rpc: XRPL_RPC,
        eoc_issuer: EOC_ISSUER,
        eoc_currency: EOC_CURRENCY,
        warning: 'No private keys, signing, minting, transfers, or custody mutations are implemented.'
      });
    }
    if (url.pathname === '/xrpl/issuer') return json(res, 200, await issuerSnapshot());
    const match = url.pathname.match(/^\/xrpl\/account\/([^/]+)$/);
    if (match) return json(res, 200, await accountSnapshot(decodeURIComponent(match[1])));
    return json(res, 404, { error: 'NOT_FOUND', routes: ['/health', '/config', '/xrpl/issuer', '/xrpl/account/:address'] });
  } catch (error) {
    return json(res, 502, { error: error.message, mode: 'read-only' });
  }
}

http.createServer(main).listen(PORT, '0.0.0.0', () => {
  console.log(`EOC custody verifier listening on 0.0.0.0:${PORT}`);
});
