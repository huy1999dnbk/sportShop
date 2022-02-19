import React, { useState, useEffect } from 'react'
import { LinkContainer } from 'react-router-bootstrap'
import { useHistory, useLocation } from 'react-router-dom'
import styled from 'styled-components'
import ArrowBackIosRoundedIcon from '@mui/icons-material/ArrowBackIosRounded';
import ArrowForwardIosRoundedIcon from '@mui/icons-material/ArrowForwardIosRounded';
const PaginationContainer = styled.div`
    height:60px;
    padding:5px;
    background:white;
    display:flex;
    flex-direction:row;
    justify-content:center;
    align-items:center;
    margin-top:20px
`
const ArrowComponent = styled.button`
    width:40px;
    height:40px;
    border-radius:50%;
    background:white;
    display:flex;
    justify-content:center;
    align-items:center;
    border:none;
    &:hover{
        background:#F5F5F5
    }
`

const PaginateItem = styled.button`
    width:40px;
    height:40px;
    border-radius:50%;
    background:white;
    border:none;
    &:hover{
        background:#F5F5F5
    }
`

const Paginate = ({ pages, page, isAdmin = false, keyword = '', productList, isProduct = true, isUsers = false, isOrders = false }) => {
    const location = useLocation()
    const history = useHistory()
    const [pageCurr, setPageCurr] = useState(1)

    const handleArrowButton = (arrow) => {
        if (arrow === -1) {
            setPageCurr(prevState => prevState - 1)

            if (!isAdmin) {
                if (keyword) {
                    history.push(`/search/${keyword}/page/${page - 1}`)
                } else {
                    history.push(`/page/${page - 1}`)
                }
            } else {
                if (isProduct) {
                    history.push(`/admin/productlist/${page - 1}`)
                }
                if (isOrders) {
                    history.push(`/admin/orderlist/${page - 1}`)
                }
                if (isUsers) {
                    history.push(`/admin/userlist/${page - 1}`)
                }
            }

        }
        if (arrow === 1) {
            setPageCurr(prevState => prevState + 1)

            if (!isAdmin) {
                if (keyword) {
                    history.push(`/search/${keyword}/page/${page + 1}`)
                } else {
                    history.push(`/page/${page + 1}`)
                }
            } else {
                if (isProduct) {
                    history.push(`/admin/productlist/${page + 1}`)
                }
                if (isOrders) {
                    history.push(`/admin/orderlist/${page + 1}`)
                }
                if (isUsers) {
                    history.push(`/admin/userlist/${page + 1}`)
                }
            }

        }
    }


    useEffect(() => {
        if (!localStorage.getItem('pageNum')) {
            setPageCurr(1)
        } else {
             if (location.pathname === '/') {
                setPageCurr(1)
            } else {
                setPageCurr(Number(JSON.parse(localStorage.getItem('pageNum'))))
            }
        }
    }, [keyword])

    return pages >= 1 && (
        <>
            <PaginationContainer>
                <ArrowComponent onClick={() => handleArrowButton(-1)} style={{ pointerEvents: pageCurr === 1 ? 'none' : 'inherit' }} disabled={pageCurr === 1}>
                    <ArrowBackIosRoundedIcon sx={{ color: pageCurr === 1 ? '#ccc' : 'black', fontSize: 14 }} />
                </ArrowComponent>
                {isProduct && [...Array(pages).keys()].map(x => (
                    <LinkContainer key={x + 1} to={!isAdmin ? keyword ? `/search/${keyword}/page/${x + 1}` : `/page/${x + 1}` : `/admin/productlist/${x + 1}`} style={{ background: x + 1 === pageCurr ? '#ccc' : 'white' }}>
                        <PaginateItem onClick={() => setPageCurr(x + 1)}>{x + 1}</PaginateItem>
                    </LinkContainer>
                ))}
                {isUsers && [...Array(pages).keys()].map(x => (
                    <LinkContainer key={x + 1} to={isAdmin ? `/admin/userlist/${x + 1}` : `/`} style={{ background: x + 1 === pageCurr ? '#ccc' : 'white' }}>
                        <PaginateItem onClick={() => setPageCurr(x + 1)}>{x + 1}</PaginateItem>
                    </LinkContainer>
                ))}
                {isOrders && [...Array(pages).keys()].map(x => (
                    <LinkContainer key={x + 1} to={isAdmin ? `/admin/orderlist/${x + 1}` : `/`} style={{ background: x + 1 === pageCurr ? '#ccc' : 'white' }}>
                        <PaginateItem onClick={() => setPageCurr(x + 1)}>{x + 1}</PaginateItem>
                    </LinkContainer>
                ))}
                <ArrowComponent onClick={() => handleArrowButton(1)} style={{ pointerEvents: pageCurr === pages || productList.length === 0 ? 'none' : 'inherit' }} disabled={pageCurr === pages || productList.length === 0}>
                    <ArrowForwardIosRoundedIcon sx={{ color: pageCurr === pages || productList.length === 0 ? '#ccc' : 'black', fontSize: 14 }} />
                </ArrowComponent>
            </PaginationContainer>
        </>

    )
}

export default Paginate
