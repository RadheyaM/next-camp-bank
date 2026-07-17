# 2026 Code & Database Modification Notes
**Date:** Friday, 17 July 2026

## 1. Database Initialization
* **Database:** `Campers`

### Collection A: `Campers` (Account Codes)
* **Action:** Added **375 new sequential accounts** (`accountId` ranging from `"10001"` to `"10375"` as strings).
* **Changes:** 
  * `firstName` and `lastName` are initialized as empty strings (`""`) to prepare for linking camper details later.
  * `startingBalance` is set to `"0"`.
  * `isStaff` is set to `false`.
  * `dateTimeCreated` is populated with the creation timestamp.
* **Preservation:** The existing `users` collection has been preserved entirely.
* **Seeding Script:** Created `scripts/generate-accounts.js` to run the DB seeding operation safely.

### Collection B: `CamperDetails` (Excel Roster Import)
* **Action:** Created and populated a new collection containing **288 camper/leader roster rows** imported from the file `2026 Badges and Bank.xlsx`.
* **Changes:**
  * `firstName` & `lastName`: Sourced by parsing the `Name` field from Excel, splitting by space, and mapping safely (e.g., compound names/middle names are properly handled under `lastName`).
  * `camp`: Sourced from `Camp` in Excel.
  * `camperLeader`: Sourced from `Camper/Leader` in Excel.
  * `group`: Sourced from `Group` in Excel.
  * `room`, `accountQRCode`, and `linkedQRCode`: Initialized as empty strings (`""`).
  * `dateTimeCreated`: Populated with the import timestamp.
* **Import Script:** Created `scripts/import-camper-details.js` to parse the Excel file and bulk insert the data.

## 2. Dynamic Route Handling (Next.js SSG Fallback)
* **File Modified:** `src/pages/campers/[camperCode]/index.js`
* **Change:** Changed `fallback: false` to `fallback: 'blocking'` in `getStaticPaths`.
* **Reasoning:** Since Next.js was pre-rendering all camper routes at build-time with `fallback: false`, navigating to any newly created/seeded camper ID would return a **404 Not Found** error. Changing this option to `'blocking'` allows Next.js to dynamically fetch and generate the page for new camper IDs on demand without requiring a full site rebuild.

## 3. UI Resilience Upgrades for Unassigned Accounts
With `firstName` and `lastName` no longer required and starting as empty strings, we upgraded several React components to prevent empty fields or `"undefined undefined"` from showing up:

* **Camper List (`src/components/campers/CamperRow.js`)**:
  * If a camper's first and last names are empty, it will display `"Unassigned Account"` instead of empty spaces.
* **Camper Details Header (`src/components/overview/AccountSummary.js`)**:
  * Displays `"Unassigned Account"` gracefully for accounts without assigned names.
* **Account Filtering (`src/components/campers/AllCampersTable.js`)**:
  * Enhanced the search filter to gracefully parse empty/unassigned names.
  * Added the capability to search/filter the table by **Account ID** (e.g., typing `10025` will find that account), which is highly valuable now that accounts don't have names initially.
* **New Transactions Form (`src/components/forms/NewTransForm.js`)**:
  * Adjusted the transaction creator to default the transaction's name property to `"Account <accountId>"` (e.g., `"Account 10001"`) instead of `"undefined undefined"` or blank when recording deposits or payments. This keeps the `Transactions` database logs clean and searchable.

## 4. Assign QR Codes Feature Implementation
We built the complete "Assign QR Codes" workflow to bind physical QR barcode/QR tags to the imported roster:

* **Navigation Update (`src/components/layout/MainNavigation.js`)**:
  * Fixed the top navigation bar's copy-pasted link, pointing `"Assign QR Codes"` to the correct path `/campers/assign-qr`.
* **Backend API Routes**:
  * **Roster Data Fetcher (`src/pages/api/campers/get-details.js`)**: Fetches all documents from the `CamperDetails` collection sorted alphabetically by name.
  * **QR Code Assignment & Syncing Handler (`src/pages/api/campers/assign-qr.js`)**:
    * Accepts `camperId`, `accountQRCode` and `linkedQRCode`.
    * Enforces range bounds: any scanned code must be between `10001` and `10375`.
    * Enforces uniqueness for the primary `accountQRCode` so that no two campers are assigned the same primary financial account code.
    * Allows non-unique `linkedQRCode` mappings so siblings/families can link to a shared primary account.
    * **Instant Banking Sync:** Upon primary account assignment, it automatically syncs the camper's `firstName` and `lastName` from `CamperDetails` to the matching financial account `accountId` in the `Campers` collection. This instantly populates their real names across your banking interface!
* **Frontend Scanning Page (`src/pages/campers/assign-qr.js`)**:
  * Designed a gorgeous, Material-UI-driven form featuring:
    * A searchable dropdown `Autocomplete` box to quickly find and select from the 288 camper/leader files.
    * An informative profile card rendering the selected camper's Camp, Group, and Leader role.
    * Seamless support for physical barcode scanners (with automatic key-down listeners that focus the linked scanner input after the primary scan).
    * Comprehensive client-side validation checkups (valid range check, uniqueness warnings, matching ID errors).
    * Beautiful instant alerts with status results and auto-resets for rapid hands-free sequential scanning.

---

## 5. Assigned Campers Account Listing
To display which rostered campers are mapped to each banking account, we integrated an "Assigned Campers" sub-section directly into the account details view:

* **Backend Sub-Route (`src/pages/api/campers/[camperCode]/get-assigned.js`)**:
  * Added a dynamic sub-route endpoint to query the `CamperDetails` collection.
  * Searches for documents matching the primary `accountQRCode` OR the shared `linkedQRCode` matching the loaded `camperCode`.
* **Frontend Real-time Query (`src/pages/campers/[camperCode]/index.js`)**:
  * Updated `getStaticProps` to pre-fetch the assigned campers list at build/render time for immediate page loading.
  * Added a `useQuery` hook for `["assignedCampers"]` to perform client-side polling, ensuring that if QR code assignments change, the account overview updates instantly without manual page refreshes.
  * Passed this query down through `CamperDetail.js` to `AccountSummary.js`.
* **UI Table Component (`src/components/overview/AccountSummary.js`)**:
  * Designed an elegant roster table displayed directly below the main account details header.
  * Lists each assigned camper's full name, role (Camper vs. Leader), camp level, group/team, and assignment type.
  * Distinguishes the primary account holder from family/linked members using color-coded status badges (`Primary Account` in green, `Linked Account` in blue) for rich and easy tracking.

---

## 6. Runtime Bug Fixes
* **Landing Page Code Finder (`src/components/forms/ScanCamperCode.js`)**:
  * Fix: Corrected an issue where entering an account ID on the home page crashed the browser with `TypeError: localStorage.get is not a function`.
  * **Resolution:** Changed `localStorage.get("Alert")` to the correct Web Storage API call `localStorage.getItem("Alert")`, completely resolving the crash.

  ---

  ## 7. Dynamic Code Resolution Redirects
  To support family banking accounts where multiple sibling barcodes link to a single primary parent account:

  * **Backend Resolver API (`src/pages/api/campers/resolve-code.js`)**:
  * Created a dedicated code-resolution API endpoint.
  * Checks if the scanned `accountQRCode` is mapped to a rostered camper who has a secondary `linkedQRCode` (indicating family banking linkage).
  * If a linked primary account code is found, the endpoint resolves the target redirection code to that primary `linkedQRCode`. Otherwise, it resolves back to the entered code itself.
  * **Frontend Search Form Integration (`src/components/forms/ScanCamperCode.js`)**:
  * Updated the home page scanner's `submitHandler` to retrieve the dynamically resolved target account from the backend.
  * Performs the dynamic page transition to the correct resolved primary account page seamlessly.
  * Employs robust fallbacks to make sure any un-rostered codes or network glitches fall back to standard `/campers/enteredCode` directories, ensuring zero workflow interruptions for operators.

  ---

  ## 8. Account Roster Filtering & Navigation Rename
  To accurately align the terminology with the single-primary family account architecture:

  * **Top Navbar Rename (`src/components/layout/MainNavigation.js`)**:
    * Changed the text of the landing page search link from `"Camper By Code"` to `"Account By Code"`.
    * Changed the text of the directory index link from `"Camper By Name"` to `"Account By Name"`.
  * **Primary Accounts Only Filter**:
    * Updated the index page's static rendering (`src/pages/campers/index.js`) and dynamic query endpoint (`src/pages/api/campers/get.js`).
    * Queries the `CamperDetails` collection to build an exclusion list of any `accountQRCode` where a non-empty `linkedQRCode` is assigned (meaning they are shared/linked accounts, not independent bank accounts).
    * Performs a MongoDB `$nin` exclusion query on the banking `Campers` collection to return only primary banking accounts.
    * This hides redundant family linked accounts, keeping the "Account By Name" view clean and showing only unique primary financial accounts.

  ---

  ## 9. Account Details Layout Optimization
  To provide a highly professional, compact, and cohesive bank-teller experience, we refactored the `/campers/[camperCode]` page layout and its main input form:

  * **Grid Dashboard Layout (`src/components/campers/CamperDetail.js`)**:
    * Replaced the vertical stack of three gigantic `Paper` containers with a responsive 2-column dashboard grid.
    * Expanded the dashboard's `maxWidth` from `1200px` to **`1400px`** to let cards sit side-by-side spaciously.
    * Reduced the wrapper container's padding from a squeezed `6rem` to a responsive, balanced **`1rem/2rem`** and set `alignItems` to **`stretch`** so the content fully utilizes the monitor width.
    * **Left Column (width: 5):** Renders the customer/account details and roster table compactly.
    * **Right Column (width: 7):** Renders the transaction processing form.
    * **Bottom Row (width: 12):** Spans the entire screen width to display the transaction history table.
  * **Teller-Slip Transaction Form (`src/components/forms/NewTransForm.js`)**:
    * Changed the main header from `"Quick Teller slip"` to `"Create Transaction"` styled as an `<h2>` for cohesive uniformity.
    * Added an informative, centered italicized subtitle banner directly underneath the form heading: *"You can enter multiple transaction types at once and the account will balance out automatically."*
    * Restructured the inputs into a cohesive grid divided into colored financial ledger cards (e.g. Blue card for Deposit/Withdrawal, Light Gray card for Bookshop/Adjustment, Yellow card for Tuckshop/Snacks).
    * Paired each optional Note input field directly underneath its corresponding Amount input (e.g. Book Note is nested in the Bookshop card), making the flow highly intuitive and eliminating huge vertical space.
    * Integrated a unified transaction submission footer, maintaining the exact same backend API schemas, validation ranges, negative balance warning alerts, and localStorage notifications.
  * **Centered Transaction History Table (`src/components/overview/TransactionTable.js`)**:
    * Cleaned up the table by replacing the standard browser caption with an elegant, centered Material-UI `Typography` heading.
    * Wrapped the transaction history ledger table inside a beautifully centered responsive Box container with a `maxWidth` of `850px` and horizontal scroll support, keeping the bottom history perfectly balanced and centered under the dashboard column blocks.

  ---

  ## 10. Pre-existing Codebase Warnings / Errors Identified
  During the validation build process, the following pre-existing issue was detected:
  * **Dynamic Transaction Deletion Route (`src/pages/campers/[camperCode]/[transCode]/delete.js`)**:
  * **Error:** `Attempted import error: 'getTransaction' is not exported from '../../../api/campers/get'`
  * **Details:** This route attempts to import `getTransaction` from the `/api/campers/get.js` API route file. However, `get.js` only exports a default handler for fetching campers, and does not define or export `getTransaction`. This route is currently broken in production builds and requires implementing the missing transaction finder query.

