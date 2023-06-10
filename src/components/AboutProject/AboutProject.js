// компонент с описанием дипломного проекта
import Section from '../Section/Section';
import './AboutProject.css';

const AboutProject = () => {
  return (
    <Section title="О проекте" >
      <div className='about-project__cards'>
        <article className='about-project__card'>
          <h3 className='about-project__subtitle'>Дипломный проект включал 5 этапов</h3>
          <p className='about-project__description'>Составление плана, работу над бэкендом, вёрстку, добавление функциональности и финальные доработки.</p>
        </article>
        <article className='about-project__card'>
          <h3 className='about-project__subtitle'>На выполнение диплома ушло 5 недель</h3>
          <p className='about-project__description'>У каждого этапа был мягкий и жёсткий дедлайн, которые нужно было соблюдать, чтобы успешно защититься.</p>
        </article>
      </div>
      <div className='about-project__table'>
        <span className='about-project__table-item about-project__table-item_heading'>1 неделя</span>
        <span className='about-project__table-item about-project__table-item_heading'>4 недели</span>
        <span className='about-project__table-item'>Back-end</span>
        <span className='about-project__table-item'>Front-end</span>

      </div>
    </Section>
  )
}

export default AboutProject;
