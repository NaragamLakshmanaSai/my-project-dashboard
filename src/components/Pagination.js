import { CPagination, CPaginationItem } from "@coreui/react"

const Pagination = ({pageNo, setPageNo, totalPages}) => {
    const pages = [...Array(totalPages).keys()].map((num) => num + 1);
    return(
        <div>
      {pages.map((page) => (
        <button
          key={page}
          onClick={() => setPageNo(page)}
          disabled={pageNo === page}
        >
          {page}
        </button>
      ))}
    </div>
    )
}

export default Pagination