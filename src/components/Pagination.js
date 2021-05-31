import React from 'react';
import _ from 'lodash';

const Pagination = (props) => {
    const {itemsCount, pageSize,currentPage, onPageChange } = props;
    const pageCount = Math.ceil(itemsCount / pageSize);

    if(pageCount === 1) return null;
    
    console.log(props);
    const pages = _.range(1,pageCount + 1);
    console.log(pages);

    return(     
        <nav >{/* VSCode 입력: nav>ul.pagination>li.page-item>a.page-link*/}
            <ul className = "pagination" style={{color:"black"}}>
                {pages.map(page => (
                    <li 
                        key={page} 
                        className = {page === currentPage ? "page-item active" : "page-item"}
                        stlye = {{cursor: "pointer", color: "black"}}>
                            <a className="page-link" onClick={() => onPageChange(page)}>{page}</a>{/*페이지 번호 클릭 이벤트 처리기 지정*/}
                    </li>
                ))}
            </ul>
        </nav>
  
    );
}

export default Pagination;