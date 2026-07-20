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
  To accurately align the terminology and display aesthetics with the single-primary family account architecture:

  * **Top Navbar Rename (`src/components/layout/MainNavigation.js`)**:
    * Changed the text of the landing page search link from `"Camper By Code"` to `"Account By Code"`.
    * Changed the text of the directory index link from `"Camper By Name"` to `"Account By Name"`.
  * **Interactive Tab Filtering (`src/components/campers/AllCampersTable.js`)**:
    * Restructured and centered the directory index page exactly in the requested layout sequence:
      1. **Filter By Name Title / search input box / action buttons** (centered `<SearchByName>` form at the top).
      2. **📥 Download All Balances CSV link** (centered on its own row).
      3. **`"All Accounts ([selectedCategory])"` h2 heading** (centered).
      4. **Category Tab selectors** (centered and capped at **75% width / max 600px**).
      5. **The Roster Table itself** (centered with 75% width alignment).
    * **Four Filter Options:** Expanded the filter tabs to **four distinct views** by adding a new `"All"` category tab to display all banking accounts simultaneously, alongside `Primary`, `Secondary`, and `Unassigned` accounts.
    * Reduced the padding, height (`minHeight: "36px"`), and font size (`0.82rem`) on the tab buttons for a highly clean and compact aesthetic.
  * **Primary Accounts Only Filter**:
    * Updated the index page's static rendering (`src/pages/campers/index.js`) and dynamic query endpoint (`src/pages/api/campers/get.js`).
    * Decorates each banking account with its category (`Primary`, `Secondary`, or `Unassigned`) based on roster matches in `CamperDetails`.
    * This allows the interactive frontend tab selector to toggle between viewports instantly, defaulting to the Primary Accounts roster view on load.

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

  ## 10. Dynamic Bank Summary Date Totals
  To future-proof the camp accounting system and support multiple weeks or arbitrary start dates, we modernized the Bank Summary dashboard page:

  * **Dynamic Date Grouping (`src/components/transactions/SummaryComponent.js`)**:
    * Replaced the 300-line hardcoded static "Monday" to "Friday" switch-case layout with a fully dynamic date parser.
    * Scans all transactional timestamps, aggregates their details, and dynamically groups transactions under their exact calendar dates.
    * Only active days containing at least one transaction record are shown, automatically hiding blank days.
    * **Capitalization and Visual Alignments:** Capitalized all table headers in both summary tables (e.g. `BANK BALANCE`, `DEPOSITS`, `TUCKSHOP`, `DAY`, `BALANCE`, etc.) for absolute typographic symmetry.
    * **Centered Alignment:** Aligned all table headers, rows, and cells to the perfect center (`textAlign: "center"`) for maximum aesthetic balance.
    * **Decreased Text Scale:** Scaled down the summary table font sizes to **`0.85rem`** so that columns dynamically adapt to the parent card widths and fit cleanly on standard viewports.
  * **Chronological Calendar Ordering & Running Balances**:
    * Groups are sorted chronologically from oldest to newest.
    * Keeps the original cumulative running balance algorithm fully intact, dynamically computing the net change per active day (deposits minus all payments and withdrawals) and accumulating it sequentially row-by-row.
  * **Beautiful Date Formatter**:
    * Formats date keys dynamically using custom local date parsing to output the visual string in exactly the format requested (e.g. *"Monday 7th Oct"*, *"Friday 17th Jul"*, etc.), complete with correct ordinal suffix rules (`st`, `nd`, `rd`, `th`).
  * **Unassigned/Empty Fallback states**:
    * Handles empty rosters or zero transactions gracefully with styled, friendly placeholder rows.
  * **Bank Current Totals Preserved**:
    * Retained the "Bank Current Totals" block identically at the top, showing the total bank balance, cumulative deposits, and individual category deductions.

  ---

  ## 11. Interactive Transaction & Summary CSV Exporters
  To support granular bookkeeping, we built dynamic, timestamped CSV download controls across the Bank Summary and Recent Transactions screens:

  * **Centered Bank Current Totals CSV Download (`src/components/transactions/SummaryComponent.js`)**:
    * Structured the `"BANK CURRENT TOTALS"` card's title and its CSV download link to stack vertically and center perfectly on separate lines.
    * Downloads a 1-row CSV of overall aggregates, saved with a live-timestamped filename (e.g. `Current Balance 17-Jul-2026_15-45-12.csv`).
  * **Surgical Row-Level Daily Totals Downloads**:
    * Added a new `DOWNLOAD` column to the right side of the `"DAILY TOTALS"` table.
    * Renders an individual `📥 CSV` download link on every active day row.
    * Clicking a row-level link downloads a single-row CSV of only that specific day's records, with a formatted, timestamped filename (e.g. `Daily Totals Friday_17th_Jul 17-Jul-2026_15-45-12.csv`). This gives operators surgical control to export single-day balance sheets.
  * **Recent Transactions Downloader (`src/components/transactions/AllTransactionsTable.js`)**:
    * Added a "Download All Transactions" CSV button centered directly underneath the main heading.
    * Generates a fully detailed CSV log containing all transaction details beautifully formatted (including Transaction ID, Added By, Account ID, Name, Timestamp, Type, Category, Amount, and Note).
    * Filenames are timestamped with the down-to-the-second download time (e.g. `All Transactions 17-Jul-2026_15-45-12.csv`).

  ---

  ## 12. Pre-existing Codebase Warnings / Errors Identified
  During the validation build process, the following pre-existing issue was detected:
  * **Dynamic Transaction Deletion Route (`src/pages/campers/[camperCode]/[transCode]/delete.js`)**:
  * **Error:** `Attempted import error: 'getTransaction' is not exported from '../../../api/campers/get'`
  * **Details:** This route attempts to import `getTransaction` from the `/api/campers/get.js` API route file. However, `get.js` only exports a default handler for fetching campers, and does not define or export `getTransaction`. This route is currently broken in production builds and requires implementing the missing transaction finder query.

  ---

  ## 13. Dynamic Camper Profile Rendering & Router Hydration Fix
  * **File Modified:** `src/pages/campers/[camperCode]/index.js`
  * **Changes & Dynamic SSR Migration:**
    * Replaced Next.js Static Site Generation (SSG) hooks (`getStaticPaths` and `getStaticProps`) with Server-Side Rendering (SSR) via **`getServerSideProps`**.
    * This ensures that when a physical QR code is newly assigned to a camper's profile, the camper's details (such as names) are fetched in real-time directly from MongoDB on every request rather than relying on Vercel's stale static cache.
  * **Router Query Hydration Safety:**
    * Safely updated the reading of `camperId` from the Next.js router query object:
      ```javascript
      const camperId = (router.query.camperCode || props.camper?.accountId || "").toString();
      ```
    * This robust fallback prevents `TypeError: Cannot read properties of undefined (reading 'toString')` crashes during early hydration phases where the router query parameters are not yet populated.

  ---

  ## 14. Including Adjustments in Balance Calculations & Summary Reports
  **Date:** Monday, 20 July 2026
  * **Problem:** Account adjustments (`type: "Adjustment"`) entered in teller slips were recorded in MongoDB but skipped in the individual balance calculations, bulk exporters, and the main Bank Summary view.
  * **API Modifications:**
    * **get-balance API (`src/pages/api/campers/[camperCode]/get-balance.js`)**: Updated the `payments` query to fetch both `"Payment"` and `"Adjustment"` transaction types, summing them correctly as account deductions.
    * **getAllCamperBalances API (`src/pages/api/campers/getAllCamperBalances.js`)**: Similarly updated the payments finder to match `{type: { $in: ["Payment", "Adjustment"] }}`.
    * **Index Page (`src/pages/campers/index.js`)**: Fixed a crucial pre-existing bug where the `getServerSideProps` was querying deposits and payments from the `Campers` (accounts metadata) collection rather than the `Transactions` collection, causing exported CSV balances to download as 0. Corrected the collection mapping and updated payments to include adjustments.
  * **Summary Dashboard Updates (`src/components/transactions/SummaryComponent.js`)**:
    * Integrated adjustments into overall bank aggregates (`adjCurrent`) and subtracted them from the total bank balance.
    * Updated dynamic date grouping to aggregate daily adjustment totals and include them in running cumulative balance calculations.
    * Upgraded UI with an **ADJUSTMENTS** column on both the *Bank Current Totals* and *Daily Totals* tables.
    * Embedded row-level daily CSV exporters and bulk CSV exporters with negative-formatted adjustment logs, updating empty table row `colSpan` from 9 to 10.

  ---

  ## 15. Sibling / Family Member Transaction Attribution
  **Date:** Monday, 20 July 2026
  * **Goal:** Enable tellers to distinguish which specific family member/sibling (linked or primary) accessed a shared bank account during a purchase and record that attribution in the transaction ledger.
  * **Scanning Context preservation (`src/components/forms/ScanCamperCode.js`)**:
    * When a linked account (such as sibling code `"10020"`) is scanned on the home page, it is resolved to the primary financial account `"10010"`.
    * Added `?scannedCode=...` query parameter to the router redirection so that the scanned member's physical card context is passed to the dashboard page: e.g., `/campers/10010?scannedCode=10020`.
  * **Route Propagation (`src/pages/campers/[camperCode]/index.js` -> `CamperDetail.js`)**:
    * Extracted the `scannedCode` from the router query and propagated it down as a prop to the `NewTransForm` component, alongside the active roster `assignedCampers` list.
  * **Automated Member Selection (`src/components/forms/NewTransForm.js`)**:
    * Implemented fully hands-free, behind-the-scenes member matching on render to prevent tellers from needing to manually click/select names.
    * **Auto-Attribution:** Evaluates the active roster against the `scannedCode`. If a sibling's QR code matches the scanned card (e.g. `"10020"`), they are dynamically resolved as the accessing member on render. If the page is accessed directly (no scanned code), it automatically attributes to the primary account holder.
    * **Payload Enhancement:** Updated all transaction slip submissions to append two new database fields:
      * `accessedBy`: The full name of the accessing member (e.g. `"Sally Wankhade"`).
      * `scannedCode`: The physical QR code scanned/assigned to that specific member (e.g. `"10020"`).
  * **Database Persistence (`src/pages/api/campers/[camperCode]/index.js`)**:
    * Updated the transaction insertion logic to save `accessedBy` and `scannedCode` directly to the `Transactions` collection in MongoDB.
  * **Transaction History Ledger upgrades**:
    * **Account Ledger (`src/components/overview/TransactionTable.js` & `TransactionRow.js`)**: Added an **Accessed By** column in between the Date and Category. Gracefully falls back to the primary account holder's name for older legacy transactions.
    * **Recent Transactions (`src/components/transactions/AllTransactionsTable.js` & `AllTransRows.js`)**: Upgraded the full recent logs dashboard and the **Download All Transactions CSV** generator to include the `Accessed By` column and fields.

  ---

  ## 16. Inline Roster Transaction History Drawers
  **Date:** Monday, 20 July 2026
  * **Goal:** Allow bank operators to toggle and view transaction histories completed by individual siblings/rostered members directly inside the account's "Assigned Campers" roster list without navigating away.
  * **Implementation (`src/components/overview/AccountSummary.js`)**:
    * **Expanded States:** Added `useState` to track collapsed/expanded toggle triggers for each individual rostered sibling/member using their unique physical card barcodes (`accountQRCode`).
    * **Toggle Mechanism:** Inserted a compact control button column (`▶` / `▼`) on the left side of each camper row in the Assigned Campers table.
    * **Surgical Dynamic Filter:** Filters the full transaction array client-side on toggle to isolate records specifically completed by that member (where `tran.scannedCode` matches `member.accountQRCode`).
    * **Embed Sub-ledger:** Renders an elegant, collapsible full-width drawer row directly below the active member's row. Features:
      * Displays the total transaction count for that sibling.
      * If transactions are found, renders a micro-ledger sub-table displaying Date & Time, Category, Amount (with dynamic color coding: positive Green for deposits, negative Red for payments), Note, and Teller User.
      * If zero transactions are found, displays a friendly unassigned placeholder state.

  ---

  ## 17. Default Filter, Account Sorting, and CSV Export Upgrades
  **Date:** Monday, 20 July 2026
  * **Goal:** Improve general index navigation and CSV auditing in the "Account By Name" explorer dashboard (`src/components/campers/AllCampersTable.js`).
  * **Default Category Filter:** Changed the initial React category state of `selectedCategory` from `"Primary"` to `"All"`. The explorer now opens displaying all accounts loaded simultaneously.
  * **Smallest-to-Largest Sorting:** Implemented an explicit ascending numeric sort on render based on `camper.accountId`. All accounts in the explorer table are now consistently listed from smallest ID to largest ID (smallest at the top).
  * **CSV Balances Sorting (`src/pages/api/campers/getAllCamperBalances.js` & `src/pages/campers/index.js`)**: Sorted the bulk balance sheet array dynamically on the server-side from smallest to largest Account ID prior to JSON-to-CSV compilation, guaranteeing the exported CSV reflects the identical chronological order.
  * **Dynamic Timestamp filename (`src/components/campers/AllCampersTable.js`)**: Integrated the `getTimestampString` helper on the exporter link, appending a safe down-to-the-second live datetime stamp to the CSV filename (e.g. `All Camper Balances 20-Jul-2026_16-45-12.csv`).
  * **Category Inclusion in CSV (`lib/helpers.js`)**: Injected the dynamic `category` field (Primary, Secondary, or Unassigned) into the returned objects of the `allTransactionBalances` helper so that all bulk CSV exports contain a dedicated Category column for rich auditing. Updated the endpoints to populate this categorisation safely.











