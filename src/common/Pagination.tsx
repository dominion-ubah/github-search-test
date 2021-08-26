interface PaginationProps {
  perPage: number
  totalAmount: number
  paginate: Function
  currentPage: number
}

const Pagination = (props: PaginationProps) => {
  const { perPage, totalAmount, paginate, currentPage } = props
  const pageNumbers = []

  for (let i = 1; i <= Math.ceil(totalAmount / perPage); i++) {
    pageNumbers.push(i)
  }
  return (
    <nav className="pagination my-5 position-absolute" style={{ right: 0 }}>
      <div
        className="py-2 px-3 rounded"
        style={{ background: 'rgba(230,230,230,1)', cursor: 'pointer' }}
        onClick={() => paginate(currentPage > 0 && currentPage - 1)}
      >
        <i className="fas fa-angle-left text-muted"></i>
      </div>
      {pageNumbers.length > 1 &&
        pageNumbers.map((number) => (
          <li
            key={number}
            className="bg-transparent"
            onClick={() => paginate(number)}
          >
            <a
              href="#!"
              className="page-link bg-transparent border-0"
              style={{
                color: `${number === currentPage ? '#000' : '#ccc'}`,
                fontWeight: `${number === currentPage ? 'bold' : 'normal'}`
              }}
            >
              {number}
            </a>
          </li>
        ))}
      <div
        className="py-2 px-3 bg-dark rounded"
        style={{ cursor: 'pointer' }}
        onClick={() =>
          paginate(currentPage <= pageNumbers.length && currentPage + 1)
        }
      >
        <i className="fas fa-angle-right text-muted"></i>
      </div>
    </nav>
  )
}

export default Pagination
