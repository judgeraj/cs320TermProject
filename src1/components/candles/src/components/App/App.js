import { Gameplay, Menu } from 'components';
import { useState } from 'react';
import styles from './styles.module.css';

export const App = () => {
  const [mode, setMode] = useState('start');
  // setState('game');
  return (
    <div className={styles.main}>
      {mode === 'start' && <Menu onStartClick={() => setMode('game')} />}

      {mode === 'game' && <Gameplay/>}

      {mode === 'end' && <>End</>}
    </div>
  );
};

