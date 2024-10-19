import {Helmet} from "react-helmet-async";

// eslint-disable-next-line react/prop-types
const Title = ({ title='Chibuzur', description='This is Chibuzur a Chat app'}) => {
    return (
        <Helmet>
            <Title>{title}</Title>
            <meta name={'description'} content={description} />
        </Helmet>
    )
}

export default Title;
