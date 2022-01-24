import React, { useState } from 'react'
import { LinkContainer } from 'react-router-bootstrap'
import { useHistory } from 'react-router-dom'
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

const Paginate = ({ pages, page, isAdmin = false, keyword = '',productList }) => {
    const history = useHistory()
    const [pageCurr, setPageCurr] = useState(1)
    const handleArrowButton = (arrow) => {
        if (arrow === -1) {
            setPageCurr(prevState => prevState - 1)
            history.push(`${!isAdmin ? keyword ? `/search/${keyword}/page/${page - 1}` : `/page/${page - 1}` : `/admin/productlist/${page - 1}`}`)
        }
        if (arrow === 1) {
            setPageCurr(prevState => prevState + 1)
            history.push(`${!isAdmin ? keyword ? `/search/${keyword}/page/${page + 1}` : `/page/${page + 1}` : `/admin/productlist/${page + 1}`}`)
        }
    }
    return pages >= 1 && (
        <>
            <PaginationContainer>
                <ArrowComponent onClick={() => handleArrowButton(-1)} style={{ pointerEvents: pageCurr === 1 ? 'none' : 'inherit' }} disabled={pageCurr === 1}>
                    <ArrowBackIosRoundedIcon sx={{ color: pageCurr === 1 ? '#ccc' : 'black', fontSize: 14 }} />
                </ArrowComponent>
                {[...Array(pages).keys()].map(x => (
                    <LinkContainer key={x + 1} to={!isAdmin ? keyword ? `/search/${keyword}/page/${x + 1}` : `/page/${x + 1}` : `/admin/productlist/${x + 1}`} style={{background:x+1 === pageCurr ? '#ccc' : 'white'}}>
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
