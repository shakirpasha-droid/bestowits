# BESTOW IT SERVICES - Customer Feedback Approval

## How the system works

Customer submits feedback -> Google Sheet stores it as `Published = NO` -> you review it -> change `Published` to `YES` -> the website can display it.

A negative or unwanted review can be hidden later simply by changing `Published` back to `NO`. You do not need to delete the record.

## One-time Google setup

1. Create a Google Sheet named `BESTOW Customer Feedback`.
2. Open **Extensions > Apps Script**.
3. Copy the code from `customer-feedback-apps-script.gs` in this repository into the Apps Script editor.
4. Save the project.
5. Select **Deploy > New deployment**.
6. Choose **Web app**.
7. Set **Execute as** to your Google account (Me).
8. Set **Who has access** to **Anyone**.
9. Deploy and authorize the script when Google asks.
10. Copy the Web app URL.
11. Put that URL into `customer_feedback.html` as the value of `FEEDBACK_API_URL`.

## Approval

The sheet creates these columns:

`Timestamp | Name | Company | Email | Service | Rating | Feedback | Consent | Published`

New submissions are always `NO`.

- `YES` = allowed to appear publicly
- `NO` = hidden from the website

## Privacy

Customer email addresses remain in the private sheet and are not returned by the public website endpoint. Only approved testimonial fields are returned.

## Important

The Google Apps Script deployment is the only part that cannot be completed from the GitHub connection alone because it requires authorization inside your Google account. Everything else is prepared in this repository.
