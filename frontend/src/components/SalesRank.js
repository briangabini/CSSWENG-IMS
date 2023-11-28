import { Button, Col, Container, Row, Card } from "react-bootstrap"
import Stack from 'react-bootstrap/Stack';
import SalesFilter from "./SalesFilter";
import SalesQuota from "./SalesQuota";
import { useState, useEffect } from 'react'
import moment from 'moment'


const time = {
    Daily: "Today",
    Monthly: "This Month",
    Yearly: "This Year"
}


const SalesRank = (props) => {
    const { period, orderItem } = props;
    // const [salesItem, setSalesItem] = useState()

    // setSalesItem(orderItem)
    const test = () => {

        let tempArr = []
        let date = ""

        if (orderItem && orderItem.length > 0) {
            console.log("Order item:", orderItem[0].items[0].productName)

            orderItem.sort((a, b) => b.totalPrice - a.totalPrice);
            // sort orderItem

            

            for(let i = 0; i < orderItem.length; i++){
                
                for(let j = 0; j < orderItem[i].items.length; j++){
                    switch (period) {
                        case 'Daily':
                            date = moment(orderItem[i].orderDate).format('hh:mm A')
                            break
                        case 'Monthly':
                            date = moment(orderItem[i].orderDate).format('MMM DD')
                            break
                        case 'Yearly':
                            date = moment(orderItem[i].orderDate).format('MMMM')
                            break
                        default:
                            break
                    }

                    tempArr.push
                    (<Row className="ps-2">
                        <Col>

                            {date}

                            
                        </Col>
                        <Col>
                            {orderItem[i].items[j].productName}
                        </Col>
                        <Col>
                            ₱{orderItem[i].totalPrice.toFixed(2)}
                        </Col>
                        <Col>
                            {orderItem[i].items[j].quantity}
                        </Col>
                    </Row>
                    )
                }
            }
                
        }

        return tempArr.slice(0, 5)
    }

    useEffect(() => {
        // if (orderItem && orderItem.length > 0) {
        test()
        // }
    }, [orderItem]);


    return (
        <>
            <Row className="ps-1 mt-2 fs-5 fw-bold d-flex flex-row">
                <Col>
                    Sales {time[period]}
                </Col>
                {/* <Col className="d-flex justify-content-end">
                    <SalesFilter />
                </Col> */}
            </Row>
            <Row>
                <Col>
                    <Card className="mt-3 shadow border-0 p-4">
                        <Row className="ps-2 txt-gray-text">
                            <Col>
                                Date
                            </Col>
                            <Col>
                                Product Name
                            </Col>
                            <Col>
                                Price
                            </Col>
                            <Col>
                                QTY
                            </Col>
                        </Row>

                        {/* <Row className="ps-2">
                            <Col>
                                Item Date
                            </Col>
                            <Col>
                                Item Product Name
                            </Col>
                            <Col>
                                Item Price
                            </Col>
                            <Col>
                                Item QTY
                            </Col>
                        </Row> */}
                        {test()}
                    </Card>


                </Col>
            </Row>

        </>
    )
}

export default SalesRank