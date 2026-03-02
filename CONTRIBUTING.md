# Contributing to SmartHealthML

Thank you for your interest in contributing! 🎉

## Getting Started

1. **Fork** the repository and clone your fork locally.
2. Create a new branch from `main` for your work:
   ```bash
   git checkout -b feature/your-feature-name
   ```
3. Make your changes, commit, and push to your fork.
4. Open a **Pull Request** targeting the `main` branch.

---

## Development Setup

### Backend
```bash
cd Backend
python -m venv venv
venv\Scripts\activate      # Windows
# source venv/bin/activate  # macOS / Linux
pip install -r requirements.txt
python app.py
```

### Frontend
```bash
cd Frontend
npm install
npm run dev
```

---

## Branch Naming Convention

| Type       | Pattern                     | Example                     |
|------------|-----------------------------|-----------------------------|
| Feature    | `feature/<short-desc>`      | `feature/alert-export`      |
| Bug fix    | `fix/<short-desc>`          | `fix/heatmap-null-crash`    |
| Docs       | `docs/<short-desc>`         | `docs/update-readme`        |
| Refactor   | `refactor/<short-desc>`     | `refactor/auth-context`     |

---

## Commit Message Style

Use the [Conventional Commits](https://www.conventionalcommits.org/) format:

```
<type>(<scope>): <short summary>

[optional body]
[optional footer]
```

**Types**: `feat`, `fix`, `docs`, `style`, `refactor`, `test`, `chore`

**Examples**:
```
feat(alerts): add email notification for high-risk triggers
fix(heatmap): handle null coordinates for missing district data
docs(readme): add screenshot for hygiene tips section
```

---

## Code Style

### Python (Backend)
- Follow [PEP 8](https://peps.python.org/pep-0008/).
- Use descriptive variable names; avoid single-letter names except in loops.
- Add docstrings to all public functions and classes.

### TypeScript / React (Frontend)
- Write functional components with typed props.
- Use `const` over `let` wherever possible.
- Keep components small and focused (single responsibility).

---

## Pull Request Checklist

Before opening a PR, ensure:

- [ ] Code runs locally without errors.
- [ ] New features have corresponding tests (or document why tests are not applicable).
- [ ] ESLint passes: `npm run lint` (in `Frontend/`).
- [ ] Backend tests pass: `pytest` (in `Backend/`).
- [ ] PR title follows the Conventional Commits format.
- [ ] Screenshots / recordings attached for UI changes.

---

## Reporting Issues

Open an issue and include:
- **Environment**: OS, Python version, Node version
- **Steps to reproduce**
- **Expected vs actual behaviour**
- **Relevant logs or screenshots**

---

👨‍💻 Maintained by [Aditya](https://github.com/aditya-sharma-1104)
