import React from 'react'
import {Helmet} from 'react-helmet'
const Meta = ({title,description,keywords}) => {
    return (
        <Helmet>
            <title>{title}</title>
            <meta name='description' content={description}/>
            <meta name='keyword' content={keywords}/>
        </Helmet>
    )
}

Meta.defaultProps = {
    title:'Welcome to sport shop',
    description:'In here we sell best product with low price',
    keywords:'ball, shirt, shoes, pant'
}

export default Meta
