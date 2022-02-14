import styles from './styles.module.css';

export const Menu = ({ onStartClick }) => {
    return <div className={styles.main}>
        <button className={styles.startButton} onClick={onStartClick}>Start Game</button>
    </div>;
};