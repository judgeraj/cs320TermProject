import { Player } from 'components/Player/Player';
import styles from './styles.module.css';

export const Gameplay = () => {
    return <div className={styles.main}>
        <div className={styles.opponent}>
            <div className={styles.summary}>
                <Player />
            </div>    
        </div>
        <div className={styles.player}>
            <div className={styles.summary}>
                <Player main />
            </div>
        </div>
    </div>;
};