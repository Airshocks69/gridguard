# Contributing to GridGuard 🎮

First off, thank you for considering contributing to GridGuard! It's people like you that make GridGuard such a great tool.

## Code of Conduct

This project and everyone participating in it is governed by our commitment to fostering an open and welcoming environment. Be respectful, inclusive, and constructive.

## How Can I Contribute?

### Reporting Bugs

Before creating bug reports, please check existing issues. When you create a bug report, include as many details as possible:

- **Use a clear and descriptive title**
- **Describe the exact steps to reproduce the problem**
- **Provide specific examples**
- **Describe the behavior you observed**
- **Explain which behavior you expected**
- **Include screenshots if possible**
- **Include your environment details** (browser, OS, etc.)

### Suggesting Enhancements

Enhancement suggestions are tracked as GitHub issues. When creating an enhancement suggestion, include:

- **Use a clear and descriptive title**
- **Provide a detailed description**
- **Explain why this enhancement would be useful**
- **Include mockups or examples if applicable**

### Pull Requests

1. **Fork the repo** and create your branch from `main`
2. **If you've added code** that should be tested, add tests
3. **If you've changed APIs**, update the documentation
4. **Ensure the test suite passes** (`npm test`)
5. **Make sure your code lints** (`npm run lint`)
6. **Issue your pull request**

## Development Setup

```bash
# Clone your fork
git clone https://github.com/your-username/gridguard.git

# Install dependencies
npm install

# Create a branch
git checkout -b feature/my-feature

# Start development server
npm run dev
```

## Style Guide

### TypeScript

- Use TypeScript for all new files
- Prefer `interface` over `type` for object shapes
- Use explicit return types for functions
- Avoid `any` - use `unknown` if truly dynamic

### React

- Use functional components with hooks
- Prefer `const` arrow functions for components
- Use memo for expensive components
- Keep components small and focused (SRP)

### Code Formatting

- We use ESLint and Prettier
- Run `npm run lint` before committing
- 2 spaces for indentation
- Semicolons required
- Single quotes for strings

### Naming Conventions

- **Components**: PascalCase (`MyComponent.tsx`)
- **Functions**: camelCase (`myFunction`)
- **Constants**: UPPER_SNAKE_CASE (`MY_CONSTANT`)
- **Types/Interfaces**: PascalCase (`MyInterface`)
- **Files**: PascalCase for components, camelCase for utilities

### Comments

- Use JSDoc for functions and modules
- Keep comments concise and meaningful
- Update comments when code changes

Example:
```typescript
/**
 * Calculates the sum of two numbers
 * 
 * @param a - First number
 * @param b - Second number
 * @returns Sum of a and b
 */
export const sum = (a: number, b: number): number => {
  return a + b;
};
```

## Testing

- Write unit tests for utilities
- Write integration tests for hooks
- Write component tests for UI components
- Aim for >80% coverage
- Keep tests simple and readable

## Git Commit Messages

- Use the present tense ("Add feature" not "Added feature")
- Use the imperative mood ("Move cursor to..." not "Moves cursor to...")
- Limit the first line to 72 characters or less
- Reference issues and pull requests

Examples:
```
feat: add custom difficulty selector
fix: prevent double-click mine explosion
docs: update installation instructions
style: format code with prettier
refactor: extract game logic to separate module
test: add tests for game state hook
chore: update dependencies
```

## Project Structure

```
src/
├── components/    # React components (one per folder)
├── hooks/         # Custom React hooks
├── types/         # TypeScript type definitions
├── utils/         # Pure utility functions
├── constants/     # Configuration and constants
└── styles/        # Global styles
```

## Component Template

```typescript
/**
 * MyComponent Description
 * 
 * Detailed explanation of what this component does.
 * 
 * @module components/MyComponent
 * @author Your Name
 */

import React from 'react';

interface MyComponentProps {
  // Props
}

export const MyComponent: React.FC<MyComponentProps> = ({
  // Destructured props
}) => {
  return (
    // JSX
  );
};
```

## Questions?

Feel free to open an issue with the label "question" or reach out to the maintainers.

## Attribution

This Contributing Guide is adapted from open source best practices.

Thank you for contributing! 🎉
