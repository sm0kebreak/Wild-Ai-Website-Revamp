# Welcome to your Lovable project

## Project info

**URL**: https://lovable.dev/projects/c51e2f24-5158-4bb0-bbb7-52860d96b318

## How can I edit this code?

There are several ways of editing your application.

**Use Lovable**

Simply visit the [Lovable Project](https://lovable.dev/projects/c51e2f24-5158-4bb0-bbb7-52860d96b318) and start prompting.

Changes made via Lovable will be committed automatically to this repo.

**Use your preferred IDE**

If you want to work locally using your own IDE, you can clone this repo and push changes. Pushed changes will also be reflected in Lovable.

The only requirement is having Node.js & npm installed - [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating)

Follow these steps:

```sh
# Step 1: Clone the repository using the project's Git URL.
git clone <YOUR_GIT_URL>

# Step 2: Navigate to the project directory.
cd <YOUR_PROJECT_NAME>

# Step 3: Install the necessary dependencies.
npm i

# Step 4: Start the development server with auto-reloading and an instant preview.
npm run dev
```

**Edit a file directly in GitHub**

- Navigate to the desired file(s).
- Click the "Edit" button (pencil icon) at the top right of the file view.
- Make your changes and commit the changes.

**Use GitHub Codespaces**

- Navigate to the main page of your repository.
- Click on the "Code" button (green button) near the top right.
- Select the "Codespaces" tab.
- Click on "New codespace" to launch a new Codespace environment.
- Edit files directly within the Codespace and commit and push your changes once you're done.

## What technologies are used for this project?

This project is built with:

- Vite
- TypeScript
- React
- shadcn-ui
- Tailwind CSS

## Form submissions on `wild-ai-condensed-preview`

Sponsor, speaker/demo, email signup, Show & Tell, and chapter applications POST `/api/lead`. The server writes private JSON with `put(..., { access: 'private' })` into the Vercel Blob store `wild-ai-leads` at `leads/<form>/<timestamp>-<suffix>.json`. The response is `{ ok: true, id: pathname, emailed }` and `id` is not a public URL. `GET /api/lead` returns 405. Contact stays `mailto:jake@wildai.us`. Forms do not upload headshots. A social link is a LinkedIn or X URL only. `/admin` and `/admin/*` redirect to `/`.

The same request emails **jake@wildai.us**. The person who submitted the form does not get a confirmation. Email does not send until one of the key sets below exists on the Vercel project **wild-ai-condensed-preview**. If the keys are missing, or the provider rejects the message, storage still succeeds and `emailed` is `false`.

Set one provider on that project's Production environment, and on Preview if preview deployments should send mail, then redeploy. This repo does not create the Resend or Postmark account.

- Resend, used when `RESEND_API_KEY` is set. `RESEND_FROM_EMAIL` is an optional verified sender; otherwise the from address is `Wild AI <onboarding@resend.dev>`.
- Postmark, used only when `RESEND_API_KEY` is unset. `POSTMARK_SERVER_TOKEN` and `POSTMARK_FROM_EMAIL` are both required. `POSTMARK_MESSAGE_STREAM` is optional and defaults to `outbound`.

`BLOB_READ_WRITE_TOKEN` is already set on **wild-ai-condensed-preview** and is server-side only. It is not a `VITE_` variable and is not sent to the browser. Blob storage does not depend on the email keys.

Jake reads submissions while signed in to the Vercel dashboard: **wild-ai-condensed-preview** → Storage → Blob → **wild-ai-leads**. A server process that has that environment variable can read the same private objects. Unauthenticated requests cannot list or fetch them.

## How can I deploy this project?

Simply open [Lovable](https://lovable.dev/projects/c51e2f24-5158-4bb0-bbb7-52860d96b318) and click on Share -> Publish.

## Can I connect a custom domain to my Lovable project?

Yes it is!

To connect a domain, navigate to Project > Settings > Domains and click Connect Domain.

Read more here: [Setting up a custom domain](https://docs.lovable.dev/tips-tricks/custom-domain#step-by-step-guide)
