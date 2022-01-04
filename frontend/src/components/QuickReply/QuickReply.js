import React from 'react'
import styles from './quickreply.module.css'
import { Button } from 'react-bootstrap'
const QuickReply = ({ link, payload, text, handleClickQuickReply }) => {
    if (!link) {
        return (
            <Button variant="outline-primary" onClick={() => handleClickQuickReply(payload, text)}>
                <span>{text}</span>
            </Button>
        )
    } else {
        return (
            <a href={link} target="_blank" rel="noopener noreferrer">
                <Button variant="outline-primary">
                    <span>{text}</span>
                </Button>
            </a>
        )
    }
}

export default QuickReply
