---
name: fix-add-alert-opens-modal
description: Fix Add Alert button in PremiumWatchlistTable to open Create Alert Modal with stock symbol pre-filled
metadata:
  type: project
---

## Summary
Modified several components to ensure that pressing the "Add Alert" button in the PremiumWatchlistTable opens the Create Alert Modal, with the stock symbol pre-filled.

## Changes

### 1. `components/watchlist/CreateAlertModal.tsx`
- Converted the modal to a controlled component via `open` and `onOpenChange` props.
- Added `symbol` prop to pre-fill the stock identifier field.
- Preserved the existing trigger button (BellPlus) for manual opening.
- Added `useEffect` to update the stock symbol when the `symbol` prop changes.
- Added `useEffect` to reset the form when the modal closes.

### 2. `components/watchlist/ManageSymbolsPanel.tsx`
- Added `onOpenAlertModal` prop to receive a callback for opening the alert modal.
- Updated the `handleAlert` function to call `onOpenAlertModal?.(symbol)` when an alert is triggered.
- Passed the `onAlert` prop to `PremiumWatchlistTable` as `handleAlert`.

### 3. `app/(root)/watchlist/page.tsx`
- Added React `useState` hook for modal state: `[alertModalOpen, setAlertModalOpen]` and `[alertModalSymbol, setAlertModalSymbol]`.
- Rendered `<CreateAlertModal open={alertModalOpen} onOpenChange={setAlertModalOpen} symbol={alertModalSymbol} />`.
- Passed `onOpenAlertModal={handleOpenAlertModal}` to `<ManageSymbolsPanel>`, where `handleOpenAlertModal` sets the symbol and opens the modal.

### 4. `components/watchlist/PremiumWatchlistTable.tsx`
- Updated `toggleAlert` function to call `onAlert(symbol)` **only** when adding a new alert (i.e., when the alert was not previously active).
- This prevents the modal from opening when the user clicks to remove an active alert.

## Result
- Clicking "Add Alert" in the watchlist table (both desktop and mobile views) opens the Create Alert Modal.
- The stock symbol field is pre-filled with the symbol of the row whose button was clicked.
- The modal can still be opened manually via the "+" button in the page header.
- The alert active/inactive toggle state is preserved for UI indication.

## Testing
To verify:
1. Navigate to the watchlist page.
2. Click the "Add Alert" button (BellPlus) in any watchlist row.
3. Observe that the Create Alert Modal opens.
4. Confirm that the "Stock Identifier" field is pre-filled with the correct symbol.
5. Close the modal and repeat for other rows to ensure symbol updates correctly.
6. Verify that clicking the button when it shows "Active" (i.e., an alert is already set) does **not** open the modal (only toggles the active state).