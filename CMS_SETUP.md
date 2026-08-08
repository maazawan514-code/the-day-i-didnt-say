# Decap CMS Setup for The Day I Didn't Say

This repository is configured for Decap CMS using GitHub as the backend.

## Admin Interface

The CMS admin interface is available at:

- `/admin/`

Since the CMS is served from `public/admin/index.html`, it will be included in production builds.

## Decap GitHub Backend Configuration

The CMS is configured in `public/admin/config.yml` with:

- `backend.name: github`
- `backend.repo: maazawan514-code/the-day-i-didnt-say`
- `backend.branch: main`
- `media_folder: "public/uploads"`
- `public_folder: "/uploads"`

## Blog Posts Collection

A CMS collection has been configured for blog posts at `content/posts/`.
The collection fields include:

- title
- slug
- category
- excerpt
- content
- featuredImage
- date
- readTime
- tags
- featured
- seoTitle
- seoDescription
- ogImage
- draft

## Authentication Requirements for Production

### GitHub Authentication

Decap CMS with `backend: github` does not automatically log users in. A GitHub user must authenticate and authorize the CMS to push changes to the repository.

### Production Deployment Notes

1. **GitHub OAuth app or API token configuration is required** for production use.
2. Decap CMS uses GitHub OAuth through the browser when accessing `/admin/`.
3. The GitHub repo owner or administrator must register an OAuth application with GitHub and provide the OAuth client ID and client secret to the CMS. Without this, `/admin/` will prompt for login but may not be able to commit changes to the repository.

### Recommended setup

For a production deployment, use one of these options:

- **OAuth app**: configure GitHub OAuth with a client ID and secret, then set those values in the CMS environment or in a deployment-specific config wrapper.
- **GitHub App / Token**: if using a deployment platform that can securely provide secrets, supply the needed OAuth credentials there.

### Important

- Do not store OAuth secrets in `.env` files checked into the repo.
- Do not expose secret keys in `public/admin/config.yml`.
- The production deployment environment should keep GitHub credentials secret and only accessible to the CMS.

## How `/admin/` Works

- The admin page loads Decap CMS from unpkg.
- Decap reads `public/admin/config.yml`.
- The user logs in with GitHub and grants access to the repo.
- The user can create, edit, delete, and publish posts.
- Uploaded images are saved to `public/uploads/`.

## Next step

Phase 1 is complete. The site is ready for Phase 2, where the application will be updated to load CMS-managed posts while preserving the current static experience.

## Production manual setup (remaining steps)

Follow these exact steps to enable production GitHub OAuth for Decap CMS on Vercel. Do NOT commit any secrets.

1. Create a GitHub OAuth App
	- In GitHub, go to: https://github.com/settings/developers -> OAuth Apps -> New OAuth App
	- **Application name**: (your choice)
	- **Homepage URL**: `https://<YOUR-VERCEL-DOMAIN>` (use your deployed Vercel domain or custom domain)
	- **Authorization callback URL**: `https://<YOUR-VERCEL-DOMAIN>/admin/`
	- Register the app and copy the **Client ID** and **Client Secret** (do not share these).

2. Configure environment variables in Vercel
	- Open your project in the Vercel dashboard -> Settings -> Environment Variables.
	- Add the following variables (do not add them to the repository or `public/` files):
	  - `GITHUB_CLIENT_ID` = (the Client ID from GitHub)
	  - `GITHUB_CLIENT_SECRET` = (the Client Secret from GitHub)
	- Set both variables for **Production** and **Preview** environments (optional: also add to Development if you want preview runs locally via Vercel's CLI).

3. Verify `public/admin/config.yml`
	- Ensure `backend.auth_endpoint` is set to `"/api/auth"` (this file is already configured).
	- When deployed, the CMS will call `https://<YOUR-VERCEL-DOMAIN>/api/auth` to exchange the OAuth code for a token.

4. Deploy to Vercel
	- Deploy the project from the GitHub repository to Vercel (do NOT include secrets in the repo).
	- After deployment, open: `https://<YOUR-VERCEL-DOMAIN>/admin/` to log in via GitHub.

Notes and testing limitations
 - The `api/auth.js` serverless function at `api/auth.js` handles the server-side token exchange. Vercel will expose it at `/api/auth` for the deployed domain.
 - This setup cannot be fully tested without real GitHub OAuth credentials; the handler will return an explanatory error if `GITHUB_CLIENT_ID` / `GITHUB_CLIENT_SECRET` are missing.
 - For local development, GitHub OAuth callbacks must match the registered Authorization callback URL; consider using Vercel Preview URLs or a tunneling service if you need to test end-to-end locally.

Manual checklist (concise)

1. Create a GitHub OAuth App in GitHub Settings → Developer settings → OAuth Apps → New OAuth App.
2. Set the **Homepage URL** to: `https://<YOUR_VERCEL_DOMAIN>`.
3. Set the **Authorization callback URL** to: `https://<YOUR_VERCEL_DOMAIN>/admin/`.
4. After registering, copy the **Client ID**.
5. Generate and copy the **Client Secret** (keep it secret).
6. In Vercel dashboard → Project → Settings → Environment Variables, add `GITHUB_CLIENT_ID` with the Client ID.
7. Add `GITHUB_CLIENT_SECRET` with the Client Secret in the same place.
8. Assign both variables to the **Production** environment (also add to **Preview** if desired).
9. Redeploy the project on Vercel (do not commit secrets to the repo).
10. Open the admin UI at: `https://<YOUR_VERCEL_DOMAIN>/admin/`.
11. Click **GitHub** to log in and authorize the app.
12. Create a test post in the CMS and save it as a draft or publish directly.
13. Publish the post and verify the commit appears in the GitHub repository.
14. Confirm Vercel received the webhook/build trigger and rebuilt the site (check Vercel Deployment activity).
15. Verify the new post appears on the live website at `https://<YOUR_VERCEL_DOMAIN>`.
