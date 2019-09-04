import React from 'react'
import './Footer.css'

export default class Footer extends React.Component {
    render () {
        return (
            <footer>
                <ul>
                    <li className="copyRight">
                        <p><i className="fas fa-copyright"></i>2019 Edwin Qiu</p>
                    </li>
                    <li className="contactItem  mail">
                            <a href="mailto:edwinqiu93@gmail.com?subject=Hi" target="_blank" aria-label="Email Edwin Qiu" rel='noopener noreferrer'>
                                <i className="far fa-envelope" title="Email"></i>
                            </a>
                    </li>
                    <li className="contactItem">
                        <a href="https://www.linkedin.com/in/edwinqiu/" target="_blank" aria-label="Edwin Qiu's Linkedin Profile" rel='noopener noreferrer'>
                            <i className="fab fa-linkedin" title="Linkedin"></i>
                        </a>
                    </li>
                    <li className="contactItem">
                        <a href="https://github.com/Edweezu" target="_blank" aria-label="Edwin Qiu's Github Profile" rel='noopener noreferrer'>
                            <i className="fab fa-github" title="Github"></i>
                        </a>
                    </li>
                </ul>
            </footer>
        )
    }
}