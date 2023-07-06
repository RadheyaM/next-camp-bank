import styles from './Card.module.css'

const Card = props => {
  const cardClasses = `${styles.dashboardCard} ${props.className}`
  return (
    <div className={cardClasses}>{props.children}</div>
  )
};

export default Card;