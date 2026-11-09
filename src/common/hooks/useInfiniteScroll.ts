import { useEffect, useRef } from "react"

type Props = {
  hasNextPage: boolean
  isFetching: boolean
  fetchNextPage: () => void
  rootMargin?: string
  threshold?: number
}

export const useInfiniteScroll = ({
  hasNextPage,
  isFetching,
  fetchNextPage,
  rootMargin = "100px",
  threshold = 0.1,
}: Props) => {
  const observerRef = useRef<HTMLDivElement>(null)

  const loadMoreHandler = () => {
    if (hasNextPage && !isFetching) {
      fetchNextPage()
    }
  }

  useEffect(() => {
    // IntersectionObserver отслеживает элементы и сообщает, насколько они видны во viewport
    // https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API
    const obserever = new IntersectionObserver(
      (entries) => {
        if (entries.length > 0 && entries[0].isIntersecting) {
          loadMoreHandler()
        }
      },
      {
        root: null, // отслеживание пр-дит относительно окна всего браузера (не подходит, если скролл а модалках)
        rootMargin: rootMargin, // подгружай остальной контент, за 100px до появления эл
        threshold: threshold, // отработай callback если наш элемент виден на 10%
      },
    )

    const currentObsereverRef = observerRef.current
    if (currentObsereverRef) {
      // начинает наблюдение за элементом
      obserever.observe(currentObsereverRef)
    }

    // Функция очистки - прекращает наблюдение при размонтировании компонента
    return () => {
      if (currentObsereverRef) {
        obserever.unobserve(currentObsereverRef)
      }
    }
  }, [loadMoreHandler, rootMargin, threshold])

  return { observerRef }
}
