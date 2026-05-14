const WORKER_URL = "floral-brook-a4a5.izizhamanbabavand.workers.dev";

export default {
  async fetch(request) {
    try {
      // Only accept POST requests with JSON payload
      if (request.method !== "POST") {
        return json({ e: "POST only" }, 405);
      }

      // Prevent internal relay loops
      if (request.headers.get("x-relay-hop") === "1") {
        return json({ e: "loop detected" }, 508);
      }

      let req;

      // Safely parse JSON body
      try {
        req = await request.json();
      } catch {
        return json({ e: "invalid json body" }, 400);
      }

      // Validate required target URL
      if (!req.u) {
        return json({ e: "missing url" }, 400);
      }

      const targetUrl = new URL(req.u);

      // Block self-fetch to avoid recursive requests
      if (targetUrl.hostname === WORKER_URL) {
        return json({ e: "self-fetch blocked" }, 400);
      }

      const headers = new Headers();

      // Forward custom headers if provided
      if (req.h && typeof req.h === "object") {
        for (const [k, v] of Object.entries(req.h)) {
          headers.set(k, v);
        }
      }

      // Mark request as relayed to prevent loops
      headers.set("x-relay-hop", "1");

      const fetchOptions = {
        method: (req.m || "GET").toUpperCase(),
        headers,
        redirect: req.r === false ? "manual" : "follow"
      };

      // Attach request body if provided (base64 encoded)
      if (req.b) {
        const binary = Uint8Array.from(atob(req.b), (c) => c.charCodeAt(0));
        fetchOptions.body = binary;
      }

      const resp = await fetch(targetUrl.toString(), fetchOptions);

      const buffer = await resp.arrayBuffer();
      const uint8 = new Uint8Array(buffer);

      let binary = "";
      const chunkSize = 0x8000;

      // Convert binary response to base64 safely in chunks
      for (let i = 0; i < uint8.length; i += chunkSize) {
        binary += String.fromCharCode.apply(
          null,
          uint8.subarray(i, i + chunkSize)
        );
      }

      const responseHeaders = {};

      // Serialize response headers
      resp.headers.forEach((v, k) => {
        responseHeaders[k] = v;
      });

      // Return unified relay response format
      return json({
        s: resp.status,
        h: responseHeaders,
        b: btoa(binary)
      });

    } catch (err) {
      // Catch-all error handler for unexpected runtime failures
      return json({ e: String(err) }, 500);
    }
  }
};

function json(obj, status = 200) {
  return new Response(JSON.stringify(obj), {
    status,
    headers: {
      "content-type": "application/json"
    }
  });
}
