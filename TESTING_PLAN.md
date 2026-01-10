# Reelspot Testing Plan

## 1. Authentication Testing

- [ ] **Sign In (New User)**: Verify account creation via Google OAuth.
- [ ] **Sign In (Existing User)**: Verify smooth login and redirection to Dashboard.
- [ ] **Sign Out**: Verify session clear and redirect to Home.
- [ ] **Protected Routes**: Try accessing `/dashboard` while logged out → Expect redirect to `/`.

## 2. API Key Management

- [ ] **Add Key**: Add valid dummy key for "Instagram" → Expect "Active" status.
- [ ] **Validation**: Try adding empty key → Expect error.
- [ ] **Persistence**: Refresh page → Verify key remains visible (masked).
- [ ] **Delete**: Delete key -> Confirm with modal -> Verify removal.

## 3. Downloads

- [ ] **Flow**: Paste URL -> Analyze -> Select Format -> Download.
- [ ] **Concurrency**: Start 3 downloads -> Verify only 2 active, 1 queued.
- [ ] **History**: Verify completed download appears in `/history`.
- [ ] **Error**: Disconnect network during download -> Verify "Failed" status and Toast error.

## 4. Dashboard & Stats

- [ ] **Real-time**: Complete a download -> Verify "Total Downloads" increments immediately.
- [ ] **Charts**: Verify Pie Chart renders correct platform ratios.
- [ ] **Empty State**: Clear history -> Verify Dashboard shows "Start New Download" prompt.

## 5. Settings

- [ ] **Preferences**: Toggle "Auto Start" -> Refresh -> Verify persisted.
- [ ] **Exports**: Click "Export CSV" -> Verify file download.
- [ ] **Danger Zone**: Click "Clear History" -> Type "DELETE" -> Verify all history removed.
