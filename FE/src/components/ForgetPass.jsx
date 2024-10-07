import { styles } from './Login';
import { Button } from './ui/button';
import { Input } from './ui/input';

export const ForgetPass = () => {
  return (
    <div className={styles.container}>
      <h2 className={styles.header}>Нууц үг сэргээх</h2>
      <div className={styles.inputContainer}>
        <h3>Имэйл</h3>
        <Input placeholder="Имэйл хаягаа оруулна уу" className={styles.input} />
      </div>
      <Button className={styles.ButtonStyle1}>Үргэлжлүүлэх</Button>
    </div>
  );
};

export default ForgetPass;
