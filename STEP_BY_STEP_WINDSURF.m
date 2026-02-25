# My Personal Workflow Guide

## How to Use This Guide
1. I will ONLY read the current step number
2. I will do EXACTLY what it says
3. When finished, I will type "STEP [NUMBER] COMPLETE"
4. I will wait for the next step
5. I will NEVER skip ahead
6. If something fails, I will copy-paste the error message exactly

## Git Protocol
- After each working feature: `git add . && git commit -m "feat: description"`
- After each phase: `git tag v0.[phase] && git push --tags`
- If something breaks: `git checkout [previous-tag]` to go back

## Testing Protocol
- Test each feature immediately after building
- If test fails, report error exactly
- Do not proceed until feature works

## Progress Tracker

| Step | Description | Status |
|------|-------------|--------|
| 1 | Create GitHub repository | ✅ COMPLETE |
| 2 | Open project in Windsurf | ✅ COMPLETE |
| 3 | Initialize Expo project | ✅ COMPLETE |
| 4 | Connect to GitHub | ✅ COMPLETE |
| 5 | Install dependencies | ✅ COMPLETE |
| 6 | Add PRD and docs | 🔄 IN PROGRESS |
| 7 | Setup navigation | ⬜ PENDING |
| 8 | Create patient search screen | ⬜ PENDING |
| 9 | Build add patient form | ⬜ PENDING |
| 10 | Add signature component | ⬜ PENDING |
| ... | ... | ... |

## Current Step: 6