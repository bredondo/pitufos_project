import React from 'react';
import PropTypes from 'prop-types';
 
const propTypes = {
    items: PropTypes.array.isRequired,
    onChangePage: PropTypes.func.isRequired,
    totalItems: PropTypes.number.isRequired,
    search: PropTypes.string.isRequired,
    page: PropTypes.number.isRequired,
    initialPage: PropTypes.number,
    pageSize: PropTypes.number
}
 
const defaultProps = {
    page: 0,
    initialPage: 1,
    pageSize: 3
}
 
class Pagination extends React.Component {
    constructor(props) {
        super(props);
        this.state = { pager: {currentPage: 0} };
    }

    componentDidUpdate(prevProps, prevState) {
        // reset page if items array has changed
        if (this.props.page !== prevProps.page) {
            this.setPage(this.props.page, false);
        }

    }
 
    setPage(page, click) {
        var { items, pageSize, totalItems } = this.props;
        var pager = this.state.pager;
        if (page < 1 || page > pager.totalPages) {
            return;
        }
 
        // get new pager object for specified page
        pager = this.getPager(totalItems, page, pageSize);
 
        // get new page of items from items array
        var pageOfItems = items.slice(pager.startIndex, pager.endIndex + 1);
 
        // update state
        this.setState({ pager: pager });
 
        // call change page function in parent component
        if(click){
            this.props.onChangePage(pager.currentPage);
        }
    }
 
    getPager(totalItems, currentPage, pageSize) {
        // default to first page
        currentPage = currentPage || 1;
 
        // default page size is 10
        pageSize = pageSize || 10;
 
        // calculate total pages
        var totalPages = Math.ceil(totalItems / pageSize);
 
        var startPage, endPage;
        if (totalPages <= 10) {
            // less than 10 total pages so show all
            startPage = 1;
            endPage = totalPages;
        } else {
            // more than 10 total pages so calculate start and end pages
            if (currentPage <= 6) {
                startPage = 1;
                endPage = 10;
            } else if (currentPage + 4 >= totalPages) {
                startPage = totalPages - 9;
                endPage = totalPages;
            } else {
                startPage = currentPage - 5;
                endPage = currentPage + 4;
            }
        }
 
        // calculate start and end item indexes
        var startIndex = (currentPage - 1) * pageSize;
        var endIndex = Math.min(startIndex + pageSize - 1, totalItems - 1);
 
        // create an array of pages to ng-repeat in the pager control
        var pages = [...Array((endPage + 1) - startPage).keys()].map(i => startPage + i);
 
        // return object with all pager properties required by the view
        return {
            totalItems: totalItems,
            currentPage: currentPage,
            pageSize: pageSize,
            totalPages: totalPages,
            startPage: startPage,
            endPage: endPage,
            startIndex: startIndex,
            endIndex: endIndex,
            pages: pages
        };
    }
 
    render() {
        var pager = this.state.pager;
 
        if (!pager.pages || pager.pages.length <= 1) {
            // don't display pager if there is only 1 page
            return null;
        }
 
        return (
            <ul className="pagination">
                <li className={pager.currentPage === 1 ? 'page-item disabled' : 'page-item'}>
                    <a className="page-link" onClick={() => this.setPage(1,true)}>First</a>
                </li>
                <li className={pager.currentPage === 1 ? 'page-item disabled' : 'page-item'}>
                    <a className="page-link" onClick={() => this.setPage(pager.currentPage - 1,true)}>Previous</a>
                </li>
                {pager.pages.map((page, index) =>
                    <li key={index} className={pager.currentPage === page ? 'page-item active' : 'page-item'}>
                        <a className="page-link" onClick={() => this.setPage(page,true)}>{page}</a>
                    </li>
                )}
                <li className={pager.currentPage === pager.totalPages ? 'page-item disabled' : 'page-item'}>
                    <a className="page-link" onClick={() => this.setPage(pager.currentPage + 1,true)}>Next</a>
                </li>
                <li className={pager.currentPage === pager.totalPages ? 'page-item disabled' : 'page-item'}>
                    <a className="page-link" onClick={() => this.setPage(pager.totalPages,true)}>Last</a>
                </li>
            </ul>
        );
    }
}
 
Pagination.propTypes = propTypes;
Pagination.defaultProps = defaultProps;
export default Pagination;