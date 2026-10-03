# Bestow IT Services — WhatsApp AI Notification Setup

The website AI assistant now supports a secure server-side WhatsApp notification path.

## Architecture

Website AI chat -> `/api/whatsapp-notify` -> Meta WhatsApp Cloud API -> Bestow WhatsApp recipient

The Meta access token is never stored in frontend JavaScript or committed to GitHub.

## Required deployment

The repository contains Vercel-compatible serverless functions:

- `api/whatsapp-notify.js` — sends the completed AI conversation
- `api/health.js` — reports whether the required environment variables exist
- `vercel.json` — function configuration

The static GitHub Pages site can continue to work with email fallback. For automatic WhatsApp delivery, the same repository needs to be deployed to a serverless host such as Vercel, or the frontend must be pointed at the deployed API URL.

## Required environment variables

Configure these as server-side secrets/configuration in the deployment platform:

- `WHATSAPP_ACCESS_TOKEN` — Meta WhatsApp Cloud API access token
- `WHATSAPP_PHONE_NUMBER_ID` — registered WhatsApp Business phone-number ID
- `WHATSAPP_RECIPIENT` — destination number, digits only, including country code
- `WHATSAPP_GRAPH_VERSION` — Graph API version currently selected/supported by the Meta WhatsApp setup

Do not put the access token in `assets/js/bestow-ai-chat.js`.

## Important

The WhatsApp sender number must be properly registered for the WhatsApp Business Platform/Cloud API. The destination number must be able to receive the API message. If the sender and destination are the same number, use a separate receiving number if Meta rejects self-delivery.

## Activation check

After deployment, open:

`/api/health`

A configured deployment should return:

`{"status":"online","configured":true}`

Then complete a test AI conversation and close the chat. The website first attempts the secure WhatsApp API. If that API is not configured or fails, the existing Web3Forms email notification remains the fallback.
