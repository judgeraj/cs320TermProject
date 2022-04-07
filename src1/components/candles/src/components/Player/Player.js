import styles from './styles.module.css';

export const Player = ({main = false, name, age, picked, maxHealth, health}) => {
    return <div 
        style={{backgroundColor: main ? '#532100' : '#620909'}}
        className={styles.main}>
            <div className={styles.info}>
                <div className={styles.name}>{name}</div>
                <div className={styles.age}>Age: {age}</div>
            </div>
            <div className={styles.health}>
                <bar label="Candles Picked:" value={picked}/>  
            </div>
        </div>
}