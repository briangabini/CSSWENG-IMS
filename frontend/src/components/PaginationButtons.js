import React from 'react';
// import { Container } from 'react-bootstrap'
import { Button } from 'react-bootstrap'

const PaginationButtons = ({
    totalPages,
    currentPage,
    fetchInventoryItems,
}) => {

    const goToFirstPage = () => {
        fetchInventoryItems(1);
    };

    const goToPreviousPage = () => {
        if (currentPage > 1) {
            fetchInventoryItems(currentPage - 1);
        }
    };

    const goToNextPage = () => {
        if (currentPage < totalPages) {
            fetchInventoryItems(currentPage + 1);
        }
    };

    const goToLastPage = () => {
        fetchInventoryItems(totalPages);
    };

    const maxButtonsToShow = 5;                                 // Number of buttons to show at once
    const halfMaxButtons = Math.floor(maxButtonsToShow / 2);    // the number of buttons that should be placed in the left and right of the centermost button

    // Calculate the startPage (leftmost page to display) 
    let startPage = Math.max(1, currentPage - halfMaxButtons);
    // Calculate the endPage (rightmost page to display) 
    let endPage = Math.min(totalPages, startPage + maxButtonsToShow - 1);

    // this is for ensuring there will be always 'maxButtonsToShow' number of pages displayed
    // used when accessing the rightmost page, without this it will only display 3 pages if maxButtonsToShow=5
    // used when there are only <= 'maxButtonsToShow' number of pages
    if (endPage - startPage < maxButtonsToShow - 1) {
        startPage = Math.max(1, endPage - maxButtonsToShow + 1);
    }

    // this is for storing the react components
    const pageButtons = [];

    // display buttons when start page is >= 2
    if (startPage >= 2 && !(startPage === 1)) {
        pageButtons.push(
            <Button onClick={goToFirstPage} className='border rounded-2 p-3 mx-1 button-page first bg-main-dominant-red'></Button>
        );

        pageButtons.push(
            <Button onClick={goToPreviousPage} className='border rounded-2 p-3 mx-1 button-page left bg-main-dominant-red'></Button>
        );
    }

    // Generate buttons for pages in the range from startPage to endPage
    for (let i = startPage; i <= endPage; i++) {
        pageButtons.push(
            <Button
                key={i}
                className={`border mx-1 ${currentPage === i ? 'txt-main-dominant-red bg-white' : 'bg-main-dominant-red'}`}
                onClick={() => fetchInventoryItems(i)}
            >
                {i}
            </Button>
        );
    }

    // display buttons when end page is <= totalPages - 1
    if (endPage <= totalPages - 1) {
        pageButtons.push(
            <Button onClick={goToNextPage} className='border rounded-2 p-3 mx-1 button-page right bg-main-dominant-red'></Button>
        );

        pageButtons.push(
            <Button onClick={goToLastPage} className='border rounded-2 p-3 mx-1 button-page last bg-main-dominant-red'></Button>
        );
    }

    /* DEBUGGING */
    /* console.log('HalfMaxButtons: ',halfMaxButtons)
    console.log('Start Page: ', startPage)
    console.log('End Page: ', endPage)
    console.log('Total Pages: ', totalPages)
    console.log('Current Page: ', currentPage) */

    return (
       <div>
           {pageButtons}
       </div>
    );
};

export default PaginationButtons;