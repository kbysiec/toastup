# Toastup

https://github.com/user-attachments/assets/33e3b44b-dd30-49a0-954e-c401adaa13a7

Toastup is an animation-focused toast component for React.

## Install

npm

```bash
npm install @toastup/react
```

yarn

```bash
yarn add @toastup/react
```

## Integrate

```tsx
function App() {
  return (
    <div>
      <button onClick={() => add({ type: "success", title: "test" })}>
        Add toast
      </button>
      <Toaster />
    </div>
  );
}
```

## Features
- easy to use
- easy to customize
- beautiful by default
- smooth animations
- ability to override the id
- optional title
- 6 available positions on the screen
- normal or reversed display order
- 5 available types: base, info, success, warning, error
- 3 themes: light, dark and colorful
- 8 built-in enter animations
- 8 built-in exit animations
- 3 built-in optional body animations
- ability to create custom animation with ease
- limit the number of toasts visible on the screen at once
- right-to-left support
- custom styling
- optional ability to drag on mobile
- 5 available callbacks

## Documentation

Find all necessary docs [here](https://toastup.kbysiec.com/).

## Author

[Kamil Bysiec](https://github.com/kbysiec)

## Acknowledgment

If you found it useful somehow, I would be grateful if you could leave a star in the project's GitHub repository.

Thank you.
