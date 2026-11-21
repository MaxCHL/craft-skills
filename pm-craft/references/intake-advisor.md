# Intake Advisor

Handles all non-obvious inputs before routing to a specific reference.
Three entry paths: Visual Input, Document Input, Open-Ended Input.

---

## § Visual Input — Image / Screenshot

Triggered when: user provides an image, screenshot, photo, or visual file.

### Step 1 — Identify what's in the image

| Image type | What to extract |
|-----------|----------------|
| Whiteboard / sticky notes | Requirements, user flows, feature ideas, pain points |
| Slack / email / chat screenshot | The problem being discussed, decisions made, open questions |
| Figma / prototype screenshot | Screen name, UI states, user actions, copy |
| Analytics / data chart | Metric name, current value, trend, anomaly |
| User research notes / survey | Pain points, user quotes, behavioral patterns |
| Competitor product screenshot | Feature capability, UX pattern, gap vs current product |

### Step 2 — Extract and structure

After reading the image, produce a structured summary:

```markdown
## Extracted from [image type]

**Core topic:** [one sentence]

**Key information:**
- [Point 1]
- [Point 2]

**Potential document type:** [Opportunity Brief / Epic / Product Spec / Handoff]

**Missing information to ask:**
- [What's unclear or absent from the image]
```

### Step 3 — Ask targeted follow-up questions

Only ask what cannot be inferred from the image. Maximum 3 questions.

Template:
> I can see [summary of what's in the image]. To turn this into a [document type], I need to clarify:
> 1. [Question 1]
> 2. [Question 2]
> 3. [Question 3]

### Step 4 — Route

Once follow-up answers are collected, route to the appropriate reference in SKILL.md § Step 1.

---

## § Document Input — PDF / PPTX / DOCX / TXT / MD

Triggered when: user provides or pastes a document.

### Step 1 — Read the full document first

Do not summarize or act before reading the entire document.

### Step 2 — Classify the document

| Document type | Signals | Likely intent |
|--------------|---------|--------------|
| Existing PRD / spec | Requirements, user stories, AC sections | Convert to GWT / fill gaps |
| Pitch deck / strategy doc | Problem, market, solution slides | Extract to Opportunity Brief |
| User research report | Personas, pain points, quotes, data | Feed into Opportunity Brief |
| Meeting notes / interview transcript | Decisions, open questions, action items | Extract to Epic or Product Spec |
| Wireframe / design spec | Screen descriptions, flows, states | Ask: spec already exists? → Handoff. No spec yet? → Product Spec |
| Technical design doc | Architecture, APIs, constraints | Feed into Product Spec Non-Goals + Risks |
| Competitor analysis | Feature comparison, gaps | Feed into Opportunity Brief |
| Existing Epic / feature group doc | Goal, story list, milestones | Refine or convert to epic.md format |
| Existing User Stories / Jira export | Story titles, descriptions, AC | Convert to GWT format / fill missing scenarios |
| Existing Acceptance Criteria doc | Test cases, scenario descriptions | Rewrite as GWT; check for missing error states |
| Existing Handoff / delivery doc | Links, behavior notes, flags | Update to handoff.md format; verify completeness |
| OKR / goal-setting doc | Objectives, key results, initiatives | Map to Opportunity Brief + Epic layer |

### Step 3 — Determine user intent

Ask one question only:

> I've read the [document type]. It looks like [1-sentence summary].
> What would you like to do with it?
> - **A** — Convert it to our standard format ([target format])
> - **B** — Fill in what's missing (I'll identify gaps)
> - **C** — Use it as input to write a new [document type]
> - **D** — Something else — tell me

### Step 4 — Act on intent

**A — Convert:** Map each section of the original to the pm-craft template. Preserve meaning; rewrite structure. Flag content that doesn't map to any section.

**B — Fill gaps:** Read the document against the target template. Produce a gap list:
```markdown
## Gap Analysis — [document name]

### Present (can map directly)
- [Section]: [mapped to template field]

### Partial (needs clarification)
- [Section]: [what's there] → ⚠️ Missing: [what's needed]

### Absent (must be written from scratch)
- [Template field]: not found in document → ask user or mark as TBD
```

**C — New document from input:** Treat the document as raw material. Run Open-Ended Input flow (below) using extracted content as pre-filled answers.

**D — Custom:** Clarify and proceed.

---

## § Open-Ended Input — Vague / Exploratory Requests

Triggered when: input is natural language without a clear document type, or contains signals listed in SKILL.md § Step 0.

### The 5 Intake Questions

Ask these in order. Stop when enough is known to route confidently.
Do not ask all 5 at once — ask 2-3, then route if clear.

**Q1 — Stage**
> 這是新想法探索，還是已有方向要細化？
> A) 全新想法，還沒驗證過  →  Opportunity Brief
> B) 方向確認了，要規劃範疇  →  Epic
> C) 功能清楚了，要寫規格  →  Product Spec
> D) 規格清楚了，要拆 story / 定義驗收  →  User Story / Acceptance Checklist
> E) 規格寫好了，要交付給工程  →  Handoff

**Q2 — Evidence (if A or B)**
> 有沒有用戶數據、研究、支持這個問題存在的證據？
> - 有（描述一下）→ 可以直接寫 Opportunity Brief
> - 沒有 → 建議先做 discovery spike，再寫 Brief

**Q3 — Scope (if B or C)**
> 大概幾個工程師？幾個 sprint？
> - 1人 / 1 sprint → 跳過 Epic，直接寫 Product Spec
> - 2人以上 / 2+ sprints → 需要 Epic + Product Spec
> - 跨團隊 → 需要 Opportunity Brief + Epic + Product Spec

**Q4 — Audience (if C or E)**
> 這份文件是給誰看的？
> - 自己釐清思路 → 輕量 Spec：Problem + GWT happy path only，省略 edge case 和 changelog
> - 給工程師開發 → 完整 GWT：所有 scenarios、error states、Open Questions 需指定 owner
> - 給 stakeholder 對齊 → Epic 層即可：Goal + Metrics + Story list，Spec 細節可後補

**Q5 — Existing artifacts**
> 有沒有現有的設計、原型、或舊文件可以參考？
> - 有且確定相關 → 切換到 Document Input 流程，先讀那些材料
> - 有但不確定是否相關 → 繼續引導式寫作；完成後再對照材料補充
> - 沒有 → 從空白開始，進行引導式寫作

_Loop guard: 如果已從 Q5 進入 Document Input 又回到這裡，不要再跳回 Document Input。改為記下假設（"暫以空白 spec 開始，待確認後補充既有材料"）並繼續。_

### Routing Decision Table

| Q1 answer | Q2 evidence | Q3 answer | Q4 audience | Route to | Depth |
|-----------|------------|-----------|------------|---------|-------|
| A (new idea) | yes | any | any | `opportunity-brief.md` | Full |
| A (new idea) | no | any | any | `opportunity-brief.md` (§ Recommendation: spike first) | Lightweight: problem + hypotheses only |
| B (direction set) | any | 1 sprint | any | `product-spec.md` | Full |
| B (direction set) | any | 2+ sprints + high ambiguity¹ | any | `opportunity-brief.md` → `epic.md` → `product-spec.md` | Full |
| B (direction set) | any | 2+ sprints + low ambiguity¹ | any | `epic.md` → `product-spec.md` | Full |
| C (feature clear) | any | 1 engineer | self only | `product-spec.md` | Lightweight: happy path GWT only |
| C (feature clear) | any | 1 engineer | for engineers | `product-spec.md` | Full GWT + Handoff |
| C (feature clear) | any | team | stakeholders | `epic.md` | Story list + Metrics; Spec details deferred |
| C (feature clear) | any | team | for engineers | `epic.md` → `product-spec.md` | Full |
| D (spec approved, need stories / AC) | any | any | any | `user-story.md` and/or `acceptance-checklist.md` | Per story |
| E (ready to hand off) | any | any | any | ⚠️ Gate check → then `handoff.md` | Full |

¹ **High ambiguity signals** (any one = high): no user research, no previous similar feature, cross-team dependencies, 3+ open questions, no clear success metric. If none apply = low ambiguity.

**⚠️ Gate check before routing to handoff.md (Q1=E):**
Before opening the handoff template, confirm:
1. Is the Product Spec in "Approved" status? (Or is this a confirmed trivial feature with no spec?)
2. Is the design in "Ready for Dev" status in Figma?
3. Are all open questions from the spec resolved or explicitly accepted?

If any answer is No → do NOT route to handoff. Return the spec/design to "Review" and resolve blockers first.

---

## § Guided Writing Mode

Once routed to a reference, don't dump the full template at once.
Use guided writing: ask for one section at a time, then proceed.

**Sequence for Product Spec (guided):**
1. "先告訴我這個功能解決了什麼用戶問題？"
2. "成功的話，你怎麼量測？有什麼指標？"
3. "這個 spec 明確不包含哪些東西？"
4. "描述一下最主要的使用流程（happy path）"
5. "有沒有你擔心的邊界情況或風險？"
6. → 產出 Draft Spec with GWT

**Sequence for Opportunity Brief (guided):**
1. "用戶現在遇到什麼問題？有什麼數據或故事支持？"
2. "誰受這個問題影響最多？"
3. "如果解決了，什麼指標會改變？"
4. "你覺得解法方向大概是什麼？（假設就好）"
5. "這個值多少開發資源？1週？1個月？"
6. → 產出 Opportunity Brief

**Sequence for Epic (guided):**
1. "這個 Epic 想解決的核心用戶目標是什麼？"
2. "你預計哪些 story 要放進來？大概列一下（不用完整）"
3. "成功的話，哪個指標會改變？怎麼量？"
4. "有什麼明確不做的東西？（Non-Goals）"
5. "有沒有跨團隊依賴或外部限制？"
6. → 產出 Epic draft，User Stories 列 Priority + Status

**Sequence for User Story (guided):**
1. "這個 story 的使用者是誰？他想完成什麼？"
2. "完成後他得到什麼好處？"
3. "這個 story 大概多大？1 engineer / 1 sprint 內能完成嗎？"
4. "驗收標準是什麼？描述最主要的使用流程（Given/When/Then）"
5. "有沒有邊界情況或你擔心的錯誤狀態？"
6. → 產出 User Story with AC

**Sequence for Acceptance Checklist (guided):**
1. "對應的 Product Spec 或 User Story 是哪一個？"
2. "從 PM 角度，哪些行為必須通過才能算完成？"
3. "有沒有你擔心的 edge case 沒寫進 spec 的？"
4. "從工程角度，DoD 有沒有特別的品質要求？（test coverage、perf budget 等）"
5. → 產出 Product AC checklist + Engineering DoD

**Sequence for Handoff (guided):**
1. "這個功能的 Product Spec 在哪裡？是 Approved 狀態嗎？"
2. "設計稿在哪裡？是 Ready for Dev 嗎？（或這是純後端功能？）"
3. "還有沒有未解的 Open Questions？如果有，是否已有明確 assumption？"
4. "Engineering Lead 是誰？他確認過這份交付了嗎？"
5. → 產出 Handoff Doc（自動帶入 Links + Ready Checklist）

---

## § Cross-Skill Intake

When the input implies another skill is needed, surface it explicitly.

| Signal in input | Suggest |
|----------------|---------|
| "幫我做一個設計" / "要有界面" / "做個原型" — **無 spec 需求** | → Skip PM docs, go directly to **design-craft** with a short brief |
| "幫我做一個設計" / "要有界面" / "做個原型" — **有 spec 或功能需求** | → Write spec first, then emit design-craft handoff block |
| "API 怎麼設計" / "技術架構" / "DB schema" | → After spec: flag for **arch-review** |
| "整個產品方向" / "OKR" / "策略" | → **Opportunity Brief** first, then **Epic** |
| "給投資人看" / "做個 pitch" | → **Opportunity Brief** format, not Product Spec |

**When to skip PM docs and go straight to design-craft:**
The user is asking for visual output only, has no ambiguous product requirements, and does not need a spec before building. Route directly to design-craft with:
> "這個需求不需要先寫 spec。直接切換到 design-craft 幫你產出設計。請描述一下：目標平台、主要功能、使用者是誰？"
