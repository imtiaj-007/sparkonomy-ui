## Testing

### Overview

The project uses **Vitest** for unit testing with **React Testing Library** for component testing. Tests are configured with coverage reporting and strict thresholds.

### Test Setup

- **Test Runner**: Vitest with jsdom environment
- **Component Testing**: React Testing Library
- **Coverage**: V8 coverage with HTML and JSON reports
- **Mocking**: Vitest's built-in mocking capabilities

### Running Tests

```bash
# Run tests in watch mode
npm run test

# Run tests once
npm run test:run

# Run tests with coverage
npm run test:coverage

# Run specific test file
npm run test src/App.test.tsx

# Run tests matching pattern
npm run test -- --grep "App"
```

### Test Scripts

- `npm run test` - Run tests in watch mode
- `npm run test:coverage` - Run tests with coverage report
- `npm run test:run` - Run tests once (CI mode)

### Coverage Configuration

**Thresholds** (must be met):

- **Statements**: 80%
- **Branches**: 80%
- **Functions**: 80%
- **Lines**: 80%

**Included files**:

- All TypeScript files in `src/`
- React components and utilities

**Excluded files**:

- Test files (`*.test.ts`, `*.spec.ts`)
- Setup files (`setupTests.ts`)
- TypeScript declarations (`*.d.ts`)
- Build artifacts (`coverage/`, `dist/`, `node_modules/`)

### Writing Tests

#### Component Testing

```typescript
import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import MyComponent from './MyComponent'

describe('MyComponent', () => {
    it('renders correctly', () => {
        render(<MyComponent title="Test" />)
        expect(screen.getByText('Test')).toBeInTheDocument()
    })
})
```

#### Mocking

```typescript
import { vi } from 'vitest'

// Mock modules
vi.mock('@/utils/api', () => ({
    fetchData: vi.fn().mockResolvedValue({ data: 'test' }),
}))

// Mock functions
const mockFn = vi.fn()
```

#### Testing Hooks

```typescript
import { renderHook, act } from '@testing-library/react'
import { useCounter } from './useCounter'

describe('useCounter', () => {
    it('increments counter', () => {
        const { result } = renderHook(() => useCounter())

        act(() => {
            result.current.increment()
        })

        expect(result.current.count).toBe(1)
    })
})
```

### Test Structure

```bash
src/
├── components/
│ ├── Button.tsx
│ └── Button.test.tsx
├── hooks/
│ ├── useApi.ts
│ └── useApi.test.ts
├── utils/
│ ├── helpers.ts
│ └── helpers.test.ts
└── setupTests.ts
```

### Best Practices

#### ✅ Do

- Test **behavior**, not implementation
- Use **semantic queries** (`getByRole`, `getByLabelText`)
- Test **user interactions** and outcomes
- Mock **external dependencies**
- Keep tests **focused** and **isolated**

#### ❌ Don't

- Test implementation details
- Test third-party libraries
- Write overly complex tests
- Skip error cases and edge cases

### Example Test Files

#### Component Test

```typescript
// src/components/Button.test.tsx
import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import Button from './Button'

describe('Button', () => {
    it('renders with correct text', () => {
        render(<Button>Click me</Button>)
        expect(screen.getByRole('button')).toHaveTextContent('Click me')
    })

    it('calls onClick when clicked', () => {
        const handleClick = vi.fn()
        render(<Button onClick={handleClick}>Click me</Button>)

        fireEvent.click(screen.getByRole('button'))
        expect(handleClick).toHaveBeenCalledOnce()
    })
})
```

#### Utility Test

```typescript
// src/utils/formatDate.test.ts
import { describe, it, expect } from 'vitest'
import { formatDate } from './formatDate'

describe('formatDate', () => {
    it('formats date correctly', () => {
        const date = new Date('2024-01-15')
        expect(formatDate(date)).toBe('Jan 15, 2024')
    })

    it('handles invalid date', () => {
        expect(formatDate(new Date('invalid'))).toBe('Invalid Date')
    })
})
```

### Coverage Reports

After running `npm run test:coverage`, view the HTML report:

```bash
# Coverage report is generated in:
coverage/index.html
```

Open `coverage/index.html` in your browser to see:

- **File-by-file coverage**
- **Line-by-line highlighting**
- **Coverage trends**
- **Missing coverage areas**

### CI/CD Integration

Tests run automatically in CI with coverage thresholds:

```yaml
# Example GitHub Actions
- name: Run tests
  run: npm run test:coverage

- name: Upload coverage
  uses: codecov/codecov-action@v3
```

### Troubleshooting

**Tests not running:**

- Check that test files end with `.test.ts` or `.spec.ts`
- Verify `setupTests.ts` is properly configured
- Ensure all dependencies are installed

**Coverage failures:**

- Check coverage thresholds in `vite.config.ts`
- Review excluded files configuration
- Add tests for uncovered code paths

**Mock issues:**

- Ensure mocks are set up before imports
- Use `vi.clearAllMocks()` in `beforeEach`
- Check mock return values and implementations

**Type errors in tests:**

- Verify `tsconfig.app.json` includes test types
- Check that `@testing-library/jest-dom` types are available
- Ensure Vitest globals are properly configured
