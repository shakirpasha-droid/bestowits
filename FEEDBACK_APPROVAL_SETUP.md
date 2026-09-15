# BESTOW IT SERVICES - Customer Feedback Approval System

## Workflow

**Customer submits feedback → PENDING → Approve & Publish → PUBLISHED → Unpublish → UNPUBLISHED**

New feedback is never published automatically, even when the customer gives publication consent.

## One-time Google setup

1. Create/open a Google Sheet named `BESTOW Customer Feedback`.
2. Open **Extensions > Apps Script**.
3. Copy the complete code from `customer-feedback-apps-script.gs` in this repository into the Apps Script editor and save it.
4. In Apps Script, open **Project Settings → Script properties**.
5. Add a property named `ADMIN_KEY`.
6. Set its value to a long private password of your choice. **Do not put this key in GitHub or the website source code.**
7. Deploy → **New deployment** → **Web app**.
8. Set **Execute as** to your Google account (`Me`).
9. Set **Who has access** to `Anyone` so the public feedback form can submit to the backend.
10. Authorize the script when Google asks.
11. Copy the deployed Web App URL.
12. Put that URL into both:
   - `customer_feedback.html` → `FEEDBACK_API_URL`
   - `assets/js/home-sections.js` → `FEEDBACK_API_URL`
13. Save/commit those two URL changes to GitHub.

Google Apps Script web apps use `doGet`/`doPost` as their web endpoints and can also serve an HTML admin interface. urlGoogle Apps Script Web Apps documentationhttps://developers.google.com/apps-script/guides/web

## Admin approval page

After deployment, open:

`YOUR_WEB_APP_URL?page=admin`

Example format:

`https://script.google.com/macros/s/YOUR_DEPLOYMENT_ID/exec?page=admin`

Enter the private `ADMIN_KEY` you created in Script Properties.

The admin panel shows:

- **Pending** — new feedback waiting for review
- **Published** — currently visible on the website
- **Unpublished** — previously approved feedback that has been hidden

### Buttons

**Approve & Publish**
- Checks that the customer gave publication consent.
- Changes the record to `PUBLISHED`.
- The approved testimonial becomes available to the homepage.

**Unpublish**
- Changes the record to `UNPUBLISHED`.
- The testimonial is removed from the homepage but the record remains in the Sheet.

**Republish**
- Returns an unpublished, consented testimonial to `PUBLISHED`.

## Google Sheet columns

`Timestamp | Name | Company | Email | Service | Rating | Feedback | Consent | Published`

The existing `Published` column is used to store the workflow status. Older `YES` values are treated as `PUBLISHED`; older `NO` values are treated as `PENDING`.

## Privacy

The public website endpoint returns only published testimonial fields. Customer email addresses and other private fields are not returned to the public homepage.

## Important

The GitHub-side website code and approval backend are now prepared. The only remaining one-time step that cannot be completed from the GitHub connection is deploying/authorizing the Google Apps Script inside your Google account and adding the private `ADMIN_KEY`. GitHub Pages itself is a static hosting service, so the approval state is handled by the Google Apps Script backend rather than by GitHub Pages. citeturn0search0turn0search1
