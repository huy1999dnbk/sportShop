import React from 'react'
import styles from './messagebotcard.module.css'
import { Card, Button } from 'react-bootstrap'
const MessageBotCard = ({ title, image, description, link, price }) => {
    return (
        <Card className={styles.card_container}>
            <a href={link} target="_blank" rel="noopener noreferrer">
                <Card.Img variant="top" src={image} />
            </a>
            <Card.Body>
                <Card.Title>{title}</Card.Title>
                <Card.Text>
                    {description.length > 60 ? description.slice(0, 55) + '...' : description}
                </Card.Text>
                <Card.Text>
                    {price}
                </Card.Text>
                <Button variant="primary">Details</Button>
            </Card.Body>
        </Card>
    )
}

export default MessageBotCard
