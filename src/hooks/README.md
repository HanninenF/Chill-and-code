# Hooks

Lägg återanvändbara React-hooks här när logik ska delas mellan komponenter.

```js
const { showOnboarding, completeOnboarding } = useOnboarding();

if (showOnboarding) {
  await completeOnboarding();
}
```
