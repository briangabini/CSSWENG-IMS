    import { Container, Row, Col, Card, InputGroup, Form, Button, ButtonToolbar, FloatingLabel, Modal } from 'react-bootstrap'
    import { useNavigate } from 'react-router-dom'
    import { useState, useEffect } from 'react';

    // componentes
    import Filter from '../components/Filter'
    import SortBy from '../components/SortBy'
    import CartItemDetails from '../components/CartItemDetails'
    import ShopCartInvenItemDetails from '../components/ShopCartInvenItemDetails.js';
    import { useInventoryContext } from '../hooks/useInventoryContext'
    import { useAuthContext } from '../hooks/useAuthContext.js'
    import { useTransactionTypeContext } from '../hooks/useTransactionTypeContext'
    import { useTransactionType } from '../hooks/useTransactionType.js'
    import { DOMAIN } from '../config'
    import _ from 'lodash'

    const ShoppingCart = () => {
        const { user } = useAuthContext()

        const [cart, setCart] = useState('')
        const [selectedItems, setSelectedItems] = useState([]);
        const [selectAllChecked, setSelectAllChecked] = useState(false)

        const [min, setMin] = useState('')
        const [max, setMax] = useState('')
        const [motorModel, setMotorModel] = useState('')
        const [brand, setBrand] = useState('')
        const [stockStatus, setStockStatus] = useState('')
        const [sortBy, setSortBy] = useState('partName,asc')
        const [searchTerm, setSearchTerm] = useState('')
        // const {state} = 
        const [ totalPrice, setTotalPrice] = useState('')
        
        const { inventoryItems, dispatch } = useInventoryContext()
        const { transactionType } = useTransactionTypeContext()
        const { setRetail, setWholesale } = useTransactionType()
        

        const navigate = useNavigate();

        useEffect(() => {
            fetchCart()
        }, [])

        const navigateShoppingCart = (e) => {
            navigate(`/shopping-cart`);

            cancelOrder()

            if (e.target.id === 'retail') {
                setRetail()
            } else {
                setWholesale()
            }

            handleClose();
        };


        const confirmOrder = async () => {
            const data = {
                userId: user._id,
            }

            /* const response =  */
            await fetch(DOMAIN + `/cart/confirmOrder`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${user.token}` },
                body: JSON.stringify(data)
            })
        }

        const cancelOrder = async () => {
            const data = {
                userId: user._id,
            }

            /* const response =  */
            await fetch(DOMAIN + `/cart/cancelOrder`, {
                method: 'DELETE',
                headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${user.token}` },
                body: JSON.stringify(data)
            })
        }

        const deleteItems = async () => {
            try {
                // Send a request to delete items based on selectedItems
                const response = await fetch(DOMAIN + '/cart/deleteItems', {
                    method: 'DELETE',
                    headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${user.token}` },
                    body: JSON.stringify({ userId: user._id, itemIds: selectedItems }),
                });

                if (response.ok) {
                    // Update the cart and selectedItems state after successful deletion
                    fetchCart();
                    setSelectedItems([]);
                } else {
                    // Handle errors or display a notification
                    console.error('Error deleting items:', response.error);
                }
            } catch (error) {
                console.error('Error deleting items:', error.message);
            }
        }

        // Handle checkbox change in CartItemDetails
        /* const handleCheckboxChange = (itemId) => {
            // Clone the current selectedItems array
            const updatedSelectedItems = [...selectedItems];

            // Check if the item is already in the selectedItems array
            const index = updatedSelectedItems.indexOf(itemId);

            if (index !== -1) {
                // If the item is already selected, remove it
                updatedSelectedItems.splice(index, 1);
            } else {
                // If the item is not selected, add it
                updatedSelectedItems.push(itemId);
            }

            // Update the state with the new array
            setSelectedItems(updatedSelectedItems);
        }; */

        const handleCheckboxChange = (itemId) => {
            if (itemId === 'selectAll') {
                // If the "select all" checkbox is clicked, update the selectAllChecked state
                setSelectAllChecked(!selectAllChecked);

                // Update the selectedItems array accordingly
                if (!selectAllChecked) {
                    const allItemIds = cart.inventoryItems.map((item) => item._id);
                    setSelectedItems(allItemIds);
                } else {
                    setSelectedItems([]);
                }
            } else {
                // If an individual checkbox is clicked, handle it as before
                const updatedSelectedItems = [...selectedItems];
                const index = updatedSelectedItems.indexOf(itemId);

                if (index !== -1) {
                    updatedSelectedItems.splice(index, 1);
                } else {
                    updatedSelectedItems.push(itemId);
                }

                setSelectedItems(updatedSelectedItems);
            }
        };

        // console.log(transactionType)

        const [show, setShow] = useState(false);

        const handleClose = () => setShow(false);
        const handleShow = () => setShow(true);

        const fetchInventoryItems = async () => {

            // console.log(DOMAIN)

            let endpoint = DOMAIN + '/inventory' + '/?'

            if (searchTerm) { 
                endpoint += `&search=${searchTerm}`; // using "query" as the query parameter name
            }

            if (motorModel) { 
                endpoint += `&motorModel=${motorModel}`
            }

            if (stockStatus) { 
                endpoint += `&stockStatus=${stockStatus}`
            }

            if (sortBy) {
                endpoint += `&sort=${sortBy}`
            }

            if (brand) {
                endpoint += `&brand=${brand}`
            }

            // console.log(sortBy)
            // console.log(endpoint)

            const response = await fetch(endpoint, {
                headers: { 'Authorization': `Bearer ${user.token}` },
            }) // retrieves response from server as JSON
            const json = await response.json() // converts the json data into an array of objects

            // console.log(json.items)

            // console.log('Is json an array?', Array.isArray(json));
            if (response.ok) {
                // setInventoryItems(json.items)  // set state only if it's an array
                dispatch({ type: 'SET_INVENTORY_ITEMS', payload: json.items })
            } else {
                console.error('Unexpected response: ', json.message)
                // setInventoryItems([])  // clear existing data or handle error appropriately
            }
        }
        

        const fetchCart = async () => {
            const userId = user._id

            const response = await fetch(DOMAIN + `/cart/getCartDetailsByUserId/${userId}`, {
                headers: { 'Authorization': `Bearer ${user.token}` },
            })

            const json = await response.json() // converts the json data into an array of objects

            if (response.ok) {
                setCart(json)
                setTotalPrice(json.totalPrice)
                // console.log(json.inventoryItems)
            }
        }
        const handleSortByUpdate = (newSortByValue) => {
            setSortBy(newSortByValue)
        }

        const handleFilterUpdate = (newMin, newMax, newBrand, newMotorModel, newStockStatus) => {
            setMin(newMin)
            setMax(newMax)
            setBrand(newBrand)
            setMotorModel(newMotorModel)
            setStockStatus(newStockStatus)
        }
        // Handle search term changes
        const handleSearchChange = (event) => {
            // Update the search term state whenever the input value changes
            setSearchTerm(event.target.value);
        }

        const handleSearchClick = () => {
            fetchInventoryItems()
        }

        const handleSearch = (event) => {
            // Check if the function was called via a key down and if that key was Enter
            if (event.type === 'keydown' && event.key === 'Enter') {
                event.preventDefault(); // Prevent the default action
                fetchInventoryItems(); // Call the function that fetches the inventory items
            }
        }
        const debouncedHandleSearchChange = _.debounce(handleSearchChange, 200);

        const addInventoryItem = async (itemId) => {
            const data = {
                userId: user._id,
                inventoryId: itemId
            };
            // console.log(data)
            // console.log(itemId)
            try {
                    await fetch(`${DOMAIN}/cart/addItemToCart`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${user.token}`},
                    body: JSON.stringify(data)
                })
            } catch (error) {
                console.error('Error:', error.message)
            }
        }
        

        useEffect(() => {
            if (user) {
                fetchInventoryItems()
                // addInventoryItem()
            }
        }, [])

        return (
            <>
                <Container className='main'>
                <Row className='fs-2 fw-bold'>
                    Check Out
                </Row>
                <Row>
                    <Card className='p-4 rounded-4 shadow mt-3'>
                        <Row>
                            <Col className='col-6 px-4'>
                                {/* Navigation Tooles: Search + Filter + Sort By */}
                                <Row>
                                        <ButtonToolbar className='nopadding'>
                                            {/* Component for filtering items */}
                                            <Filter min={min} max={max} brand={brand} motorModel={motorModel} stockStatus={stockStatus} onUpdate={handleFilterUpdate} />
                                            {/* Component for sorting items */}
                                            <SortBy sortBy={sortBy} onUpdate={handleSortByUpdate} />
                                        </ButtonToolbar>
                                </Row>
                                <Row>
                                    {/* Search Bar */}
                                    <InputGroup className="mb-3 mt-2 nopadding">
                                        <Form.Control placeholder="Search"
                                            className='rounded-start-2 ps-4 py-2 bg-search-gray'
                                            onChange={debouncedHandleSearchChange}
                                            onKeyDown={handleSearch}
                                            // value={searchTerm}
                                            />
                                        <Button id="button-addon2"
                                            variant='light'
                                            className='py-2 px-3 border border-start-0 bg-search-gray'
                                            onClick={handleSearchClick}>
                                            <img className='mb-1 me-2' src='icon_magnifyingglass_.png' alt="Search" />
                                        </Button>
                                    </InputGroup>
                                </Row>
                                {/* <Row>
                                    <Filter />
                                    <SortBy />
                                </Row> */}
                                <Row className='cart-inventory flex-column align-items-start'>                                 
                                        {inventoryItems && inventoryItems.map((inventoryItem) => (
                                                // Component for Inventory Items
                                                <ShopCartInvenItemDetails
                                                    key={inventoryItem._id}
                                                    _id={inventoryItem._id}
                                                    inventoryItem={inventoryItem}
                                                    showPrice={transactionType}
                                                    onAddToCart={() => addInventoryItem(inventoryItem._id)}
                                                    />
                                        ))}
                                </Row>
                            </Col>
                            <Col className='col-6 nomargin nopadding scroll-space'>
                                    <Row className='mb-4'>
                                        <Button className='w-auto ms-auto me-4 bg-main-dominant-red border-0'
                                            size='sm'
                                            onClick={handleShow}>
                                            Choose New Transaction Type
                                        </Button>
                                    </Row>
                                    <Row className='mb-2'>
                                        <Col className='col-1'>
                                            <Form.Check
                                                type={'checkbox'}
                                                className=''
                                                id='selectAll'
                                                onClick={(e) => {handleCheckboxChange(e.target.id)}}
                                            />
                                        </Col>
                                        <Col className='col-4'>
                                            Name
                                        </Col>
                                        <Col className='col-3 nopadding'>
                                            QTY
                                        </Col>
                                        <Col className='col-3 nopadding'>
                                            Price
                                        </Col>
                                    </Row>
                                    <Container fluid className='nopadding'>
                                        <div className='items-in-cart'>
                                            {cart && cart.inventoryItems.map((inventoryItemObj) => (
                                                // Component for Inventory Items
                                                <CartItemDetails
                                                    key={inventoryItemObj._id}
                                                    cart={cart}
                                                    _id={inventoryItemObj._id}
                                                    item={inventoryItemObj}
                                                    showPrice={transactionType}
                                                    handleCheckboxChange={handleCheckboxChange}
                                                    isSelected={selectedItems.includes(inventoryItemObj._id)} // Check if the item is selected
                                                />
                                            ))}

                                        </div>
                                    </Container>
                                <Row>
                                    <Button className='w-auto px-5 mx-auto mt-4 bg-main-dominant-red shadow border-0 mb-4' onClick={deleteItems}>Delete Items</Button>
                                </Row>
                                <Row>
                                    <Card className='w-auto mx-auto'>
                                        <Row className='fs-5 fw-bold ps-2 pt-2'>
                                            Transaction Type: {transactionType}
                                        </Row>
                                        <Row className='mt-2'>
                                            <Col className=''>
                                            <FloatingLabel
                                                controlId="floatingInput"
                                                label="Job ID"
                                                className="mb-3"
                                            >
                                                <Form.Control type="text" placeholder="name@example.com" />
                                            </FloatingLabel>
                                            </Col>
                                            <Col className='ps-2 nopadding'>
                                                <span className='d-inline fs-5 fw-bold text-wrap'>Total: ₱{totalPrice}</span>
                                            </Col>
                                        </Row>
                                    </Card>
                                </Row>
                                <Container className='w-100'>
                                        <Button className='w-auto px-5 ms-auto me-1 mt-4 bg-main-dominant-red shadow border-0' onClick={cancelOrder}>Cancel Order</Button>
                                        <Button className='w-auto px-5 me-auto ms-1 mt-4 bg-main-dominant-red shadow border-0' onClick={confirmOrder}>Confirm Order</Button>
                                </Container>
                            </Col>
                        </Row>
                    </Card>
                </Row>
            </Container>
                <Modal show={show} onHide={handleClose}>
                    <Modal.Header closeButton>
                    </Modal.Header>
                    <Modal.Body>
                        <Container className='text-center fs-2 fw-bold'>
                            *Choose Type of Transaction:
                            <Container className='d- mt-4'>
                                {/* button for selecting retail price */}
                                <Button
                                    className='border-0 ms-auto me-3 px-4 py-2 bg-main-dominant-red'
                                    onClick={navigateShoppingCart}
                                    id="retail"
                                >
                                    Retail
                                </Button>

                                {/* button for selecting wholesale price */}
                                <Button
                                    className='border-0 me-auto ms-3 px-4 py-2 bg-main-dominant-red'
                                    onClick={navigateShoppingCart}
                                    id="wholesale"
                                >
                                    Wholesale
                                </Button>
                            </Container>
                        </Container>
                    </Modal.Body>
                    <Modal.Footer>
                        <p>*Choosing a new transaction type would delete all items and clear the Job Id</p>
                    </Modal.Footer>
                </Modal>
            </>
        )
    }

    export default ShoppingCart