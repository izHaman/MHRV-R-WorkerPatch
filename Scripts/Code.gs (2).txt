/**
 * DomainFront Relay — Google Apps Script With Cloudflare Worker Exit
 *
 * FLOW:
 *   Client → GAS (Google Apps Script) → CFW (Cloudflare Worker) → Internet
 *
 * MODES:
 *   1. Single:  POST { k, m, u, h, b, ct, r }        → { s, h, b }
 *   2. Batch:   POST { k, q: [{m,u,h,b,ct,r}, ...] } → { q: [{s,h,b}, ...] }
 *
 * CHANGE THESE:
 */

const AUTH_KEY = "STRONG_SECRET_KEY";
const WORKER_URL = "https://example.workers.dev";

// Headers that should never be forwarded upstream
const SKIP_HEADERS = {
  host: 1,
  connection: 1,
  "content-length": 1,
  "transfer-encoding": 1,
  "proxy-connection": 1,
  "proxy-authorization": 1,
};

function doPost(e) {
  try {
    // Validate request payload existence
    if (!e || !e.postData || !e.postData.contents) {
      return _json({ e: "missing request body" });
    }

    var req;

    // Safely parse incoming JSON payload
    try {
      req = JSON.parse(e.postData.contents);
    } catch (_) {
      return _json({ e: "invalid json body" });
    }

    // Validate shared authentication key
    if (req.k !== AUTH_KEY) {
      return _json({ e: "unauthorized" });
    }

    // Batch mode
    if (Array.isArray(req.q)) {
      return _doBatch(req.q);
    }

    // Single request mode
    return _doSingle(req);

  } catch (err) {
    // Catch-all runtime error handler
    return _json({ e: String(err) });
  }
}

function _doSingle(req) {
  // Validate target URL format
  if (!_isValidUrl(req.u)) {
    return _json({ e: "bad url" });
  }

  var payload = _buildWorkerPayload(req);

  // Forward request to Cloudflare Worker
  var resp = UrlFetchApp.fetch(WORKER_URL, {
    method: "post",
    contentType: "application/json",
    payload: JSON.stringify(payload),
    muteHttpExceptions: true,
    followRedirects: true
  });

  // Normalize worker response
  try {
    return _json(JSON.parse(resp.getContentText()));
  } catch (_) {
    return _json({
      e: "invalid worker response",
      raw: resp.getContentText()
    });
  }
}

function _doBatch(items) {
  var fetchArgs = [];
  var errorMap = {};

  // Build fetch queue
  for (var i = 0; i < items.length; i++) {
    var item = items[i];

    // Preserve per-item validation behavior
    if (!_isValidUrl(item.u)) {
      errorMap[i] = "bad url";
      continue;
    }

    var payload = _buildWorkerPayload(item);

    fetchArgs.push({
      _i: i,
      _o: {
        url: WORKER_URL,
        method: "post",
        contentType: "application/json",
        payload: JSON.stringify(payload),
        muteHttpExceptions: true,
        followRedirects: true
      }
    });
  }

  var responses = [];

  // Execute batched worker requests
  if (fetchArgs.length > 0) {
    responses = UrlFetchApp.fetchAll(
      fetchArgs.map(function(x) {
        return x._o;
      })
    );
  }

  var results = [];
  var rIdx = 0;

  // Rebuild ordered response list
  for (var j = 0; j < items.length; j++) {
    if (errorMap.hasOwnProperty(j)) {
      results.push({ e: errorMap[j] });
      continue;
    }

    var resp = responses[rIdx++];

    try {
      results.push(JSON.parse(resp.getContentText()));
    } catch (_) {
      results.push({
        e: "invalid worker response",
        raw: resp.getContentText()
      });
    }
  }

  return _json({ q: results });
}

function _buildWorkerPayload(req) {
  var headers = {};

  // Filter restricted hop-by-hop headers
  if (req.h && typeof req.h === "object") {
    for (var k in req.h) {
      if (
        req.h.hasOwnProperty(k) &&
        !SKIP_HEADERS[k.toLowerCase()]
      ) {
        headers[k] = req.h[k];
      }
    }
  }

  // Preserve upstream payload structure
  return {
    u: req.u,
    m: (req.m || "GET").toUpperCase(),
    h: headers,
    b: req.b || null,
    ct: req.ct || null,
    r: req.r !== false
  };
}

function doGet() {
  // Lightweight status page
  return HtmlService.createHtmlOutput(
    "<!DOCTYPE html><html><head><title>My App</title></head>" +
      '<body style="font-family:sans-serif;max-width:600px;margin:40px auto">' +
      "<h1>Relay Active</h1><p>Cloudflare Worker routing enabled.</p>" +
      "</body></html>"
  );
}

// Shared URL validator
function _isValidUrl(url) {
  return (
    typeof url === "string" &&
    /^https?:\/\//i.test(url)
  );
}

// Standard JSON response helper
function _json(obj) {
  return ContentService
    .createTextOutput(JSON.stringify(obj))
    .setMimeType(ContentService.MimeType.JSON);
}
