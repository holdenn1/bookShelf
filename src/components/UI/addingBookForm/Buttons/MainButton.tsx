import './styles.scss';

type MainButtonProps = {
  type: string;
  title: string;
  onClick?: () => void;
};

function MainButton({ type, title, ...props }: MainButtonProps) {
  return (
    <button type='button' className={`btn-type-${type}`} {...props}>
      {title}
    </button>
  );
}

export default MainButton;