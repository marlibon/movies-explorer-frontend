// компонент со ссылками на другие проекты.
import './Portfolio.css';

const Portfolio = () => {
  const arrayPortfolioList = [
    {
      link: 'https://zagriev.nomoredomains.monster/how-to-learn/',
      name: 'Статичный сайт',
    },
    {
      link: 'https://marlibon.github.io/russian-travel/',
      name: 'Адаптивный сайт',
    },
    {
      link: 'https://zagriev.nomoredomains.monster',
      name: 'Одностраничное приложение',
    },
  ]
  return (
    <div className='portfolio'>
      <h4 className='portfolio__title'>Портфолио</h4>
      <ul className='portfolio__list'>
        {arrayPortfolioList.map(({ link, name }, index) => {
          return (<li className='portfolio__item' key={index}>
            <a href={link} target="_blank" className='portfolio__link' rel="noreferrer" >
              <p className='portfolio__link-text'>{name}</p>
              <p className='portfolio__link-text'>&#x2197;</p>
            </a>
          </li>)
        })}
      </ul>
    </div>
  )
}

export default Portfolio;
