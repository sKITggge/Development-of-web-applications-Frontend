interface PaginationProps {
  postsCount: number
  limit: number
  offset: number
  changeLimit: (value: number) => void
  changeOffset: (value: number) => void
}

function generatePageNumbers(
  currentPage: number,
  totalPages: number,
  maxVisiblePages: number = 5
): number[] {
  if (totalPages <= maxVisiblePages) {
    return Array.from({ length: totalPages }, (_, i) => i + 1)
  }

  const pages: number[] = []
  const half = Math.floor(maxVisiblePages / 2)

  let startPage = Math.max(1, currentPage - half)
  const endPage = Math.min(totalPages, startPage + maxVisiblePages - 1)

  if (endPage - startPage + 1 < maxVisiblePages) {
    startPage = Math.max(1, endPage - maxVisiblePages + 1)
  }

  for (let i = startPage; i <= endPage; i++) {
    pages.push(i)
  }

  return pages
}

export default function Pagination({
  postsCount,
  limit,
  offset,
  changeLimit,
  changeOffset,
}: PaginationProps) {
  const totalPages = Math.ceil(postsCount / limit)
  const currentPage = Math.ceil(offset / limit) + 1

  const pageNumbers = generatePageNumbers(currentPage, totalPages)

  const changePage = (value: number) => {
    changeOffset((value - 1) * limit)
  }

  const prevPage = () => {
    if (offset === 0) {
      return
    }
    changeOffset(offset - limit)
  }

  const nextPage = () => {
    if (offset >= limit * (totalPages - 1)) {
      return
    }
    changeOffset(offset + limit)
  }

  const changePerPage = (value: number) => {
    changeOffset(0)
    changeLimit(value)
  }

  return (
    <div className="flex flex-wrap sm:flex-nowrap items-center justify-between gap-3">
      <div className="flex-shrink-0 order-0 text-sm text-[var(--muted)]">
        Page {currentPage} of {totalPages}
      </div>

      <div className="w-full justify-center flex order-[-1] sm:order-1 items-center gap-2">
        <button
          onClick={prevPage}
          disabled={currentPage === 1}
          className="px-2 py-1 rounded-sm border border-[var(--border)] bg-[var(--card-bg)] disabled:opacity-50 disabled:cursor-not-allowed hover:bg-[var(--accent)] hover:text-white transition-colors"
        >
          ←
        </button>

        {pageNumbers.map((page) => (
          <button
            key={page}
            onClick={() => changePage(page)}
            className={`
              min-w-10 px-2 py-1 rounded-sm border transition-colors
              ${
                page === currentPage
                  ? 'bg-[var(--accent)] text-white border-[var(--accent)]'
                  : 'bg-[var(--card-bg)] border-[var(--border)] hover:bg-[var(--accent)] hover:text-white'
              }
            `}
          >
            {page}
          </button>
        ))}

        <button
          onClick={nextPage}
          disabled={currentPage === totalPages}
          className="px-2 py-1 rounded-sm border border-[var(--border)] bg-[var(--card-bg)] disabled:opacity-50 disabled:cursor-not-allowed hover:bg-[var(--accent)] hover:text-white transition-colors"
        >
          →
        </button>
      </div>

      <div className="flex flex-shrink-0 order-2 items-center gap-2 text-sm">
        <span className="text-[var(--muted)]">Per page:</span>
        <select
          value={limit}
          onChange={(e) => changePerPage(Number(e.target.value))}
          className="bg-[var(--card-bg)] border border-[var(--border)] rounded-sm px-2 py-1"
        >
          <option value={10}>10</option>
          <option value={20}>20</option>
          <option value={50}>50</option>
          <option value={100}>100</option>
        </select>
      </div>
    </div>
  )
}
