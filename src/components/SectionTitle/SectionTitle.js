// компонент заголовка каждого раздела
import './SectionTitle.css';
const SectionTitle = ({ title }) => {
  return <h2 className="section-title">{title}</h2>;
};
export default SectionTitle;
