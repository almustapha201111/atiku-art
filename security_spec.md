# ATIKU ART Security Specification

## 1. Data Invariants
1. **Public Information**: Business settings, confirmed services, and published portfolio projects are publicly viewable by prospective clients without authentication.
2. **Admin Operations**: Creating, updating, or deleting business settings, services, projects, or managing images is strictly restricted to authenticated studio administrators (`almustaphaaus2011@gmail.com` or users listed in `/admins/{uid}`).
3. **Lead & Inquiry Privacy (PII Protection)**: Unauthenticated or authenticated prospective clients can submit inquiries via the contact form (`create`), but they can NEVER list or read inquiries. Only authenticated administrators can read, list, update status, or delete client inquiries.
4. **Input Boundary Enforcement**: All string inputs (names, phones, descriptions, URLs) are constrained by character limits and type checks to prevent injection attacks and database exhaustion.
5. **No Spoofing**: Admin checks verify the caller against database-backed `/admins/{uid}` or the bootstrap admin email with `request.auth.token.email_verified == true`.

## 2. The "Dirty Dozen" Threat Vectors & Defense
1. **Unauthenticated Business Settings Write**: Anonymous user tries to change the WhatsApp phone number to divert client payments. *Result: REJECTED*.
2. **PII Inquiry Scraping**: Competitor attempts `getDocs(collection(db, 'inquiries'))` without admin auth to steal client phone numbers. *Result: REJECTED*.
3. **Payload Injection (Oversized string)**: Attacker sends a 5MB base64 payload into the contact form message. *Result: REJECTED (max 2000 chars)*.
4. **Orphaned Project Modification**: Non-admin user tries to update or delete portfolio images. *Result: REJECTED*.
5. **Self-Promotion to Admin**: Non-admin user tries to create a document in `/admins/{uid}` to grant themselves owner privileges. *Result: REJECTED*.
6. **Ghost Field Injection**: Malicious actor sends `isAdmin: true` along with a project submission. *Result: REJECTED*.
7. **Invalid Service Creation**: Attacker attempts to inject fake pricing or misleading offerings. *Result: REJECTED*.
8. **Unverified Email Spoofing**: User signs up with unverified email matching admin address. *Result: REJECTED (`request.auth.token.email_verified == true` required)*.
9. **Blanket Query Abuse**: Trying to query unpublished draft projects as a regular user. *Result: REJECTED (`resource.data.isPublished == true` enforced)*.
10. **Malicious ID Path Poisoning**: Attempting path traversal with invalid document ID characters. *Result: REJECTED*.
11. **Client Inquiry Tampering**: Client attempts to edit or delete someone else's inquiry. *Result: REJECTED*.
12. **Settings Deletion**: Malicious user attempts to delete the root business profile. *Result: REJECTED*.
