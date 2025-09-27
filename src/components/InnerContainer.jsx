import styles from './innercontainer.module.css';

export default function InnerConatiner({children}){
    return <div className={styles.innerContainer} > {children}</div>
} 