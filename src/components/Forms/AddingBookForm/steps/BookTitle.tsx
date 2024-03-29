import MyTextInput from '@/components/UI/formUI/MyTextInput';
import styles from './styles.module.scss';
import titleBook from '@/img/icons/icons8-literature-64.png';

export default function BookTitle() {
  return (
    <>
      <img className={styles.img} src={titleBook} alt='' />
      <h3 className={styles.title}>What is the title of the book?</h3>
      <MyTextInput name='title' type='text' placeholder='Title book' />
    </>
  );
}
