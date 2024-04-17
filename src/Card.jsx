import './Card.css'

const Card = ({ img }) => {
    return (
        <div className="Card-div">
            <img src={img} className="Card" />
        </div>
    )
}

export default Card;