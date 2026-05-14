# Template — 技術 / 架構討論會議

關鍵詞觸發：架構、API、schema、migration、技術選型、ADR、latency、scalability、refactor、infra

---

## 此類會議的特徵

- 工程師 / TL / 架構師為主
- 大量技術名詞（須交叉比對 STT 修正表）
- 通常有「現況 → 問題 → 候選方案 → 取捨 → 決議」的標準結構
- **ADR 是黃金標準** — 每個技術決策都應產生一個 ADR 草稿
- 風險與技術債需顯式追蹤

---

## 預設議程結構（無議程時）

1. **問題定義** — 我們要解什麼？
2. **現況描述** — 目前系統長什麼樣？
3. **候選方案** — 列出 2-3 個方案
4. **比較 / 取捨** — 各方案優劣
5. **決議** — 拍板選哪個
6. **後續工作** — migration plan, 風險, owner

---

## 特別關注的擷取欄位

### 1. ADR 草稿（每個技術決策一份）

每個 Decision 都產出 ADR 框架：

```markdown
**ADR-DRAFT-001: 採用 PostgreSQL 取代 MySQL**

**Status**: Accepted (本次會議)

**Context**
目前資料庫 MySQL 8.0，但 JSONB 與全文檢索支援不足；
PoC 階段考慮升級到 PostgreSQL 15。

**Decision**
切換到 PostgreSQL 15，新功能用 PG，舊功能漸進 migrate。

**Consequences**
- ✅ 更好的 JSONB / GIS / 全文檢索
- ✅ 更成熟的 query planner
- ❌ 需 migration 工程（~ 3 週）
- ❌ 團隊需培訓（2 人有經驗，3 人需學）
- ⚠️ ORM 部分查詢需重寫

**Alternatives Considered**
1. 留在 MySQL 8.0 + MongoDB（JSON 用 Mongo）— 拒因：兩套 DB 維運成本
2. 升級 MySQL 9.x — 拒因：仍不支援我們要的 PG 特性
```

### 2. 候選方案比較表

```markdown
**方案比較**

| 維度 | 方案 A (REST) | 方案 B (GraphQL) | 方案 C (gRPC) |
|------|--------------|-----------------|---------------|
| 開發成本 | 低 | 中 | 高 |
| 客戶端適配 | 廣 | 中 | 窄（無瀏覽器原生） |
| Streaming | 差 | 中 | 優 |
| 工具生態 | 成熟 | 成熟 | 中 |
| 團隊熟悉度 | 高 | 中 | 低 |
| **建議** | ✓ | — | — |
```

### 3. 風險與技術債

```markdown
**新增風險**

| #  | 風險 | 影響 | Mitigation | Owner |
|----|------|------|-----------|-------|
| R1 | Migration 期間 dual-write 一致性 | 資料漂移 | 寫 reconciliation script | 林工程師 |

**新增技術債**

| #  | 技術債 | 預計償還時機 | Owner |
|----|--------|-------------|-------|
| T1 | 舊 ORM query 未重寫的部分 | Q4 | 林工程師 |
```

### 4. Migration / 上線計畫（若有）

```markdown
**Migration Plan**

| 階段 | 內容 | 時程 | Owner |
|------|------|------|-------|
| 1 | Schema 設計 + ADR finalize | W1 | 林工程師 |
| 2 | Dual-write 實作 | W2-W3 | 林工程師 |
| 3 | 資料 backfill + 對帳 | W4 | 全隊 |
| 4 | 切流量（10% → 50% → 100%） | W5 | 林工程師 |
| 5 | 移除 dual-write | W6 | 林工程師 |
```

---

## 範例輸出（節錄）

````markdown
# Tech Sync: API Style 技術選型

**Date**: 2026-05-14 (週三)
**Type**: 技術 / 架構討論
**Attendees**: 林工程師(主持)、陳後端、李前端
**Note Taker**: Claude (auto-generated from transcript)
**Duration**: 60 分鐘

---

## TL;DR

1. 決議 PoC 階段採 **REST + OpenAPI**，gRPC 暫緩 (D1)
2. 主因：團隊熟悉度 + 客戶端適配廣 + 工具成熟
3. 林工程師 5/21 前產出 OpenAPI 3.0 草稿 (A1)

## Executive Summary

**Situation**: 新專案小兒疫苗 PoC 需決定 API style
**Complication**: 內部對 REST vs GraphQL vs gRPC 有分歧
**Question**: PoC 階段應選哪個？
**Answer**: 採 REST + OpenAPI (D1)，gRPC 列為未來 v2 選項

**Rationale 摘要**
- REST 團隊熟悉度最高，PoC 速度優先
- GraphQL 對小兒疫苗的 query pattern 過於 overkill
- gRPC streaming 在 PoC 階段不需

## Detailed Notes

### Topic 1: 問題定義

**討論要點**
- **[林工程師]**: 新專案需 API style 決定，影響後續 3 個月
- **[李前端]**: 客戶端會有 Web + 手機 App，需考量適配

**結論**
明確問題範圍：PoC 階段 API style 選擇 → Topic 2

### Topic 2: 候選方案討論

**方案 A: REST + OpenAPI**
- **[陳後端]**: 「我們現有 stack 都是 REST，PoC 改其他 style 成本高」
- 工具成熟（Swagger, Postman, code gen）
- 缺點：streaming / subscription 支援弱

**方案 B: GraphQL**
- **[李前端]**: 「前端可以省很多 round trip」
- **[陳後端]**: 「但小兒疫苗的 query 模式單純，殺雞用牛刀」
- 缺點：team learning curve

**方案 C: gRPC**
- **[林工程師]**: 「performance 好，但瀏覽器原生不支援，要 gRPC-Web」
- 缺點：team 完全沒經驗

### Topic 3: 取捨

**方案比較**

| 維度 | REST | GraphQL | gRPC |
|------|------|---------|------|
| 開發成本 | 低 | 中 | 高 |
| 客戶端適配 | 廣 | 中 | 窄 |
| Streaming | 差 | 中 | 優 |
| 工具生態 | 成熟 | 成熟 | 中 |
| 團隊熟悉度 | 高 | 中 | 低 |
| PoC 速度 | ✓✓ | ✓ | ✗ |

**結論**: PoC 階段選 REST → D1

### Topic 4: ADR 與後續

**討論要點**
- **[林工程師]**: 寫成 ADR-DRAFT-005
- **[陳後端]**: 「未來 v2 若需 streaming，重審 gRPC」

**結論**: 對應 D2（v2 重審條件）

## Decisions

| #  | 決議 | Rationale | 反對意見 | 生效時機 |
|----|------|-----------|----------|----------|
| D1 | PoC 階段採 REST + OpenAPI | 團隊熟悉 + 工具成熟 + 客戶端廣 | 李前端偏好 GraphQL，但接受 PoC 階段現實 | 即日起 |
| D2 | v2 階段重審 gRPC（若需 streaming） | 不過早 over-engineer | 無 | 2026-Q4 重審 |

## Action Items

| #  | 行動項目 | Owner | Due | 完成條件 | 相關決議 |
|----|---------|-------|-----|----------|----------|
| A1 | OpenAPI 3.0 草稿 | 林工程師 | 2026-05-21 | 含 auth + 核心 endpoints | D1 |
| A2 | Postman collection setup | 陳後端 | 2026-05-25 | 環境 dev/stg/prod | D1 |
| A3 | 前端 fetch wrapper 設計 | 李前端 | 2026-05-28 | 含 retry + error mapping | D1 |
| A4 | v2 重審觸發條件文件化 | 林工程師 | 2026-06-15 | 加入 ADR-005 | D2 |

## ADR 草稿

**ADR-DRAFT-005: PoC 階段採用 REST API**

**Status**: Accepted (2026-05-14)

**Context**
PoC 階段 (Q3) 需快速驗證小兒疫苗任務平台，API style 將影響 3 個月開發節奏。
team stack：Node.js + Express + React + RN。

**Decision**
PoC 階段採 REST + OpenAPI 3.0，gRPC 列為 v2 候選（觸發條件：streaming 需求）。

**Consequences**
- ✅ 開發速度最快
- ✅ 工具生態成熟（Swagger, Postman, code gen）
- ✅ 客戶端適配廣（Web + RN 都 native 支援）
- ❌ 若 v2 需 real-time streaming，須重做 API layer
- ❌ N+1 query 風險需設計 batch endpoint
- ⚠️ Schema evolution 需嚴格版控（v1, v2 並存策略）

**Alternatives Considered**
1. GraphQL — 拒因：query pattern 單純，team learning cost 不值
2. gRPC — 拒因：團隊無經驗 + 瀏覽器需 gRPC-Web 額外層

## Risks & Blockers

| #  | 風險 | 影響 | Mitigation | Owner |
|----|------|------|-----------|-------|
| R1 | OpenAPI spec drift（實作 ≠ spec） | API 文件失準 | CI check：spec vs actual | 林工程師 |
| R2 | N+1 query 在批量場景 | 效能 | 設計 batch endpoint pattern | 陳後端 |

## 技術債登記

| #  | 技術債 | 償還時機 | Owner |
|----|--------|---------|-------|
| T1 | v2 若需 streaming，需重做 API layer | 2026-Q4（依 D2）| 林工程師 |

## Open Questions

- Q1: API versioning 策略（URL path vs header）？ — 下次 sync 決定
- Q2: Authentication 機制（JWT vs session）？ — 與 PM 確認需求後決定

## Appendix

### ADR 索引
- ADR-DRAFT-005: PoC API style → REST (本次)

### 標註索引
- 共 0 處 `[需確認]`、0 處 `[推測]`（技術討論通常標註少）

### 引用資料
- OpenAPI 3.0 spec: https://spec.openapis.org/oas/v3.0.3
- 內部 ADR-001 to ADR-004（既有）
````

---

## 技術會議紀錄的特別準則

1. **每個技術決議都產生 ADR 草稿** — 即使只是草稿，後續可進 ADR 倉庫
2. **方案比較必用表格** — 維度對齊讓 reviewer 一眼比對
3. **拒絕方案的理由要寫** — ADR 的「Alternatives Considered」是核心
4. **技術債顯式登記** — 不能因為「先求快」就讓技術債隱形
5. **效能 / 安全 / 維運 三大維度** — 每個決策都應檢視
6. **STT 名詞重點修正** — 技術詞錯誤率高，套 `stt-correction.md` 技術詞表

---

## 不要做的事

- ❌ 把「再 PoC 看看」當決議（除非有明確 success criteria）
- ❌ ADR 的 Status 留白（一定要 Proposed / Accepted）
- ❌ 拒絕的方案不寫理由（這是 ADR 最有價值的部分）
- ❌ 把 trade-off 寫成「都好」（一定要寫出取捨）
- ❌ Migration plan 沒有 rollback 步驟
