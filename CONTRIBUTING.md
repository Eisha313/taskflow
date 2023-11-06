# Contributing to TaskFlow

First off, thank you for considering contributing to TaskFlow! It's people like you that make TaskFlow such a great tool.

## Code of Conduct

This project and everyone participating in it is governed by our Code of Conduct. By participating, you are expected to uphold this code.

## How Can I Contribute?

### Reporting Bugs

Before creating bug reports, please check the issue list as you might find out that you don't need to create one. When you are creating a bug report, please include as many details as possible:

* **Use a clear and descriptive title** for the issue to identify the problem.
* **Describe the exact steps which reproduce the problem** in as many details as possible.
* **Provide specific examples to demonstrate the steps**.
* **Describe the behavior you observed after following the steps** and point out what exactly is the problem with that behavior.
* **Explain which behavior you expected to see instead and why.**
* **Include screenshots and animated GIFs** if possible.

### Suggesting Enhancements

Enhancement suggestions are tracked as GitHub issues. Create an issue and provide the following information:

* **Use a clear and descriptive title** for the issue to identify the suggestion.
* **Provide a step-by-step description of the suggested enhancement** in as many details as possible.
* **Provide specific examples to demonstrate the steps**.
* **Describe the current behavior** and **explain which behavior you expected to see instead** and why.
* **Explain why this enhancement would be useful** to most TaskFlow users.

### Pull Requests

1. Fork the repo and create your branch from `main`.
2. If you've added code that should be tested, add tests.
3. Ensure the test suite passes.
4. Make sure your code lints.
5. Issue that pull request!

## Styleguides

### Git Commit Messages

* Use the present tense ("Add feature" not "Added feature")
* Use the imperative mood ("Move cursor to..." not "Moves cursor to...")
* Limit the first line to 72 characters or less
* Reference issues and pull requests liberally after the first line
* Use conventional commits format: `type: description`
  * `feat:` - A new feature
  * `fix:` - A bug fix
  * `docs:` - Documentation only changes
  * `style:` - Formatting, missing semi colons, etc
  * `refactor:` - A code change that neither fixes a bug nor adds a feature
  * `test:` - Adding missing tests
  * `chore:` - Changes to the build process or auxiliary tools

### JavaScript Styleguide

* Use ES6+ features
* Use functional components with hooks
* Prefer `const` over `let`
* Use meaningful variable names
* Add comments for complex logic

### CSS Styleguide

* Use Tailwind CSS utility classes
* Follow mobile-first responsive design
* Group related utilities together
* Use custom CSS sparingly

## Project Structure

When adding new features, please follow the existing project structure:

* Components go in `src/components/`
* Context providers go in `src/context/`
* Redux slices go in `src/store/`
* Utility functions go in `src/utils/`

## Questions?

Feel free to open an issue with your question or reach out to the maintainers.

Thank you for contributing! 🎉