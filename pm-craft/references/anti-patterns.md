# Anti-Patterns & Common Mistakes

Patterns that look like PM best practices but create waste, rework, or misalignment.

---

## Spec Anti-Patterns

### 1. Solution-First Problem Statements
**Pattern:** "We need to add a button that lets users export to PDF."  
**Problem:** Locks the solution before understanding the need. Engineers can't challenge the approach.  
**Fix:** "Users cannot share their reports with stakeholders who don't have system access."

---

### 2. Acceptance Criteria Written as Steps
**Pattern:**
```
AC: 1. User clicks Export. 2. System generates PDF. 3. Download starts.
```
**Problem:** Describes implementation, not behavior. Can't be tested as a pass/fail condition.  
**Fix:**
```
Given a user has a completed report
When they click "Export to PDF"
Then a PDF file is downloaded containing all report sections
 And the filename follows the format "[ReportName]-[Date].pdf"
```

---

### 3. Vague Success Criteria
**Pattern:** "Improve the user experience of the onboarding flow."  
**Problem:** Unmeasurable. No way to know if it succeeded.  
**Fix:** "Reduce drop-off at step 3 from 42% to below 25% within 60 days of launch."

---

### 4. The Missing Non-Goal
**Pattern:** Spec says nothing about what's out of scope.  
**Problem:** Engineers and stakeholders assume different things. Scope creep is invisible until it's too late.  
**Fix:** Every spec must have at least one Non-Goal. "If it's not listed as out-of-scope, it's in-scope" is the wrong default.

---

### 5. Open Questions Without Owners
**Pattern:** "TBD — to be discussed."  
**Problem:** TBD with no owner never gets resolved. Story enters the sprint with a hidden blocker.  
**Fix:** Every open question must have a named owner and a due date. If it can't be resolved before the sprint, escalate or defer the story.

---

### 6. Spec Approved With Known Ambiguity
**Pattern:** Approving a spec because "we can figure it out during dev."  
**Problem:** Engineers make silent assumptions. Misalignment discovered in QA or post-launch.  
**Fix:** A spec with unresolved open questions is not ready for approval. Block it explicitly.

---

## Epic & Story Anti-Patterns

### 7. Epic Without Success Metrics
**Pattern:** Epic goal: "Improve the notifications system."  
**Problem:** No way to declare victory. Epic scope drifts indefinitely.  
**Fix:** Every Epic must have at least one measurable metric with a target and timeframe.

---

### 8. Stories Split by Technical Layer
**Pattern:** "Frontend story" + "Backend story" for the same feature.  
**Problem:** Neither story delivers user value alone. Teams become siloed.  
**Fix:** Split by user scenario, persona, or data state — not by technical component.

---

### 9. Story Too Large to Estimate
**Pattern:** Story estimated at 13 or 21 points.  
**Problem:** Large stories hide unknowns and block sprint commitment.  
**Fix:** Any story above 8 points must be split. Use story splitting patterns from user-story.md.

---

### 10. PM Writing Engineering Tasks
**Pattern:** PM adds implementation tasks like "Create a new endpoint for /api/v2/export".  
**Problem:** Oversteps into engineering domain. Creates false precision. Engineers feel micromanaged.  
**Fix:** PM writes AC. Engineers write tasks. PM writes what needs to be true; engineers decide how.

---

## Process Anti-Patterns

### 11. Building Before Spec Is Approved
**Pattern:** "The design is ready, let's just start — we'll write the spec later."  
**Problem:** Spec written after code is written to match the code, not the user need. Defeats the purpose.  
**Fix:** Spec approval is a hard gate. No coding before the spec is approved.

---

### 12. Skipping the Opportunity Brief
**Pattern:** Going straight from idea to Epic without validating the problem.  
**Problem:** Building for an assumed problem. Discovery happens in the sprint instead of before it.  
**Fix:** For any feature above "small batch" appetite, write an Opportunity Brief first. It takes 1-2 hours and saves a sprint.

---

### 13. Design as the Spec
**Pattern:** "The spec is the Figma."  
**Problem:** Figma shows the happy path only. Edge cases, error states, and business logic are invisible.  
**Fix:** Figma is a reference, not a spec. The spec must describe behavior in text. GWT covers what Figma cannot.

---

### 14. Scope Change Mid-Sprint Without a Spec Amendment
**Pattern:** Requirements change after development has started. PM tells the engineer verbally or via Slack. Spec is not updated.  
**Problem:** The engineer implements the new requirement; the spec still documents the old one. QA, future engineers, and stakeholders all see the wrong spec. Tech debt compounds.  
**Fix:**
1. Stop. Do not accept verbal scope changes mid-sprint.
2. Write a spec amendment: add a dated "Amendment" section to the Product Spec with the change, the reason, and updated GWT if AC is affected.
3. PM re-approves. Engineering lead acknowledges before implementing.
4. If the change is significant (affects > 20% of stories), consider pulling the story out of the sprint and re-planning.

---

### 15. Handoff Without Flagging Open Items
**Pattern:** PM hands off to engineering with "just a few small TBDs."  
**Problem:** Engineers start work and discover blockers mid-sprint. Sprint commitment is broken.  
**Fix:** All TBDs in the handoff doc must be flagged explicitly. Engineering acknowledges and explicitly accepts any assumption before starting.

---

## Rabbit Holes — Common Complexity Traps

> 🐇 These patterns have burned teams repeatedly. Flag them in specs.

| Trap | Why It Bites |
|------|-------------|
| "Just add a setting / toggle" | Settings multiply. Each permutation needs its own AC and test. |
| "Users can customize the layout" | Persistence, sync across devices, migration of saved layouts — 3× scope hidden. |
| "Support all time zones" | Not just display — affects scheduling, notifications, reporting. |
| "Real-time updates" | WebSocket infra, reconnection logic, conflict resolution — not a sprint item. |
| "We'll add permissions later" | Retrofitting permissions is 5× harder than designing them in. |
| "Just use AI to handle the edge cases" | AI output is probabilistic. Every edge case needs a fallback and human review path. |
| "Import from any format" | Format parsing is a product in itself. Define exactly which formats in scope. |
| "Make it work offline" | Sync logic, conflict resolution, queue management — not a feature, it's a project. |
