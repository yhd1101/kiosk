import React, { useState, useEffect } from 'react';
import Header from "./components/Header";
import { Button, Card, Col, Row, Table } from "react-bootstrap";
import americano from "../src/img/아메리카노.jpg"
import dolchaLatte from "../src/img/돌체라떼.jpg"
import docahalCold from "../src/img/돌체콜드브루.jpg"
import StrawberryYogurt from "../src/img/딸기요거트.jpg"
import espresso from "../src/img/에스프레소.jpg"
import chips from "../src/img/자바칩.jpg"
import tea from "../src/img/자몽티.jpg"
import caramel from "../src/img/카라멜마키아또.jpg"
import latte from "../src/img/카페라떼.jpg"
import Container from "react-bootstrap/Container";

function App() {
    const [orderItems, setOrderItems] = useState([]);
    const [totalPrice, setTotalPrice] = useState(0);
    const [quantityMap, setQuantityMap] = useState({});
    const cafes = [
        {
            "id": 1,
            "title": "아메리카노",
            "price": 4500,
            "img": americano
        },
        {
            "id": 2,
            "title": "돌차라떼",
            "price": 5500,
            "img": dolchaLatte
        },
        {
            "id": 3,
            "title": "딸기 요거트",
            "price": 6000,
            "img": StrawberryYogurt
        },
        {
            "id": 4,
            "title": "에스프레소",
            "price": 5000,
            "img": espresso
        },
        {
            "id": 5,
            "title": "자바칩",
            "price": 5000,
            "img": chips
        },
        {
            "id": 6,
            "title": "자몽티",
            "price": 6500,
            "img": tea
        },
        {
            "id": 7,
            "title": "카라멜마끼야또",
            "price": 5000,
            "img": caramel
        },
        {
            "id": 8,
            "title": "돌차라떼",
            "price": 5500,
            "img": docahalCold
        },
        {
            "id": 9,
            "title": "카페라떼",
            "price": 5500,
            "img": latte
        }
    ]

    const handleAddToOrderList = () => {
        let updatedOrderItems = [...orderItems]; // 기존 주문 항목을 복사하여 새로운 배열에 저장

        for (const cafe of cafes) {
            const quantity = quantityMap[cafe.id] || 0;
            if (quantity > 0) {
                const existingItemIndex = updatedOrderItems.findIndex(item => item.id === cafe.id);
                if (existingItemIndex !== -1) { // 이미 주문 목록에 있는 경우
                    // 수량을 업데이트하고 가격 재계산
                    updatedOrderItems[existingItemIndex].quantity += quantity;
                    updatedOrderItems[existingItemIndex].price = cafe.price * updatedOrderItems[existingItemIndex].quantity;
                } else { // 주문 목록에 없는 경우 새로 추가
                    updatedOrderItems.push({
                        id: cafe.id,
                        title: cafe.title,
                        quantity: quantity,
                        price: cafe.price * quantity
                    });
                }
            }
        }

        setOrderItems(updatedOrderItems); // 업데이트된 주문 목록으로 설정
        setQuantityMap({}); // 수량 맵 초기화
    };


    useEffect(() => {
        let total = 0;
        for (const item of orderItems) {
            total += item.price;
            console.log(total)
        }
        setTotalPrice(total);
    }, [orderItems, quantityMap]);


    const handleAddToOrder = (cafe) => {
        const newQuantityMap = { ...quantityMap };
        newQuantityMap[cafe.id] = (newQuantityMap[cafe.id] || 0) + 1;
        setQuantityMap(newQuantityMap);
    };
    const deleteOrder = () => {
        alert('취소되었습니다.');
        setOrderItems([]);
        setTotalPrice(0);
        setQuantityMap({});
    }


    const handleRemoveFromOrder = (cafe) => {
        // 해당 아이템을 주문 내역에서 삭제
        const newOrderItems = orderItems.filter(item => item.id !== cafe.id);
        setOrderItems(newOrderItems);

        // 해당 아이템의 가격을 전체 가격에서 빼기
        const itemPrice = cafe.price * (quantityMap[cafe.id] || 0);
        const newTotalPrice = totalPrice - itemPrice; // 새로운 가격 계산
        setTotalPrice(newTotalPrice); // 새로운 가격으로 업데이트

        // 수량 맵에서 해당 아이템의 수량도 업데이트
        const newQuantityMap = { ...quantityMap };
        delete newQuantityMap[cafe.id];
        setQuantityMap(newQuantityMap);
    };



    const handlePlaceOrder = () => {
        if (totalPrice === 0) {
            alert('커피를 담아주세요.');
            return;
        }

        alert('주문이 완료되었습니다.');
        setOrderItems([]);
        setTotalPrice(0);
        setQuantityMap({});
    };

    return (
        <div>
            <Header />
            <Container>
                <Row>
                    <Col xs={9}>
                        <Row>
                            {cafes.map(cafe => (
                                <Col key={cafe.id} xs={4} style={{ marginTop: '2rem' }}>
                                    <Card style={{ width: '18rem' }}>
                                        <Card.Img variant="top" src={cafe.img} />
                                        <Card.Body>
                                            <Card.Title>{cafe.title}</Card.Title>
                                            <Card.Text>
                                                가격: {cafe.price}원
                                            </Card.Text>
                                            <Button variant="primary" onClick={() => handleAddToOrder(cafe)}>수량 추가</Button>{' '}
                                            <span>{quantityMap[cafe.id] || 0}</span>
                                        </Card.Body>
                                    </Card>
                                </Col>
                            ))}
                        </Row>
                    </Col>
                    <Col xs={3}>
                        <div>
                            <h2>주문 내역</h2>
                            <Table striped bordered hover>
                                <thead>
                                <tr>
                                    <th>메뉴</th>
                                    <th>수량</th>
                                    <th>가격</th>
                                    <th>삭제</th>
                                </tr>
                                </thead>
                                <tbody>
                                {orderItems.map(item => (
                                    <tr key={item.id}>
                                        <td>{item.title}</td>
                                        <td>{item.quantity}개</td>
                                        <td>{item.price}원</td> {/* 수정된 부분: 총 가격 표시 */}
                                        <td><Button variant="danger" onClick={() => handleRemoveFromOrder(item)}>삭제</Button></td>
                                    </tr>
                                ))}
                                </tbody>
                            </Table>
                            <h2>최종 결제 금액: {totalPrice}원</h2>
                            <Button variant="success" onClick={handlePlaceOrder}>주문하기</Button>
                        </div>
                    </Col>
                </Row>
                <Button style={{ margin: '1rem' }} onClick={handleAddToOrderList}>담기</Button>
                <Button style={{ margin: '1rem' }} onClick={deleteOrder}>취소하기</Button>
            </Container>
        </div>
    );

}

export default App;
