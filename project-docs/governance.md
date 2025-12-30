# Governance Framework

**Project:** Awesome NAPCORE Tools  
**Effective:** January 2026 (Initial Release v1.0)  
**Review Date:** May 2026  
**Generated:** 2025-12-30

---

## Executive Summary

The Awesome NAPCORE Tools catalog uses a two-tier governance system to maintain quality and credibility while enabling community contributions. Tools can be **Listed** (meets basic criteria) or **NAPCORE Endorsed** (validated by domain experts and aligned with NAPCORE values).

**Key Principles:**

- Open contribution process (anyone can submit via GitHub Discussions)
- Transparent criteria for inclusion and endorsement
- Domain expert validation for endorsed tools
- European mobility data standards prioritized

---

## Two-Tier System

### Tier 1: Listed Tools

**What it means:** Tool meets basic inclusion criteria, appears in catalog

**Badge:** None displayed

**Signal to users:** "This tool exists and is relevant to European mobility data"

**Inclusion criteria:**

- Openly accessible (open source or free web tool)
- Related to European mobility data standards or workflows
- Basic documentation exists
- Contact information available
- Can be NAPCORE-developed or external

**Review process:**

- StoreWeb/Content WI editors check against criteria
- Approval within 1-2 weeks
- Tool added to catalog

### Tier 2: NAPCORE Endorsed

**What it means:** Tool validated by domain stakeholders, meets quality standards

**Badge:** ✓ NAPCORE Endorsed (displayed prominently)

**Signal to users:** "NAPCORE recommends this tool as high-quality and aligned with our values"

**Endorsement criteria:**

- ✅ Meets all Tier 1 (Listed) criteria
- ✅ Supports NAPCORE-endorsed standard(s)
- ✅ Production-ready (stable, tested, actively maintained)
- ✅ Comprehensive documentation (user guides, examples)
- ✅ Validated by relevant domain stakeholders

**Review process:**

- Domain expert validation (PT, Road, or Metadata experts)
- Quality assessment by NAPCORE technical teams
- Approval by WG2, WG3, or T4.x representatives
- Batched review cycles (Initial: January 2026, Next: May 2026)

---

## NAPCORE Endorsed Standards

**Purpose:** Clearly promote European mobility data standards aligned with EC mandates

**Endorsed Standards (v1.0):**

| Standard            | Domain              | Description                                     |
| ------------------- | ------------------- | ----------------------------------------------- |
| **DATEX II**        | Road Traffic        | Road traffic and travel data exchange           |
| **SIRI**            | Public Transport    | Real-time public transport information          |
| **NeTEx**           | Public Transport    | Public transport network and timetable exchange |
| **TN-ITS**          | Road Infrastructure | Road network and ITS infrastructure data        |
| **mobilityDCAT-AP** | Metadata            | Mobility data catalog metadata standard         |

**Other Standards:**

- May be **Listed** (e.g., GTFS, GBFS) but not NAPCORE Endorsed
- Reflects NAPCORE's focus on European Commission-mandated standards

---

## Inclusion Criteria (Tier 1: Listed)

### Accessibility

✅ **Openly accessible:**

- Open source (preferred): MIT, Apache, GPL licenses
- Free web tools with stable hosting (acceptable)
- Official standards body tools (no login required)

❌ **Not acceptable:**

- Commercial tools requiring registration
- Tools requiring paid licenses
- Tools on personal domains with uncertain availability

### Relevance

✅ **Related to European mobility data:**

- Road traffic, public transport, or metadata domains
- Supports European mobility data standards
- Supports related workflows (validation, conversion, visualization)

### Documentation

✅ **Basic documentation exists:**

- README, usage guide, or help page
- Clear description of purpose and functionality
- Basic usage examples

### Provenance

✅ **Can be developed by:**

- NAPCORE partners and activities
- External entities (community, standards bodies)
- Research institutions
- Commercial entities (if openly accessible)

### Contact Information

✅ **Maintainer contact available:**

- GitHub repository with active maintainers
- Email or support channel listed
- Issue tracker functional

---

## Endorsement Criteria (Tier 2: NAPCORE Endorsed)

### Quality Standards

✅ **Production-ready:**

- Stable version released
- Tested in real-world scenarios
- Actively maintained (regular updates)
- No critical known issues

✅ **Comprehensive documentation:**

- User guides with step-by-step instructions
- API documentation (if applicable)
- Code examples and tutorials
- FAQ or troubleshooting guide

✅ **Standards compliance:**

- Supports at least one NAPCORE-endorsed standard
- Follows best practices for that standard
- Validated against official schemas/specifications

### Validation Process

✅ **Domain expert review:**

- **Public Transport tools:** WG2 representatives
- **Road Traffic tools:** WG3 representatives
- **Metadata tools:** T4.x representatives

✅ **Technical assessment:**

- Functionality verification
- Standards compliance check
- Documentation quality review
- Maintenance status evaluation

### NAPCORE-Developed Tools

**Important:** NAPCORE-developed tools are **not automatically endorsed**

**Fast-track process:**

- Must undergo domain stakeholder validation
- Ensures credibility of endorsement signal
- Prevents perception of bias

---

## Content Submission Process

### How to Submit a Tool

**Open to everyone:** NAPCORE partners, external contributors, tool developers

**Process:**

1. **Review criteria** (see Inclusion Criteria above)

2. **Gather information:**
   - Tool name, description, website
   - Repository link (if open source)
   - Documentation links
   - Standards supported
   - License information
   - Developer/maintainer contact

3. **Submit via GitHub Discussions:**
   - Go to: https://github.com/napcore-tools/web-awesome_napcore_tools/discussions
   - Click "New Discussion"
   - Select category: "Tool Submission"
   - Use submission template (see [contribute.md](../docs/contribute.md))

4. **Community review:**
   - StoreWeb/Content WI editors review submission
   - Community members can provide feedback
   - Review typically takes 1-2 weeks

5. **Decision:**
   - **Approved as Listed:** Tool added to catalog
   - **Needs revisions:** Feedback provided, resubmission invited
   - **Not suitable:** Reason explained, alternative suggestions offered

6. **Publication:**
   - StoreWeb team creates tool page
   - Tool appears in catalog (next deployment)
   - Submitter credited on tool page

### Endorsement Consideration

**For new submissions (February-May 2026):**

- New tools added as **Listed** initially
- Endorsement evaluation batched for **May 2026 review**
- Allows content growth while maintaining governance quality

**For existing tools:**

- Domain experts can nominate tools for endorsement
- Batch review cycles: May 2026, then quarterly

---

## Governance Roles

### Content Editors (StoreWeb/Content WI)

**Responsibilities:**

- Review tool submissions against inclusion criteria
- Create tool pages in catalog
- Maintain catalog quality and consistency
- Facilitate community feedback

**Authority:**

- Approve/reject **Listed** tier submissions
- Recommend tools for endorsement review
- Update tool information

### Domain Stakeholders

| Domain               | Representatives | Responsibility                              |
| -------------------- | --------------- | ------------------------------------------- |
| **Public Transport** | WG2 (T2.1),T4.3 | Validate PT tools for endorsement           |
| **Road & Traffic**   | WG3 (T3.1),T4.1 | Validate road/traffic tools for endorsement |
| **Metadata**         | T4.4            | Validate metadata tools for endorsement     |

**Authority:**

- Approve/reject endorsement nominations
- Provide technical validation
- Ensure domain-specific quality standards

### T5.2 Digital Tools Leadership

**Responsibilities:**

- Overall catalog governance
- Facilitate approval meetings
- Implement governance decisions
- Report to NAPCORE leadership

**Authority:**

- Convene governance review meetings
- Propose governance framework updates
- Implement technical changes to catalog

---

## Review Cycles

### Initial Release (January 2026)

**Approved:**

- Governance framework
- Initial endorsed standards list (5 standards)
- Initial endorsed tools list (5-6 tools)

**Published:**

- `https://awesome.napcore.eu` launched
- NAPCORE Endorsed badges applied

### Content Growth Phase (February-May 2026)

**Activity:**

- New tools submitted via GitHub Discussions
- New tools added as **Listed** (no endorsement)
- Community feedback collected

**Governance:**

- Framework remains stable
- Content editors process submissions
- Endorsement nominations collected for May review

### Governance Review (May 2026)

**Scope:**

- Review new tools for potential endorsement
- Assess governance framework effectiveness
- Consider governance refinements
- Plan next review cycle

**Decisions:**

- Batch endorsement approvals
- Governance process improvements
- Next review date

### Ongoing (Post-May 2026)

**Quarterly reviews:**

- Endorsement nominations
- Tool status updates (e.g., moved to maintenance mode)
- Governance adjustments as needed

---

## Tool Status Management

### Active Status

**Criteria:**

- Regular updates (within last 12 months)
- Maintained repository
- Responsive to issues
- Compatible with current standards

**Action:** Display prominently in catalog

### Maintenance Mode

**Criteria:**

- Functional but limited updates
- Bug fixes only (no new features)
- Still compatible with standards

**Action:** Mark as "Maintenance Mode" in catalog

### Deprecated

**Criteria:**

- No longer maintained
- Superseded by newer tool
- Not compatible with current standards

**Action:**

- Mark as "Deprecated"
- Suggest alternative tools
- Keep in catalog for reference (with warning)

### Removal from Catalog

**Rare:** Only in exceptional cases

**Reasons:**

- Tool no longer accessible (dead links)
- Tool became commercial/closed (if was open)
- Tool found to be non-functional or misleading

**Process:**

- Domain stakeholder approval required
- Notice period (30 days)
- Archive page retained with explanation

---

## Appeals and Disputes

### Appeal Process

**If submission rejected:**

1. Contact content editors via GitHub Discussion
2. Provide additional information or clarifications
3. Request re-review
4. Escalate to T5.2 leadership if needed

**If endorsement denied:**

1. Request detailed feedback from domain stakeholders
2. Address concerns and resubmit
3. Appeal to governance review meeting

### Conflict Resolution

**Disagreements between:**

- Content editors → Escalate to T5.2 leadership
- Domain stakeholders → Escalate to relevant WG chair
- Tool developers and NAPCORE → Facilitate via GitHub Discussions

---

## Transparency and Communication

### Public Information

**Available on website:**

- Governance framework (this document)
- Inclusion and endorsement criteria
- List of endorsed tools
- List of endorsed standards
- Submission process

**Available on GitHub:**

- Tool submission discussions
- Review comments and decisions
- Catalog source code

### Decision Notifications

**Tool submitters notified via:**

- GitHub Discussion responses
- Email (if provided)

**Community notified via:**

- Blog posts for major updates
- Announcements in Discussions

---

## Governance Updates

### Framework Changes

**Minor updates (e.g., clarifications):**

- T5.2 leadership authority
- Notify stakeholders

**Major updates (e.g., new tiers, criteria changes):**

- Governance review meeting required
- Stakeholder approval needed

**Version control:**

- Governance document versioned
- Changes tracked in Git
- Historical versions available

---

## Metrics and Reporting

### Tracked Metrics

- Total tools in catalog
- Listed vs. Endorsed breakdown
- Tools by category
- Tools by standard
- Submission rate (monthly)
- Endorsement rate
- Tool status distribution

### Reporting

**To NAPCORE leadership:**

- Quarterly governance reports
- Annual catalog statistics
- Community engagement metrics

**Public dashboard (planned):**

- Catalog growth over time
- Tools by category/standard
- Submission statistics

---

## Contact and Support

### For Tool Submissions

**GitHub Discussions:** https://github.com/napcore-tools/web-awesome_napcore_tools/discussions

**Category:** "Tool Submission"

### For Governance Questions

**Email:** [T5.2 contact email]

**GitHub Discussions:** General category

### For Technical Issues

**GitHub Issues:** https://github.com/napcore-tools/web-awesome_napcore_tools/issues

---

## Appendix: Initial Endorsed Tools (v1.0)

| Tool                                | Domain   | Rationale                                         |
| ----------------------------------- | -------- | ------------------------------------------------- |
| **DATEX II Browser**                | Road     | Production-ready, widely used, maintained by T4.1 |
| **DATEX II Schema Generation Tool** | Road     | Essential for developers, stable, well-documented |
| **mobilityDCAT-AP Generator**       | Metadata | Supports EC metadata mandate, active development  |
| **DATEX II Documentation**          | Road     | Official reference, high quality                  |

**Additional tools:** 2-3 tools to be confirmed based on stakeholder input

**Tools Listed but not Endorsed (v1.0):**

- ALERT-C Locations Tester (experimental status)
- MOTIS (external tool, validation pending)

---

## Document History

| Version | Date       | Changes                                       |
| ------- | ---------- | --------------------------------------------- |
| 1.0     | 2025-12-30 | Initial governance framework for v1.0 release |

**Next Review:** May 2026

---

## Related Documentation

- Contribution Guidelines: `../docs/contribute.md`
- Project Overview: `project-overview.md`
- About Page: `../docs/about.md`
