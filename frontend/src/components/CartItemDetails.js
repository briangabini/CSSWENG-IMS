import {Row, Col, Form, Button } from 'react-bootstrap'
import { DOMAIN } from '../config'
import {useState} from 'react'
import { useAuthContext } from '../hooks/useAuthContext.js'

const CartItemDetails = ({ _id, item, showPrice, handleCheckboxChange, isSelected }) => {
    const { user } = useAuthContext()
    const [quantity, setQuantity] = useState(item.quantity)

    const deductQuantity = async () => {
        const inventoryId = item.inventoryItem._id

        const data = {
            userId: user._id,
            inventoryId: inventoryId
        }

        const response = await fetch(DOMAIN + `/cart/deductItemFromCart`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json','Authorization': `Bearer ${user.token}` },
            body: JSON.stringify(data)
        })

        if (response.ok) {
            const newQty = quantity - 1
            setQuantity(newQty)
            console.log(newQty)
        }
    }
    
    const addQuantity = async () => {
        const inventoryId = item.inventoryItem._id
        
        const data = {
            userId: user._id,
            inventoryId: inventoryId
        }
        
        const response = await fetch(DOMAIN + `/cart/addItemToCart`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${user.token}` },
            body: JSON.stringify(data)
        })
        
        if (response.ok) {
            const newQty = quantity + 1
            setQuantity(newQty)
            console.log(newQty)
        }
    }

    return (
        <Row fluid className='mb-2'>
            <Col className='col-1'>
                <Form.Check
                    type='checkbox'
                    className=''
                    id={_id}
                    checked={isSelected} // Set the checked status based on the prop
                    onChange={() => {handleCheckboxChange(_id)}}
                />
            </Col>
            <Col className='col-4 text-wrap'>
                {item.inventoryItem.partName}
            </Col>

            <Col className='col-3 nopadding d-flex justify-content-center'>
            {/* BUTTON FOR ADDING */}
                <Button 
                    variant="outline-dark" 
                    className='nopadding px-2 my-2'
                    onClick={deductQuantity}
                >-</Button>

                <span className='mx-1 my-2'> {quantity} </span>

                <Button 
                    variant="outline-dark" 
                    className='nopadding px-2 my-2'
                    onClick={addQuantity}
                >+
                </Button>
            </Col>
            {
                showPrice === 'retail' && 
                <Col className='col-3 text-wrap ps-2 nopadding'>
                    {item.inventoryItem.retailPrice}
                </Col>
            }
            {
                showPrice === 'wholesale' &&
                <Col className='col-3 text-wrap ps-2 nopadding'>
                    {item.inventoryItem.wholesalePrice}
                </Col>
            }
            
        </Row>
    )
}

export default CartItemDetails


