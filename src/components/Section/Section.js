import './Section.css';
import SectionTitle from '../SectionTitle/SectionTitle';



const Section = ({ title, theme, children }) => {
    const sectionClass = `section ${theme ? 'section_theme_' + theme : ''}`;
    return (
        <section className={sectionClass}>
            <SectionTitle title={title} />
            {children}
        </section>
    )
}
export default Section
