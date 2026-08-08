// Simple Vercel serverless function to exchange GitHub OAuth code for an access token.
// Instructions:
// 1. Register a GitHub OAuth App and set the Authorization callback URL to
//    https://<YOUR_DOMAIN>/admin/
// 2. Add the following Environment Variables to your Vercel project:
//    - GITHUB_CLIENT_ID
//    - GITHUB_CLIENT_SECRET
// 3. In `public/admin/config.yml`, set `auth_endpoint: "/api/auth"` (or the full deployed URL).
// 4. Do NOT commit secrets to the repo.

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  const CLIENT_ID = process.env.GITHUB_CLIENT_ID;
  const CLIENT_SECRET = process.env.GITHUB_CLIENT_SECRET;

  if (!CLIENT_ID || !CLIENT_SECRET) {
    return res.status(500).json({ error: 'GITHUB_CLIENT_ID or GITHUB_CLIENT_SECRET not configured in environment.' });
  }

  // Expecting a POST with JSON body { code: '<github_oauth_code>' }
  const code = (req.method === 'POST' ? req.body && req.body.code : req.query.code) || null;

  if (!code) {
    return res.status(400).json({ error: 'Missing `code` parameter.' });
  }

  try {
    const tokenRes = await fetch('https://github.com/login/oauth/access_token', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ client_id: CLIENT_ID, client_secret: CLIENT_SECRET, code }),
    });

    const tokenJson = await tokenRes.json();

    if (tokenJson.error) {
      return res.status(400).json({ error: tokenJson.error, error_description: tokenJson.error_description });
    }

    // Return the token in the shape expected by the CMS auth proxy
    return res.status(200).json({ token: tokenJson.access_token });
  } catch (err) {
    return res.status(500).json({ error: 'Token exchange failed', detail: String(err) });
  }
}
