export default async function handler(req, res) {
  const CLIENT_ID = process.env.GITHUB_CLIENT_ID;
  const CLIENT_SECRET = process.env.GITHUB_CLIENT_SECRET;

  if (!CLIENT_ID || !CLIENT_SECRET) {
    return res.status(500).send('GITHUB_CLIENT_ID or GITHUB_CLIENT_SECRET not configured in environment.');
  }

  const { code } = req.query;

  // Step 1: No code yet -> redirect to GitHub's OAuth authorize page
  if (!code) {
    const redirectUri = `https://${req.headers.host}/api/auth`;
    const githubAuthUrl = `https://github.com/login/oauth/authorize?client_id=${CLIENT_ID}&redirect_uri=${encodeURIComponent(redirectUri)}&scope=repo,user`;
    res.writeHead(302, { Location: githubAuthUrl });
    return res.end();
  }

  // Step 2: We have a code -> exchange it for an access token
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
      const errorScript = `
        <script>
          (function() {
            function receiveMessage(e) {
              window.opener.postMessage(
                'authorization:github:error:${JSON.stringify(tokenJson).replace(/'/g, "\\'")}',
                e.origin
              );
            }
            window.addEventListener('message', receiveMessage, false);
            window.opener.postMessage('authorizing:github', '*');
          })();
        </script>
      `;
      res.setHeader('Content-Type', 'text/html');
      return res.status(400).send(errorScript);
    }

    // Success: send token back to the opener window via postMessage
    const successScript = `
      <script>
        (function() {
          function receiveMessage(e) {
            window.opener.postMessage(
              'authorization:github:success:${JSON.stringify({ token: tokenJson.access_token, provider: 'github' }).replace(/'/g, "\\'")}',
              e.origin
            );
          }
          window.addEventListener('message', receiveMessage, false);
          window.opener.postMessage('authorizing:github', '*');
        })();
      </script>
    `;
    res.setHeader('Content-Type', 'text/html');
    return res.status(200).send(successScript);
  } catch (err) {
    res.setHeader('Content-Type', 'text/html');
    return res.status(500).send('<script>console.error("Token exchange failed: ' + String(err).replace(/"/g, '\\"') + '");</script>');
  }
}
