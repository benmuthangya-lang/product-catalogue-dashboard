import { useCallback, useEffect, useRef, useState } from 'react'
import { fetchProducts } from '../api/products.js'

export function useProducts() {
  const [products, setProducts] = useState([])
  const [status, setStatus] = useState('loading')
  const [error, setError] = useState('')
  const controllerRef = useRef(null)

  const loadProducts = useCallback(async () => {
    // Retrying should also cancel any request that is still in flight.
    controllerRef.current?.abort()
    const controller = new AbortController()
    controllerRef.current = controller

    setStatus('loading')
    setError('')

    try {
      const result = await fetchProducts({ signal: controller.signal })
      setProducts(result)
      setStatus('success')
    } catch (requestError) {
      if (requestError.name !== 'AbortError') {
        setError(requestError.message || 'We could not load the catalogue.')
        setStatus('error')
      }
    }
  }, [])

  useEffect(() => {
    // The initial render already represents loading, so this effect only needs
    // to start the external request and subscribe to its eventual result.
    const controller = new AbortController()
    controllerRef.current = controller

    fetchProducts({ signal: controller.signal })
      .then((result) => {
        setProducts(result)
        setStatus('success')
      })
      .catch((requestError) => {
        if (requestError.name !== 'AbortError') {
          setError(requestError.message || 'We could not load the catalogue.')
          setStatus('error')
        }
      })

    // A retry replaces the controller, so clean up whichever request is active.
    return () => controllerRef.current?.abort()
  }, [loadProducts])

  return { products, status, error, retry: loadProducts }
}
