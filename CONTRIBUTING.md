# Contributing

We welcome contributions! Please follow these guidelines.

## Development Setup

1. Clone the repository
2. Install dependencies:
   ```sh
   bun install
   ```
3. Build the library:
   ```sh
   bun run prepare
   ```

## Running the Example App

### iOS

```sh
cd example
bun run ios
```

### Android

```sh
cd example
bun run android
```

## Making Changes

1. Make your changes
2. Run linting: `bun run lint`
3. Run type checking: `bun run typecheck`
4. Run tests: `bun run test`

## Commit Messages

We use [Conventional Commits](https://www.conventionalcommits.org/):

- `feat:` for new features
- `fix:` for bug fixes
- `docs:` for documentation changes
- `chore:` for maintenance tasks

## Pull Requests

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## License

By contributing, you agree that your contributions will be licensed under the MIT License.
