import { useEffect, useRef, useState } from 'react'

export function useCountUp(
  target: number,
  duration = 2000,
  start = false,
  onComplete?: () => void,
) {
  const [count, setCount] = useState(0)
  const onCompleteRef = useRef(onComplete)

  useEffect(() => {
    onCompleteRef.current = onComplete
  }, [onComplete])

  useEffect(() => {
    if (!start) {
      setCount(0)
      return
    }

    if (duration <= 0) {
      setCount(target)
      onCompleteRef.current?.()
      return
    }

    setCount(0)
    let startTime: number | null = null
    let frame: number
    let completed = false

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp
      const progress = Math.min((timestamp - startTime) / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      const next = progress >= 1 ? target : Math.floor(eased * target)
      setCount(next)

      if (progress < 1) {
        frame = requestAnimationFrame(animate)
      } else if (!completed) {
        completed = true
        setCount(target)
        onCompleteRef.current?.()
      }
    }

    frame = requestAnimationFrame(animate)
    return () => cancelAnimationFrame(frame)
  }, [target, duration, start])

  return count
}
