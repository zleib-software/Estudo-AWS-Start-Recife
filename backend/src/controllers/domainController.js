import DOMAINS from '../config/domains.js';

/**
 * GET /api/domains — retorna os 4 domínios fixos do CLF-C02.
 */
export function getDomains(_req, res) {
  res.json({ success: true, data: DOMAINS });
}
