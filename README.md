# E-CRiPT: Ethical Consistency Rules for Patient Privacy and Compliance

**Anonymous Artifact Repository — For Peer Review**

This repository provides the implementation artifact accompanying the paper:

> **E-CRiPT: Ethical Consistency Rules for Patient Privacy and Compliance**

The artifact implements a lightweight rule-governance environment for defining, managing, testing, and injecting ethical rules into an AI policy pipeline.

---

## Overview

E-CRiPT provides a declarative mechanism for expressing ethical constraints using a
**WHEN–DO** rule structure. The supporting tool enables ethical rules to be managed
as CRUD entities and evaluated against AI/clinical requests.

The prototype focuses on three practical operations:

1. **Rule Management** — create, view, update, delete, and activate/deactivate rules.
2. **Rule Injection** — select active rules and inject them into the policy pipeline.
3. **Policy Testing** — evaluate clinical prompts and identify triggered rules and
   resulting policy decisions.

The artifact is designed to make the proposed approach inspectable and reproducible
without requiring a complex deployment environment.

---

## Artifact Contents

```text
E-CRiPT/
│
├── app.py
├── requirements.txt
├── README.md
│
├── data/
│   └── rules.json
│
├── templates/
│   └── index.html
│
└── static/
    ├── css/
    │   └── style.css
    └── js/
        └── app.js

