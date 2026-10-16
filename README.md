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

Sponsor, speaker/demo, email signup, Show & Tell, and chapter applications POST `/api/lead` only. The server writes private JSON to the Vercel Blob store `wild-ai-leads` at `leads/<form>/<timestamp>-<suffix>.json` with `access: 'private'`. Contact stays a `mailto:jake@wildai.us` link. Forms do not upload headshots or other images. `GET /api/lead` returns 405 and the response never includes a blob URL.

The same request emails **jake@wildai.us**. The person who submitted the form does not get a confirmation. Email does not send until one of the key sets below exists. If the keys are missing, or the provider rejects the message, storage still succeeds and the response is `{ ok: true, emailed: false }`.

Blob storage uses `BLOB_READ_WRITE_TOKEN`, already connected on **wild-ai-condensed-preview**. No new Blob key is required. Set one provider on that project's Production environment (and Preview if preview deployments should send mail), then redeploy:

- Resend, used when `RESEND_API_KEY` is set. `RESEND_FROM_EMAIL` is an optional verified sender; otherwise the from address is `Wild AI <onboarding@resend.dev>`.
- Postmark, used only when `RESEND_API_KEY` is unset. `POSTMARK_SERVER_TOKEN` and `POSTMARK_FROM_EMAIL` are both required. `POSTMARK_MESSAGE_STREAM` is optional and defaults to `outbound`.

Jake reads submissions in the Vercel dashboard: **wild-ai-condensed-preview** → Storage → Blob → **wild-ai-leads**. The store is private.

## How can I deploy this project?

Simply open [Lovable](https://lovable.dev/projects/c51e2f24-5158-4bb0-bbb7-52860d96b318) and click on Share -> Publish.

## Can I connect a custom domain to my Lovable project?

Yes it is!

To connect a domain, navigate to Project > Settings > Domains and click Connect Domain.

Read more here: [Setting up a custom domain](https://docs.lovable.dev/tips-tricks/custom-domain#step-by-step-guide)
