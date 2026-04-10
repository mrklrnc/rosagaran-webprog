const articles = [
  {
    name: 'react-props-and-styling',
    title: 'Understanding React Props and Styling',
    excerpt:
      'Learn how props power reusable components and compare the most common styling options in modern React apps.',
    coverImage:
      'https://images.unsplash.com/photo-1633356122544-f134324a6cee?auto=format&fit=crop&w=1200&q=80',
    coverAlt: 'React logo-inspired abstract gradient on a dark background',
    readTime: '7 min read',
    publishedAt: 'Mar 2, 2026',
    content: [
      'Props (short for properties) are the primary way parent components pass data into children. They are read-only, which keeps data flow predictable and makes components easier to test in isolation.',
      'When you design a component API, name props for intent. Prefer explicit booleans like `isLoading` and keep objects shallow so callers can spread configuration without surprises.',
      'Example:\nfunction Welcome(props) {\n  return <h1>Hello, {props.name}!</h1>;\n}',
      'Styling in React is a spectrum. Global CSS is simple to adopt, CSS Modules add scoping, utility frameworks like Tailwind speed iteration, and CSS-in-JS libraries excel when themes need to be dynamic.',
      'Inline styles are great for one-off prototypes or values computed at runtime, but they do not support pseudo-classes unless you reach for libraries or variables.',
      'Inline Style Example:\nconst style = { color: \'blue\' };\n<p style={style}>Styled Text</p>',
      'A practical rule: co-locate styles with the component that owns the markup, document tokens (colors, spacing) once, and reuse them across cards, navigation, and forms for a cohesive system.',
    ],
  },
  {
    name: 'react-functional-components',
    title: 'React Functional Components',
    excerpt:
      'Functional components are the default in React today—lean functions that compose hooks for state, effects, and context.',
    coverImage:
      'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=1200&q=80',
    coverAlt: 'Developer typing on a laptop with code on the screen',
    readTime: '6 min read',
    publishedAt: 'Mar 5, 2026',
    content: [
      'Functional components are plain functions that return JSX. Because they are just functions, they are easy to read, tree-shake, and snapshot test.',
      'Hooks such as `useState`, `useEffect`, and `useMemo` let you add stateful behavior without classes. Hooks should be called unconditionally at the top level of the component.',
      'Example:\nfunction HelloWorld() {\n  return <h1>Hello, World!</h1>;\n}',
      'Composition beats inheritance: build small presentational pieces, then assemble screens from those pieces. Keep side effects inside `useEffect` (or event handlers) so renders stay pure.',
      'Performance tip: memoize expensive calculations with `useMemo` and stabilize callbacks with `useCallback` when passing them to memoized children.',
      'Teams prefer functional components because they align with concurrent rendering features and reduce the mental overhead of lifecycle mapping.',
    ],
  },
  {
    name: 'react-component-lifecycle',
    title: 'React Component Lifecycle',
    excerpt:
      'From class lifecycle methods to `useEffect`, here is how mounting, updating, and cleanup map to modern React.',
    coverImage:
      'https://images.unsplash.com/photo-1504639725590-34d0984388bd?auto=format&fit=crop&w=1200&q=80',
    coverAlt: 'Close-up of a circuit board representing system lifecycles',
    readTime: '8 min read',
    publishedAt: 'Mar 8, 2026',
    content: [
      'Class components expose lifecycle methods such as `componentDidMount`, `componentDidUpdate`, and `componentWillUnmount`. Each maps to a phase: mount, update, and teardown.',
      'Functional components express the same ideas with `useEffect`. An empty dependency array runs once on mount; returning a cleanup function mirrors unmount logic.',
      'Example:\nuseEffect(() => {\n  console.log(\'Mounted\');\n  return () => console.log(\'Unmounted\');\n}, []);',
      'When dependencies change, React re-runs the effect after paint. Always list every reactive value you read inside the effect to avoid stale closures.',
      'For data fetching, prefer patterns that cancel in-flight requests on dependency changes to prevent race conditions when users navigate quickly.',
      'Understanding lifecycles helps you debug flicker, duplicate network calls, and memory leaks from forgotten subscriptions.',
    ],
  },
  {
    name: 'react-routing-basics',
    title: 'React Router Basics',
    excerpt:
      'Declarative routes, nested layouts, and accessible navigation patterns for single-page applications.',
    coverImage:
      'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1200&q=80',
    coverAlt: 'Earth at night from space symbolizing connected navigation paths',
    readTime: '7 min read',
    publishedAt: 'Mar 11, 2026',
    content: [
      'React Router keeps the UI in sync with the URL without full page reloads. Users can bookmark deep links, and the back button behaves as expected.',
      'Data routers (for example `createBrowserRouter`) pair routes with loaders and actions so screens can fetch before render and handle mutations predictably.',
      'Example:\n<Routes>\n  <Route path="/" element={<Home />} />\n  <Route path="/about" element={<About />} />\n</Routes>',
      'Use `Link` or `NavLink` instead of raw anchors for internal navigation so the router can intercept clicks and manage history.',
      'Nested routes let you share chrome such as headers and footers while swapping the main pane. Index routes render a default child when the parent path matches exactly.',
      'Add a catch-all route for friendly404 pages, and consider focus management for screen reader users when routes change.',
    ],
  },
  {
    name: 'react-state-management',
    title: 'Managing State in React',
    excerpt:
      'Local state, lifted state, and context—when to use each, plus patterns that keep updates easy to reason about.',
    coverImage:
      'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80',
    coverAlt: 'Analytics dashboard with charts representing application state',
    readTime: '9 min read',
    publishedAt: 'Mar 14, 2026',
    content: [
      'State is any data that changes over time and affects rendering. Start with local state inside the component that owns the UI, then lift it only when a sibling needs access.',
      '`useState` returns a tuple of the current value and a setter. Functional updates (`setCount(c => c + 1)`) help when the next state depends on the previous one.',
      'Example:\nconst [count, setCount] = useState(0);',
      'For cross-cutting data like authenticated user info, React Context reduces prop drilling. Keep context slices small so components re-render only when their slice changes.',
      'When state grows complex, reducers (`useReducer`) centralize transitions and read like a lightweight state machine.',
      'Before reaching for a global store, ask whether the data is server-owned—often caches from TanStack Query or similar libraries are the better fit.',
    ],
  },
];

export default articles;
