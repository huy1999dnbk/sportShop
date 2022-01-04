import React from 'react'
import styles from './message.module.css'
import MessageBotCard from '../MessageBotCard/MessageBotCard'
import QuickReply from '../QuickReply/QuickReply'
import { Link } from 'react-router-dom'
const Message = ({ target, message, loading, handleClickQuickReply }) => {
    return (
        <div className={`${styles.message_container} ${target === 'bot' ? styles.message_target_bot : styles.message_target_user}`}>
            {target === 'bot-recommend' ? (
                <>
                    <div style={{ marginRight: '5px' }} className={styles.message_avatar}>
                        <i className="fas fa-robot"></i>
                    </div>
                    <div className={` ${styles.message_card_container}`}>
                        <div className={styles.box}>
                            {message.map((item, index) => (
                                <MessageBotCard key={index} title={item.structValue.fields.title.stringValue} description={item.structValue.fields.description.stringValue} image={item.structValue.fields.image.stringValue} link={item.structValue.fields.link.stringValue} price={item.structValue.fields.price.numberValue} />
                            ))}
                        </div>
                    </div>
                </>
            ) : target === 'bot-quickreply' ? (
                <>
                    <div style={{ marginRight: '5px' }} className={styles.message_avatar}>
                        <i className="fas fa-robot"></i>
                    </div>
                    <div className={styles.message_content}>
                        <p>{message.text.stringValue}</p>
                        <div className={styles.message_container_button}>
                            {message.quick_replies.listValue.values.map((item, index) => (
                                <QuickReply key={index} link={item && item.structValue && item.structValue.fields && item.structValue.fields.link && item.structValue.fields.link.stringValue ? item.structValue.fields.link.stringValue : null} payload={item && item.structValue && item.structValue.fields && item.structValue.fields.payload && item.structValue.fields.payload.stringValue ? item.structValue.fields.payload.stringValue : null} text={item.structValue.fields.text.stringValue} handleClickQuickReply={handleClickQuickReply} />
                            ))}
                        </div>
                    </div>
                </>
            ) : target === 'bot-showlink' ? (
                <>
                    <div style={{ marginRight: '5px' }} className={styles.message_avatar}>
                        <i className="fas fa-robot"></i>
                    </div>
                    <div className={styles.message_content}>
                                <p>{message.text.stringValue} <Link style={{ color: 'ActiveCaption' }} to={`/product/${message.idProduct.stringValue}`} target="_blank" >this</Link> </p>
                    </div>
                </>
            )
                : target === 'bot' ? (
                    <>
                        <div style={{ marginRight: '5px' }} className={styles.message_avatar}>
                            <i className="fas fa-robot"></i>
                        </div>
                        <div className={styles.message_content}>
                            <p>{message}</p>
                        </div>
                    </>
                ) : (
                    <>
                        <div style={{ marginRight: '5px', textAlign: 'right' }} className={styles.message_content}>
                            <p >{message}</p>
                        </div>
                        <div className={styles.message_avatar}>
                            <i className="fas fa-user-tie"></i>
                        </div>

                    </>
                )}
        </div>
    )
}

export default Message
