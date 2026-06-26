import { lazy, Suspense } from 'react'
import { Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import Home from './pages/Home'

const Book = lazy(() => import('./pages/Book'))
const Author = lazy(() => import('./pages/Author'))
const Excerpts = lazy(() => import('./pages/Excerpts'))
const Preorder = lazy(() => import('./pages/Preorder'))
const Contact = lazy(() => import('./pages/Contact'))
const Press = lazy(() => import('./pages/Press'))
const Legal = lazy(() => import('./pages/Legal'))
const NotFound = lazy(() => import('./pages/NotFound'))

function PageLoader() {
  return (
    <div
      className="flex items-center justify-center"
      style={{ minHeight: '60vh', backgroundColor: '#FDF6E3' }}
      aria-live="polite"
      aria-busy="true"
    >
      <div
        className="h-8 w-8 rounded-full animate-spin"
        style={{ borderTop: '3px solid #D4A853', borderRight: '3px solid #D4A853', borderBottom: '3px solid transparent', borderLeft: '3px solid transparent' }}
        aria-label="Loading page"
      />
    </div>
  )
}

export default function App() {
  return (
    <Layout>
      <Suspense fallback={<PageLoader />}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/book" element={<Book />} />
          <Route path="/author" element={<Author />} />
          <Route path="/excerpts" element={<Excerpts />} />
          <Route path="/preorder" element={<Preorder />} />
          <Route path="/press" element={<Press />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/privacy" element={<Legal kind="privacy" />} />
          <Route path="/terms" element={<Legal kind="terms" />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
    </Layout>
  )
}
