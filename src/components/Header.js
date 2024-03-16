import React from 'react';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import logo from '../img/logo.png';

const Header = () => {
    return (
        <>
            <Navbar className="bg-body-tertiary" style={{ fontSize: '24px' }} expand="lg"> {/* 네비게이션 바를 크게 하려면 expand="lg" 추가 */}
                <Container>
                    <Navbar.Brand style={{ marginRight: '10px' }}> {/* 로고 오른쪽으로 이동 */}
                        <img
                            alt=""
                            src={logo}
                            width="30"
                            height="30"
                            className="d-inline-block align-top mr-2" // 오른쪽으로 이동하려면 mr-2 추가
                        />{' '}
                        스타벅스
                    </Navbar.Brand>
                </Container>
            </Navbar>
        </>
    );
};

export default Header;
