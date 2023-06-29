import './Section.css';
import SectionTitle from '../SectionTitle/SectionTitle';

const Section = ({ title, theme, children, id }) => {
  const sectionClass = `section ${theme ? 'section_theme_' + theme : ''}`;
  return (
    <section className={sectionClass} id={id}>
      {title && <SectionTitle title={title} />}
      {children}
    </section>
  );
};
export default Section;
